---
layout: post
title: Multiple Flask applications in one package
---

I'm almost ready to deploy pyDimension to my live server. I mentioned previously that I'd been working on the search indexer - every time a new post is saved, I break it up into a list of words and add the post's url to a file named for each word.

The other side of the process is taking a search string, breaking it down into words and finding all of the posts that match the terms. I even have my own PageRank algorithm:

    #!python
    @srch.route('/', methods=['GET', 'POST'])
    def search():
        if request.method == 'POST':
            terms = get_words(request.form['search_string'])
        else:
            terms = get_words(request.args.get('s', ''))
        results = []
        for t in terms:
            indexFilename = "%s/%s" % (srch.config['SEARCH_INDEX_DIR'], t)
            if os.path.exists(indexFilename):
                indexFile = codecs.open(indexFilename, encoding='utf-8', mode='r')
                results = indexFile.read().splitlines() + results
                indexFile.close()
    
        result_set = set(results)
    
        ranked_results = []
        for r in result_set:
            ranked_results.append((results.count(r), r, os.path.split(r)[1]))
    
        ranked_results.sort()
        ranked_results.reverse()
    
        return render_template('%s/search_results.html' % srch.config['SITE_TEMPLATE'],
                           terms=" ".join(terms),
                           results=ranked_results)
                           
This is the only part of my website that isn't served as static HTML. I guess in theory I could create a search results page for every possible word combination, but that would be stupid.

I ran into a problem though. The main application runs on a special subdomain behind a login, separate to the main site you're reading now. The search part though is accessed anonymously and from the main site domain.

I wasn't sure at first how to do this with Flask - I knew that I wanted to keep everything all neatly within the same package though, as it all belongs together.

My inexperience with Python lead me to creating a `.wsgi` file in the static site that *only* imported the `pydimension.search` module. I thought that would be quite clever, however, it still imports the whole of the Flask app, so I just ended up with a new entrypoint to the admin application.

After briefly giving up, I realised that the `app` object in my package was really just an arbitrary instantiation of the Flask class. I could create a new one and just add the `/search` route to it.

I modified the package `__init__.py` file:

    from flask import Flask
    
    app = Flask(__name__)
    app.config.from_pyfile('site_settings.cfg')
    
    srch = Flask(__name__)
    srch.config.from_pyfile('site_settings.cfg')
    
    import pyDimension.system
    import pyDimension.access_control
    import pyDimension.views
    import pyDimension.search

then I changed the decorator for the `search()` function as you can see above. Initially, I routed it like this: `@srch.route('/search', methods=['GET', 'POST'])` and started my WSGI Daemon at the root of the domain, but I found that caused `mod_wsgi` to handle all request to the domain and just return 404 errors for everything but `/search`, instead, when I configured Apache, I started the daemon at `/search`:

    <VirtualHost *:80>
        ServerName flasktest.subdimension.co.uk
    
        WSGIDaemonProcess flaskTest user=flask group=www-data threads=5 home=/<redacted>/searchTest
        WSGIScriptAlias /search /<redacted>/flaskTest/searchTest.wsgi
    
        <Directory /<redacted>/searchTest>
            WSGIProcessGroup searchTest
            WSGIApplicationGroup %{GLOBAL}
            WSGIScriptReloading On
            Order deny,allow
            Allow from all
        </Directory>
    </VirtualHost>
    
In the `.wsgi` file for the static site domain, I imported `srch` from `pyDimension` instead of `app`:

    import sys
    
    sys.path.append('/redacted/pyDimension')
    
    from pyDimension import srch as application

It worked!