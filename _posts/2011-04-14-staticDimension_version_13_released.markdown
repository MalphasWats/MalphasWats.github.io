---
layout: post
title: staticDimension - version 1.3 released
---

I've just uploaded [version 1.3](http://subdimension.co.uk/files/staticDimension-1.3.tar.gz) to the server adding support for using external applications such as [MarsEdit](http://www.red-sweater.com/marsedit/) to publish articles and pages via the MetaWeblog API.

I wasn't all that sure about why people would use applications like this but having spent the last 2 days staring at MarsEdit, I'm definitely a convert (using it to write this!).

Support for editing pages is included, it uses the categories feature of the API to deal with them - anything with a `page` category is treated as a page instead of an article.

If you're already running an instance of staticDimension, you'll probably want to add this line to the `<head>` of your `_home.html` template page:

    <link rel="EditURI" type="application/rsd+xml" 
    title="RSD" href="controlPanel/xml-rpc.php?rsd">

this will allow apps like MarsEdit to auto-configure. For apps that don't auto-configure, the endpoint is:

    http://yourwebsite.com/controlPanel/xml-rpc.php

any problems just [shout](/pages/about_me.html)