---
layout: post
title: Syncing Dropbox on Linux
---

#{{ page.title }}

My new design was triggered by a server move; I needed a new server that isn't sat in my [downstairs cupboard](/2010/01/07/New_Server.html).

I wanted to try developing on my iPad, and I needed a way to make sure everything stayed in sync, so I decided to keep everything in Dropbox and keep it in sync across all of my machines.

I used the [Text Based Linux Install instructions](http://www.dropboxwiki.com/Text_Based_Linux_Install) to sync my Dropbox to my server.

I then used a symbolic link to point my website root into my dropbox projects folder, along with a bit of chmod/chown foo to make sure most things were only accessible to me, and the website was accessible to the php user and it was all good to go.

Not an advisable solution if you're running an important-must-never-go-down kind of website. Any changes made are reflected almost immediately on the live server, but since I'm not exactly running Facebook here, I can tolerate the odd mistake.