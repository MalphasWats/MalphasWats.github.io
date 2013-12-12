---
layout: post
title: loading Flask blueprints dynamically
---

#{{ page.title }}

I wanted to be able to add and load plug-ins for a new system I'm working on without knowing what they were called at development time.

Ultimately, I created a very basic skeleton for doing this here:

[flask-blueprint-loader](https://github.com/MalphasWats/flask-blueprint-loader)

I got [a little help](https://github.com/smartboyathome/Cheshire-Engine/blob/master/ScoringServer/utils.py) from a project that was doing something similar too.

Basically, it boils down to using the [Python imp module](http://docs.python.org/library/imp.html), which ends up looking a little like this:

    fp, pathname, description = imp.find_module('my_plugin', ['plugin-folder'])
    print fp, pathname, description
    mod = imp.load_module('my_plugin', fp, pathname, description)