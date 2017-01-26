---
layout: post
title: glixl, pyxel and pixels
date: 2017-01-26 12:19:34
---
I had a long period off over the summer, then, after I went back to work, I was busily doing things that were barely even worth doing in the first place, let alone writing about. By which time I was well out of the habit of writing at all.

Most recently, I have been working on my OpenGL-based pixel engine, in the form of my test game [RPG][RPGRepo] which is [playable here][RPG].

I did quite a lot to it, including adding (slightly rubbish) lights and finally got the whole 'depth' thing working properly (please, no-one ever go back and look at how I did it previously). I also reworked the framework itself, making some changes to the way you actually go about making games; making much better use of javascript classes and namespaces and whatever.

Prior to these updates, I tried my hand at [porting the whole thing to Python3][pyxel]! Which met with some success, including a TK-based canvas version, before seeing sense and moving to OpenGL. It all came crashing down following a single throwaway comment given after I showed someone. They pointed out that the application icon was missing (of which I was aware of course). "No matter" I thought, I'm sure it's easy to change it.

[It wasn't][GLUT], and thus followed about 3 days of trying to install various python GUI frameworks, **all** of which appeared to have a dependency list longer than my framework code so dead were any hopes of ever actually distributing my games to anyone *normal*.

And so I returned to the warm embrace of WebGL and Javascript.

I **much** prefer programming in Python, but I get quickly frustrated with how difficult installing simple packages can be, dashing all hope of distribution. I know that various `py2exe` type things exist, but they won't help with the issue where `pyOpenGL` installed without any dlls on my Windows machine, forcing me to copy them across manually and so on and so forth.

I have also begun a fools quest to [build my own mechanical keyboard][mkey]. Pray for my soul.

[RPGRepo]: https://github.com/MalphasWats/RPG 
[RPG]: http://www.subdimension.co.uk/RPG/
[pyxel]: https://github.com/MalphasWats/RPG/tree/pyxel
[GLUT]: http://pyopengl.sourceforge.net/documentation/manual-3.0/index.html#GLUT
[mkey]: http://www.keyboard-layout-editor.com/#/gists/caa96ec2f5e479849ba34381f7ae3ea0