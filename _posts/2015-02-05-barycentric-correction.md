---
layout: post
title: The CHIRON Barycentric Correction
date:   2015-02-05 12:56:12
tags: python, mpi4py, mcmc, osx, emcee, barycentric correction
---

When using the radial velocity method to search for planets orbiting
nearby stars, the dominant signal is always due to the Earth's motion
about the barycenter of the solar system. Our annual orbit induces
a signal of 30,000 m/s. Furthermore, as the observatory rotates towards
the star, the Earth's rotation can induce a maximumradial velocity of 400 m/s.
If we didn't correct for these two effects, we would find all sorts of celestial
bodies with annual and daily orbits. But to find low mass planets, there are
all sorts of other motions and effects that need to be taken into account. For
example, if we didn't account for the presence of Jupiter, we would see a 12 m/s
signal with a period of approximately 12 years. For each spectroscopic observation
we take, we calculate a precise photon-weighted midpoint of the observation, and
then calculate a barycentric correction to subtract from the Doppler measurement.
This barycentric correction takes into account the relative motions of all the
planets and many minor bodies in the Solar System, the position of the observatory
on Earth, leap seconds due to events such as storms and earth quakes on Earth that
speed up or slow down the Earth's rotation, etc. For a great description of all that
goes into the barycentric correction, see [Barycentric Corrections at 1 cm/s for precise Doppler velocities](http://arxiv.org/abs/1409.4774) by Wright & Eastman (2014).

The other day I noticed a rather interesting correlation between the radial velocity
measurements and the barycentric correction. It can be seen in the following plot, which
shows the RV Measurements as a function of the Barycentric Correction.

![RV Measurements as a Function of Barycentric Correction]({{ site.baseurl }}/images/Show_RvVsBary2Years.png)

In red are Doppler measurements based on CHIRON observations of Tau Ceti in 2014, and in blue are
the same, but based on 2012 data. While the correlation is not perfect, it's quite clear in
a few regions (e.g, < -20,000 m/s, and between -8,000 m/s and 0 m/s).
