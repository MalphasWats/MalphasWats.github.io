---
layout: post
title: Adventures in WebGL
date: 2015-01-26 12:50
---

Back in October [I mentioned][POST] that I was looking at learning WebGL. I finally managed to find some time to do it this month
and have made some pleasing progress.

My plan was to start off creating a simple 2D framework to replace [jaws.js][JAWS]. I've been using this framework since I started
playing around making games and I really like its simplicity, but I was butting up against its performance. Since it had a load of
stuff in it I'm probably never going to use, rolling my own seemed like a good idea.

My [first attempt][GLIXL_TEST] was very disappointing from the performance point of view.

[I asked for help][STACKOVERFLOW]. I was doing so very little with my demo that I couldn't understand why the performance was so poor.
I got some pointers and was able to make some changes. Basically, you can't do lots of `buffer\push\draw` operations very fast in WebGL.
You have to break them down so that you're buffering a whole load of points into memory then drawing them all at once. [I was able to get][SPRITEBUCKET]
much better performance by creating a `SpriteBucket`. drawing ~500 sprites at a time appeared to give me the best balance, 
giving me >10,000 sprites @ 60fps.

On the whole, I was unprepared for how delicate the balance was between getting reasonable drawing rate and not. I naively thought that
WebGL was a super powerhouse of graphics processing and I would only start to have problems when I started trying to do stupid things. I
suppose you could argue that plastering 5000+ sprites on the screen at once and redrawing everything constantly is stupid, but my 
[LD30 game][LD30] had tilemaps and monsters that could have potentially approached this and it didn't run very well.

With a few obvious tweaks like not bothering to draw stuff off screen (duh!) and only updating vertices and texture coordinates if something
has actually changed I saw immediate improvements. The less obvious (to me at the time) stuff, like buffering batches of sprites for a
single draw call made the biggest difference.

## Introducing Glixl

The end product from my dalliances this month was [Glixl][GLIXL]. Glixl can create sprite and tile maps from 2D sprite sheets. It goes
pretty fast if you pay attention to what's being drawn, although there are still areas I can improve. My intention is to use this for
my games from now on, so I'll be developing it as I go, adding features that I need. Some things that I still need to work on:

* Mouse & Touch controls
* Tilemap path finding
* Animated tiles

and I need to improve the SpriteBucket object as it has a few things I feel are hacky. Overall though, it does exactly what I want it to do.

I've started making a simple game, [Dojo Master][DOJOMASTER]. to test it too, which is working out quite nicely. So far I only had to [add 1 feature][CFC7691] to get it working.

[Dojo Master][DOJOMASTER].




[POST]: http://www.subdimension.co.uk/2014/10/21/webgl.html
[JAWS]: http://jawsjs.com/
[GLIXL_TEST]: http://games.subdimension.co.uk/webgl/unoptimized.html
[SPRITEBUCKET]: http://games.subdimension.co.uk/webgl/optimized.html
[STACKOVERFLOW]: http://stackoverflow.com/questions/27905214/why-is-my-simple-webgl-demo-so-slow
[LD30]: http://games.subdimension.co.uk/LD30/
[GLIXL]: https://github.com/MalphasWats/glixl
[CFC7691]: https://github.com/MalphasWats/glixl/commit/cfc7691f49d6a4b3d2efb2d35dd22b1b834ac1e0
[DOJOMASTER]: http://games.subdimension.co.uk/DojoMaster/