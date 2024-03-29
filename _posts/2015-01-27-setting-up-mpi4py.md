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

Fortunately for me, [someone else encountered a similar error](https://groups.google.com/a/continuum.io/forum/#!topic/anaconda/7CsGQKNvcdQ). Until anaconda fixes their bug, an inelegant hack is to make a symbolic link pointing from /opt/ana... to the correct path. I have anaconda python installed for all users, so instead of pointing the symbolic link to my home directory, I pointed it to the directory containing the anaconda python distribution, the Applications directory:
{% highlight sh %}
sudo ln -s /Applications/anaconda/ /opt/anaconda1anaconda2anaconda3
{% endhighlight %}

I did this on all 5 machines that I plan on testing MPI on. The next step is to create a hostfile containing the names or IP addresses of all hosts that will be used for computing. This is just a simple text file containing nothing more than the name of the host and the number of slots, or threads, to run on it at any given time:

{% highlight sh %}
host1.example.edu slots=12
host2.example.edu slots=8
{% endhighlight %}

The example tests in the [mpi4py documentation](http://mpi4py.scipy.org/docs/usrman/install.html) failed for me, but @jbornschein put together a nice [github repository with some example code](https://github.com/jbornschein/mpi4py-examples). I ran the 01-helloworld example, specifying the hosts I wanted to distribute the jobs to:

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

After adding the hosts and ports to the `config` file, I didn't need to restart, or open a new terminal window or anything else that might be expected. Reissuing the same command in the same terminal window returned an immediate result:

{% highlight sh %}
∞ mpirun --hostfile myhostfile ./01-hello-world
Hello! I'm rank 1 from 8 running in total...
Hello! I'm rank 3 from 8 running in total...
Hello! I'm rank 0 from 8 running in total...
Hello! I'm rank 2 from 8 running in total...
Hello! I'm rank 7 from 8 running in total...
Hello! I'm rank 4 from 8 running in total...
Hello! I'm rank 5 from 8 running in total...
Hello! I'm rank 6 from 8 running in total...
^Cmpirun: killing job...
{% endhighlight %}

However, as you can see things didn't end very well. I had to kill the job, otherwise I end up with a strange error:

{% highlight sh %}
∞ mpirun --hostfile hostfile ./01-hello-world
Hello! I'm rank 0 from 8 running in total...
Hello! I'm rank 3 from 8 running in total...
Hello! I'm rank 1 from 8 running in total...
Hello! I'm rank 2 from 8 running in total...
Hello! I'm rank 4 from 8 running in total...
Hello! I'm rank 5 from 8 running in total...
Hello! I'm rank 6 from 8 running in total...
Hello! I'm rank 7 from 8 running in total...
[host2.example.edu][[7061,1],4][btl_tcp_endpoint.c:638:mca_btl_tcp_endpoint_complete_connect] connect() to 128.5.5.6 failed: Operation timed out (60)
[host2.example.edu][[7061,1],5][btl_tcp_endpoint.c:638:mca_btl_tcp_endpoint_complete_connect] connect() to 128.5.5.6 failed: Operation timed out (60)
[host2.example.edu][[7061,1],6][btl_tcp_endpoint.c:638:mca_btl_tcp_endpoint_complete_connect] connect() to 128.5.5.6 failed: Operation timed out (60)
[host2.example.edu][[7061,1],7][btl_tcp_endpoint.c:638:mca_btl_tcp_endpoint_complete_connect] connect() to 128.5.5.6 failed: Operation timed out (60)
[host1.example.edu][[7061,1],0][btl_tcp_endpoint.c:638:mca_btl_tcp_endpoint_complete_connect] connect() to 128.5.5.5 failed: Operation timed out (60)
[host1.example.edu][[7061,1],1][btl_tcp_endpoint.c:638:mca_btl_tcp_endpoint_complete_connect] connect() to 128.5.5.5 failed: Operation timed out (60)
[host1.example.edu][[7061,1],2][btl_tcp_endpoint.c:638:mca_btl_tcp_endpoint_complete_connect] connect() to 128.5.5.5 failed: Operation timed out (60)
[host1.example.edu][[7061,1],3][btl_tcp_endpoint.c:638:mca_btl_tcp_endpoint_complete_connect] connect() to 128.5.5.5 failed: Operation timed out (60)
{% endhighlight %}

I downloaded the [source code](https://bitbucket.org/mpi4py/mpi4py/downloads) for mpi4py, changed directories into the downloaded directory and tried running their tests:

{% highlight sh %}
mpiexec --hostfile hostfile python test/runtests.py
{% endhighlight %}

Running `runtests.py` when the `hostfile` contains only `host1.example.edu` or `host2.example.edu` works fine. However, when I include both hosts I end up with the same error as the `helloworld.py` example. This error doesn't crop up with the `mpi4py` `helloworld` example, just the `mpi4py-examples` `helloworld`. The difference between the failed and successful versions being that the version that fails waits for all jobs to finish up at the end through `comm.Barrier()`.

[This article](http://stackoverflow.com/questions/15072563/running-mpi-on-two-hosts), which discusses the communication was helpful --- it appears the two computers, host1 and host2, can communicate with the machine I am running the commands from, but they cannot communicate with eachother.

I disabled the firewall through System Preferences -> Security & Privacy. This worked for the `helloworld.py` example, but not for `tests/runtests.py`. I should also mention that `host1` has 12 cores and `host2` has 8 cores. While testing out my hostfile I had reduced the number of "slots" on each to 4 and it worked. When I increased the number of slots on either host above 4, the connection failed error message reappeared when running `helloworld.py`.

It looks like part of the problem may be that `host1` and `host2` are using different SSH ports, and therefore cannot communicate between each other. I switched to using two host machines that are using the same ports for SSH, and both `helloworld.py` and `runtests.py` finished up successfully.

However, adding a third machine is now causing issues...

This turned out to be that the firewall was still on despite turning it off through the GUI in system preferences. Simply turning the firewall off through the System Preferences GUI worked on 2 of the 3 machines, so I'm not sure why it got hung up on the third. If you're having similar problems, try taking a look at either "All Messages" or "secure.log" in the console (or /var/log/secure.log) on the mac host. If you see lines stating that the Firewall refused connection, this is your problem too. Simply restarting the system did the trick. I've now added several more machines and have executed `helloworld.py` and `tests/runtests.py` successfully on 96 cores!
