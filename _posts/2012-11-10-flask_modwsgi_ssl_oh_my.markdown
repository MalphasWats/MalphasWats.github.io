---
layout: post
title: flask, mod_wsgi, ssl, oh my!
---

#{{ page.title }}

I wanted to be able to access my [instruments](https://github.com/MalphasWats/instruments) control panel via `https://` as well as `http://`.

First, I started off by getting an SSL certificate. I used [StartSSL](https://www.startssl.com) which offers a free-tier SSL certificate. Following all of their steps carefully, I ended up with 2 files:

- a private `.key` file (unencrypted),
- my certificate file\* (I had to wait for it to be approved and copied it from the *Retrieve Certificate* section of the Tool Box).

\* I run instruments on a sub-domain of subdimension.co.uk, the certificate I created was tied to this sub-domain. The paid-tier StartSSL offers allows you to create a wildcard certificate that would work for the whole domain, but I don't need to spend £40 on that.

I also needed a third file from the StartSSL Tool Box page; in the StartCom CA Certificates section, download a copy of the *Class 1 Intermediate Server CA* file.

I uploaded these files onto my server, into a non-web-accessible directory.

I use Apache, with `mod_wsgi` to run my flask applications currently. Instruments was already running with the following configuration file:

    <VirtualHost *:80>
        ServerName instruments.example.com
    
        WSGIDaemonProcess instruments_t user=user group=www-data umask=0002 threads=5 home=/path/to/instruments
        WSGIScriptAlias / /path/to/instruments.wsgi
    
        <Directory /path/to/instruments>
            WSGIProcessGroup instruments_t
            WSGIApplicationGroup %{GLOBAL}
            WSGIScriptReloading On
            Order deny,allow
            Allow from all
        </Directory>
    </VirtualHost>

I wasn't sure quite how to go about the next step - I could have just repeated the same thing again, but with `<VirtualHost *:443>` instead, but I suspected that would create 2 identical applications running at the same time. I wanted 1 application that was accessed via both ports.

[A blog post from the creator of mod_wsgi](http://blog.dscpl.com.au/2009/08/more-on-those-problems-with-example.html) helped me out. Although he is talking about `web2py`, the problem and solution were the same. Simply dropping the `WSGIDaemonProcess` line and making sure I referenced the same `WSGIProcessGroup` seemed to be enough.

My Apache config file became this:

    <VirtualHost *:80>
        ServerName instruments.example.com
    
        WSGIDaemonProcess instruments_t user=user group=www-data umask=0002 threads=5 home=/path/to/instruments
        WSGIScriptAlias / /path/to/instruments.wsgi
    
        <Directory /path/to/instruments>
            WSGIProcessGroup instruments_t
            WSGIApplicationGroup %{GLOBAL}
            WSGIScriptReloading On
            Order deny,allow
            Allow from all
        </Directory>
    </VirtualHost>

    <VirtualHost *:443>
        ServerName instruments.example.com
    
        WSGIScriptAlias / /path/to/instruments.wsgi

        SSLEngine On
        SSLCertificateFile /path/to/instruments.example.com.cer
        SSLCertificateKeyFile /path/to/unencrypted_private.key
        SSLCertificateChainFile /path/to/sub.class1.server.ca.pem
    
        <Directory /path/to/instruments>
            WSGIProcessGroup instruments_t
            WSGIApplicationGroup %{GLOBAL}
            WSGIScriptReloading On
            Order deny,allow
            Allow from all
        </Directory>
    </VirtualHost>

According to Graham in the post above, this works as long as the `ServerName` is the same for both, and because `mod_wsgi` treats the ports :80 and :443 as a special pair.

Before I could enable the site (and disable the old config file), the SSL module needed to be enabled:

    $ sudo a2enmod ssl

disable the old app:

    $ sudo a2dissite instruments

enable the new one:

    $ sudo a2ensite instruments-ssl

because of the enabling of `mod_ssl`, apache needs to be restarted, rather than just reloaded:

    $ sudo /etc/init.d/apache2 restart

a quick browser point to `https://instruments.example.com` and everything appeared to be working! My next task is to rework the instruments app to make sure that it always redirects to the `https://` site which I'll likely write about separately later.

Additionally, the main reason I wanted this was so that I could get [subMarks](https://github.com/MalphasWats/subMarks) able to bookmark websites that are only accessible via `https://`. I'll probably write a bit about that too.