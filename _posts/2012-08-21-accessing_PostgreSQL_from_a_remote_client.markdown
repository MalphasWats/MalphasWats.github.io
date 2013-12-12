---
layout: post
title: accessing PostgreSQL from a remote client
---

Previously I went through the steps I took to install and configure PostgreSQL. I set this up on my web server machine through SSH.

My Mac also has the `psql` client installed on it (out of the box!) but by default PostgreSQL is configured to refuse connections from remote hosts.

Changing this was fairly simple, although I did encounter one gotcha.

First, you need to change the server config file to tell PostgreSQL where to listen, I found mine in `/etc/postgresql/8.4/main/postgresql.conf`, about 3 'screens' down is this line:

    #listen_addresses = 'localhost'         # what IP address(es) to listen on;
                                            # comma-separated list of addresses;
                                            # defaults to 'localhost', '*' = all
                                            # (change requires restart)

I removed the `#` and rather than changing `localhost` to `*`, I entered the external IP of the server. It doesn't really make a lot of difference, but I try to keep things as specific as I can (when I remember).

The last comment was the gotcha. It took me a few round-trips and puzzled stares until I realised that this is the difference between:

    $ sudo /etc/init.d/postgresql reload

and:

    $ sudo /etc/init.d/postgresql restart

for some applications, these are synonyms, but not this one.

our old friend `/etc/postgresql/8.4/main/pg_hba.conf` also needs tweaking to tell PostgreSQL what kind of users to let in:

    # TYPE  DATABASE    USER        CIDR-ADDRESS          METHOD
    
    # "local" is for Unix domain socket connections only
    local   all         all                               ident
    # IPv4 local connections:
    host    all         all         198.51.100.0/32       md5
    #host   all         all         127.0.0.1/32          md5

`198.51.100.0` is my home static IP (it's not actually, but that's where I typed my *actual* IP address) so *only* connections from my home network will be let in. This time, just reloading the config works for these settings:

    $ sudo /etc/init.d/postgresql reload

Now I can connect to my database directly, rather than having to SSH in first. I'm not sure it makes much difference in the grand scheme of things, but it feels neater.