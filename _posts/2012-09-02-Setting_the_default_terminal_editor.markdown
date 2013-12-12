---
layout: post
title: Setting the default terminal editor
---

#{{ page.title }}

I've been playing around with [Heroku][heroku] this week. Heroku uses Git to get code into its little server dynos (Heroku has some of the best jargon).

I'm not very good with Git yet (I still have SVN in my brain), GitHub is great and I've been mostly using its graphical interface for moving stuff up and down. However, I found myself attempting to commit something at the command line and I forgot the all important `-m "commit message"` switch. By default I was thrown into the horror that is Vim. I do my text editing in Nano (I'm not really a Geek). I couldn't even work out how to *exit* vim (apparently you just type `quit`, but I was in typey mode and couldn't work out how I got into it, or how to get back out of it).

[A bit of search-fu][stackoverflow] helped me find a way to declare my Nano fealty:

    $ cd ~
    $ nano .bash_profile
    
    export EDITOR="nano"

Restart my terminal. Ahhh, so much better. I did try to work out where Nano actually lives, but I gave up after a few minutes; Nano just Is.

[heroku]: http://www.heroku.com
[stackoverflow]: http://stackoverflow.com/questions/6435246/trouble-on-setting-the-git-core-editor