---
layout: post
title: Weekly Update
date: 2019-03-29 15:33:25
---

My new boards arrived! 

This week I have been mostly soldering my new [Glyph][GLYPH] console together.

![Glyph][GLYPHIMG]

<!--more-->

## Glyph

New boards arrived for the *Glyph* this week. This was my first attempt at designing a fully surface mount board. Probably the most challenging part, and the bit I was most worried about was the display. I had to make a custom footprint for the ribbon cable and was a bit nervous about how well it would reflow with a hot air gun.

Turns out, I probably shouldn't use hot air for soldering these ribbon cables. I had a lot of issues where the solder just seemed to pool together under the ribbon, shorting a bunch of pins together. After I retried with a soldering iron, it worked fine.

Another issue I had was with the 20MHz crystal. Turns out I was actually sent a 3.3M ohm resistor in a package that was roughly the same size as the crystal. Because I'd only used the big oval through-hole crystals before, I didn't realise. I had to use my *Emergency Clock* sketch on a dusty Arduino in order to recover the clock fuses so I could run it with the 8Mhz internal oscillator.

I've since been able to replace the resistor with a proper 20MHz crystal and now it works! Technically I'm overclocking the ATMega1284P because it is only supposed to run at 20MHz with 5v and I'm running at 3.3v but it seems to be ok.

I posted a [Twitter thread][TWIT] with lots of photos of the build process.

## Case

I tried making a basic case for the *Spike* but I struggled because it ended up being a giant game of "move this hole left half a millimeter", "does that fit around that capacitor?", "move that hole over a bit".

This time I was *clever*. I designed the board outline in OpenSCAD and at the same time I defined areas where all the components could go:

![Open SCAD][OPENSCAD]

Then I imported the resulting .dxf file onto one of the user layers in KiCAD:

![KiCAD][KICAD]

This allowed me to place components in known areas so that when I made a case, I'd know where to make voids.

The basic case is just 2 slices of acrylic cut on a laser cutter and screwed together with nylon bolts, but with the OpenSCAD files I made as a base, I could make a nice 3D printed one too in the future.

## Argon

[Argon][ARGON] is the first game I've ported to the *Glyph*. It works really well and looks great on the 1.3" OLED.

I made the little LEDs brighten as the ships weapon gets hotter. I'd like to add a few more effects to that too - maybe a glow or flash when it overheats and stops shooting.

I'd also like to expand the game element to include some bosses and the *dreaded music*.


## What's next?

So, next I want to create some more games and port over all the *Spike* games I made. I also want to try and get my Isometric demo working to see if the extra 4MHz of processing makes much difference to the performance.

I want to make a better case that encloses the battery a bit better too.


[GLYPH]: https://github.com/MalphasWats/Glyph
[GLYPHIMG]: http://www.subdimension.co.uk/files/2019-03-28-Weekly-Update-Glyph/glyph.jpeg
[OPENSCAD]: http://www.subdimension.co.uk/files/2019-03-28-Weekly-Update-Glyph/openscad.png
[KICAD]: http://www.subdimension.co.uk/files/2019-03-28-Weekly-Update-Glyph/kicad.png
[ARGON]: https://github.com/MalphasWats/Argon
[TWIT]: https://twitter.com/MalphasWats/status/1109187979317334016
