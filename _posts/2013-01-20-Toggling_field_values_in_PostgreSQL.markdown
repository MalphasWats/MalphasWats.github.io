---
layout: post
title: Toggling field values in PostgreSQL
---

#{{ page.title }}

It's important to me that each time I do something new, I move forward with knowledge of the technologies I'm using.

This weekend I created [Ticks](https://github.com/MalphasWats/ticks), a super simple TODO list. I needed a way to toggle a task between complete and incomplete. This status is stored simply as a timestamp field. If the field is `NULL` then the task is incomplete, otherwise, it was completed on the date stored.

    UPDATE ticks
    SET completed = 
        CASE
            WHEN completed IS NULL THEN CURRENT_TIMESTAMP
            ELSE NULL
        END
    WHERE task_id=%s;

Nice and simple, with just 1 query.