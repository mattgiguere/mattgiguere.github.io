---
layout: post
title: Time Lapse MAO
date:   2015-03-18 12:22:10
tags: MAO, ffmpeg, Yale, Instrumentation, mp4, time lapse
---

The Yale Astronomy Department is putting together a video showcasing some of
the work going on in the department. All of the parts recently arrived for the
Moletai Astronomical Observatory (MAO) Spectrograph that our group is
building. The timing seems perfect, so the videographer in charge setup a
couple cameras to capture the initial build of the spectrograph.

The photographer sent all of the stills in advance, and we couldn't wait to
see what the final time lapse would like, so I made a few time lapse videos
myself using `ffmpeg`.

###Setting up ffmpeg

To put this together, I needed to install ffmpeg. This turned out to be a \
little challenging. I tried the normal homebrew install:

{% highlight sh %}
brew install ffmpeg
{% endhighlight %}

This worked! I then added a symbolic link to add it to my path:

{% highlight sh %}
cd /usr/local/bin
sudo ln -s /usr/local/Cellar/ffmpeg/2.5.3/bin/ffmpeg ffmpeg
{% endhighlight %}

Unfortunately, when I tried to get help on ffmpeg, here's what it
returned:

{% highlight sh %}
ffmpeg --help
dyld: Library not loaded: /usr/local/lib/libx264.142.dylib
  Referenced from: /usr/local/bin/ffmpeg
  Reason: image not found
Trace/BPT trap
{% endhighlight %}

I then did a search for this .dylib. homebrew installed it:

{% highlight sh %}
cd /usr/local/Cellar
find . -name libx264.142.dylib
./x264/r2495/lib/libx264.142.dylib
{% endhighlight %}

I just needed to add it to my path:

{% highlight sh %}
cd /usr/local/bin
sudo ln -s /usr/local/Cellar/x264/r2495/lib/libx264.142.dylib libx264.142.dylib
{% endhighlight %}

I repeated this for a few more packages homebrew installed that were not in my
path:

{% highlight sh %}
sudo ln -s /usr/local/Cellar/x264/r2495/lib/libx264.142.dylib libx264.142.dylib
sudo ln -s /usr/local/Cellar/libvo-aacenc/0.1.2/lib/libvo-aacenc.0.dylib libvo-aacenc.0.dylib
sudo ln -s /usr/local/Cellar/lame/3.99.5/lib/libmp3lame.0.dylib libmp3lame.0.dylib
{% endhighlight %}

Finally, `ffmpeg -h` returned the help, as expected.

I found [this page][ffmpegwiki]
on the ffmpeg wiki to be helpful in creating the time lapse. And
[Section 7.3][ffmpeg] of the documentation too.

The files I wanted to add were stored in a folder named Bench-View_JPG. They
were in sequential order, but they didn't start at 0. The easiest way to add
them all to the movie was the use the `pattern_type` optional argument in
conjunction with `glob`. The other options I used were:

- -*framerate*: the number of frames per second to input
 -*r*: the number of frames per second in the output video
 - *s*: the size of the output video

I wanted my video to be 1080p HD, and the final video to be called
`BenchMovie1080p11fps.mp4`, so I used the following command:

{% highlight sh %}
ffmpeg -framerate 11 -pattern_type glob -i 'Bench-View_JPG/*.jpg' -r 11 -s 1620x1080 BenchMovie1080p11fps.mp4
{% endhighlight %}

The result can be seen below.

<video width="100%" height="auto" controls>
  <source src="/images/BenchMovie1080p11fps.mp4" type="video/mp4">
Your browser does not support the video tag.
</video>


[ffmpegwiki]: https://trac.ffmpeg.org/wiki/Create%20a%20video%20slideshow%20from%20images
[ffmpeg]: https://ffmpeg.org/ffmpeg.html#Video-and-Audio-file-format-conversion
