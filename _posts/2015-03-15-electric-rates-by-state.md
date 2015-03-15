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

<script type='text/javascript' src='https://public.tableau.com/javascripts/api/viz_v1.js'></script><div class='tableauPlaceholder' style='width: 1004px; height: 800px;'><noscript><a href='#'><img alt='Dashboard 1 ' src='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;el&#47;electricRatesByState201411&#47;Dashboard1&#47;1_rss.png' style='border: none' /></a></noscript><object class='tableauViz' width='1004' height='800' style='display:none;'><param name='host_url' value='https%3A%2F%2Fpublic.tableau.com%2F' /> <param name='site_root' value='' /><param name='name' value='electricRatesByState201411&#47;Dashboard1' /><param name='tabs' value='no' /><param name='toolbar' value='yes' /><param name='static_image' value='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;el&#47;electricRatesByState201411&#47;Dashboard1&#47;1.png' /> <param name='animate_transition' value='yes' /><param name='display_static_image' value='yes' /><param name='display_spinner' value='yes' /><param name='display_overlay' value='yes' /><param name='display_count' value='yes' /><param name='showVizHome' value='no' /><param name='showTabs' value='y' /></object></div>

[eiamon]: http://www.eia.gov/electricity/monthly/epm_table_grapher.cfm?t=epmt_5_6_a
