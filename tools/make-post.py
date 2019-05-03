#!/usr/bin/env python3

from argparse import ArgumentParser
import os
import datetime

TEMPLATE = """---
layout: post
title: {}
date: {}
---



[LINKNAME]: http://www.subdimension.co.uk/files/{}/_filename_
"""

parser = ArgumentParser()

parser = ArgumentParser(description='Creates files ready for a blog post')
parser.add_argument('post_title', help='Title of the post')

args = parser.parse_args()
now = datetime.datetime.now()
date = datetime.datetime.strftime(now, '%Y-%m-%d')
post_date = datetime.datetime.strftime(now, '%Y-%m-%d %H:%M:%S')
filename = date + '-' + args.post_title.lower().replace(' ', '-')
post_title = args.post_title.title()

#TODO: assume in working directory

with open('_posts/'+filename+'.markdown', 'w') as f:
    f.write(TEMPLATE.format(post_title, post_date, filename))

try:
    os.mkdir('files/'+filename)
except:
    print("directory not created")
