---
layout: post
title: Python equivalent to PHP's str word count
---

I've been really enjoying learning Python. I'm discovering that it has plenty of its own little foibles, but on balance, seems to make a bit more sense than PHP (list slices are *so* much easier to remember than `substr()` or is it `substring()` or `sub_str()`?!)

I'm still working on my Pythonic Static Blogging system, dubbed pyDimension for want of inspiration, and just finished implementing my [static search indexing system](http://subdimension.co.uk/2012/04/09/Static_Text_Search.html). Python didn't come with an obvious way to generate a list of word from a body of text like PHP does, so I had to implement my own.

In PHP, I generated a list of words to use as indexes with this:

    $words = array_unique(
        str_word_count(
            strtolower(
                str_replace("'", '', 
                    strip_tags($text)))
        , 1));

When you pass the `1` parameter to PHP's `str_word_count()` it returns an array of words and it's quite clever about what it considers a word.

I couldn't find anything obvious in Python's Standard Library, so with a little bit of tinkering, I came up with this:

    PUNCTUATION = "#$%&"'()*+,./:;<=>!?@[]^`{|}~"
    
    def get_words(text):
        depunc = text.lower()
        for p in PUNCTUATION:
            depunc = depunc.replace(p, ' ')
    
        all_words = set(depunc.split())
        words = []

        for w in all_words:
            if len(w) > 2 and not w.isdigit():
                words.append(w.strip('-'))
    
        return words

The `string` package has a punctuation constant, but I wanted to keep underscores and hyphens, that way `get_words` would be indexed as the full method name, rather than 'get' and 'words', which is less meaningful. I also decided to exclude words of one or two characters, and numbers. Ideally I wanted to keep numbers, as they are useful - for example, in my post about Dropbox LanSync, indexing the port number would be useful. However, because of the way I remove punctuation, numbers with significant formatting, such as dates or times wouldn't be indexed properly, so I decided to leave them out.

Once I have a list of all the words in a post or page, I add the URL of that item to a list stored in a file named for each word.

###Update
This doesn't work when it's running through `mod_wsgi` so [I changed it](http://subdimension.co.uk/2012/05/08/Heres_a_fun_one.html)