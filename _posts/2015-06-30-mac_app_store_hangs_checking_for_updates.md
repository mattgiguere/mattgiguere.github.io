---
layout: post
title: Mac App Store Hanging While "Checking for updates..."
date:   2015-06-30 18:18:28
tags: mac os x
---

For the past day the Mac App Store has hung on the "Updates" tab with a
"Checking for updates..." message in the top right corner. The version
of the OS was Mac OS X 10.10.3, and I'm using a MacBook Pro (Retina, Mid 2012)
laptop.

I tried (in this order):

- restarting the App Store App
- restarting the computer
- repairing disk permissions from the normal partition
- restarting while holding option to boot from the recovery partition, and then
again "Repair Disk Permissions" and "Repair Disk"
- reseting the [PRAM](https://support.apple.com/kb/PH11243?locale=en_US&viewlocale=en_US)
- reseting the [SMC](https://support.apple.com/en-us/HT201295)

None of these tricks worked. Then, I found
[this gem](https://discussions.apple.com/message/28416971#28416971) of a solution!

In brief, to fix a hanging Mac App Store, run the software update from the
command line using this command:

    sudo softwareupdate -i -a

Issuing the above command installed the Mac OS X Command Line Tools update and
the Mac OS X 10.10.4 update for me. After restarting my computer, I could
then install the remaining third party updates.
