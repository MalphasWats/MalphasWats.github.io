---
layout: post
title: PostgreSQL unicode
---

#{{ page.title }}

I was having trouble storing unicode strings in my postgresql database.

DISCLAIMER: I'm still really struggling with Unicode in Python, but I think I got a little closer to understanding today!

When I installed and configured PostgreSQL for the first time, the default setting for character set was `LATIN-1`, which is annoying. I kept running into problems saving bookmarks in [subMarks][SM] when the page titles had unicode characters in them (the *emdash* has a lot to answer for).

In order to fix this, I had to convert my database to `UTF-8`. You can't actually do this though, instead, you have to create a new database, and dump the data into it. Creating a new `UTF-8` database is fairly straightforward:

    $ createdb -E UTF8 -T template0 NEW_DB_NAME

I used [some instructions I found for transferring the data][TURNKEY], however, I didn't drop the cluster and create a new one - I have other databases running and I really couldn't be bothered with all the hassle, I just created a new database and left the old one where it was. Basically, I did this:

    $ pg_dump --blobs --oids OLD_DB_NAME > OLD_DB_NAME.latin1.sql
    $ pg_dump --blobs --oids --encoding=UTF-8 OLD_DB_NAME > OLD_DB_NAME.utf8.sql

then:

    psql --set ON_ERROR_STOP=on NEW_DB_NAME < OLD_DB_NAME.utf8.sql

That all went fine, but the next step was causing me some serious problems: connecting to the database from my python web app.

Since I'm running PostgreSQL 8.4, I couldn't specify the `client_encoding` as part of the DSN, it needs a separate step:

    conn = psycopg2.connect(app.config['DSN'])
    conn.set_client_encoding('UTF8')

But that isn't quite enough. [UTF-8 is not Unicode][UFT8NOTUNICODE] so Python was getting upset with the encoding of the strings it got from the database.

My Googlefu was strong at this point though, I discovered the missing piece in a [bug filing for Django][BUG]. Adding the line:

    psycopg2.extensions.register_type(psycopg2.extensions.UNICODE)

to the top of my database code did the job. You can view the code change in this [commit][COMMIT].

This got me a little closer to finally *getting* Python Unicode!


[SM]: https://github.com/MalphasWats/subMarks
[TURNKEY]: http://www.turnkeylinux.org/blog/postgresql-latin1-utf8
[UFT8NOTUNICODE]: http://stackoverflow.com/questions/10406135/unicodedecodeerror-ascii-codec-cant-decode-byte-0xd1-in-position-2-ordinal
[BUG]: https://code.djangoproject.com/ticket/5171
[COMMIT]: https://github.com/MalphasWats/instruments/commit/3fb715946533e047c06104d22b9cc3bb02dad366