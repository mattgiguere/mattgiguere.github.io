---
layout: post
title: Stellar Spot Modeling
date:   2015-02-10 18:35:53
tags: python, imagemagick, simulation, animation, pandas
---

Over the past two days I worked on fitting the simultaneous MOST photometry
and CHIRON RV measurements of Epsilon Eridani. For starters I downsampled
the MOST photometry to a running mean in 8 hour bins. This greatly reduced
the noise and made the number of observations comparable to the RV
measurements.

After finding out over the weekend that the times we stored in IDL data
structures (and published over the last 6 years) were erroneous, I used
the exposure meter midpoints from the MySQL database instead:

{% highlight python %}
cmd = "SELECT emmnwob, mnvel, errvel FROM exposuremeter e "
cmd += "INNER JOIN velocities v ON v.observation_id = e.observation_id "
cmd += "INNER JOIN observations o ON o.observation_id = e.observation_id "
cmd += "WHERE object=22049 AND tag='a' AND mnvel IS NOT NULL"

engine = ccdb.connectChironDB()

eerv = pd.read_sql_query(cmd, engine)
{% endhighlight %}

And converted the exposure meter midpoints to Julian Dates using
the `pandas` `DatetimeIndex` and `to_julian_date()` methods:

{% highlight python %}
emmnwobjds = pd.DatetimeIndex(eerv.emmnwob)
eerv['emmnwobjd'] = emmnwobjds.to_julian_date()
{% endhighlight %}

The next step was to restore the MOST data from file and downsample by taking a
running mean. Downsampling reduced the noise and provided a data set that could
be combined with the RV measurements without completely dominating the solution.
Both restoring the data and downsampling can also easily be accomplished in
pandas with a little help from the `Time` method in `astropy`:

{% highlight python %}
from astropy.time import Time
#restore data
eeph = pd.read_csv('epsEriMost.txt', sep='\s+', skipinitialspace=True)
#create JD astropy Time object for easy conversion to ISO format:
MostJds = Time(eeph.MJD + 2451545., format='jd')
#now store as DatetimeIndex
eeph['ObsDT'] = pd.DatetimeIndex(MostJds.isot)

#next create a one column series of flux values with the observation
#time as the index:
eemr = pd.Series(data = eeph['flux'].values, index=eeph['ObsDT'])
mhc = {'Mean' : np.mean}
downsampledtimes = eemr.resample("480min", how = mhc).index.to_julian_date()
downsampledflux = eemr.resample("480min", how = mhc)
{% endhighlight %}

Since the MOST data have reported homoscedastic errors (a rarity in astronomy)
this worked out. Otherwise, we'd need to take a weighted mean.

For a first step in fitting the spectroscopic and photometric data to
create a self-consistent spot model describing the star I used the maximum
likelihood approach.

`\[
\sigma
\]`

$$\chi$$

hih

where is chi?

$\theta$

hello theta?

{% highlight latex %}
$$\sigma$$
{% endhighlight %}
