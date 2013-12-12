---
layout: post
title: Static Text Search
---

I've been thinking about how I use my blog. Moving it to a new server made me want to redesign it, redesigning it makes me want to use it more. I'm always inspired by the blogs that I read, but I know that I don't have the sort of tech contacts they do, or the insanely deep knowledge to pass on.

What I am quite good at though, is solving technical problems - I come up with a good idea and I'm usually fairly good at following through and making something of it, provided it's fairly small.

I figured that my blog would be a good place to write about this sort of stuff - more as a record for myself. The Dropbox sync thing is a good example of something I solved for myself a while ago for a different project, but because I didn't make any notes, I had to start from the beginning again when I wanted to do it again.

If I'm going to use my blog as a way of documenting what I've done, I need some kind of search function so I can find stuff I've done again.

My goal with staticDimension is to create a blog publishing system that can stand up to a fairly heavy traffic load, all posts and pages are created as static HTML files with their original markdown text stored as text files. There's no database involved.

I'm not sure that creating a fully static search engine is possible. I'd have to create a page for every possible search string that would yield a result with my content and I'd still never catch them all.

What I decided to do instead was to create an index of all of the words that appear in each post, and to use a little bit of PHP to glue it all together.

My starting point was this [Stack Overflow question](http://stackoverflow.com/questions/4090322/creating-a-simple-text-file-based-search-engine), although by itself it wasn't quite what I was looking for, it gave me the idea for indexing all of the words that appear in a post.

Each time a new post is submitted, I generate a list of all the words in it, then create files with a list of all the pages that contain that word:

    public static function addToIndex($text, $identifier)
    {
        $words = array_unique(
                   str_word_count(
                     strtolower(
                       str_replace("'", '', 
                         strip_tags($text)))
                   , 1));
    
        foreach($words as $word)
        {
            if(file_exists(self::INDEX_PATH.$word))
            {
                $results = unserialize(
                             file_get_contents(
                               self::INDEX_PATH.$word));
                array_push($results, $identifier);
            }
            else
            {
                $results = array($identifier);
            }
    
            $results = array_unique($results);
    
            file_put_contents(self::INDEX_PATH.$word, serialize($results));
        }
    }

To make things a little easier to work with, I used `serialize()` and `unserialize()` to store the arrays of identifiers (which in this case is a URL to the page containing the word), just to eliminate a step or two later on.

I also discovered some odd edge cases with apostrophes, the `str_word_count()` function includes apostrophes (which it should), but in odd cases where I had enclosed a word in apostrophes, like 'this', it included the apostrophes in the word, however, if the first word in the search string started with an apostrophe (not very likely)m, it stripped off the first one. I decided to strip out apostrophes for the purposes of building the index, I also stripped out any rogue HTML tags.

I did a little research regarding stop or noise words in search. Words like "and" and "a" and so on, thinking that I would want to remove these words from my index. I came across this [post in a Drupal forum](http://drupal.org/node/1202#comment-40156) suggesting that filtering noise words can make it harder to find what you're looking for. Including stop words in this system doesn't really add much overhead.

I added a call to this function to a function that is called during a site rebuild too, so whenever the site rebuild is fired, the index is rebuilt too. According to Word Count there are 2679 words in my search index!

    $ ls -1 directory | wc -l

Next, I created a simple search test page that feeds queries into this function:

    public static function doSearch($searchTerms)
    {
        $searchTerms = array_unique(
                         str_word_count(
                           strtolower(
                             str_replace("'", '', $searchTerms))
                         , 1));
    
        $results = array();
        foreach($searchTerms as $t)
        {
            if(file_exists(self::INDEX_PATH.$t))
            {
                $results = array_merge($results, 
                             unserialize(
                               file_get_contents(
                                 self::INDEX_PATH.$t)));
            }
        }
    
        $results = array_count_values($results);
        asort($results);
        $results = array_reverse($results);
    
        return $results;
    }

This function produces a very simply ranked set of results - for each of the words in the search string, the word index is loaded and merged. Each identifier is then counted and the whole thing is sorted in descending order. So if a page has the full search string in it, it gets a high rating, pages with only one of the words are lower. Not exactly Google, but it serves the purpose.

The last function I'm quite proud of - it occurred to me that there was no way to remove a page from the index if it were ever deleted. My first idea was to lazily force a complete rebuild of the index whenever something is deleted. I'm not *too* worried about the efficiency of my system on the 'non-static' end, submitting a new post happens so rarely compared to how often it could be read. Deleting a post rarer still. But this solution felt a little inelegant. for each of the 2679 words in my index, each word index file could conceivably be accessed and written to for *every* post I've written - currently 59. I decided it would actually be more efficient to run through *every* word index file and remove the item being deleted.

Then I had a brainwave - just before it gets deleted, I could run the page through the word sieve again and get a list of *only* the word indexes that it needs to be removed from! Genius:

    public static function removeIndex($text, $identifier)
    {
        $words = array_unique(
                       str_word_count(
                         strtolower(
                           str_replace("'", '', 
                             strip_tags($text)))
                       , 1));
            
        foreach($words as $word)
        {
            if(file_exists(self::INDEX_PATH.$word))
            {
                $results = unserialize(
                             file_get_contents(
                               self::INDEX_PATH.$word));
                $index = array_search($identifier, $results);
                    
                if ($index !== false)
                {
                    unset($results[$index]);
                    
                    if(count($results) == 0)
                    {
                        unlink(self::INDEX_PATH.$word);
                    }
                    else
                    {
                        file_put_contents(self::INDEX_PATH.$word, 
                          serialize($results));
                    }
                }
            }
        }
    }

This deals with a couple of special cases - not finding the identifier in the search index for some reason, and removing the only identifier from an index also removes the index.

One last case remains - if a post is edited, it will contain different words. The only way to fix this really is to remove the post from all of the indexes and then recreate it again, which just uses `removeIndex()` and `addToIndex()` again.

The last thing I did, just because I'd done the same thing 3 times, was refactor the code to create a `private` function to get the list of words:

    private static function getWords($text)
    {
        return array_unique(
                 str_word_count(
                   strtolower(
                     str_replace("'", '', 
                       strip_tags($text))), 
                 1));
    }

It's not a fully static, `doSearch()` produces a dynamic page, but I think this is probably as efficient as I can make it.