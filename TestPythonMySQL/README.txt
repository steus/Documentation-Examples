This example requires that you have a database setup on MySQL of the host
which this is running on, named test.

The app will use Python to call the MySQL database, creating a cursor, and 
fetch the rows of data. As it loops through parsing the rows, 
calls the javascript function use_my_python_data() to send the data back 
to the javascript side.

