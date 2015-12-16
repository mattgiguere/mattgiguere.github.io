---
layout: post
title: Installing Jekyll on Mac OS X El Capitan
date:   2015-12-16 7:43:40
tags: mac os x, el capitan, jekyll
---

After upgrading from Yosemite to El Capitan, one of [several issues][osxissues]
I had was that Jekyll no longer worked. Similar to the issue I had with
LaTex, this seems to be related to the new feature in El Capitan known as
[System Integrity Protection][SIP].

The error message I received stated:

    gem install jekyll
    ERROR:  While executing gem ... (Gem::FilePermissionError)
        You don't have write permissions for the /Library/Ruby/Gems/2.0.0 directory.

This can be overcome by installing a new version of ruby using homebrew, and
then installing jekyll. @chmaynard was kind enough to put togher a nice
description of the [steps necessary][jekyllsteps], which are described below
for convenience:

- Install the Xcode command line utilities xcode-select --install
- Install Homebrew: `ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"``
- Install the latest ruby via homebrew: `brew install ruby`
- Install the latest Jekyll: `gem install jekyll`

After that, jekyll worked for me without further problems.

[osxissues]: {% post_url 2015-12-16-Issues_with_Mac_OS X_El_Capitan %}
[SIP]:https://developer.apple.com/library/mac/documentation/Security/Conceptual/System_Integrity_Protection_Guide/Introduction/Introduction.html#//apple_ref/doc/uid/TP40016462-CH1-DontLinkElementID_15
[jekyllsteps]: https://github.com/jekyll/jekyll/issues/3984
