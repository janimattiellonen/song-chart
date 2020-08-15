<?php

require_once 'iTunesXMLParser.php';

$path = '/private/var/www/song-chart/data/Kaikki.xml';

//$xml=simplexml_load_string(file_get_contents($path));

//print_r($xml);


$itunes = new iTunesXMLParser();

$itunes->open( $path );

print_r( $itunes->data );
