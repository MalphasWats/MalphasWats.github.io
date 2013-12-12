---
layout: post
title: Variable method parameter defaults in Python
---

[Pulse](https://github.com/MalphasWats/pulse) is my very simple web stats tracker. A bit like Google Analytics, but without all the Google (and most of the features). I only really cared about the referrer information; it's nice to know who is linking to you.

I had a method that looked like this:

    def get_visit_total_between(start_date='2012-08-29', end_date=datetime.date.today().strftime('%Y-%m-%d 23:59:59')):
    # query database for visits between dates.

`start_date` was set to a date just before I created Pulse and in the absence of an end date, it chose the end of the current day. I called it like this:

    today = datetime.date.today()
    visits_today = get_visit_total_between(today.strftime('%Y-%m-%d'))

`get_visit_total_between()` would then use its default value of 'end of today' to work out when the `end_date` was. At least, that was my intention.

It's probably well documented, but it's the first time I have come across the issue. The method `get_visit_total_between` is created when the python module first runs. This method would work fine in almost any other usecase to the one I applied it - running as part of a Flask web app.

I use `mod_wsgi` and Apache to run my Flask apps, which means an instance of the app is created when Apache starts up and then left to do its thing, the same bit of Python code can be sat running for weeks. That meant that my default `end_date` was set to whenever the server was started and never changed again!

The infuriating thing was that it all worked fine for the rest of the day. Once the clock ticked over to the next day though, my query was looking for dates greater than the beginning of today, but less than yesterday. I was damn lucky not to rip a hole in the space-time continuum or something! Any time I restarted the server, or ran a local development server with debugging stuff spewing out everywhere, everything worked fine again. That was, until the next day, when it all stopped.

It took me ages to realise that the method was being created at first run with a fixed default value, instead of evaluating that default at each call.