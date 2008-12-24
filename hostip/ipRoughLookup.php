<?php 

/*************************************************************************\
|* Code to lookup an IP address in the database and return an associative
|* array contining country,city,and country code, assuming these are known
\*************************************************************************/
function ipRoughLocate($ip)
{
	/*********************************************************************\
	|* Get the country and city (if available) for this /24
	\*********************************************************************/
	list($a,$b,$c,$d) = sscanf($ip, "%d.%d.%d.%d");
	$guessed = "false";

	/*********************************************************************\
	|* First check for illegal values
	\*********************************************************************/
	if(isPrivate($ip))
	{
		$info 	= array("a"=>$a, "b"=>$b, "c"=>$c, "country"=>"0",
		                "city"=>"0",
		                "countryName"=>"(Private Address)", 
						"cityName"=>"(Private Address)", 
						"countryCode"=>"XX");
		$info["guessed"] = $guessed;
		return $info;
	}

	/*********************************************************************\
	|* Check it against the database for countries
	\*********************************************************************/
	$sql	= "SELECT * FROM ip4_$a WHERE b=$b AND c=$c";
	$result	= mysql_query($sql);

	if (mysql_num_rows($result) == 0)
	{
		$info 	= array("a"=>$a, "b"=>$b, "c"=>$c, "country"=>"", "city"=>"",
		                "countryName"=>"(Unknown Country?)", 
						"cityName"=>"(Unknown City?)", 
						"countryCode"=>"XX");
		$info["guessed"] = $guessed;
	}
	else
	{
		$info	= mysql_fetch_assoc($result);

		/*****************************************************************\
		|* If the city is '0', then try again, with a broader range of
		|* possible 'c' matches
		\*****************************************************************/
		if ($info["city"] == 0)
		{
			$lo = ($c < 8) ? 0 : $c-8;
			$hi = ($c > 246) ? 255 : $c+8;
			
			$sql = "SELECT * FROM ip4_$a
			        WHERE b=$b 
					AND c >= $lo 
					AND c <= $hi
					AND city != 0";
			$result	= mysql_query($sql);
			if (mysql_num_rows($result) > 0)
				$info = mysql_fetch_assoc($result);

			$guessed = "true";
		}
			
		/*****************************************************************\
		|* Get the country and city from the DB as well. Not done using a
		|* LEFT JOIN since it seems to take longer(!) than doing the two
		|* SELECT's
		\*****************************************************************/
		$sql	= "SELECT name,lat,lng FROM cityByCountry WHERE city=".$info["city"];
		$result	= mysql_query($sql);
		$row	= mysql_fetch_row($result);
		$info["cityName"] = ($row[0] == "")    ? "(Unknown city)"    : $row[0];
                $info["lat"] = $row[1];
                $info["lng"] = $row[2];

		$sql	= "SELECT name,code FROM countries WHERE id=".$info["country"];
		$result	= mysql_query($sql);
		$row	= mysql_fetch_assoc($result);
		$info["countryName"] = ($row["name"] == "") ? 
		                       "(Unknown country)" : $row["name"];
		$info["countryCode"] = ($row["code"] == "")  ? 
		                       "QQ"                : $row["code"];

		$info["guessed"] = $guessed;
	}
		
	return $info;
}

?>
