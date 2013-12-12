---
layout: post
title: staticDimension templates
---

#{{ page.title }}

staticDimension has been designed with very simple templating support.

I'm under no illusions that the default template that comes with staticDimension is particularly pretty.

Whilst you can simply edit the default template directly, I'd recommend at least copying the directory and giving it a new name, at least then if things go horribly wrong, you can switch back and have a working site quickly.

You'll find a `templates/` directory in the root of your site, to create a new template, you just need to create a new directory in there and put your template files in there.

The simplest template you can create consists of the template folder and a single `_home.html` file. You can have anything at all in that `_home.html` file, staticDimension will simply read it out and replace a `$PAGE_CONTENT` token with your article or page, and a `$PAGE_TITLE` token with its title.

An absolutely bare bones example of a template:

    <html>
    <head>
      <title>$PAGE_TITLE</title>
    </head>

    <body>
      $PAGE_CONTENT
    </body>
    </html>

Things start to get a little more complicated once you start using CSS files. I recommend that you keep everything for a single template together in the template directory and then link to the style sheets into the templates directory.

##custom pages
in addition to the `_home.html` template, staticDimension uses 3 other *reserved* files, `_article.html`, `_page.html` and `_archive.html`. If these files exist, staticDimension will use these instead of the `_home.html` template when generating the appropriate page. This site uses this so that the when on the home page, the *blog* tab on the side is highlighted but not when you're viewing a specific article or page.

Additionally to the reserved templates, you can create individual templates for specific pages - simply create a file in your template directory with the same name as the page url - for example, the [about me](/pages/about_me.html) page here uses a custom template to highlight the appropriate tab at the side. The template lives in a file called `about_me.html` in the template directory. staticDimension always checks to see if a custom template exists for a given page.

##changing the current template setting
Once you've created a new template, you need to change the template setting by editing the `_settings.php` file in the `controlPanel/` folder. There are comments in this file that explain how to change the setting.

##rebuilding
html pages and articles in staticDimension are only created or modified when you create or edit an article or page - if you've changed the template, or created an entirely new template, you will need to rebuild the site for changes to take effect. In the settings section of the control panel, you'll find a button for rebuilding the site - it could take some time to complete if you have a particularly large site!