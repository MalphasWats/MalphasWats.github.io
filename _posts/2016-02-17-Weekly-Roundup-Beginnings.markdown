---
layout: post
title: Weekly Roundup - Beginnings
date: 2016-06-17 09:00
---

I want to try something new (new here anyway). I'm going to try and write a blog post at least each week with a list of all the stuff I have created. I create a lot of things during the course of a week, usually stuff related to my actual job, but often there's stuff in there that's interesting in one way or another.

## RPG

[RPG][RPG] (working title!) is a simple game I'm using to allow me to develop [Glixl, my WebGL pixel engine][GLIXL].

I've been working on it for a while, but this week I finally created the [GitHub Repo][RPGREPO].

The primary highlight of this is the pseudo-depth - You can walk the wizard around with the WASD keys and he'll go *behind* stuff like the trees. This week I also ported my A-Star pathfinding code from [JawsJS][JAWS], but still need to actually use it to control the wizard.

[RPG]: http://www.subdimension.co.uk/RPG/
[GLIXL]: https://github.com/MalphasWats/glixl
[RPGREPO]: https://github.com/MalphasWats/RPG
[JAWS]: [JAWS]: http://jawsjs.com/

## Pixel Palette

Since creating my [pixel palette][PALETTE] (almost a year ago! Wow!), I still feel like it's working ok. I read an [update post from eevee][EEVEE] that mentioned using the [DB32 palette][DB32] (which oddly I'd not seen before, even though DB16 was the inspiration for my own palette!). There was a reply in the DB32 thread where someone had produced all of the dithers for the palette, which I thought was a really cool idea. I started doing it for my own palette (which I realise now needs a name).

![Palette Dithers](/files/2016-06-17-Weekly-Roundup-Beginnings/palette_dithers.png)

It looked cool and developed my colour knowledge a little but I'm not completely sure how practical it will be. I usually work on such a small scale anyway that dithering doesn't really work, but it might come in handy for some larger scale works, particularly for shading and highlights.

Eevee's post also turned me on to [Aseprite][ASEPRITE], which is a really nice little pixel editor. What I like was that it's available for Windows and Mac (and Linux), which means I could have the same tool on my work machine and home machine. I've played with the trial a little so far and it seems to work quite nicely.

[PALETTE]: http://www.subdimension.co.uk/2015/06/26/pixel-palette.html
[EEVEE]: https://eev.ee/dev/2016/04/25/weekly-roundup-pixel-perfect/
[ASEPRITE]: http://www.aseprite.org/
[DB32]: http://pixeljoint.com/forum/forum_posts.asp?TID=16247

## Lesson Projects

My day job is Teaching. I create a *lot* of resources for various things. I created a site using GitHub Pages to put my lesson objective slides on, my goal was to have a simple template I could fill in which I could easily share with my colleagues.

I took this a little further last week and started putting all my little projects online in a single format on my [Lessons Site][LESSONS].

So far I just have 4 lessons that some of my students are working through this term. The Stop Motion one needs more content for actually putting the movie together. It's been quite helpful to have these in an 'agnostic' format.

[LESSONS]: http://lessons.subdimension.co.uk/projects.html