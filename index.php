<?php header('Content-Type: text/html'); ?>

<?php 
require 'iic.php';
$answer = isItChristmas();
$countryCode = getCountryCode();
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <title>Is it Christmas?</title>
  <link rel="alternate" title="Is It Christmas?" href="rss.xml" type="application/rss+xml" />
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <script type="text/javascript" src="iic.js"></script>
</head>

<body style="text-align: center; padding-top: 200px;">

  <a href="http://github.com/isit/christmas" 
    style="font-weight: bold; 
          font-size: 120pt; 
          font-family: Arial, sans-serif; 
          text-decoration: none; 
          color: black;" 
    title="CODE"
    id="answer">
    <noscript><?= $answer ?></noscript>
  </a>
  
  <script type="text/javascript">
    document.getElementById('answer').innerHTML = isItChristmas("<?= $countryCode ?>");
  </script>
  

  <script type="text/javascript">
var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");
document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E"));
</script>
<script type="text/javascript">
try {
var pageTracker = _gat._getTracker("UA-252618-5");
pageTracker._trackPageview();
} catch(err) {}</script>

</body>
</html>
