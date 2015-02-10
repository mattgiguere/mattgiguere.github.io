---
layout: post
title: Stellar Spot Modeling
date:   2015-02-10 18:35:53
tags: python, imagemagick, simulation, animation, pandas
---

Over the past two days I worked on fitting the simultaneous MOST photometry
and CHIRON RV measurements of Epsilon Eridani. For starters I downsampled
the MOST photometry to a running mean in 8 hour bins. This greatly reduced
the noise and made the number of observations comparable to the RV
measurements.

To downsample I used the `pandas` resample command.
