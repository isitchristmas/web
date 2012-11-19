<?php

/**********************************************************************************
This is from the source to the hostip.info API, adapted for IIC.
Visit hostip.info to learn more about this community-driven geolocation database.
**********************************************************************************/

/************************************************************************\
|* Connect to the database
\************************************************************************/
function DBconnect($server, $user, $passwd, $dbase)
{
	global $db_server, $db_user, $db_passwd, $db_dbase;
	$db_server = $server;
	$db_user = $user;
	$db_passwd = $passwd;
	$db_dbase = $dbase;

  global $db;	
  $db  = mysql_pconnect($db_server, $db_user, $db_passwd) || 
         die("Cannot connect to the database");
  
  mysql_select_db($db_dbase) || 
  die("Cannot select database '$db_dbase'");
  
  return $db;
}

/***********************************************************************\
|* Code to check private netblocks (and maybe bogons in the future)
\***********************************************************************/
function isPrivate($ip)
{
	list($a,$b,$c,$d) = sscanf($ip, "%d.%d.%d.%d");
	if ( $a === null || $b === null || $c === null || $d === null ||
	     $a == 10   ||
	    ($a == 172  && $b >= 16 && $b <= 31) ||
	    ($a == 192  && $b == 168) ||
	     $a == 239  ||
	     $a == 0    ||
	     $a == 127)
	{
		return true;
	}

	return false;
}

/*************************************************************************\
|* Code to lookup an IP address in the database and return an associative
|* array contining country,city,and country code, assuming these are known
\*************************************************************************/
function ipLocate($_ip)
{
	$ip = trim($_ip);

	/*********************************************************************\
	|* Get the country and city (if available) for this /24
	\*********************************************************************/
	list($a,$b,$c,$d) = sscanf($ip, "%d.%d.%d.%d");

	/*********************************************************************\
	|* First check for illegal values
	\*********************************************************************/
	if(isPrivate($ip))
	{
		$info 	= array("a"=>$a, "b"=>$b, "c"=>$c, "country"=>"0", "city"=>"0",
		                "countryName"=>"(Private Address)", 
						"cityName"=>"(Private Address)", 
						"countryCode"=>"XX");
		return $info;
	}
		
	/*********************************************************************\
	|* Check it against the database for countries
	\*********************************************************************/
	$sql	= "SELECT * FROM ip4_$a WHERE b=$b AND c=$c";
	$result	= mysql_query($sql);

	if (@mysql_num_rows($result) == 0)
	{
		/*****************************************************************\
		|* Return with an 'unknown' if we can't find the a,b,c records
		\*****************************************************************/
		$info 	= array("a"=>$a, "b"=>$b, "c"=>$c, "country"=>"", "city"=>"",
		                "countryName"=>"(Unknown Country?)", 
						"cityName"=>"(Unknown City?)", 
						"countryCode"=>"XX");

//		mysql_query("INSERT INTO perform_api (cron, ip, hit) VALUES (NOW(), '$ip', 0)");
	}
	else
	{
		$info	= mysql_fetch_assoc($result);

		/*****************************************************************\
		|* Get the country and city from the DB as well. Not done using a
		|* LEFT JOIN since it seems to take longer(!) than doing the two
		|* SELECT's
		\*****************************************************************/
		$sql	= "SELECT name,lat,lng FROM cityByCountry WHERE city=".$info["city"];
		$result	= mysql_query($sql);
		$row	= mysql_fetch_row($result);
		$info["cityName"] = ($row[0] == "")  ? "(Unknown city)"    
		                                     : urldecode($row[0]);
		$info["lat"] = $row[1];
		$info["lng"] = $row[2];

		$sql	= "SELECT name,code FROM countries WHERE id=".$info["country"];
		$result	= mysql_query($sql);
		$row	= mysql_fetch_assoc($result);

		if($row["name"] == "")
		{
			$info["countryName"] = "(Unknown country)";
		}
		else
		{
			$info["countryName"] = $row["name"];
		}

		if($row["code"] == "")
		{
			$info["countryCode"] = "QQ";
		}
		else
		{
			$info["countryCode"] = $row["code"];
		}

//		mysql_query("INSERT INTO perform_api (cron, ip, hit) VALUES (NOW(), '$ip', 1)");
	}

	return $info;
}

function ipFastCoord($ip)
{
	/*********************************************************************\
	|* Get the country and city (if available) for this /24
	\*********************************************************************/
	list($a,$b,$c,$d) = sscanf($ip, "%d.%d.%d.%d");

	/*********************************************************************\
	|* First check for illegal values
	\*********************************************************************/
	if(isPrivate($ip))
	{
		return null;
	}

	/*********************************************************************\
	|* Check it against the database for countries
	\*********************************************************************/
	$sql	= "SELECT city FROM ip4_$a WHERE b=$b AND c=$c";
	$result	= mysql_query($sql);
	if(@mysql_num_rows($result) == 0)
	{
		return null;
	}
        $info   = mysql_fetch_assoc($result);

        /*****************************************************************\
        |* Get the country and city from the DB as well. Not done using a
        |* LEFT JOIN since it seems to take longer(!) than doing the two
        |* SELECT's
        \*****************************************************************/
        $sql    = "SELECT lat,lng FROM cityByCountry WHERE city=".$info["city"];
        $result = mysql_query($sql);
        $row    = mysql_fetch_row($result);
        $info["lat"] = $row[0];
        $info["lng"] = $row[1];

	return $info;
}

function getLocation($info)
{
        /*************************************************************************\
        |* Get the current location - with verbiage for missing ones
        \*************************************************************************/
        if ($info["country"] == "") {
					$outStr = " ... actually we haven't a clue.";
				} else if ($info["country"] == "0") {
					$outStr = "Private block address.";
				} else if ($info["city"] == 0) {
					$outStr = $info["countryName"];
        } else {
					$outStr = $info["cityName"].", " . htmlentities($info["countryName"]);
        }

				return $outStr;
}

function getCountry($id)
{
        /*************************************************************************\
        |* Get the country info
        \*************************************************************************/
        $sql    = "SELECT * FROM countries WHERE id=$id";
        $result = mysql_Query($sql);
        return mysql_fetch_assoc($result);
}

function getTotalEntryCount()
{
        /*************************************************************************\
        |* Get total entries count
        \*************************************************************************/
	$sql    = "SELECT COUNT(*) FROM city_xref";
	$result = mysql_query($sql);
	$row    = mysql_fetch_row($result);

	return $row[0];
}

function getFlag($info)
{
        /*************************************************************************\
        |* Get the flag name
        \*************************************************************************/
	$prefix = "/images/flags";
	if ($info["country"] == "0")
	{
		return $prefix."/priv-".$info["a"].".gif";
	}
	else
	{
        	return $prefix."/".strtolower($info["countryCode"]).".gif";
	}
}

function setFeedback($ip, $v)
{
	if($v == "") return "";

	/*********************************************************************\
	|* First check for illegal values
	\*********************************************************************/
	if(isPrivate($ip))
	{
		return "Cannot vote a private address.";
	}

	/*************************************************************************\
	|* Work out the variables
	\*************************************************************************/
	$y = ($v == "Y")?  1 : 0;
	$n = ($v == "N")?  1 : 0;

	/*************************************************************************\
	|* Check we haven't done any locations previously today
	\*************************************************************************/
	$sql = "SELECT cron FROM perform WHERE ip='$ip' AND YEARWEEK(NOW()) = YEARWEEK(cron)";
	$result = mysql_query($sql);
	if (mysql_num_rows($result) != 0)
	{
	        return "You can only vote once per week.";
	}
	else
	{
	        $sql = "INSERT INTO perform (cron,ip,Y,N) VALUES(NOW(),'$ip',$y,$n)";
	        mysql_query($sql);

	        return "Thank you for your feedback!";
	}
}

function add($cid, $state, $ip)
{
	/*************************************************************************\
	|* Get the details of the designated city
	\*************************************************************************/
	$sql		= "SELECT * FROM city WHERE id=$cid";
	$result		= mysql_query($sql);
	$M		= mysql_fetch_assoc($result);
	
	$country	= $M["country"];
	$name		= $M["name"];
	$lat		= $M["lat"];
	$lng		= $M["lng"];
	
	/*************************************************************************\
	|* Check to see if the city exists already in the cityByCountry database
	\*************************************************************************/
	$sql	= "SELECT * FROM cityByCountry 
	           WHERE name='$name' AND country=$country";
	$result	= mysql_query($sql);
	if (mysql_num_rows($result) == 0)
	{
		mysql_query("LOCK TABLES cityByCountry");
		
		$sql		= "SELECT MAX(city) FROM cityByCountry";
		$result		= mysql_query($sql);
		$row		= mysql_fetch_row($result);
		$cnum		= $row[0] + 1;
				
		$sql	= "INSERT INTO cityByCountry (city,country,name,lat,lng,state)
		           VALUES ($cnum, $country,'$name',$lat,$lng,'$state')";
		mysql_query($sql);
		
		$sql	= "SELECT * FROM cityByCountry 
	           	   WHERE name='$name' AND country=$country";
		$result	= mysql_query($sql);
		$C		= mysql_fetch_array($result);
		mysql_query("UNLOCK TABLES");
	}
	else
	{
		$C	= mysql_fetch_array($result);
	}

	/*************************************************************************\
	|* So we now have $C as a valid cityByCountry item
	\*************************************************************************/
	$city	= $C["city"];
	
	/*************************************************************************\
	|* If we have an 'unknown' ip address, mail
	\*************************************************************************/
	if ($ip == "unknown")
	{
		ob_start();
		var_dump($_SERVER);
		$server = ob_get_contents();
		ob_end_clean();

		list($a,$b,$c,$d) = sscanf($ip, "%d.%d.%d.%d");

		$sql 	= "SELECT * FROM ip4_$a WHERE b=$b AND c=$c";
		$result	= mysql_query($sql);
		$exist	= mysql_fetch_assoc($result);

		mail ("updates@hostip.info", "Found 'unknown' IP address", 
				"city    : $name\n".
				"newcity : $newcity\n".
				"ip      : $ip\n".
				"country : $country\n\n\n".
				"scripts/bin/ipshow $ip\n".
				"scripts/bin/ipcity $ip $city $country\n".
				"scripts/bin/ipnewcity $ip '$newcity' $country\n\n\n".
				$server."\n\n".$exist);
	}
	
	/*************************************************************************\
	|* If the referrer is not from here, then mail me as well
	\*************************************************************************/
/*
	if (strstr($_SERVER[HTTP_REFERER], "hostip.info") == "")
	{
		ob_start();
		var_dump($_SERVER);
		$server = ob_get_contents();
		ob_end_clean();

		list($a,$b,$c,$d) = sscanf($ip, "%d.%d.%d.%d");

		$sql 	= "SELECT * FROM ip4_$a WHERE b=$b AND c=$c";
		$result	= mysql_query($sql);

		ob_start();
		var_dump(mysql_fetch_assoc($result));
		$exist = ob_get_contents();
		ob_end_clean();
		
		mail ("updates@hostip.info", "Referrer not set - check site", 
				"city    : $name\n".
				"newcity : $newcity\n".
				"ip      : $ip\n".
				"country : $country\n\n\n".
				"scripts/bin/ipshow $ip\n".
				"scripts/bin/ipcity $ip $city $country\n".
				"scripts/bin/ipnewcity $ip '$newcity' $country\n\n\n".
				$server."\n\n".$exist);
	}
*/		
	/*************************************************************************\
	|* Update the record for this IP address
	\*************************************************************************/
#	$fp = fopen("/tmp/add.log", "a");
#	fputs($fp,"$ip|".$_SERVER["REMOTE_ADDR"]."|$city||$country|".date("Y-m-d H:i:s")."\n");
#	fclose($fp);

	list($a,$b,$c,$d) = sscanf($ip, "%d.%d.%d.%d");

	$sql 	= "SELECT COUNT(*) FROM ip4_$a WHERE b=$b AND c=$c";
	$result	= mysql_query($sql);
	$row	= mysql_fetch_row($result);
	$num	= $row[0];

	if ($num == 0)
	{
		mysql_query("INSERT INTO ip4_$a (b,c,country,city,cron) VALUES 
	            	 ($b,$c,$country,$city,NOW())");
	}
	else
	{
		mysql_query("UPDATE ip4_$a
            	 SET country=$country, city=$city
				 WHERE b=$b AND c=$c");
	}

	mysql_query("INSERT INTO ip4_add (cron, a, b, c, d, country, city)
            	 VALUES (NOW(), $a, $b, $c, $d, $country, $city)");
}

/************************************************************************\
|* Centralised code to get the remote IP address, even if it's behind a
|* proxy server.
\************************************************************************/

function getIp()
{
	if ($_SERVER["HTTP_X_FORWARDED_FOR"] != "")
	{
		$ip 	= $_SERVER["HTTP_X_FORWARDED_FOR"];
		// proxies _can_ return multiple ips
		$ip_array = explode(",", $ip);
		$ip = $ip_array[0];

		$nums 	= sscanf($ip, "%d.%d.%d.%d");
		if ($nums[0] === null ||
		    $nums[1] === null || 
			$nums[2] === null ||
			$nums[3] === null ||
			$nums[0] == 10   ||
		   ($nums[0] == 172  && $nums[1] >= 16 && $nums[1] <= 31) ||
		   ($nums[0] == 192  && $nums[1] == 168) ||
		    $nums[0] == 239  ||
		    $nums[0] == 0    ||
			$nums[0] == 127)
			$ip = $_SERVER["REMOTE_ADDR"];
	}
	else if ($_SERVER["HTTP_CLIENT_IP"] != "")
	{
		$ip 	= $_SERVER["HTTP_CLIENT_IP"];
		$nums 	= sscanf($ip, "%d.%d.%d.%d");
		if ($nums[0] === null ||
		    $nums[1] === null || 
			$nums[2] === null ||
			$nums[3] === null ||
			$nums[0] == 10   ||
		   ($nums[0] == 172  && $nums[1] >= 16 && $nums[1] <= 31) ||
		   ($nums[0] == 192  && $nums[1] == 168) ||
		    $nums[0] == 239  ||
		    $nums[0] == 0    ||
			$nums[0] == 127)
			$ip = $_SERVER["REMOTE_ADDR"];
	}
	else
		$ip = $_SERVER["REMOTE_ADDR"];
	
	return $ip;
}

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
