---
layout: post
title: Object Lesson
date: 2016-07-08 14:00 -0100
---

## RPG

This week in [RPG][RPG] I refactored the movement code from last week, creating 2 classes - one for `Mob`s and one for the `Player`. The `Player` class has no special functionality at all beyond what it inherits from the `Mob` **yet**. This gave me an opportunity to revisit some [code I wrote a long time ago][ROUGE]. When I knew *nothing* about javascript, I had some Mob and Player classes but the inheritance was borked. Back then, I solved this by simply copy-and-pasting the constructor from Mob into Player. [Now I know better][SO]. I've seen `extend()` functions during my brief flirtation with javascript frameworks in the past, but I didn't really understand what was going on or where they came from. [Now I do][RPGREPO]!

Once I had things refactored and nice and neat, I made the Orc a Mob and gave him some very rudimentary intelligence. If you get too close, he'll chase you! *So awesome*.

Next up I need to implement some special generator tiles that you can click on to 'harvest'. Probably need some kind of inventory too, which is a whole other kettle of fish.

[RPG]: http://www.subdimension.co.uk/RPG/
[GLIXL]: https://github.com/MalphasWats/glixl
[RPGREPO]: https://github.com/MalphasWats/RPG
[ROUGE]: https://github.com/MalphasWats/Rouge
[SO]: http://stackoverflow.com/questions/4152931/javascript-inheritance-call-super-constructor-or-use-prototype-chain


## Meatspace

I found my way back to the gym this week for some swimming. Aren't I a good boy.