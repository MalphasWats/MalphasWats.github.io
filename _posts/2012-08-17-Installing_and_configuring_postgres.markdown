---
layout: post
title: Installing and configuring PostgreSQL
---

#{{ page.title }}

I've tried quite a few times to get PostgreSQL up and running on my system. I've read plenty about how it's 'better' than MySQL. Although I've not been convinced by that, purely the fact that I *couldn't* install it was irritating me enough to give it another go.

For the first part, I was mostly able to follow the [Ubuntu PostgreSQL documentation][1].

First, I installed it:

    $ sudo aptitude install postgresql
    
then I connected using the `postgres` default user:

    $ sudo -u postgres psql template1
    
created a password for the `postgres` user and quit:

    template1=# \password postgres
    template1=# \q
	
I like to be able to administer my databases under my own username, so next I created a user for me, gave it a password and created a database:

    $ sudo -u postgres createuser --superuser myusername
    $ sudo -u postgres psql
	
    postgres=# \password myusername
    postgres=# \q
    
    $ createdb myusername

with these changes and the default `Authentication` configuration, PostgreSQL is now configured to now accept my linux user as a valid user, all I need to do is type `psql` at the command prompt and I'm away.

Next I wanted to be able to connect to databases within Python scripts. I also wanted to have a separate user for doing that, most likely a separate user per application.
`psycopg2` appears to be the most prolific Python package for working with PostgreSQL. Installing it was unfortunately not as easy as `pip install psycopg2`, but it almost was. Searching for the error I got pointed me straight at a Stack Overflow answer for [how to install psycopg2 with pip on python][2]. I'm not sure how the world got anything done before Stack Overflow.

    $ sudo aptitude install libpq-dev python-dev
    $ sudo pip install psycopg2

That worked fine, allowing me to write a quick test in Python:

    #!python
    import psycopg2
    
    DSN = "dbname=myusername"
    
    conn = psycopg2.connect(DSN)
    curs = conn.cursor()
    curs.execute("SELECT * from test")
    print curs.fetchall()
    
    conn.close()
    
I had already created a `test` table with `psql`. I then tested running the script as a different user:

    $ sudo python postgres_test.py

as expected, it didn't work; There is no user `root` in PostgreSQL. Creating a new user for my application was almost as straightforward as creating my own user, with one extra bit at the end:
    
    $ createuser myapp
    Shall the new role be a superuser? (y/n) n
    Shall the new role be allowed to create databases? (y/n) n
    Shall the new role be allowed to create more new roles? (y/n) n
    $ createdb myapp
    $ psql
    
    myusername=# \password myapp
    myusername=# ALTER DATABASE myapp OWNER TO myapp
    
The last line changes the owner of the `myapp` database to belong to the `myapp` user, that way only that user has any access to it, and nothing else. There's probably a better way to do this, but this worked for me!

To test, I connected to the database as the `myapp` user to check that everything was working:

    $ psql -U myapp
    psql: FATAL:  Ident authentication failed for user "myapp"

Hmm. I then remembered from my previous excursions that there's a configuration file for PostgreSQL that needs monkeying with. I found mine in `/etc/postgresql/8.4/main/pg_hba.conf`

    $ sudo nano /etc/postgresql/8.4/main/pg_hba.conf
    
There's a lot of comment-documentation in the file. By default, it only lets in linux users, so I could have created a new linux user `myapp` and run `psql` as that user (as I had been above as the `postgres` user). I didn't want to do that though.

Initially, I added a line to the file:

    # Database administrative login by UNIX sockets
    local   all         postgres                          ident
    
    # TYPE  DATABASE    USER        CIDR-ADDRESS          METHOD
    
    # "local" is for Unix domain socket connections only
    local   all         all                               ident
    local   myapp       myapp                             password
    
but it didn't work, then I realised that PostgreSQL takes the rules in order and stops processing when it finds one that matches, the line above matches **all** users, so my line would need to go above it:

    # "local" is for Unix domain socket connections only
    local   myapp       myapp                             password
    local   all         all                               ident
    
test again:

    $ psql -U myapp
    Password for user myapp: 
    
perfect.

I could use my new user and database in python by changing the `DSN` string:

    #!python
    DSN = "dbname=myapp user=myapp password=secret"
    
All working! Next I should probably get my head around SQLAlchemy.

I'm not really sure why I struggled so much in my past tries with PostgreSQL, I think I hadn't quite gotten my head around how it dealt with users, and more than likely I made the same mistake in the `pg_hba.conf` file but never noticed. It's the kind of thing I do all the time!

[1]: http://help.ubuntu.com/community/PostgreSQL
[2]: http://stackoverflow.com/questions/5420789/how-to-install-psycopg2-with-pip-on-python