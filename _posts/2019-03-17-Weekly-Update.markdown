---
layout: post
title: Weekly Update
date: 2019-03-17 22:33:45
---

This week I wrote a lot of code and ended up right back where I started.

![Spore][SPORETITLE]

<!--more-->

## Animation

I wanted to spend some time working on a sprite animation 'engine' for *Spike*. I have a game that already has the sprite data for simple walk animations, [Spore][SPORE], but I've never actually coded them in.

## Spore

Annoyingly, I haven't worked on *Spore* for a while, which meant it was about 3 versions of the hardware library behind and wasn't using the tilemap library at all. At first I thought it would be a fairly simple change to switch it over.

It wasn't. I think I spent about 6 or 7 hours in total refactoring various bits of it. I updated it to use the new structure I developed on [Asteroids][ASTEROIDS], and then improved on in [Argon][ARGON] (and just realised I need to port *back* into *Asteroids*) ::rolleyes::.

So after a weekend of work, I'm back where I started, but I'm in a better position overall.

## BattleBeasts

I rewrote my scaling code to be a generic nearest-neighbour function so I can make whatever stuff I want bigger. I'll probably move it out into a new library at some point.

## Glyph-ISP

I spent some time earlier this week reworking the board for my USB-ISP thing to put all the components on the top and add a nice logo. I sent it off to the fab too, so hopefully that will be on its way soon.

## What's next?

So I think this coming week I want to try and work on the animation thing in *Spore* and I'm hoping the boards for the *Glyph* will arrive too. I still need to order the SMD components for that because I only have through-hole in my component boxes!


[SPORETITLE]: http://www.subdimension.co.uk/files/2019-03-17-Weekly-Update/spore-title.png
[SPORE]: https://github.com/MalphasWats/Spore
[ASTEROIDS]: https://github.com/MalphasWats/Asteroids
[ARGON]: https://github.com/MalphasWats/Argon
