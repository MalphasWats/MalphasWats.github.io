---
layout: post
title: Object Lesson
date: 2016-07-09 11:00 -0100
---

## RPG

This week in [RPG][RPG] I refactored the movement code from last week, creating 2 classes - one for `Mob`s and one for the `Player`. The `Player` class has no special functionality at all beyond what it inherits from the `Mob` **yet**. This gave me an opportunity to revisit some [code I wrote a long time ago][ROUGE]. When I knew *nothing* about javascript, I had some Mob and Player classes but the inheritance was borked. Back then, I solved this by simply copy-and-pasting the constructor from Mob into Player. [Now I know better][SO]. I've seen `extend()` functions during my brief flirtation with javascript frameworks in the past, but I didn't really understand what was going on or where they came from. [Now I do][RPGREPO]!

Once I had things refactored and nice and neat, I made the Orc a Mob and gave him some very rudimentary intelligence. If you get too close, he'll chase you! *So awesome*.

Next up I need to implement some special generator tiles that you can click on to 'harvest'. Probably need some kind of inventory too, which is a whole other kettle of fish.

I also ended up spelunking in the rabbit hole of creating some lighting effects.
I realised that any self-respecting RPG/survival horror game needs a day/night cycle.

I was able to make *night*, with a pretty simple change to the fragment shader,
although actually passing the value in from javascript is a little more involved.
creating independent light sources looks a little trickier though.

This spelunking also lead me to realise that I made a pretty stupid and large mistake
with my depth code. I wrote some fairly funky-gymnastics-type-code in order to render
different levels of the tilemap in a different order. What I realised is that I'm working
with a graphics system designed for 3D rendering. All I really need to do is stop
rendering *everything* at the same z-coordinate (I wanted it flat!!!), and the '3d-ness' 
will take care of itself!

I wrote the original code for glixl over a year ago now, so I've forgotten most of what
I learnt about WebGL. I'll have a stab at re-writing things when I get some time to myself.


[RPG]: http://www.subdimension.co.uk/RPG/
[GLIXL]: https://github.com/MalphasWats/glixl
[RPGREPO]: https://github.com/MalphasWats/RPG
[ROUGE]: https://github.com/MalphasWats/Rouge
[SO]: http://stackoverflow.com/questions/4152931/javascript-inheritance-call-super-constructor-or-use-prototype-chain

## Pixel Art

I didn't do any pixelling this week as I ended up quite busy. I did however justify
all the time I spent on my little band when I came up with a great 1-shot lesson
for a year 7 group I have using Scratch to create little bands and animate them.

I've noticed that this happens quite a lot - I play around with something interesting
and after a couple of weeks it seeps into my teaching, making my lessons more fun.

At least, that's how I'll justify my procrastination when the OFSTED Inquisitors come
knocking...

## Meatspace

I found my way back to the gym this week for some swimming. Aren't I a good boy.