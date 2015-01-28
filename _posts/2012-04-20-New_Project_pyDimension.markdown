---
layout: post
title: "New Project: pyDimension"
---

As I mentioned previously, I've always found PHP awkward to use but I'd always kind of put it into the whole "PHP is the worst web development language there is; apart from all the others" sort of a box.

I'd always been interested in Python, but I find it very difficult to learn something by following through a tutorial. I need to have a project to get stuck in to and the few ideas I have had were always a little over-ambitious.

Fresh from my win with my search system (and freshly deflated by The Essay), I decided to give [Flask](http://flask.pocoo.org) a go.

*BEST. THING. EVER!*

I am so impressed with how quickly I got to grips with Flask, Jinja2 and of course Python. In the last 4 days I've almost completely replicated my staticDimension blog publishing system in Python!

It's still a long way from being shareable in full (I'm not even using it to write this yet, it's still safely locked away in my testing environment) but I wanted to share a small bit of the problem I was up until midnight last night solving.

At the point I wrote this bit, I was feeling *really* pleased with myself that I'd managed to transition into a whole new language and was already writing simple, efficient, beautiful code. I needed to implement the code for generating the archive pages that make the post date directories browsable.

This is what I came up with:

    def rebuild_archive_indexes():
        archiveYearDirs = glob("%s/[0-9][0-9][0-9][0-9]" % app.config['SITE_ROOT_DIR'])
        archiveFile = codecs.open("%s/archive.html" % (app.config['SITE_ROOT_DIR']),
                                                   encoding='utf-8', mode='w')
    
        archiveYears = []                          
        for y in archiveYearDirs:
            year = os.path.split(y)[1]
            archiveYears.append((year, year))
    
            for (path, dirs, files) in os.walk("%s/%s" % (app.config['SITE_ROOT_DIR'], year)):
                archiveIndex = codecs.open("%s/index.html" % path, encoding='utf-8', mode='w')
    
                sPath = path[len(app.config['SITE_ROOT_DIR'])+1:]
                if not dirs:
                    files.remove('index.html')
                    items = map(get_full_title, files)
                else:
                    if '/' in sPath:
                        days = dirs
                        month = [sPath.split('/')[1] for x in range(len(days))]
                        yr = [year for x in range(len(days))]
                        items = map(day_name, days, month, yr)
                    else:
                        items = map(month_name, dirs)
    
                archiveIndex.write(render_template("%s/archive.html" % app.config['SITE_TEMPLATE'],
                                              site_root_url=app.config['SITE_ROOT_URL'], 
                                              items=items,
                                              breadcrumb=sPath+'/'))
                archiveIndex.close()
    
        archiveFile.write(render_template("%s/archive.html" % app.config['SITE_TEMPLATE'],
                                   site_root_url=app.config['SITE_ROOT_URL'], 
                                   items=archiveYears,
                                   breadcrumb=""))
        archiveFile.close()
        flash('Archive rebuilt')
        return redirect(url_for('control_panel'))
    
    def month_name(monthNumber):
        months = ("January", "February", "March", 
                         "April", "May", "June", "July", 
                         "August", "September", "October", 
                         "November", "December")
        return (monthNumber, months[int(monthNumber)-1])
    
    def day_name(dayNumber, month, year):
        d = datetime.date(int(year), int(month), int(dayNumber))
        return (dayNumber, "%s, %s" % (d.strftime('%A'), dayNumber))
    
    def get_full_title(f):
        return (f, f)

I'm pretty sure this would be classified as an abomination and get me kicked out of any Python clubs - `month = [sPath.split('/')[1] for x in range(len(days))]` to generate a list of the same values just so I can use `map()` on the days tuple to work out what day the 1st of May was in 2011. `get_full_title()` isn't fully implemented yet and may well spawn a post of its own too - the lazy method means opening and reading every plaintext blog post (again) just to get the first line. I'm pretty sure I can do better than that.