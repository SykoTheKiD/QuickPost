<?php
	require_once("reddit.php");
	$reddit = new reddit();
	$userData = $reddit->getUser();
	$title = "MakerBot test 3 Releases IPad App For Easy 3D Printing";
	$link = "http://makezine.com/greg";
	$subreddit = "QuickPostTests";
	$response = $reddit->createStory($title, $link, $subreddit);
	$response_array = array(
		"loggedIn" => true,
		"username" => $userData->name
	);
	echo(json_encode($response_array));