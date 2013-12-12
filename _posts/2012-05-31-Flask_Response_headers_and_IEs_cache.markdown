---
layout: post
title: Flask Response headers and IE's cache
---

I'm working on a new project at work and my work with pyDimension recently meant I can switch from PHP to Python there too. It's already making my life easier.

I hit upon an old issue that I'd solved long ago in PHP, Internet Explorer stupidly caches all `XMLHttpRequest` responses. I can almost understand the logic: If you're requesting the same URL, you should get the same response.

The thing is, that doesn't happen in the real world. More often than not, I'm POSTing something to /add/a/new/thing and expecting to get an ID back, or something similar.

In my new project, I had this:

    #!python
    @mod.route('/file/last_uploaded')
    @login_required
    def get_last_uploaded_file():
        user_id = session['user']['user_id']
        file_id = database.query("""SELECT file_id FROM files WHERE owner=%s ORDER BY date_uploaded DESC LIMIT 1""", (user_id,))
        return jsonify(file_url = url_for('files.download', file_id=file_id[0]['file_id']))
        
There was a bit more to it than that, dealing with no file having been uploaded etc etc.

Worked fine in Chrome, almost looked like it worked fine in IE - the first time. After that it just kept returning the same file.

Since starting on the Flask path, the most useful resource I've found is the [Flask mailing list](http://librelist.com/browser/flask/). There are some really clever people there and they always appear happy to help. I'd tried a few things after reading the docs. I was creating a new `Response` and trying to add the result of `jsonify()` to it, without realising that `jsonify()` already creates a `Response` object (it should be obvious really, I was plugging it straight into the `return`.

My function became:

    #!python
    @mod.route('/file/last_uploaded')
    @login_required
    def get_last_uploaded_file():
        user_id = session['user']['user_id']
        file_id = database.query("""SELECT file_id FROM files WHERE owner=%s ORDER BY date_uploaded DESC LIMIT 1""", (user_id,))
        response = jsonify(file_url = url_for('files.download', file_id=file_id[0]['file_id']))
    
        response.headers.add('Last-Modified', datetime.datetime.now())
        response.headers.add('Cache-Control', 'no-store, no-cache, must-revalidate, post-check=0, pre-check=0')
        response.headers.add('Pragma', 'no-cache')
        
        return response