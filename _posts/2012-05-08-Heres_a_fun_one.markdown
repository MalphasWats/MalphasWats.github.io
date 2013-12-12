---
layout: post
title: Here's a fun one
---

In my [last post][strwrdcount] I created a function to return all of the words from a blog post. I stripped out all of the 'non-word' characters with this:

    PUNCTUATION = "#$%&"'()*+,./:;<=>!?@[]^`{|}~"
    
    def get_words(text):
        depunc = text.lower()
        for p in PUNCTUATION:
            depunc = depunc.replace(p, ' ')

and it worked fine on all 3 machines that I use variously throughout the day, one OS X, one Windows 7 and one Ubuntu. Yesterday I [deployed to Apache][deploy] for the next stage of testing and the whole thing fell over!

Flask isn't much help when it isn't running through its development server so it took me a *lot* of poking around to work out what was going on. Finally, I worked out that it was falling over at [the post that started all of this off][eevee]. The quote I had copied and pasted:

> If you only know PHP and you’re curious to learn something else, give the Python tutorial a whirl and try Flask for the web stuff.

it has a 'smart quote' in it for the word you're. I'm lazy and I've never bothered to use them myself, but lots of people use them and they do pop up in a couple more of my posts where I've copied quotes. The Flask development server didn't care about them at all, it happily created index files with these characters in the name - I had noticed but decided I didn't care just yet.

Once I deployed through `mod_wsgi`, this didn't work any more. I have no idea why and I'm not sure where to start finding out either. Instead, I modified my `get_words()` function:

    depunc = re.sub('[^a-z_\-\s]', ' ', text.lower())

It probably even runs faster since it's using the regex module (written in C I believe), rather than iterating around characters in a string. I did think about adding the various other characters to the `PUNCTUATION` constant, but since they're Unicode characters, I knew I'd never get them all, so I just filter out everything that is not recognisable as a word that I have written. I will revisit this one day, if I ever find myself writing Arabic or French! 

[strwrdcount]: http://subdimension.co.uk/2012/05/05/Python_equivalent_to_PHPs_strwordcount.html
[deploy]: http://subdimension.co.uk/2012/04/24/Deploying_Flask_to_Apache.html
[eevee]: http://subdimension.co.uk/2012/04/10/This_essay_makes_me_feel_stupid.html