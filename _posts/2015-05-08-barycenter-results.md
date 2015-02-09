---
layout: post
title: Barycentric Correction Results
date:   2015-02-08 22:13:45
tags: python, mpi4py, mcmc, osx, emcee, barycentric correction
---

I spent some time this weekend looking more into the barycentric correction.
I couldn't figure out why the barycentric corrections from barycorr were so
much worse than from the old barycentric correction code. It turned out it
was because there was a bug with the CF structures --- the modified julian
dates in the CF structures were stored as doubles, but somewhere in the
reduction pipeline they are treated as FLOATs, which only have precision
to about the minute level. This corresponds to introducing an error at
about the 2 m/s level. 
