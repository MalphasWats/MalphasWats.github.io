---
layout: post
title: RSS Sync Service
---

*I wrote this post back in 2011, I felt the need to write [an update](http://www.subdimension.co.uk/2013/03/14/RSS_Sync_and_Google_Reader.html) today in 2013, can't think why...*

I've been following the recent chatter regarding Google Reader and it's possible demise. I use Google Reader every day, either with the web app from my laptop or with [Byline][1] on my iPhone and iPad.

I came across Brent Simmons' post on [IMAP syncing][2] (which I agree wouldn't work), which lead to his post from a while ago that gives a [basic specification for an RSS sync system][3] which I think is a start, although would need some tweaking (in particular, I believe a sync system *does* need to read and store the feeds; most feeds only keep x number of articles, so if I didn't sync my client regularly enough, I might miss articles on 'busier' sites).

I've been thinking about putting together a solution to this 'problem' (I say 'problem' because I'm not yet fully convinced that Google is just going to drop Reader.) but I do agree that choice is always a good thing. I've even seen a few people say they'd be willing to pay for a good service.

My biggest problem though, and one of the main reasons I'm holding off at the moment is that none of the existing RSS clients make it easy for me to test any system I might create, meaning I'd have to make my own client (that and I've very recently been blessed with a Son, also why staticDimension has been a bit, well, static recently!).

I can probably put a web-based RSS reader client together, but it's a lot of work and it will almost certainly be really bad to start with, which will quickly sap all of my enthusiasm - I use my iPhone and iPad to read news stuff *way* more than I use my laptop.

Another issue I've wrestled with is do I try to copy the Google Reader API, or design my own.

Implementing an API that works the same as Reader makes it much easier for client developers to support a new sync service but it's poorly documented and I'm not overly keen on it.

I don't like the prospect of not having a way to sync my news feeds, and whilst I'm probably capable of building a new one, I'm still stuck with a clunky web app (which I haven't even built yet) if I actually wanted to use it...

[1]: http://phantomfish.com/byline.html
[2]: http://inessential.com/2011/11/17/how_about_imap_for_rss_syncing_
[3]: http://inessential.com/2010/02/08/idea_for_alternative_rss_syncing_system