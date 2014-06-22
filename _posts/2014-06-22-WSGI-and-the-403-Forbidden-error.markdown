---
layout: post
title: WSGI and the 403 Forbidden error
date: 2014-06-22
---
I recently set up a new server so I could deploy an app I've been working on.

Because I'm lazy, I simply copied and pasted all the various settings files from an existing app that was running perfectly happily and restarted Apache.

Annoyingly, all I got was `403 Forbidden: You don't have permission to access / on this server` and it took me about an hour and a half to work out what was wrong. I eventually found this [StackOverflow answer](http://stackoverflow.com/questions/17766595/apache-django-mod-wsgi-403-forbidden-error) that explained that the newer versions of Apache have slightly different security settings.

I added the line `Require all granted` to my VirtualHost apache config file, restarted and everything worked perfectly. My new config looks like this now:

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
            Require all granted
        </Directory>
    </VirtualHost>
