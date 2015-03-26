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
these into your .starcluster/config file. For the account number, use your
Account Id, which can be found at the top of ["Account Settings"][AcctSttngs].

Scroll down a bit and modify the `KEY_LOCATION` to point to the SSH Key you use
to connect to AWS (you had to create a key pair when you created an AWS
  account).

For me, I also had to modify my `AWS_REGION_NAME` and `AWS_REGION_HOST`.
Although I'm on the East  coast, for some reason amazon made my instances on
the west coast. After [looking at my instances][instances], here's what I put
in my config file for those two values:

{% highlight sh %}
AWS_REGION_NAME = us-west-2a
AWS_REGION_HOST = ec2.us-west-2.compute.amazonaws.com
{% endhighlight %}

Next, I attempted to start up my cluster
{% highlight sh %}
starcluster start mycluster
{% endhighlight %}

After a long pause, I got an error message:

>∞ starcluster start mycluster
>StarCluster - (http://star.mit.edu/cluster) (v. 0.95.6)
>Software Tools for Academics and Researchers (STAR)
>Please submit bug reports to starcluster@mit.edu
>
>
>!!! ERROR - Connection error:
>Traceback (most recent call last):
>  File "/Applications/anaconda/lib/python2.7/site-packages/starcluster/cli.py", line 274, in main
>    sc.execute(args)
>  File "/Applications/anaconda/lib/python2.7/site-packages/starcluster/commands/start.py", line 189, in execute
>    scluster = self.cm.get_cluster_group_or_none(tag)
  File "/Applications/anaconda/lib/python2.7/site-packages/starcluster/cluster.py", line 244, in >get_cluster_group_or_none
>    return self.get_cluster_security_group(group_name)
  File "/Applications/anaconda/lib/python2.7/site-packages/starcluster/cluster.py", line 240, in >get_cluster_security_group
>    return self.ec2.get_security_group(gname)
>  File "/Applications/anaconda/lib/python2.7/site-packages/starcluster/awsutils.py", line 357, in get_security_group
>    filters={'group-name': groupname})[0]
>  File "/Applications/anaconda/lib/python2.7/site-packages/starcluster/awsutils.py", line 369, in get_security_groups
>    return self.conn.get_all_security_groups(filters=filters)
>  File "/Applications/anaconda/lib/python2.7/site-packages/boto/ec2/connection.py", line 2970, in get_all_security_groups
>    [('item', SecurityGroup)], verb='POST')
>  File "/Applications/anaconda/lib/python2.7/site-packages/boto/connection.py", line 1150, in get_list
>    response = self.make_request(action, params, path, verb)
>  File "/Applications/anaconda/lib/python2.7/site-packages/boto/connection.py", line 1096, in make_request
>    return self._mexe(http_request)
>  File "/Applications/anaconda/lib/python2.7/site-packages/boto/connection.py", line 926, in _mexe
>    request.body, request.headers)
>  File "/Applications/anaconda/lib/python2.7/httplib.py", line 1001, in request
>    self._send_request(method, url, body, headers)
>  File "/Applications/anaconda/lib/python2.7/httplib.py", line 1035, in _send_request
>    self.endheaders(body)
>  File "/Applications/anaconda/lib/python2.7/httplib.py", line 997, in endheaders
>    self._send_output(message_body)
>  File "/Applications/anaconda/lib/python2.7/httplib.py", line 850, in _send_output
>    self.send(msg)
>  File "/Applications/anaconda/lib/python2.7/httplib.py", line 812, in send
>    self.connect()
>  File "/Applications/anaconda/lib/python2.7/site-packages/boto/https_connection.py", line 116, in connect
>    sock = socket.create_connection((self.host, self.port), self.timeout)
>  File "/Applications/anaconda/lib/python2.7/socket.py", line 553, in create_connection
>    for res in getaddrinfo(host, port, 0, SOCK_STREAM):
>gaierror: [Errno 8] nodename nor servname provided, or not known
>!!! ERROR - Check your internet connection?

There were some other options I changed. I'm using the free AMI, a t2.micro, so
I changed the `NODE_INSTANCE_TYPE`:
{% highlight sh %}
NODE_INSTANCE_TYPE = t2.micro
{% endhighlight %}

I also setup my instance with the default Amazon Linxu HVM at the top of the
list of instance types. I therefore needed to change the `NODE_IMAGE_ID` as
well. This information was given in the comments above that field in the
default ~/.starcluster/config file:
{% highlight sh %}
NODE_IMAGE_ID = ami-6b211202
{% endhighlight %}

This was caused by me changing the `AWS_REGION_NAME` and `AWS_REGION_HOST`.
Once I changed it back, I could connect, but I got error messages along the
lines of:

>!!! ERROR - UnauthorizedOperation: You are not authorized to perform this operation.
>Traceback (most recent call last):
>  File "/Applications/anaconda/lib/python2.7/site-packages/starcluster/cli.py", line 274, in main
>    sc.execute(args)
>  File "/Applications/anaconda/lib/python2.7/site-packages/starcluster/commands/start.py", line 189, in execute
>    scluster = self.cm.get_cluster_group_or_none(tag)
  File "/Applications/anaconda/lib/python2.7/site-packages/starcluster/cluster.py", line 244, in >get_cluster_group_or_none
>    return self.get_cluster_security_group(group_name)
  File "/Applications/anaconda/lib/python2.7/site-packages/starcluster/cluster.py", line 240, in >get_cluster_security_group
>    return self.ec2.get_security_group(gname)
>  File "/Applications/anaconda/lib/python2.7/site-packages/starcluster/awsutils.py", line 357, in get_security_group
>    filters={'group-name': groupname})[0]
>  File "/Applications/anaconda/lib/python2.7/site-packages/starcluster/awsutils.py", line 369, in get_security_groups
>    return self.conn.get_all_security_groups(filters=filters)
>  File "/Applications/anaconda/lib/python2.7/site-packages/boto/ec2/connection.py", line 2929, in get_all_security_groups
>    [('item', SecurityGroup)], verb='POST')
>  File "/Applications/anaconda/lib/python2.7/site-packages/boto/connection.py", line 1157, in get_list
>    raise self.ResponseError(response.status, response.reason, body)
>EC2ResponseError: EC2ResponseError: 403 Forbidden
><?xml version="1.0" encoding="UTF-8"?>
><Response><Errors><Error><Code>UnauthorizedOperation</Code><Message>You are not authorized to perform this >operation.</Message></Error></Errors><RequestID>ccb6c947-8c96-4c41-bd0b-08af6866d50b</RequestID></Response>

To fix this problem, I needed to create a new group that has EC2 permissions,
and add my IAM user to that group. This can be done through the Identity and
Access Management (IAM) [Dashboard][IAMDash].

 - Click on **Groups** in the left-hand navigation bar
 - Click on the **Create New Group** button
 - Add a group with EC2 permissions.

Once this was done, I started receiving a new error message:

> ∞ starcluster start mycluster
> StarCluster - (http://star.mit.edu/cluster) (v. 0.95.6)
> Software Tools for Academics and Researchers (STAR)
> Please submit bug reports to starcluster@mit.edu
>
> >>> Using default cluster template: smallcluster
> >>> Validating cluster template settings...
> !!! ERROR - Cluster settings are not valid:
> !!! ERROR - Keypair 'myawskey' does not exist in region 'us-east-1'

At that point I attempted to create a new key using the starcluster
command

{% highlight sh %}
starcluster createkey mysckey -o ~/.ssh/mysckey.rsa
{% endhighlight %}

This didn't work either. Later, I noticed that in the top right corner of the Amazon AWS Web Interface the region can be changed. My region defaulted to "Oregon" for some reason. I clicked the name and changed it to "N. Virginia". It is odd that Amazon chose to write "N. Virginia" instead of just "Virginia" since there is no option for "S. Virginia" and "North Virginia" is not a state. Did they get Virginia confused with the Carolinas?

After switching to the "US East (N. Virginia)" region, I could then setup instances and create keys for the US East region. I changed the `~/.starcluster/config` file back to its defaults and tried again. I could now create keypairs through starcluster:

{% highlight sh %}
starcluster createkey myStarClusterKey -o ~/.ssh/myStarClusterKey.rsa
{% endhighlight %}

And looking at the **Key Pairs** under **Network & Security** on the AWS Web Interface, I could see that StarCluster generated the key properly. I updated my config file, but was still getting an error message:

{% highlight sh %}
starcluster start mycluster
StarCluster - (http://star.mit.edu/cluster) (v. 0.95.6)
Software Tools for Academics and Researchers (STAR)
Please submit bug reports to starcluster@mit.edu

>>> Using default cluster template: smallcluster
>>> Validating cluster template settings...
!!! ERROR - Cluster settings are not valid:
!!! ERROR - Keypair 'myKey' does not exist in region 'us-east-1'
{% endhighlight %}

My problem ended up being in the name I gave the key in the ~/.starcluster/config file.

Here is the snippet from my ~/.starcluster/config file that ***did
not work***:
{% highlight sh %}
[key myawskey]
KEY_LOCATION=/home/matt/.ssh/myStarClusterKey.rsa                                                                                            # You can of course have multiple keypair sections

#     $ starcluster start -c mediumcluster mycluster
#
# If a template is not specified then the template defined by DEFAULT_TEMPLATE
# in the [global] section above is used. Below is the "default" template named
# "smallcluster". You can rename it but dont forget to update the
# DEFAULT_TEMPLATE setting in the [global] section above. See the next section
# on defining multiple templates.

[cluster smallcluster]
# change this to the name of one of the keypair sections defined above
KEYNAME = myawskey
{% endhighlight %}


And here is the snippet from my ~/.starcluster/config file that ***worked***:
{% highlight sh %}
[key myStarClusterKey]
KEY_LOCATION=/home/matt/.ssh/myStarClusterKey.rsa                                                                                            # You can of course have multiple keypair sections

#     $ starcluster start -c mediumcluster mycluster
#
# If a template is not specified then the template defined by DEFAULT_TEMPLATE
# in the [global] section above is used. Below is the "default" template named
# "smallcluster". You can rename it but dont forget to update the
# DEFAULT_TEMPLATE setting in the [global] section above. See the next section
# on defining multiple templates.

[cluster smallcluster]
# change this to the name of one of the keypair sections defined above
KEYNAME = myStarClusterKey
{% endhighlight %}

**An important point: The keyname needs to be the same name as the name of the key in AWS!** I thought `KEYNAME` was just a local variable that was used in the starcluster code to point to the correct [key] section in the config file. That is NOT the case! `KEYNAME` needs to be the same as the filename of the .rsa file.

Once I changed the keyname as shown in the above example, I could then successfully start a cluster using the starcluster code following the [Starcluster Quick Start Guide][StrClstrQuickStart].

[MpiBlog]: {% post_url 2015-01-27-setting-up-mpi4py %}
[AwsAmiBlog]: {% post_url 2015-03-10-scaling-up-with-aws %}
[MpiEc2]: http://cs.smith.edu/dftwiki/index.php/Tutorial:_Create_an_MPI_Cluster_on_the_Amazon_Elastic_Cloud_(EC2)
[StrClstrInst]: http://star.mit.edu/cluster/docs/latest/installation.html
[StrClstrQuickStart]: http://star.mit.edu/cluster/docs/latest/quickstart.html
[AwsIamUsr]: http://docs.aws.amazon.com/IAM/latest/UserGuide/Using_SettingUpUser.html
[AcctSttngs]: https://console.aws.amazon.com/billing/home#/account
[instances]: https://us-west-2.console.aws.amazon.com/ec2/v2/home?region=us-west-2#Instances:sort=monitoring
[IAMDash]: https://console.aws.amazon.com/iam/home#home
