---
layout: post
title: Scaling Up With AWS
date:   2015-03-10 18:39:10
tags: python, IPython, time series analysis, AWS, EC2
---

As mentioned in a [previous blog post][ParTemp], my parallel tempering code is
now working. There is still work to be done in adding new physics,
but I am now in a position to benefit from some extra computing
power. I'm going to try using [Amazon EC2][EC2] for this project.

First, I launched an instance running the Amazon Linux AMI (HVM).
[This blog post][BadHESSian] may be helpful in setting things up.

Once the instance was created, and my keys were all setup, I SSHed into my
instance. My favorite distribution of scientific python is anaconda python.
This can be easily downloaded onto the AWS virtual machine instance by

1. going to the Anaconda downloads page
2. selecting the linux OS
3. right-clicking in the browser on the "Linux 64-Bit - Python 2.7" button
4. copying the link to the downloadable package
5. and pasting the link after `wget` in the SSH session into the VMI.

{% highlight sh %}
ssh -p22 -i my-private-key ec2-user@my-public-ip
mkdir tempDownloads
cd tempDownloads
wget http://09c8d0b2229f813c1b93-c95ac804525aac4b6dba79b00b39d1d3.r79.cf1.rackcdn.com/Anaconda-2.1.0-Linux-x86_64.sh
{% endhighlight %}

Once the download has completed, installation is as simple as typing ls to
find out the name of the install script, running it, and following the
on-screen instructions.

{% highlight sh %}
ls
-rw-rw-r-- 1 ec2-user ec2-user 353806962 Sep 30 19:37 Anaconda-2.1.0-Linux-x86_64.sh
bash Anaconda-2.1.0-Linux-x86_64.sh
{% endhighlight %}

If you said 'yes' at the end of installation to have the anaconda python path
appended to your .bashrc file, then starting anaconda python is as simple as
sourcing the changes to your .bashrc file and typing python:

{% highlight sh %}
source ~/.bashrc
python
{% endhighlight %}

There are a few packages I need to run my parallel tempering code. I'll use
pip to install these:

{% highlight sh %}
pip install emcee
{% endhighlight %}


[ParTemp]: {% post_url 2015-03-09-parallel-tempering %}
[EC2]: http://aws.amazon.com/ec2/
[BadHESSian]: http://badhessian.org/2013/11/cluster-computing-for-027hr-using-amazon-ec2-and-ipython-notebook/
