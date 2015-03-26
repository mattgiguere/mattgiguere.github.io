---
layout: post
title: Setting up Python and MPI on EC2
date:   2015-03-26 12:03:55
tags: python, mpi4py, mcmc, aws, amazon, ec2, starcluster
---

In a [previous post][AwsStarclusterBlog], I described how to setup a cluster using the Amazon EC2 service and the starcluster package. In this post I will describe getting Python and MPI up and running on a [Starcluster][StrClstr] cluster instance on Amazon EC2.

####Starting up the cluster

First, we need to start our cluster instance. This can easily be done using starcluster by typing the following command:

{% highlight sh %}
starcluster start mycluster
{% endhighlight %}

####Setting up python

Next, we want to get python installed on our cluster. The easiest and fastest way to do this is to use [miniconda][miniconda], a lightweight package that only contains conda and python, and then install only the needed dependencies. This was covered briefly in [this post][bettercode], where I went over better coding practices. However, I'll go over all the relevant sections pertaining to setting up python for a cloud service with conda here too.

[AwsStarclusterBlog]: {% post_url 2015-03-11-creating-an-aws-ec2-cluster %}
[StrClstr]: http://star.mit.edu/cluster
[miniconda]: http://conda.pydata.org/miniconda.html
[bettercode]: {% post_url 2015-03-20-better-python-coding-practices %}
