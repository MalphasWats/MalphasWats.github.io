---
layout: post
title: Spike: Next-Gen Portable Gaming
date: 2019-01-16 10:26:46
---

![Spike][SPIKE_ASSEMBLED]

Previously [I wrote about the Mage][MAGE]. I've been very busy since then, but terrible at writing about it here.

After playing around with the Mage for a while, I realised that the limits of the ATTiny85 were a lot harder to work with than I was expecting. 8Kb of program space got eaten up by maps and tile data really fast. Even simple game mechanics took way more code space than I expected.

I needed a new microcontroller.

<!--more-->

I pretty much 'completed' the "Mage Game" RPG demo but it didn't look anything like I had imagined once I ran out of space for new areas. I also had to abandon my idea of randomly generating dungeon maps because I just couldn't fit it into the 512bytes of RAM.

And so I decided to find a new microcontroller.

It was a lot harder than I expected. Obviously I needed something with more resources. My problem was that if I was redesigning the whole thing I should probably use something a little more modern. I wanted to use something with an ARM M0 core but I have no experience with working with those and don't have the tools to program them. So I thought about using the ATMega1284p but because I wanted something small, and I was intimidated by the the SMD packaged version I felt like I was stuck. I kept oscillating between learning a whole new ecosystem and sticking with something I was comfortable with.

![Spike Bits][SPIKE_KNOLLED]

One of the things I'd wanted to do was store games on an SD card so I could swap them in and out at will. It occurred to me that for the cost of an SD card I could pretty much have a whole microcontroller AND solve my problem of which one to choose by not having to choose at all!

I reworked the whole concept to move the microcontroller off onto a separate 'cartridge' (I call them *Shards*, because I can). The screen, buttons, battery & speaker could all sit on one board and the *Shard* could plug in to make it work. It took a couple of iterations to get right; finding the right connector took some searching and I even had to make my own custom PCB footprint for it.

Most importantly: it works. I am currently using an ATMega1284p, I had a go at soldering the SMD version by hand and only messed the first one up a little bit (the second one worked first time!). Once I've reached its limits, I can make a new *Shard* with whatever flavour of ARM I like on it and simply plug it in!

I've been working on a tribute to the Alien Breed game from the Amiga as my first proper *Spike* game:

<video controls>
    <source src="http://www.subdimension.co.uk/files/2019-01-16-spike-next-gen/spike-video.mp4"
            type="video/mp4">

    Sorry, your browser doesn't support embedded videos.
</video>

And actually since I made this video I've done a lot more work on it, but that's for another post.

## Repositories

[Spike main board and shards][SPIKE_GITHUB]

[Spike Game Template][GAME_TEMPLATE]

[Spore - top-down shooter][SPORE_GITHUB]

## What's next?

I need to port the Mage Game over to *Spike* (and think of a proper name).

I'm not completely satisfied with the *Spike* part (and I've gone off the name a bit since I made it :().

I am completely over clicky tactile buttons. I've found some alternatives that I'm going to try in a new revision at some point.

I'm not sure about the screen breakout board - it's been fantastic for prototyping and development because it just plugs in, but I think working with a bare panel might make it look more 'professional'.

I originally connected the battery to the *Shard* connector with the view that I might need it for something, but I took it off in an earlier version that used a different connector with fewer pins because I didn't have enough. I wish I'd put it back in when I changed the connector so I could use it to monitor the battery level.

Surface mount all the things. I need to buy new tools for that though, so I'm going to hold off on that.

**SOUND**! Sound is a huge thorn in my side for this project and I desperately wish I knew someone who could help. I can make simple tones using PWM and because they use timers, they use virtually no CPU time. Music, polyphony and sound effects are completely beyond my capability. The few tries I have made to make a wavetable synth on this hardware have failed or at best used pretty much the entire processor bandwidth just to make a simple noise. I think I need a discrete sound device, which feels like a *whole* other project on its own.

All that said, pretty much this whole project was far beyond my understanding when I started, so there's hope.

## The lost variant

When I redesigned the *Mage* I wanted to include a colour screen. The first version of *Spike* had a 128x128 Colour OLED display. I had the boards made and assembled one. I had some trouble getting the screen to initialise at first, eventually it worked though and I wrote a program to quickly fill the screen with a colour, simply starting at 0 and adding 1 each frame.

With not-very-optimal code I managed 4 frames per second. I was really disappointed. I worked out that with some code optimisation and reworking the *Shard* to use hardware SPI instead of bitbanging, I *might* get it as far as 12fps. Even using hardware SPI though, the processor would have been working flat out to do it. The current version does use hardware SPI and I'm thinking about trying a 96x64 colour OLED at some point, but for now I'm happy with the monochrome version although I'd like it a little larger.

The colour version still [exists in a branch][COLOUR_SPIKE] of the main repo, but it's no longer actively developed.


[SPIKE_ASSEMBLED]: http://www.subdimension.co.uk/files/2019-01-16-spike-next-gen/spike.jpeg
[MAGE]: http://www.subdimension.co.uk/2018/06/07/Mage.html
[SPIKE_KNOLLED]: http://www.subdimension.co.uk/files/2019-01-16-spike-next-gen/knolled.jpeg
[SPIKE_GITHUB]: https://github.com/MalphasWats/Spike
[SPORE_GITHUB]: https://github.com/MalphasWats/Spore
[GAME_TEMPLATE]: https://github.com/MalphasWats/spike-game-template
[COLOUR_SPIKE]: https://github.com/MalphasWats/Spike/tree/Colour-oled-shard
