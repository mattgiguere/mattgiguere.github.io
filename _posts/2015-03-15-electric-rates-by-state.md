---
layout: post
title: Electric Rates By State
date:   2015-03-15 16:19:59
tags: csvkit, javascript, bootstrap, d3.js
---

I was talking with my mother-in-law the other day, and we were wondering what
the highest electric rates in the country are. The US Energy Information
Administration does an excellent job of collecting this information and
displaying it in tabular form on their website. Click [here][eiamon] to see
what the answer is for the latest month. However, there is enough data in that
table that it took me a minute to skim through, understand every row and
column, and understand the answer to our question. I felt like this data set
deserved a better visualization, so I created it.

<script type='text/javascript' src='https://public.tableau.com/javascripts/api/viz_v1.js'></script><div class='tableauPlaceholder' style='width: 1004px; height: 675px;'><noscript><a href='#'><img alt='Dashboard 1 ' src='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;el&#47;electricRatesByState201411&#47;Dashboard1&#47;1_rss.png' style='border: none' /></a></noscript><object class='tableauViz' width='1004' height='675' style='display:none;'><param name='host_url' value='https%3A%2F%2Fpublic.tableau.com%2F' /> <param name='site_root' value='' /><param name='name' value='electricRatesByState201411&#47;Dashboard1' /><param name='tabs' value='no' /><param name='toolbar' value='yes' /><param name='static_image' value='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;el&#47;electricRatesByState201411&#47;Dashboard1&#47;1.png' /> <param name='animate_transition' value='yes' /><param name='display_static_image' value='yes' /><param name='display_spinner' value='yes' /><param name='display_overlay' value='yes' /><param name='display_count' value='yes' /><param name='showVizHome' value='no' /><param name='showTabs' value='y' /></object></div>

I was surprised by both the state with the highest and the state with the
lowest electric rates. Hawai'i has by far the highest average electric rate,
 at 37.6 ¢/kWh, and Washington State has the lowest rate, at only 8.8 ¢/kWh.

The US EIA also provides a trove of data on many different parameters. I was
then interested to find out who spends the largest fraction of their income
on electric. The US EIA does not provide that information directly, but they
do publish the total retail sales per state.

The [US Census Bureau publish][uscbpops] another excellent data set tabulating
the estimated population per state per year. I combined these two data sets
using `pandas` in Python (see bottom of post for details),
and the resulting average per capita energy use by state can be seen below.

<script type='text/javascript' src='https://public.tableau.com/javascripts/api/viz_v1.js'></script><div class='tableauPlaceholder' style='width: 1004px; height: 675px;'><noscript><a href='#'><img alt='Dashboard 1 ' src='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;en&#47;energyUsagePerCap201411YTD&#47;Dashboard1&#47;1_rss.png' style='border: none' /></a></noscript><object class='tableauViz' width='1004' height='675' style='display:none;'><param name='host_url' value='https%3A%2F%2Fpublic.tableau.com%2F' /> <param name='site_root' value='' /><param name='name' value='energyUsagePerCap201411YTD&#47;Dashboard1' /><param name='tabs' value='no' /><param name='toolbar' value='yes' /><param name='static_image' value='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;en&#47;energyUsagePerCap201411YTD&#47;Dashboard1&#47;1.png' /> <param name='animate_transition' value='yes' /><param name='display_static_image' value='yes' /><param name='display_spinner' value='yes' /><param name='display_overlay' value='yes' /><param name='display_count' value='yes' /><param name='showVizHome' value='no' /><param name='showTabs' value='y' /></object></div>

It's interesting to see that the states with some of
the highest energy prices use the least amount of energy, and some of the
states with the lowest energy prices use the highest amount of energy per
capita.

###Appendix

All of the following code can be found in my
[github repository][ghelectric]
 on energy consumption in the United States.

####Combining Energy Use and Population Data

The US EIA provide data about energy use. The US Census Bureau provide data on
the US population. To find the average kWh used per capita, we need to combine
the two data sets. This can be done within Python easily with the pandas
Library.

{% highlight python %}
import pandas as pd
dfe = pd.read_excel('../data/january2015/Table_5_04_B.xlsx', skiprows=3, header=0)
dfp =
{% endhighlight %}



[eiamon]: http://www.eia.gov/electricity/monthly/epm_table_grapher.cfm?t=epmt_5_6_a
[uscbpops]: http://www.census.gov/popest/data/national/totals/2014/index.html
[ghelectric]: https://github.com/mattgiguere/electric
