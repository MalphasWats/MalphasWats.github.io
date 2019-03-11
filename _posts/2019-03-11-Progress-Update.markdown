---
layout: post
title: Dev Log (Feb-March)
date: 2019-03-11 11:54:26
---

I'm going to try and post about what I've been doing a little more regularly again. So here's the first one of those.

## Glyph Handheld Game Console

The [current iteration is the GLYPH][GLYPH]. In this version I've moved entirely to surface mount components, including the screen. I've also dispensed with the cartridge idea for now in order to simplify the device overall and reduce the component cost (the PCB connector was around £5, which made it the second most expensive component after the screen!). Getting rid of the OLED breakout board also allowed me to use a larger display without changing the overall size of the console.

I think the *Glyph* will likely be the final name, although I do have some plans to change some of the things under the hood. At some point I'd like to include a USB controller that allows games to be flashed as a Mass Storage class USB device. Currently the USB port is only used for charging.

I would also like to migrate to an ARM-based MCU at some point, which was originally why I had the interchangeable cartridges on the Spike, but added more complexity to the build than I wanted to manage.

 ![Glyph][GLYPHIMG]

This week I completed designing the new board and sent it off to be fabricated.

## Glyph-ISP

 ![Glyph-isp][ISPIMG]

As noted above, I want to include USB Mass Storage programming on the Glyph. I didn't want to add a bunch of components to the board before I knew what I was actually doing so I started designing a standalone programmer based on the ATMega16u4 controller. I realised creating the 3D image of it for this post that I need to move the components that are on the back onto the front and make the board a little bit bigger because it looks weird and awkward with a few capacitors sticking out the back! So that'll go back to the drawing board before I send it off to the Fab.

## Games

I did a huge rework of the way I structure the code in my games. [I learnt how to use VPATH in makefiles][VPATH] so I can have just 1 copy of my library for the Spike hardware. Y'know, how things *should* be done.

 ![BattleBeasts][BEASTSIMG]

I made a title screen for a new game concept - it's awful, but *less* awful than usual, and I was quite pleased with it. The game uses a cool trick to generate random 'beasts' to train and battle. It's a cross between Tamagotchi and Pokemon, or something. I haven't really gotten very far.

As far as games go, I'm building quite the library of almost finished games. Currently in progress are: [BattleBeasts][BEASTS], [Lamplight][LAMP] and [Spore][SPORE], although that last one is a little neglected lately.


[GLYPH]: https://github.com/MalphasWats/Glyph
[GLPYHIMG]: http://www.subdimension.co.uk/files/2019-03-11-Progress-Update/glyph.png
[ISPIMG]: http://www.subdimension.co.uk/files/2019-03-11-Progress-Update/isp.png
[VPATH]: https://www.avrfreaks.net/forum/noob-question-using-i-organise-my-libraries
[BEASTSIMG]: http://www.subdimension.co.uk/files/2019-03-11-Progress-Update/beasts.png
[BEASTS]: https://github.com/MalphasWats/BattleBeasts
[LAMP]: https://github.com/MalphasWats/Lamplight
[SPORE]: https://github.com/MalphasWats/Spore
