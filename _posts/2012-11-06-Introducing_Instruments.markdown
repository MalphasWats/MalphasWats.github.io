---
layout: post
title: Introducing Instruments
---

#{{ page.title }}

I've been working on Instruments for some time now. Since I first wrote pyDimension, I've bolted on an interface for my web stats tracking app and a custom bookmarking app but it was all done rather clumsily.

Instruments is a Flask application skeleton that simply provides a login form and authenticates against a database. Functionality, such as a static blog generator or the aforementioned web stats and bookmarking can then be added as 'blueprints' which Instruments will load in at start up.

[Instruments is available on GitHub](https://github.com/MalphasWats/instruments)

along with 3 plug-in 'blueprints':

- [Pulse - Simple Web Stats](https://github.com/MalphasWats/pulse)
- [subMarks - Bookmarking](https://github.com/MalphasWats/subMarks)
- [Electrostatic - Static blog generator](https://github.com/MalphasWats/electrostatic)

Electrostatic is heavily based on my former system [pyDimension](https://github.com/MalphasWats/pyDimension), which is being retired now.

The primary purpose of Instruments is to provide a single place for login management. It's not quite as robust as I'd like it to be (it's as good as any I've ever made before), but the central codebase means that any improvements I make get reflected everywhere it's used.

There's still a fair bit to do (documentation!!), but I'm really pleased with it so far.