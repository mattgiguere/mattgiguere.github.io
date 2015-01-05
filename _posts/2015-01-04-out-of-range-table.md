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

However, `spec_id` is also auto incrementing and the PRIMARY KEY for
my table. Here is the description of `spec_id` BEFORE ALTERing the
TABLE:

{% highlight sql %}
mysql> describe spectra;
+----------------+--------------+------+-----+---------+----------------+
| Field          | Type         | Null | Key | Default | Extra          |
+----------------+--------------+------+-----+---------+----------------+
| spec_id        | int(11)      | NO   | PRI | NULL    | auto_increment |
{% endhighlight %}

Since there is already a PRIMARY KEY set (spec_id), MySQL will produce an
error if PRIMARY KEY is specified when attempting to MODIFY the TABLE.
Fortunately, this does not matter &mdash; the spec_id column will
remain the primary key even if PRIMARY KEY is not specified. However, `AUTO_INCREMENT` **does** need to be specified when altering the column.

{% highlight sql %}
ALTER TABLE table_name MODIFY column_name BIGINT AUTO_INCREMENT;
{% endhighlight %}

In my specific case the command used to change my MySQL column
from an `INT` type to `BIGINT` was

{% highlight sql %}
ALTER TABLE spectra MODIFY spec_id BIGINT AUTO_INCREMENT;
{% endhighlight %}

which resulted in

{% highlight sql %}
mysql> describe spectra;
+------------+------------+------+-----+---------+----------------+
| Field      | Type       | Null | Key | Default | Extra          |
+------------+------------+------+-----+---------+----------------+
| spec_id    | bigint(20) | NO   | PRI | NULL    | auto_increment |
{% endhighlight %}



Using `BIGINT` for the type will allow for up to [9 Quadrillion](http://dev.mysql.com/doc/refman/5.5/en/integer-types.html) rows in the table! That should last for a while.
