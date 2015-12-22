---
layout: post
title: Auto Scaling On EC2
date:   2015-12-22 17:47:50
tags: python, Flask, AWS, EC2
---

For my Insight project, I created a Flask-based web app that I hosted on Amazon
Web Services (AWS) Elastic Cloud Computing (EC2). I had the original site on a
[micro instance][AWS_Instances]. That worked for the initial testing, but
during demos I found that when several people in the audience were viewing my
site at the same time while I was presenting, it would overload the server and
result in an error.


[AWS_Instances]: https://aws.amazon.com/ec2/instance-types/
