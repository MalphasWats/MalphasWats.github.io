---
layout: post
title: Deploying Flask to Apache
---

I'm still slowly plugging away with my new Python + flask static blogging system. I thought I'd share the details of my most recent exploration.

Out of the box, the flask framework comes with its own development server, so far I've only used this but eventually I would be deploying it onto my main server running apache. I decided I needed to make sure I could get this working without too much trouble so I made a simple Hello World application along the lines of the main [flask tutorial](http://flask.pocoo.org/docs/quickstart/#quickstart).

I uploaded it to a folder on my server and SSH'd in to start configuring things. I'd already set up a sub domain to use and pointed it at the server too.

I found that the flask [documentation for setting up with Apache](http://flask.pocoo.org/docs/deploying/mod_wsgi/) made the assumption that you'd already worked with WSGI applications and just needed the flask way so it took a bit of digging and re-reading.

First, I [created a new shell-less user](http://superuser.com/questions/77617/how-can-i-create-a-non-login-user) to run my app as. I could have just used the Apache user (www-data), but I wanted to be able to distinguish files that had been molested by my flask app:

create a new user without a home directory:

    $  useradd -M flask

remove shell:

    $  usermod -s /bin/false flask

Finally, lock the account to prevent logging in:

    $  usermod -L flask

I also added the user to the Apache `www-data` group. This makes it easier to work with file permissions later as I can keep ownership of them with my own user, but allow the `www-data` group access.

    $  adduser flask www-data

Next I created `flaskTest.wsgi` in my application's folder:

    import sys
    
    sys.path.append('/<redacted>/flaskTest')
    
    from flaskTest import app as application

Initially I didn't think I needed to import the path to the app as I assumed it would be started in its own directory, however, I realised later that `mod_wsgi` starts apps with the same base directory a Apache, which in my case was the system root.

Finally I created a new Apache VirtualHost config in `/etc/apache2/sites-available`:

    <VirtualHost *:80>
        ServerName flasktest.subdimension.co.uk
    
        WSGIDaemonProcess flaskTest user=flask group=www-data threads=5 home=/<redacted>/flaskTest
        WSGIScriptAlias / /<redacted>/flaskTest/flaskTest.wsgi
    
        <Directory /<redacted>/flaskTest>
            WSGIProcessGroup flaskTest
            WSGIApplicationGroup %{GLOBAL}
            WSGIScriptReloading On
            Order deny,allow
            Allow from all
        </Directory>
    </VirtualHost>

Adding the `WSGIScriptReloading` directive meant that any time I made changes to my application files, I could simply `$  touch flaskTest.wsgi` and the app would restart with changes applied. I even found a [python-based implementation of touch](http://stackoverflow.com/questions/1158076/implement-touch-using-python) that I could use if I wanted to be able to restart the app from within the app!

As mentioned above, by default, the application starts as if it were called from the server root. The [WSGI Documentation](https://code.google.com/p/modwsgi/wiki/ConfigurationDirectives#WSGIDaemonProcess) gave me the extra `home` option for the `WSGIDaemonProcess` directive, which changes that to wherever you want it.

I had to make one final change to the configuration file from the documented example, which was to specify the port for the VirtualHost `*:80`. Without this it over-rode my other virtual hosts and everything ended up pointing to the same place!

With all this done, enable the site and restart of Apache:

    $  a2ensite flaskTest
    $  /etc/init.d/apache2 reload

and my application was running!