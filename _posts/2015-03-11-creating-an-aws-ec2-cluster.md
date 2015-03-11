---
layout: post
title: Creating an AWS EC2 Cluster
date:   2015-03-11 13:58:53
tags: python, mpi4py, mcmc, aws, amazon, ec2
---

Today I decided to scale up my MPI MCMC sampling to use more nodes.In a
[previous blog post][MpiBlog], I showed how I installed MPI on our cluster. I
got it up to 96 cores, but I scaled back and was using about 50 cores from our
cluster for my analysis. I could add more, but there is currently a lot of
demand for CPUs in our research group. Instead,
I'm going try out Amazon Web Services (AWS) Elastic Cloud Computing (EC2) for
this project.

[Yesterday][AwsAmiBlog] I setup an AWS account and created an Amazon Machine
Instance (AMI). Today, I'm going to create the cluster. I found
[this post][MpiEc2] to be helpful.

First, I installed [StarCluster][StrClstrInst], a python package made
specifically for creating and managing AWS EC2 distributed computing clusters.

{% highlight sh %}
pip install StarCluster
{% endhighlight %}

I then opened a new Terminal window and followed the StarCluster
[Quick start][StrClstrQuickStart] guide. The first thing is to create a config
file:

{% highlight sh %}
∞ starcluster help
StarCluster - (http://star.mit.edu/cluster) (v. 0.95.6)
Software Tools for Academics and Researchers (STAR)
Please submit bug reports to starcluster@mit.edu

!!! ERROR - config file /home/matt/.starcluster/config does not exist

Options:
--------
[1] Show the StarCluster config template
[2] Write config template to /home/matt/.starcluster/config
[q] Quit

Please enter your selection: 2

>>> Config template written to /home/matt/.starcluster/config
>>> Please customize the config template
∞ cd .starcluster/
∞ emacs config
{% endhighlight %}

Modifying the configuration file to use my AWS_ACCESS_KEY_ID and
AWS_SECRET_ACCESS_KEY was a bit tricky. Amazon changed the way it manages
access keys and no longer allows them to be created at the root level. The
[AWS IAM User documentation][AwsIamUsr] describes how to create a user and
grab their access key. In a nutshell, do this:

1. go to: https://console.aws.amazon.com/iam/
2. In the left-hand navigation page
  - click **Users**
  - click the blue **Create New Users** button at the top
  - enter a username in the field
  - click the blue **Create** button at the bottom of the screen

Your new access key and secret keys should then appear on the screen. Copy
these into your .starcluster/config file. For the account number, use the
"User Name" you just created.

Scroll down a bit and modify the `KEY_LOCATION` to point to the SSH Key you use
to connect to AWS (you had to create a key pair when you created an AWS
  account).




[MpiBlog]: {% post_url 2015-01-27-setting-up-mpi4py %}
[AwsAmiBlog]: {% post_url 2015-03-10-scaling-up-with-aws %}
[MpiEc2]: http://cs.smith.edu/dftwiki/index.php/Tutorial:_Create_an_MPI_Cluster_on_the_Amazon_Elastic_Cloud_(EC2)
[StrClstrInst]: http://star.mit.edu/cluster/docs/latest/installation.html
[StrClstrQuickStart]: http://star.mit.edu/cluster/docs/latest/quickstart.html
[AwsIamUsr]: http://docs.aws.amazon.com/IAM/latest/UserGuide/Using_SettingUpUser.html
