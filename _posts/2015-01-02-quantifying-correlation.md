---
layout: post
title: Quantifying Correlation
date:   2015-01-02 18:39:21
categories: statistics activity planets
---

In a [recent](http://arxiv.org/abs/1411.5374) work, I used the Pearson linear correlation coefficient, \rho, to describe the linear correlation between the radial velocity (RV) measurements and the S-values. I also made a [chunk of code](https://github.com/mattgiguere/pyutil/blob/master/pearsonBootstrapPvalue.py) that calculates the p-value through a bootstrap Monte Carlo analysis.

These two pieces of code came in handy again for some recent work measuring the H-alpha spectral line for activity analysis, and checking for correlation with the  RV measurements.
