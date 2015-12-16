---
layout: post
title: Using TeX in Mac OS X El Capitan
date:   2015-12-15 15:47:31
tags: mac os x, latex, el capitan
---

If you've recently upgraded to OS X El Capitan, and you're getting an error
message when trying to compile TeX, the reason is most likely due to one of
the new features in OS X El Capitan called [System Integrity Protection][SIP].

When I upgraded to Mac OS X El Capitan, all non-native items once installed in
`/usr`, including my simlink to my texbin
directory, were wiped out. This caused an error message when I tried to compile
a latex document:

>**Can't find required tool.**

>/usr/texbin/simpdftex does not exist. TeXShop is  a front end for TeX, but you also need a TeX distribution. Perhaps such a distribution was not installed or was removed during a system upgrade. If so, go to http://tug.org/MacTeX and follow the instructions to (re)install MacTeX. A less likely possibility is that a tool path is incorrectly configured in TeXShop preferences. This can happen if you are using the macports or fink distributions.

My TeX editor of choice is TeXShop, but I imagine this error occurs with other
TeX editors in OS X. The following solution should work independent of the
TeX editor.

When I tried to recreate the symbolic link, I received the following error message:

    sudo ln -s /usr/local/texlive/2014/bin/x86_64-darwin texbin
    ln: texbin: Operation not permitted

Looking into the [documentation][SIP], to recreate a symbolic link in the
`/usr` directory, SIP needs to be disabled. To do so, carry out the following
steps:

1. Reboot in "Recovery Mode" by restarting and holding down `Command`+`R`
2. Click Utilities -> Terminal
3. type `csrutil disable` and press `Enter`
4. Restart

Once your computer has restarted,  you can check if the operation was
successful by typing `csrutil status` at the command line. If all went
well, you should see the following:

    $csrutil status
    System Integrity Protection status: disabled

Next, recreate the symbolic link to the texbin directory:

```
sudo ln -s /usr/local/texlive/2014/bin/x86_64-darwin texbin
```

Once I did this, I could recompile TeX documents using TeXShop just fine!




[SIP]: https://developer.apple.com/library/mac/documentation/Security/Conceptual/System_Integrity_Protection_Guide/ConfiguringSystemIntegrityProtection/ConfiguringSystemIntegrityProtection/html
