---
layout: post
title: Tidy up Google Reader
---

I'm mostly a fan of Google's new styling but it just doesn't work for me in Reader. I use Reader every day on my work machine and I'm deeply worried about the current buzz on the interwebs about its bleak future.

In the mean time, I've installed the [User CSS](http://code.grid.in.th/) Safari extension and have tweaked Reader's look to give me back that all important vertical space with the following:

    #viewer-header
    {
      height:40px !important;
    }
    
    #lhn-add-subscription-section
    {
      height:40px !important;
    }

    #top-bar
    {
      display:none;
    }

it's a bit of a hack, but it works for me!

Edit: for the anti-+ crowd, add this bit to drop the +1 button:

    .item-plusone {display:none !important;}