---
layout: post
title: Static Blog - The New "Hello World"
---

I've been thinking about [a comment I read][HNCOMMENT] on an [HN thread][HNTHREAD] introducing a static blogging engine someone had written.

It's difficult to tell the tone the line was written with:

> Are static site generators the new "hello world?"

when reading anything on the internet, one's immediate reaction is usually that the person is criticising or disparaging, sometimes this is even without merit!

I kept thinking about it though. In [April of 2012][pyDimension], I re-wrote my PHP based static blog engine using Python; not because there was anything particularly wrong with the system I had already built and was using, but because I wanted to learn Python.

*"Hello World"* is a deeply dissatisfying first step in learning a language. I remember sitting in the computer lab at my school, aged 13, entering into a BASIC prompt:

    10 PRINT "HELLO WORLD"
    20 GOTO 10

and feeling very foolish when I had to ask someone how to make it stop on the unfamiliar machine I was using! Following that, I was left with the question "What now?"

The great thing about building a static blogging engine is that it touches on most of the fundamentally important aspects of creating a useful application:

- Reading and writing files
- Capturing user input
- Formatting Strings
- Loop and other flow control
- Arrays and other simple data structures
- Incorporating external libraries

You start off (ironically) creating a simple HelloWorld.txt entry and learn how to open the file and read in the contents. Then you start to think about outputting that as HTML, working in templating and markdown libraries, and writing it to a file. And so on.

It's clear from some of the other comments in that thread that some people believe that once there is a good solution for a given problem, there is no merit in creating more. I'd say that [my current static blogging engine][INSTRUMENTS] is a long way from the best option, but I enjoyed writing it and I learnt a lot by doing so.

Whilst I would recommend building one to anyone thinking of learning a new language, *nothing* compares to solving an *actual* problem you have right now.

[HNCOMMENT]: http://news.ycombinator.com/item?id=5262597
[HNTHREAD]: http://news.ycombinator.com/item?id=5262099
[pyDimension]: http://www.subdimension.co.uk/2012/04/20/New_Project_pyDimension.html
[INSTRUMENTS]: https://github.com/MalphasWats/electrostatic