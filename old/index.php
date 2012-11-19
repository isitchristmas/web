<?php header('Content-Type: text/html'); ?>

<?php 
require 'iic.php';
$answer = isItChristmas();
$countryCode = getCountryCode();
?>

<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  
  <title>Is it Christmas?</title>
  
  <link rel="alternate" title="Is It Christmas?" href="rss.xml" type="application/rss+xml" />
  <script type="text/javascript" src="iic.js"></script>
</head>

<body style="text-align: center; padding-top: 200px;">

  <a href="rss.xml" 
    style="font-weight: bold; 
          font-size: 120pt; 
          font-family: Arial, sans-serif; 
          text-decoration: none; 
          color: black;" 
    title="RSS"
    id="answer">
    <noscript><?= $answer ?></noscript>
  </a>
  
  <script type="text/javascript">
    document.getElementById('answer').innerHTML = isItChristmas("<?= $countryCode ?>");
  </script>
  

  <script type="text/javascript">

    var _gaq = _gaq || [];
    _gaq.push(['_setAccount', 'UA-252618-5']);
    _gaq.push(['_trackPageview']);

    (function() {
      var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
      ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
      var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
    })();

  </script>

</body>
</html>
