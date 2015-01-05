---
layout: post
title: Out of Range Table
date:   2015-01-04 18:53:10
tags: mysql
---

I looked into a problem that occurred recently when adding observations to the `spectra` table over break. The error message was

{% highlight sql %}
DataError: (1264, u"Out of range value for column 'spec_id' at row 305")
{% endhighlight %}

This was due to using a normal `INT` type for the index. The fix is quite simple in MySQL, you can change the type using the command:

{% highlight sql %}
ALTER TABLE table_name MODIFY column_name BIGINT;
{% endhighlight %}

In my specific case the command was

{% highlight sql %}
ALTER TABLE spectra MODIFY spec_id BIGINT;
{% endhighlight %}

Using `BIGINT` for the type will allow for up to [9 Quadrillion](http://dev.mysql.com/doc/refman/5.5/en/integer-types.html) rows in the table! That should last for a while.
