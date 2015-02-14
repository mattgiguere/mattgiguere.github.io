---
layout: post
title: More Spot Modeling
date:   2015-02-12 20:45:45
tags: python, simulation, animation, pandas, map projections, aitoff
---

Continuing from where I [left off last time][SpotModeling1], I tested out a
three spot model today. Here's the Maximum Likelihood solution
for the two spot model in two dimensions:

![Two Spot Model]({{ site.baseurl }}/images/TwoSpotModel.png)

where I used an Aitoff projection to show the spot locations
and relative sizes. And here's the three spot solution:

![Three Spot Model]({{ site.baseurl }}/images/Show_ThreeSpotModel.png)

Note that the two rightmost spots in the three spot solution are very
similar in size to the rightmost spot in the two spot solution. And
the average latitude of those two rightmost spots in the three spot
solution is approximately the latitude of the single rightmost spot
in the two spot solution.

Including only three spots and we already see the degenerate
dangers of spot modeling. On the two do list is to take a
bayesian approach and use the `emcee` MCMC sampler to further
explore parameter space and make sure the two rightmost spots in
the two spot solution are not both getting caught in the same
local minimum.

We also have a lot of prior information we know for this problem
that we'll be able to include when taking the Bayesian approach.
More on that later...

[SpotModeling1]: {% post_url 2015-02-10-spot-modeling %}
