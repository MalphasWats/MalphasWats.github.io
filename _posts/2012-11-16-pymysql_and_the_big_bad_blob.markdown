---
layout: post
title: pymysql and the big bad blob
---

#{{ page.title }}

or: storing a large file in a mysql blob field with pymysql.

I have a fun little side project going on at work at the moment, I'm a teacher and we wanted a super-light-weight learning platform for a new [Blended Learning](http://en.wikipedia.org/wiki/Blended_learning) pilot that we're running. Something were students could log on, follow a course set by teachers, upload their work and receive marks and feedback on that work.

I started building this just before I learnt about Flask and Python, so it was originally built with PHP. I quickly realised the errors of my ways and recoded the whole thing early on. BEST DECISION EVER, but that's a whole other story.

The current Beta version has been running rather nicely, but I'd started to notice an irritating issue with the students uploading files - at first, there was no problem; The courses we'd put up online were fairly trivial and the work being submitted was small and straightforward. As we grew, the work being submitted became more complicated. I noticed that large files could not be uploaded. The limit was ~16Mb. This was a useful number, because it matched a setting in MySQL itself, [`max_allowed_packet`](http://stackoverflow.com/questions/8062496/how-to-change-max-allowed-packet-size). I changed it directly in the `my.cnf` file and restarted the server. *Still No Worky*.

A bit more research pointed to a [problem in pymysql](https://github.com/petehunt/PyMySQL/issues/43):

> Here's a patch fixing the issue.

and

> Thanks Evax. Rolled your patch into r43.

as far as I can tell, I have the latest version of `pymysql`, installed via `pip`. I really didn't feel like trying to install a version directly from GitHub (I know `pip` can do that for you, but I only have this little live server that people are relying on).

I [asked about the issue on StackOverflow](http://stackoverflow.com/questions/13376559/broken-pipe-when-i-try-to-insert-large-blob-with-pymysql), I'd seen a similar solution suggested elsewhere, but didn't really know where to start. Marwan's answer was enough to get me started:

    @mod.route('/file/upload', methods=['POST'])
    @login_required
    def upload2():
        filename = request.files['file'].filename
        mime_type = request.files['file'].mimetype
        file = request.files['file'].stream.read()
    
        if mime_type[:5] == 'image':
            file = resize_image_to_width(file, 1024)
    
        filesize = len(file)
        if filesize == 0:
            return ""
        
        chunk_size = 1024 * 1024 * 10 #10 megabytes
        file_chunks = [file[i:i+chunk_size] for i in range(0, len(file), chunk_size)]
    
        if not request.form['file_id']:
            file_details = (filename, file_chunks[0], mime_type, filesize, session['user']['user_id'])
            file_id = database.query("""INSERT INTO files (filename, file, mime_type, filesize, owner)
                                        VALUES (%s, %s, %s, %s, %s)""", file_details)
            for f in file_chunks[1:]:
                database.query("""UPDATE files 
                                  SET file=concat(file, %s)
                                  WHERE file_id=%s""", (f, file_id))
        else:
            file_details = (filename, file, mime_type, filesize, request.form['file_id'])
    
            file_id = database.query("""UPDATE files 
                                        SET 
                                        filename=%s, 
                                        file=%s, 
                                        mime_type=%s, 
                                        filesize=%s 
                                        WHERE file_id=%s""", file_details)
        return "upload complete"

My upload function breaks the uploaded file into chunks of 10Mb, inserts the first chunk and appends the remaining chunks to the blob field. I celebrated - it worked!

Of course, if fat stuff can't go in, fat stuff can't come out! I had to modify my `download()` function too:

    @mod.route('/file/<int:file_id>/download')
    @login_required
    def download2(file_id):
        chunk_size = 1024 * 1024 * 10
        file = database.query("""SELECT SUBSTRING(file, 1, %s) as file, mime_type, filename, filesize FROM files WHERE file_id=%s""", (chunk_size, file_id))
        if file:
            file_content = file[0]['file']
            if file[0]['filesize'] > chunk_size:
                chunks_left = file[0]['filesize'] / chunk_size #I have 1 chunk, so this will get the remainder, there's almost always one partial chunk left
            
                for c in range(chunks_left):
                    chunk_start = (chunk_size * (c+1)) + 1
                
                    chunk = database.query("""SELECT SUBSTRING(file, %s, %s) as chunk FROM files WHERE file_id=%s""", (chunk_start, chunk_size, file_id))
                    file_content += chunk[0]['chunk']
        
            safe_filename = unicode(file[0]['filename']).encode('ascii', 'ignore')
            r = Response(file_content, mimetype=file[0]['mime_type'])
            r.headers.add('Content-Disposition', u'attachment; filename="%s"' % safe_filename)
            return r
        else:
            abort(404)


I'm not sure I like the solution I have, it feels inefficient with all the serial queries, but ultimately, it works and gets things moving again with our pilot. I really need to investigate the mysterious patch mentioned in the GitHub issue, but really, there's always going to be a limit to the transaction size, so at least my solution here deals with truly massive files (teachers love uploading videos to things, I'm pretty sure it won't really work, but at least it'll get stored in the database nicely!)