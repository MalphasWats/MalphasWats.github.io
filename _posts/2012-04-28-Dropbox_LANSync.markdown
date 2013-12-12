---
layout: post
title: Dropbox LANSync
---

I had a friendly email from my VPS provider this morning. It had been reported that my server was port scanning other servers and that I needed to do something about it.

My first instinct was to panic: "OMG, I've been hacked and I'm spewing spam from my server, I should never have thought I was ever capable of running these things myself".

This was shortly replaced with "Hmm, that port number looks oddly 'reasonable', it must be something 'friendly'." I took a shot in the dark and Googled "Dropbox port 17500". Hits! Phew!

Dropbox has a nifty feature called LANSync, where it will try to find other machines on your local network and sync with them. It's a clever idea that means you're not forever sending the same files up and down the internet when you use it on multiple machines (and after all, what's the point of Dropbox if not to keep multiple machines in sync!).

I knew about this and had naively thought that it would just get ignored in a VPS environment - I'm a bit ignorant of how it all works really.

Apparently not though. My server has been spamming my VPS neighbours every 30 seconds for the last few weeks. Whoops!

After looking through the documentation I linked in my [post about setting this all up in the first place](http://subdimension.co.uk/2012/04/08/Syncing_Dropbox_on_Linux.html), I noticed a distinct lack of any help with switching off LANSync from the command line - the links they provide are all broken now (nice going!).

Luckily I'd taken the time to install the Dropbox CLI, so I ran it:

    $  ./bin/dropbox.py
    
    Dropbox command-line interface
    
    commands:
    
    Note: use dropbox help <command> to view usage for a specific command.
    
     status       get current status of the dropboxd
     help         provide help
     puburl       get public url of a file in your dropbox
     stop         stop dropboxd
     running      return whether dropbox is running
     start        start dropboxd
     filestatus   get current sync status of one or more files
     ls           list directory contents with current sync status
     autostart    automatically start dropbox at login
     exclude      ignores/excludes a directory from syncing
     lansync      enables or disables LAN sync

Ah hah! Last one looks like the ticket:

    $  ./bin/dropbox.py lansync
    
    enables or disables LAN sync
    dropbox lansync [y/n]
    
    options:
      y  dropbox will use LAN sync (default)
      n  dropbox will not use LAN sync

    $  ./bin/dropbox.py lansync n

hmm, no feedback, always helpful!

I've never really been a belt-and-braces kind of person, but I don't want to get shut down by my VPS provider, so a bit more research turned up [iptables](http://help.ubuntu.com/community/IptablesHow-To) which is installed on all Ubuntu releases.

    $  /sbin/iptables -A OUTPUT -p udp --dport 17500 -j DROP
    $  iptables-save

which should block it from getting out if it ever starts up again. Sorted.