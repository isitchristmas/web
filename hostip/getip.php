<?php

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

?>
