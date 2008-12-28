<?php

require 'hostip.php';


// Accepts: A time
// Returns: Whether or not it is Christmas
function isItChristmas($time = null) {
  // May as well uncomment this from 12/27 through 12/23
  // return "NO";
  
  // set Christmas
  $christmas = "12/25";
  $ip = getIp(); 
  
  // debug: 
  // $ip = "193.51.208.14"; // French IP
  // $christmas = "12/24";
  
  $location = null;
  
  if ($ip) {
    // db credentials, see db.php.example
    require 'db.php';
    DBconnect($server, $username, $password, $database);
    
    $location = ipRoughLocate($ip);
    
    // if we don't know the country, let's assume eastern time (mediocre)
    if ($location["countryName"] == "(Unknown Country?)")
      $local_time = easternTime($time);
    else
      $local_time = trueLocalTime($time, $location["lng"]);
  }
  else {
    $local_time = easternTime($time);
  }
  
  $isit = (strftime("%m/%d", $local_time) == $christmas);
  
  return $isit ? yes($location) : "NO";
}

// used to produce a country code for the JS to work with
function getCountryCode() {
  
  $ip = getIp(); 
  // debug: 
  // $ip = "193.51.208.14"; // French IP
  // $ip = "71.164.115.181"; // US IP
  
  $location = null;
  if ($ip) {
    // db credentials, see db.php.example
    require 'db.php';
    DBconnect($server, $username, $password, $database);
    
    $location = ipRoughLocate($ip);
  }
  
  if (!$location || !$location["countryCode"] || $location["countryName"] == "(Unknown Country?)")
    return "US";
  else
    return $location["countryCode"];
}


// Helper functions

function trueLocalTime($time, $longitude) {

  // establish the GMT time we're talking about
  if (!$time) 
    $time = gmmktime();
  else
    $time = gmmktime() - (time() - $time);
  $time += (8 * 3600); // Dreamhost's box thinks PST is GMT, awesome

  // estimate time zone from longitude (an hour for every 15 degrees from GMT)
  $offset = floor($longitude / 15);
  $true_local_time = $time + ($offset * 3600);

  return $true_local_time;
}

function easternTime($time) {
  if (!$time) $time = time();
  $time += (3 * 3600); // Dreamhost is in PST, no matter what you say
  return $time;
}

function yes($location) {
  if (!$location || !$location["countryCode"] || $location["countryName"] == "(Unknown Country?)")
    return "YES";
    
  $code = $location["countryCode"];
  
  // This array is IsItChristmas' sole IP
  $codes = array(
    "US" => "YES", // United States
    "FR" => "OUI", // France
    "NL" => "JA", // Netherlands
    "ZA" => "JA", // South Africa
    "ES" => "SÍ", // Spain
    "UK" => "YES", // United Kingdom
    "CA" => "YES/OUI", // Canada (English/French)
    "PL" => "TAK", // Poland
    "SE" => "JA", // Sweden
    "LT" => "TAIP", // Lithuania
    "DE" => "JA", // Germany
    "IE" => "IS EA", // Ireland
    "AU" => "YES", // Australia
    "JP" => "HAI", // Japan
    "NO" => "JA", // Norway
    "IT" => "SÌ", // Italy
    "HU" => "IGEN", // Hungary
    "DK" => "JA", // Denmark
    "FI" => "KYLLÄ", // Finland
    "BE" => "JA", // Belgium
    "CL" => "SÍ", // Chile
    "MX" => "SÍ", // Mexico
    "NZ" => "YES", // New Zealand
    "AT" => "JA", // Austria
    "RO" => "DA", // Romania
    "CH" => "JA/OUI", // Switzerland (German/French)
    "PT" => "SIM", // Portugal
    "BR" => "SIM", // Brazil
    "AR" => "SÍ", // Argentina
    "EE" => "JAA", // Estonia
    "HR" => "DA", // Croatia
    "CN" => "SHI", // China (Mandarin)
    "IN" => "HAJI", // India
    "SG" => "YA", // Singapore
    "PH" => "ÓO", // Phillipines
    "IL" => "KEN", // Israel
    "KR" => "NE", // Korea
    "CZ" => "ANO", // Czech Republic
    "SK" => "ÁNO", // Slovakia
    "GR" => "NE", // Greece
    "IS" => "JÁ", // Iceland
    "VE" => "SÍ", // Venezuela
    "SI" => "DA", // Slovenia
    "TH" => "CHAI", // Thailand
    "LV" => "JA", // Latvia
    "RU" => "DA", // Russia
    "HK" => "HAI", // Hong Kong (Cantonese)
    "TR" => "EVET", // Turkey
    "MY" => "YA", // Malaysia
    "PR" => "SÍ", // Puerto Rico
    "CO" => "SÍ", // Colombia
    "EC" => "SÍ", // Ecuador
    "PE" => "SÍ", // Peru
    "CR" => "SÍ", // Costa Rica
    "UY" => "SÍ", // Uruguay
    "CY" => "NE", // Cyprus
    "GT" => "SÍ", // Guatemala
    "SV" => "SÍ", // El Salvador
    "DO" => "SÍ", // Dominican Republic
    "BM" => "SIM", // Bermuda
    "PA" => "SÍ", // Panama
    "BO" => "SÍ", // Bolivia
    "TT" => "SÍ", // Trinidad & Tobago
    "DM" => "WÍ", // Dominica (Creole)
    "HT" => "WÍ", // Haiti (Creole)
    "JM" => "YES", // Jamaica
    "BB" => "YES", // Barbado
    "BZ" => "YES", // Belize
    "KY" => "YES", // Cayman Islands
    "NI" => "SÍ", // Nicaragua
    "PY" => "HÊE", // Paraguay
	"VN" => "ĐÚNG" // Vietnam
  );

  if (!$codes[$code])
    return "YES";
  else
    return $codes[$code];
}

?>
