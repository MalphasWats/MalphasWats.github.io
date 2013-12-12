---
layout: post
title: Creating a new instance of a class from an existing instance in Python
---

I've been wasting a lot of time creating a [game in Python](https://github.com/MalphasWats/sector-7).

I'm sure this isn't news, but it took quite a lot of searching to find [the answer](http://stackoverflow.com/questions/5924879/how-to-create-a-new-instance-from-a-class-object-in-python). I the game I have a `tech tree list` that holds an instance of each of the buildings that can be built. When you want to build a new one, the game lists these buildings and you choose one.

It took me ages to work out how to build a new copy of the chosen object. I **didn't** want to have some giant `if-elif-else` structure that worked it out, I wanted to be able to add new buildings when I thought of them, without worrying about forgetting to update the selector.

It's actually quite easy, once you know how:

    class MyClass(object):
        def __init__(self):
            self.value = 'One'
    
    a = MyClass()
    a.value = 'Two'
    
    c = a.__class__
    
    b = c()
    
    print a.value
    print b.value

documented here so I don't forget.