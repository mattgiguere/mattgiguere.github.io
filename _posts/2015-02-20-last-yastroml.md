---
layout: post
title: The Last YastroML
date:   2015-02-20 17:30:48
tags: python, IPython notebook, time series analysis, YastroML
---

Yesterday we concluded [YastroML][YastroML], the Yale astronomy Machine
Learning Discussion Group. Over the past year we have been irregularly meeting
to go over the newly released textbook [Statistics, Data Mining, and Machine
Learning in Astronomy][astromltxt]: a textbook that, as its name implies, goes
over a variety of statistical, data mining, and machine learning techniques
that are relevant to astronomy. As I was looking into ordering the book, I
noticed on twitter that a group of people at Columbia and other institutions
in NYC had started up a discussion group to go over the material, which they
referred to as [NYCastroML][NYCastroML]. This sounded like a terrific idea, and
I immediately decided that I'd try to take part in this weeklyish events. I
started crafting an email to inform other people in the Yale astronomy
Department about the event, and my list of people to include grew, and grew,
and grew... I decided that instead I'd send an email out to the department
to gauge interest in organizing something here at Yale. The response was
overwhelming --- [YastroML][YastroML] was born.

We started meeting weekly in March of the Spring 2014 semester; we stuck to our
weekly schedule fairly well until the end of the semester. Academics always
seem to think they will have plenty of free time come summer. In practice,
between conferences, workshops, summer schools, and extra curricular
activities, that never seems to be the case. With the end of the Spring
Semester came the end of our weekly schedule. We met sporadically since then,
and our meeting yesterday marked the completion of the final chapter.

In this last meeting we covered time series analysis. Major topics included

 - Discrete Fourier Transforms
 - Periodograms
 - Digital Filtering
 - Wavelets and Matched Filtering
 - Classification of periodic phenomena
 - Analysis of arrival time data
 - Analysis of Stochastic Processes

I put together an [IPython notebook][Chapter10] to lead the discussion. Having
dealt with time series analysis for the past several years while analyzing
RV measurements and light curves, I was comfortable with a lot of the material,
and added several examples and interactive components to the notebook to make
the session a little more pedagogical.

Some of the highlights for me in this chapter were:

- seeing how easy it is to implement wavelets in python using [PyWavelets]
[PyWavelets]
- The use of truncated Fourier Series for searching for signals that may have
  multiple reoccurring features, such as eclipsing binaries
- The nonparametric Gregory-Loredo technique when dealing with sparse data sets

Afterwards a few of us got together for a celebratory dram and to discuss how
the discussion group can be improved for the next time around.

[YastroML]: https://github.com/YastroML/YastroML
[astromltxt]: http://press.princeton.edu/titles/10159.html
[NYCastroML]: https://github.com/adrn/NYCastroML
[Chapter10]: http://nbviewer.ipython.org/github/YastroML/YastroML/blob/master/Session19_150219/Ch10_TimeSeries.ipynb
[PyWavelets]: http://www.pybytes.com/pywavelets/
