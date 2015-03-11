---
layout: post
title: Creating an AWS EC2 Cluster
date:   2015-03-11 13:58:53
tags: python, mpi4py, mcmc, aws, amazon, ec2
---

Today I decided to scale up my MPI MCMC sampling to use more nodes.In a
[previous blog post][MpiBlog], I showed how I installed MPI on our cluster. I
was using about 50 cores from our cluster for my analysis. I could add more,
but there is currently a lot of demand for CPUs in our research group. Instead,
I'm going try out Amazon Web Services (AWS) Elastic Cloud Computing (EC2) for
this project.


[MpiBlog]: {% post_url 2015-01-27-setting-up-mpi4py %}
