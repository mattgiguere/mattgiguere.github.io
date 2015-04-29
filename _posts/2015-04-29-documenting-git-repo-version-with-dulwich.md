---
layout: post
title: Git History in Python with Dulwich
date:   2015-04-29 14:57:19
tags: python, mpi4py, mcmc, aws, amazon, ec2, starcluster, dulwich
---

Lately I have been running quite a few jobs on a few different cluster:
the Yale Omega HPC cluster, an on demand AWS EC2 cluster using the
starcluster package, and the our exoplanets research group cluster.
There have been so many different runs that it is becoming difficult
to keep track of which code base corresponds to which results.
This problem has been amplified by the up to two day delay between
submitting a job on Omega, and when it actually runs.

To assist with the association of version history with job output I
thought it would be nice to write the latest github commit id for a
file to the output data directory. Fortunately, I am not the only
one with this desire, and many people have worked on the
[dulwich][dulwich] project, which is a robust library for handling
git data within Python.

####Retrieving commit data with Dulwich

I did not find dulwich exactly intuitive, but fortunately there is
a decent example in their github repo, and it only took a little
bit of hacking to get it to get my git data. Below is the code I
used to

{% highlight python %}
from dulwich.repo import Repo
import time

# create a repo object:
rep = Repo('/home/matt/projects/MOST/')

# specify the file to get the last commit of:
dirfnm = 'code/eeTwoSptDtrnddOff.py'

# now create a repo "walker" that gets the
# last commit for the dirfnm file:
repowlkr = rep.get_walker(paths=[dirfnm], max_entries=1)
try:
    lastfcommit = next(iter(repowlkr)).commit
except StopIteration:
    print('{} does not exist in repo history.'.format(dirfnm))
else:
    print('using {} git version: {}'.format(dirfnm, lastfcommit.id))

{% endhighlight %}

The above code prints to screen the most recent commit id for the
executed file. I also want to print the most recent commit id for
the executed file *and* the whole repository to an output directory
where all the output data go:

{% highlight python %}
# add git version information for future reference:
filename = odir+'/git_info.txt'
f = open(filename, 'w')
f.write('##############################\n')
f.write('file executed: {}.py\n'.format(execfilenm))
f.write('latest commit to {}.py: {}\n'.format(execfilenm, lastfcommit.id))
f.write('author: {}\n'.format(lastfcommit.author))
f.write('time: {}\n'.format(time.ctime(lastfcommit.author_time)))
repowlkr = rep.get_walker(max_entries=1)
try:
    lastrcommit = next(iter(repowlkr)).commit
except StopIteration:
    print('Cannot get repo history.')
else:
    f.write('##############################\n')
    f.write('latest commit to MOST repo: {}\n'.format(lastrcommit.id))
    f.write('author: {}\n'.format(lastrcommit.author))
    f.write('time: {}\n'.format(time.ctime(lastrcommit.author_time)))
f.close()
{% endhighlight %}

####The Result
The code prints the following line at run time

{% highlight text %}
using eeTwoSptDtrnddOff git version: 4bb26eb1bacb47c435a015195c824c0acfaa5661
{% endhighlight %}

and makes the file `git_info.txt`, which contains the following:
{% highlight text %}
##############################
file executed: eeTwoSptDtrnddOff.py
latest commit to eeTwoSptDtrnddOff.py: 4bb26eb1bacb47c435a015195c824c0acfaa5661
author: Matt Giguere <matthew.giguere@gmail.com>
time: Wed Apr 29 14:38:39 2015
##############################
latest commit to MOST repo: f0be22d21db4017a6f067ebb0ddce3fd87104af9
author: Matt Giguere <matthew.giguere@gmail.com>
time: Wed Apr 29 14:40:02 2015
{% endhighlight %}



[dulwich]: https://github.com/jelmer/dulwich
