---
layout: post
title: Better Python Coding Practices
date:   2015-03-20 13:20:35
tags: codacy, coveralls, travis-ci, read the docs, python
---

Recently I've been interested in improving my coding practices, as
everyone should be. There are a few new tools that I have been
implementing that have already paid off in improving my end product.
In this blog post, I will describe some of these tools and show how
I got them up and running.

###Unit Testing
The first thing that **everyone** should do is [unit testing][wikiunit].
Unit testing ensures that bits of the code behave the way they are
expected to behave. This is done by writing simple test routines
that analyze the output of the code of interest.

Below is a simple example.

**Routine to test:**
{% highlight python %}
def multiply_numbers(num1, num2):
  return num1 * num2
{% endhighlight %}

**Test routine:**
{% highlight python %}
def test_multiply_numbers_with_scalars(2, 2):
  res = multiply_numbers(2, 2)
  assert len(res) == 1
{% endhighlight %}

This test ensures that the result the `multiply_numbers` function
is the length that we would expect it to be. For simple one-liners
 like `multiply_numbers`, there's no need to test, but functions
 and methods in the real world are almost always more complicated,
 and as the complexity increases testing can save a ton of time
 that would otherwise be spent debugging.

There are many libraries out there for testing python code, but
[nose][nose] looked the most appealing to me. How to set nose up
is detailed in their documentation. Personally, I used `pip` to
install it:

{% highlight sh %}
pip install nose
{% endhighlight %}

I then created a "tests" directory in my repository root directory
and started filling it with short test routines to test out every
function and possibility of my code. Then to test your code with
nose, simply type `nosetests` at the command line at the repository
root level. nose searches through your repository looking for test
code and executes the tests it finds. Here's an example of nose
successfully executing all 12 of test routines it found in my
repository path:

{% highlight sh %}
my_project$ nosetests
............
----------------------------------------------------------------------
Ran 12 tests in 0.014s

OK
my_project$
{% endhighlight %}


If you're curious what other testing packages exist out there for
python, I found the
[Hitchhiker's Guide to Python][hitchtest] to give an excellent
introduction to unit testing in python.


###Travis-CI

[Travis-CI][travis] is a continuous integration service. This allows for
automated testing of code upon pushes to a [github][github] repository.
This free tool for open source projects is great if you forget to run
`nosetests` after adding new functionality to your code and also if
your collaborating with others. It will probably take a little time
to get travis setup for your particular needs. The Travis-CI
[docs][travisdocs] are a good place to start, but I found their built
in python versions did not satisfy all of the dependencies for just
about any of my projects. Instead of building python and the
dependencies from scratch (e.g. numpy, scipy, pandas, etc),
continuum.io has a terrific solution with miniconda. I found
[this documentation][condatravis] to be quite helpful in setting up
travis-ci to work with my code. Once you get it working Travis-CI
provides a pretty badge that you can put in your repository README
to tell the world that your code has been tested, and (hopefully)
it passed!

Here's an example from one of my repositories of what the badge looks
like.

[![Build Status](https://travis-ci.org/mattgiguere/pyutil.svg?branch=master)](https://travis-ci.org/mattgiguere/pyutil)

If you push a commit to github that doesn't pass testing, it turns
red and says "failed". Don't worry, you'll also receive an email
notification informing you of the change in status so you can
quickly repair the damages.

###Coveralls

Now you have testing setup, and you have travis-ci setup to
perform continuous integration and make sure your latest commit
is performing the way you expect it to! But *how much* of the
code is actually being tested? Travis-CI will tell you if all
of the tests you made ran successfully, but what if you are only
testing a tiny fraction of one of your routines? That's where
[coveralls][coveralls] comes in to play. Coveralls automatically
analyzes your tests and code to see what fraction of your code
is actually being covered by your tests. Not only does it check
to see if all of your subroutines and methods are being tested,
but if actually looks into all of the conditional cases to make
sure all of the exceptional cases are being handled (i.e., it
looks to make sure you're testing all of the
[edge cases][edges]).




[travis]: https://travis-ci.org
[github]: https://github.com
[wikiunit]: http://en.wikipedia.org/wiki/Unit_testing
[nose]: https://nose.readthedocs.org/en/latest/
[hitchtest]: http://docs.python-guide.org/en/latest/writing/tests/
[travisdocs]: http://docs.travis-ci.com/user/languages/python/
[condatravis]: http://conda.pydata.org/docs/travis.html
[coveralls]: https://coveralls.io
[edges]: http://en.wikipedia.org/wiki/Edge_case
