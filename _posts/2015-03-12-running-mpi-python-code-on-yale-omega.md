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




[YaleHPC]: http://westcampus.yale.edu/research/science-medicine-engineering/core-facililties/high-performance-computing-center
[OmegaDocs]: https://hpc.research.yale.edu/hpc_user_wiki/index.php/Omega
