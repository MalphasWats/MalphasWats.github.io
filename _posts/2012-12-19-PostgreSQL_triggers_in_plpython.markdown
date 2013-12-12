---
layout: post
title: PostgreSQL triggers in plpython
---

I wanted to run a query that inserted rows into table B whenever a new row was added to table A.

The first step took quite some time. You have to start off by adding the procedural language you wish to use to the database you're working with. I'm happy with Python, so I chose `plpython`:

    $ psql
    
    # CREATE LANGUAGE plpythonu;

but it didn't like that, I got an error:

    ERROR:  could not access file "$libdir/plpython": No such file or directory

Googling failed me! I couldn't find the answer anywhere. This time, a bit of "aptitude foo" came in useful (I'm running Ubuntu):

    $ aptitude search postgresql

there were a lot of results, but neatly nestled towards the bottom was:

    p   postgresql-plpython-8.4         - PL/Python procedural language for PostgreS

so I installed that:

    $ sudo aptitude install postgresql-plpython-8.4

back to `psql` and try creating the language again:

    # CREATE LANGUAGE plpythonu;
    CREATE LANGUAGE

success!

Next to create the function that I wanted to use in a trigger, I discovered a useful command in `psql`:

    # \e

this pulls up the environment default editor to make writing queries a little less horrible!

    CREATE FUNCTION unread_trigger()
    RETURNS TRIGGER
    AS $$
    qry = plpy.prepare("""INSERT INTO unread_messages
                          SELECT m.message_id, s.user_id
                          FROM messages m
                          JOIN conversation_subscriptions s
                            ON s.conversation_id = m.conversation_id
                          WHERE m.message_id = $1;""", ("INTEGER",))
    res = plpy.execute(qry, (TD['new']['message_id'],))
    $$ LANGUAGE plpythonu;

When you exit the editor and save the temporary file, `psql` executes the query. I'll explain what's going on here in a minute. Another useful command in `psql` lists the functions created:

    # \df

The next step was to add the function as a trigger to my table:

    # CREATE TRIGGER set_unread 
    # AFTER INSERT ON messages 
    # FOR EACH ROW EXECUTE PROCEDURE unread_trigger();

so, every time a row is inserted into the `messages` table, the `unread_trigger()` function is called and inserts a new row in the `unread_messages` table for each user that is subscribed to the conversation that message belongs to. In that function, there is a dictionary called `TD`, this dictionary holds the various values relevant to the event that triggered the function, it's documented in the [PL/Python PostgreSQL docs][PLPYTH].

The [PL/Python language includes a module that allows access to the database: `plpy`][PLPY].

Finally, I didn't get the function right first time. I couldn't work out an easy way to modify a function, so I ended up `DROP`ping and re-`CREATE`ing it:

    DROP TRIGGER set_unread ON messages;
    DROP FUNCTION unread_trigger();

EDIT: I just realised you can use `CREATE OR REPLACE FUNCTION ...` and it will change the function definition, instead of dropping and re-creating it every time!


[PLPYTH]: http://www.postgresql.org/docs/8.4/static/plpython-trigger.html
[PLPY]: http://www.postgresql.org/docs/8.4/static/plpython-database.html