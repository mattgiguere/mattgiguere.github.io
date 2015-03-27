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

To SSH into the master node of the cluster:
{% highlight sh %}
starcluster sshmaster mycluster
{% endhighlight %}

The SSH port on my machine is different from the default port, and it caused some problems with starcluster.

{% highlight sh %}
starcluster sshmaster mycluster
StarCluster - (http://star.mit.edu/cluster) (v. 0.95.6)
Software Tools for Academics and Researchers (STAR)
Please submit bug reports to starcluster@mit.edu

ssh: connect to host ec2-25-3-89-123.compute-1.amazonaws.com port 2234: Operation timed out
{% endhighlight %}


The solution was fairly simple. After the first failed attempt connecting to EC2, I changed the `~/.ssh/config` file to contain a new entry for the master node:

{% highlight sh %}
Host ec2-25-3-89-123.compute-1.amazonaws.com
   Hostname ec2-25-3-89-123.compute-1.amazonaws.com
   Port 22
{% endhighlight %}


####Setting up python

Next, we want to get the proper version of python installed on our cluster. The instances that come with starcluster by default have a ton of useful tools already built in. Immediately after SSHing into the master node, the available tools are listed:

{% highlight sh %}
starcluster sshmaster mycluster
StarCluster - (http://star.mit.edu/cluster) (v. 0.95.6)
Software Tools for Academics and Researchers (STAR)
Please submit bug reports to starcluster@mit.edu

keyname is: myStarClusterKey
keypair is: KeyPair:myStarClusterKey
The authenticity of host 'ec2-25-3-89-123.compute-1.amazonaws.com (25.3.89.123)' can't be established.
RSA key fingerprint is ab:ef:d8:2f:3c:78:b3:a2:a2:2c:4d:8e:3f:7e:2a:8c.
Are you sure you want to continue connecting (yes/no)? yes
Warning: Permanently added 'ec2-25-3-89-123.compute-1.amazonaws.com,25.3.89.123' (RSA) to the list of known hosts.
          _                 _           _
__/\_____| |_ __ _ _ __ ___| |_   _ ___| |_ ___ _ __
\    / __| __/ _` | '__/ __| | | | / __| __/ _ \ '__|
/_  _\__ \ || (_| | | | (__| | |_| \__ \ ||  __/ |
  \/ |___/\__\__,_|_|  \___|_|\__,_|___/\__\___|_|

StarCluster Ubuntu 13.04 AMI
Software Tools for Academics and Researchers (STAR)
Homepage: http://star.mit.edu/cluster
Documentation: http://star.mit.edu/cluster/docs/latest
Code: https://github.com/jtriley/StarCluster
Mailing list: http://star.mit.edu/cluster/mailinglist.html

This AMI Contains:

  * NVIDIA Driver 331.38
  * NVIDIA CUDA Toolkit 5.5.22
  * PyCuda 2013.1.1 and PyOpenCL 2013.2
  * MAGMA 1.4.1
  * Intel Ethernet Driver 2.11.3 (ixgbevf)
  * Open Grid Scheduler (OGS - formerly SGE) queuing system
  * Condor workload management system
  * OpenMPI compiled with Open Grid Scheduler support
  * OpenBLAS - Highly optimized Basic Linear Algebra Routines
  * NumPy/SciPy linked against OpenBlas
  * Pandas - Data Analysis Library
  * IPython 1.1.0 with parallel and notebook support
  * Julia 0.3pre
  * and more! (use 'dpkg -l' to show all installed packages)

Open Grid Scheduler/Condor cheat sheet:

  * qstat/condor_q - show status of batch jobs
  * qhost/condor_status- show status of hosts, queues, and jobs
  * qsub/condor_submit - submit batch jobs (e.g. qsub -cwd ./job.sh)
  * qdel/condor_rm - delete batch jobs (e.g. qdel 7)
  * qconf - configure Open Grid Scheduler system

Current System Stats:

  System load:  0.0               Processes:           94
  Usage of /:   63.3% of 7.74GB   Users logged in:     0
  Memory usage: 11%               IP address for eth0: 123.45.6.78
  Swap usage:   0%

    https://landscape.canonical.com/
root@master:~#
{% endhighlight %}


This is really great, but a lot of the versions listed here are dated, and the APIs have changed considerably. One option is to upgrade some of these libraries with pip:

{% highlight sh %}
pip install pandas --upgrade
{% endhighlight %}

One down side is that took about 15 minutes to execute. If you're willing to wait 15 minutes every time you start your cluster, then that is probably the best option for you. To save some time on startup another option is to use [miniconda][miniconda], a lightweight package that only contains conda and python, and then install only the necessary dependencies. This was covered briefly in [this post][bettercode], where I went over better coding practices. However, I'll go over all the relevant sections pertaining to setting up python for a cloud service with conda here too.




[AwsStarclusterBlog]: {% post_url 2015-03-11-creating-an-aws-ec2-cluster %}
[StrClstr]: http://star.mit.edu/cluster
[miniconda]: http://conda.pydata.org/miniconda.html
[bettercode]: {% post_url 2015-03-20-better-python-coding-practices %}
