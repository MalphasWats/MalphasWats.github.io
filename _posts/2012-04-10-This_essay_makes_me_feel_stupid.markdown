---
layout: post
title: This essay makes me feel stupid
link: http://me.veekun.com/blog/2012/04/09/php-a-fractal-of-bad-design/
---

I read through this essay, nodding and smiling most of the way (not all because I was only pretending I knew what he was talking about).

There's a section of code from my post yesterday that left me feeling uncomfortable:

        $results = array_count_values($results);
        asort($results);
        $results = array_reverse($results);

The middle line was `$results = asort($results);` the first time around. I always go there first, until I remember that `asort()` does the sort 'in place'. It's always grated on me.

I was pleased that "eevee" closed with this:

> If you only know PHP and you’re curious to learn something else, give the Python tutorial a whirl and try Flask for the web stuff.

I quite like the look of [Flask](http://flask.pocoo.org/), I might give it a go.