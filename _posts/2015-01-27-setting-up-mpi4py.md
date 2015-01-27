---
layout: post
title: Setting up mpi4py
date:   2015-01-27 18:25:09
tags: python, mpi4py, mcmc, osx, anaconda
---

Today I've been trying to get `emcee` up and running and to use it with MPI. There were a number of obstacles that I needed to overcome to get MPI working on multiple machines.

I have an anaconda installation of python, and mpi4py is one of the packages they support (more below), so I installed mpi4py using the following command:

{% highlight sh %}
conda install mpi4py
{% endhighlight %}

But when I tried running it I got the following error:
{% highlight sh %}
/opt/anaconda1anaconda2anaconda3/share/openmpi/help-opal-runtime.txt
{% endhighlight %}

After a little searching through my path, I saw one file that was causing problems, but fixing it still resulted in the above error. Fortunately, someone else encountered a similar error. Until anaconda fixes their bug, an inelegant hack is to make a symbolic link pointing from /opt/ana... to the correct path. I have anaconda python installed for all users, so instead of pointing the symbolic link to my home directory, I pointed it to the directory containing the anaconda python distribution, the Applications directory:
{% highlight sh %}
sudo ln -s /Applications/anaconda/ /opt/anaconda1anaconda2anaconda3
{% endhighlight %}

I did this on all 5 machines that I plan on testing MPI on. The next step is to create a hostfile containing the names or IP addresses of all hosts that will be used for computing. This is just a simple text file containing nothing more than the name of the host and the number of slots, or threads, to run on it at any given time:

{% highlight sh %}
host1.example.edu slots=8
host2.example.edu slots=12
{% endhighlight %}

The example tests in the limited [mpi4py documentation](http://mpi4py.scipy.org/docs/usrman/install.html) failed for me, but @jbornschein put together a nice [github repository with some example code](https://github.com/jbornschein/mpi4py-examples). I ran the 01-helloworld example, specifying the hosts I wanted to distribute the jobs to:

{% highlight sh %}
cd projects/mpi4pyexamples
mpirun --hostfile myhostfile.txt ./01-helloworld
{% endhighlight %}

After a rather long delay in returning a result, an error was returned saying it could connect on the default port. That makes sense since we use non-default ports for our machines. After some searching, it doesn't seem like there's any way to specify the port in the hostfile, instead I used an ssh config file. I'm using Mac OS X 10.10, and setting a config file up was quite quick and easy to do:

{% highlight sh %}
emacs ~/.ssh/config
{% endhighlight %}

and for contents add

{% highlight sh %}
Host host1.example.edu
   Hostname host1.example.edu
   Port 2400

Host host2.example.edu
   Hostname host2.example.edu
   Port 2400
{% endhighlight %}
