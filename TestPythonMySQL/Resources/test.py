#!/usr/bin/env python

import os
import sys
import fnmatch
import glob
import MySQLdb
   
use_my_python_data("**** from Python ****");

db = MySQLdb.connect (host = 'localhost', user = 'root', passwd = 'testpassword', db = 'test')

cursor = db.cursor();
cursor.execute("select firstname,lastname, last_updated from users order by lastname");
rows = cursor.fetchall();
for row in rows:
	use_my_python_data(row[0] + ' ' + row[1])

cursor.close();
db.close();
sys.exit(0);
