---
layout: post
title: staticDimension changelog
---

Neatened up the manage files control panel and fixed issues with breadcrumbs not linking properly.

fixed a minor security bug where rogue paths weren't being stripped off input properly.

##version 1.3 - 2011-04-14
<a id="1.3"></a>
Added support for external editors such as MarsEdit via the MetaWeblog API. Allows for creation of pages via category.

As a result of adding this feature, I have changed the behaviour of editing the titles of pages and articles, you now have to explicitly say that you want the actual filename renamed and this can only be done through the web interface (for now). Titles are changed in the actual document.

The `_home.html` template has changed to allow auto-discovery of the MetaWeblog API.

New file in default template folder that provides a preview template for MarsEdit, just copy and paste it in.

##version 1.2.1 - 2011-04-12
<a id="1.2.1"></a>
tweaked archiving system to use article titles, rather than filename - reduced lameness ;)

##version 1.2 - 2011-04-12
<a id="1.2"></a>
removed `_settings.php` and `_users.php` from the download, these are now created by the `install.php` script. This stops settings and users from being overwritten when unpacking and should make updating to new versions less irritating.

changed `install.php` to create the about page linked to by default template

**YOU DO NOT NEED TO RERUN `install.php` IF YOU ARE UPGRADING AN EXISTING INSTALLATION**

tweaked the archive generator - it now removes empty directories in the main html articles path so it won't generate links to articles that have been deleted, deleting an article now also causes the archive to be rebuilt.

tweaked the code for archive lists - the `<ul>` is now wrapped in a `<nav>` element to facilitate styling the archive. css has also been tweaked in the default template to tidy the archive layout a little.

##version 1.1 - 2011-03-30
<a id="1.1"></a>
added feature for articles to be "link" articles that link to an external url

##version 1.0 - 2011-03-29

release version