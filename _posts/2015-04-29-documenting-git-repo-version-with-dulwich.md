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




[dulwich]: https://github.com/jelmer/dulwich
