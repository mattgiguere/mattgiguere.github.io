---
layout: post
title: Running MPI Python Code on Yale Omega
date:   2015-03-12 10:06:07
tags: python, mpi4py, mcmc, omega, yale, hpc
---

Yesterday I got my Parallel Tempering MCMC code working on Yale's
[Omega Cluster][YaleHPC]. I found [the "documentation"][OmegaDocs] to be far
out of date, and not very helpful. Fortunately, there were several people in
the department that could help me out (thanks Kaylea, Duncan, and Andys!!). In
the hopes of easing the reducing the setup time for others that may be
interested in using Omega for their research, I decided to write this blog post
detailing my setup.

###Welcome Email

When your account is first created, you will receive an email that starts off
like this:

>Welcome to Omega - Yale High Performance Cluster
>
>An account has been created for you on omega.hpc.yale.edu.
>
>Details about the cluster and its usage can be found at
>* http://hpc.research.yale.edu/wiki/index.php/Omega
>
>Before you can login you will need to create and upload your ssh key here:
>* http://gold.hpc.yale.internal/cgi-bin/sshkeys.py
>
>For additional information about ssh please visit:
>* http://hpc.yale.edu/faq/secure-shell-faq/
>
>There are several queues to choose from, each serving a different purpose
>* http://hpc.research.yale.edu/wiki/index.php/Omega#FAS_Queues
>
>When submitting jobs, some of the qsub terms have changed; most
>importantly when selecting the number of nodes or number of
>processors:
>* http://hpc.research.yale.edu/wiki/index.php/Omega#Scheduling_your_Programs_to_run
>

####SSH Keys
The first thing to note that is not mentioned in the welcome email message (and
I could not find mentioned in the online documentation) is that the link given
to upload your SSH key does not work in the Safari browser. Use Google Chrome.

####SSHing Into Omega
Next, to SSH into omega, I used the command:

{% highlight sh %}
ssh -p22 -i ~/.ssh/myomegakey netid@omega.hpc.yale.edu
{% endhighlight %}

####Creating a Test Script
Now comes the fun stuff. All jobs submitted for processing need to be wrapped
in a shell script. Before you do anything else, create a test script and see
if it works. The sample script on the HPC site is out of date and results in
error messages. Below is a sample script that works (as of March 12, 2015).

Contents of `my_test_script.sh`:
{% highlight sh %}
#!/bin/bash

###fas_devel: for compiling and testing code,
###restricted to one job per user32 max cores, 4 hours max walltime

###name of job
#PBS -N mytestjob

###-q queue_name
#PBS -q fas_devel

###PBS -l procs=1, tpn=1
#PBS -l nodes=1:ppn=8,mem=35gb

#PBS -l walltime=4:00:00

##oe: stdout(o) and stderr(e)
#PBS -j oe

##where to put the output
#PBS -o output_dir/$PBS_JOBNAME.$PBS_JOBID

##what you get emails for ((a)borted, (b)egin, (e)nd)
#PBS -m abe

###email yourself status messages about your job:
#PBS -M firstname.lastname@yale.edu

##Import terminal env variables
#PBS -V

export OMP_NUM_THREADS=8

###run from directory the job is submitted from
cd $PBS_O_WORKDIR

##Command to execute:
date
{% endhighlight %}

Most of what I wrote above is probably self-explanatory through the comments.
Yes, the '#' signs should be in front of the PBS commands. The `$PBS_JOBNAME`
and `$PBS_JOBID` are handy variables that can be used to ensure your output is
printed to unique directories (i.e., you're not overwriting previous results).

To submit this job, type the following at the command line:

{% highlight sh %}
qsub my_test_script.sh
{% endhighlight %}

You should receive an email message when your script has begun execution. You
can see the status of it by typing `showq`. The list is usually quite long, so
you might find it useful to pipe the results to grep and search for just lines
that contain your netid:

{% highlight sh %}
showq | grep netid
{% endhighlight %}

Note that this test script is simply printing the date, so it won't take long
to run, and you should receive a finished email with exit 0 status shortly
after receiving the start email message.

If all went well, congratulations!

####Setting up Python and MPI on Omega
Now comes the fun part. Omega uses a module system. To print all available
modules in the Terminal window type the following:

{% highlight sh %}
module avail
{% endhighlight %}

To find specific modules, use the `modulefind` command:
{% highlight sh %}
[mjg22@login-0-0 ~]$ modulefind python
/home/apps/fas/Modules:
Applications/PythonPackages/numpy/numpy-GCC-ATLAS
Applications/PythonPackages/scipy/scipy-GCC-ATLAS
Applications/PythonPackages/wxPython/2.8
Apps/PythonPackages/numpy/numpy-GCC-ATLAS
Apps/PythonPackages/scipy/scipy-GCC-ATLAS
Apps/PythonPackages/wxPython/2.8
Compilers/Python/2.7.2
Compilers/Python/2.7.3
Compilers/Python/2.7.4rc2_experimental
Compilers/Python/2.7.5
Compilers/Python/2.7.6
Compilers/Python/2.7.9
Compilers/Python/3.2
Compilers/Python/3.3.5
Compilers/Python/OLD-2.7.5
Langs/Python/2.7.2
Langs/Python/2.7.3
Langs/Python/2.7.4rc2_experimental
Langs/Python/2.7.5
Langs/Python/2.7.6
Langs/Python/2.7.9
Langs/Python/3.2
Langs/Python/3.3.5
Langs/Python/OLD-2.7.5
Libraries/IPYTHON/1.1.0
Libraries/NETCDF4-PYTHON/1.1.0
Libraries/WXPYTHON/3.0.0
Libs/IPYTHON/1.1.0
Libs/NETCDF4-PYTHON/1.1.0
Libs/WXPYTHON/3.0.0
RH6/Langs/Python/2.7.2
RH6/Langs/Python/2.7.3
RH6/Langs/Python/2.7.4rc2_experimental
RH6/Langs/Python/3.2
[mjg22@login-0-0 ~]$
{% endhighlight %}

As can be seen in the included output above, `modulefind` is case insensitive.



[YaleHPC]: http://westcampus.yale.edu/research/science-medicine-engineering/core-facililties/high-performance-computing-center
[OmegaDocs]: https://hpc.research.yale.edu/hpc_user_wiki/index.php/Omega
