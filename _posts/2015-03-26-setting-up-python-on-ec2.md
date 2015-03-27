---
layout: post
title: Setting up Python and MPI on EC2
date:   2015-03-26 12:03:55
tags: python, mpi4py, mcmc, aws, amazon, ec2, starcluster
---

In a [previous post][AwsStarclusterBlog], I described how to setup a cluster using the Amazon EC2 service and the starcluster package. In this post I will describe getting Python code up and running on a [Starcluster][StrClstr] cluster instance on Amazon EC2 with MPI.

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

One solution to this is to add an entry in `~/.ssh/config` to specify the port to the master node:

{% highlight sh %}
Host ec2-25-3-89-123.compute-1.amazonaws.com
   Hostname ec2-25-3-89-123.compute-1.amazonaws.com
   Port 22
{% endhighlight %}

But this means adding a new entry every time a new cluster is started! That's not an acceptable solution.

I ended up changing the SSH port in `/etc/services` *back* to 22, and then modifying the `/System/Library/LaunchDaemons/ssh.plist` file to a port other than 22.

Here's what that looks like in OS X Yosemite:

{% highlight sh %}
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>Disabled</key>
	<true/>
	<key>Label</key>
	<string>com.openssh.sshd</string>
	<key>Program</key>
	<string>/usr/libexec/sshd-keygen-wrapper</string>
	<key>ProgramArguments</key>
	<array>
		<string>/usr/sbin/sshd</string>
		<string>-i</string>
	</array>
	<key>Sockets</key>
	<dict>
		<key>Listeners</key>
		<dict>
			<key>SockServiceName</key>
			<string>2123</string>
			<key>Bonjour</key>
			<array>
				<string>ssh</string>
				<string>2123</string>
			</array>
		</dict>
	</dict>
	<key>inetdCompatibility</key>
	<dict>
		<key>Wait</key>
		<false/>
	</dict>
	<key>StandardErrorPath</key>
	<string>/dev/null</string>
	<key>SHAuthorizationRight</key>
	<string>system.preferences</string>
	<key>POSIXSpawnType</key>
	<string>Interactive</string>
</dict>
</plist>
{% endhighlight %}


Changing the port number to 2123 in the ssh.plist makes it so that my computer only allows incoming connections to port 2123, but the default port when trying to connect to other machines is still 22. Perfect!

####Setting up python

Next, we want to get the proper version of python installed on our cluster. The instances that come with starcluster by default have a ton of useful tools already built in. Immediately after SSHing into the master node, the available tools are listed:

{% highlight sh %}
starcluster sshmaster mycluster
StarCluster - (http://star.mit.edu/cluster) (v. 0.95.6)
Software Tools for Academics and Researchers (STAR)
Please submit bug reports to starcluster@mit.edu

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

One down side is that it takes a little over 9 minutes to execute. If you're willing to wait 9 minutes every time you start your cluster, then that is probably the best option for you. If not, another option is to use [miniconda][miniconda], a lightweight package that only contains conda and python, and then install only the necessary dependencies. I used miniconda when setting up travis-ci, which was covered briefly in [this post][bettercode].

For now, I'm fine with waiting 9 minutes to startup the cluster. I made a script that will start up the cluster, and copy over all of the code and input data I want to use. Here's what that script looks like:

{% highlight sh %}
#!/usr/bin/env bash

echo "Starting cluster..."
starcluster start mycluster

echo "Now upgrading pandas and numexpr..."
#upgrade numpy and pandas:
starcluster sshmaster mycluster 'pip install pandas --upgrade'
starcluster sshmaster mycluster 'pip install numexpr --upgrade'

#install dependencies:
starcluster sshmaster mycluster 'pip install emcee'

#append my projects directory to the Python path:
starcluster sshmaster mycluster 'echo " " >> .bashrc'
starcluster sshmaster mycluster 'echo "#Add my projects dir to python path:" >> .bashrc'
starcluster sshmaster mycluster 'echo "export PYTHONPATH=/root/projects:\$PYTHONPATH" >> .bashrc'

#add directories and copy over code:
echo "Creating projects directory..."
starcluster sshmaster mycluster mkdir projects
echo "Creating MOST directory..."
starcluster sshmaster mycluster mkdir projects/MOST
echo "Copying over module files..."
starcluster put mycluster /home/matt/projects/MOST/__init__.py projects/MOST/
starcluster put mycluster /home/matt/projects/MOST/setup.py projects/MOST/
echo "Creating code directory..."
starcluster sshmaster mycluster mkdir projects/MOST/code
echo "Copying over the code..."
starcluster put mycluster /home/matt/projects/MOST/code projects/MOST/


#now add the data directories and input data:
echo "Creating data directories..."
starcluster sshmaster mycluster mkdir projects/MOST/data
starcluster sshmaster mycluster mkdir projects/MOST/data/chiron
starcluster sshmaster mycluster mkdir projects/MOST/data/most
starcluster sshmaster mycluster mkdir projects/MOST/data/MCMC
echo "Copying over CHIRON data..."
starcluster put mycluster /home/matt/projects/MOST/data/chiron/epsEriChironSepDec2014.txt projects/MOST/data/chiron/
echo "Copying over MOST data..."
starcluster put mycluster /home/matt/projects/MOST/data/most/epsEriMostFullRedResamp.txt projects/MOST/data/most/

#now run the job
starcluster sshmaster mycluster 'cd projects/MOST/code; qsub -cwd -pe orte 4 ./evol_starcluster_qsub_test.sh'

starcluster sshmaster mycluster 'qstat'
{% endhighlight %}

In the line that I use to run the job, I change directories into the directory with my code, and then call on qsub to execute my routine. The -cwd option tells qsub to start the code from the current working directory, and the -pe orte 4 tells it to use the orte parallel environment with 4 cores. The contents of `evol_starcluster_qsub_test.sh` are just the program to be executed with MPI.

Contents of evol_starcluster_qsub_test.sh:
{% highlight sh %}
#!/bin/bash

mpiexec python eeTwoSptParTmpDfRtEvol.py 3 90 100 --thin 2
{% endhighlight %}

When running this script, user interaction is still required at one point. When SSHing into the master node for the first time, SSH will ask to confirm the identity of the machine:

{% highlight sh %}
The authenticity of host 'ec2-22-3-444-55.compute-1.amazonaws.com (22.3.44.55)' can't be established.
RSA key fingerprint is 12:34:56:78:90:aa:bb:cc:dd:ee:ff:11::22:33:44.
Are you sure you want to continue connecting (yes/no)? yes
{% endhighlight %}

If you want to skip that, you can add the following to your `~/.ssh/config` file:

{% highlight sh %}
StrictHostKeyChecking no
{% endhighlight %}


[AwsStarclusterBlog]: {% post_url 2015-03-11-creating-an-aws-ec2-cluster %}
[StrClstr]: http://star.mit.edu/cluster
[miniconda]: http://conda.pydata.org/miniconda.html
[bettercode]: {% post_url 2015-03-20-better-python-coding-practices %}
