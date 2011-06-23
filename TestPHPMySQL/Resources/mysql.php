$db_host = 'localhost';
$db_user = 'root';
$db_pwd = 'app123';

$database = 'test';
$table = 'contacts';

if (!mysql_pconnect($db_host, $db_user, $db_pwd))
    die("Can't connect to database");

if (!mysql_select_db($database))
    die("Can't select database");
	 
$query="CREATE TABLE contacts (id int(6) NOT NULL auto_increment,
								first varchar(15) NOT NULL,
								last varchar(15) NOT NULL,
								phone varchar(20) NOT NULL,
								mobile varchar(20) NOT NULL,
								fax varchar(20) NOT NULL,
								email varchar(30) NOT NULL,
								web varchar(30) NOT NULL,PRIMARY KEY (id),
								UNIQUE id (id),
								KEY id_2 (id))";
mysql_query($query);

$query = "INSERT INTO contacts VALUES ('',
										'John',
										'Smith',
										'408 555 1212',
										'408 835 4598',
										'408 343 3434',
										'johns@smith.com',
										'http://www.smith.com')";
mysql_query($query);
										
$query = "INSERT INTO contacts VALUES ('',
										'Tom',
										'Johnston',
										'408 444 3535',
										'408 4589 3336',
										'408 3398 5586',
										'tomj@johnston.com',
										'http://www.johnston.com')";
mysql_query($query);

$query = "INSERT INTO contacts VALUES ('',
										'Bill',
										'Walker',
										'408 4455 2222',
										'408 333 7755',
										'408 222 7755',
										'billw@walker.com',
										'http://www.walker.com')";
mysql_query($query);

$query = "INSERT INTO contacts VALUES ('',
										'Sam',
										'Jones',
										'408 555 8844',
										'408 339 4465',
										'408 4444 6767',
										'cauld@jones.com',
										'http://www.jones.com')";
mysql_query($query);

$query = "SELECT * FROM contacts where last = 'Walker'";
						
$result = mysql_query($query);
if (!$result) {
    die("Query to show fields from table failed");
}

while ($row=mysql_fetch_row($result))
{
	// $return = $row['first'] + $row['last'] + $row['phone'] + $row['mobile'] + $row['fax'] + $row['email'] + $row['web'];
	$use_my_php_data($row);
}

$use_my_php_data("Done!");

mysql_free_result($result);
						
	
