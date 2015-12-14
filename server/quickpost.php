<?php
	require_once("reddit.php");
	$reddit = new reddit();
	$userData = $reddit->getUser();
	if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    	$title = $_POST['post_title'];
		$link = $_POST['post_link'];
		$subreddit = $_POST['post_subreddit'];
		$response = $reddit->createStory($title, $link, $subreddit);
	}
	$response_array = array(
		"loggedIn" => true,
		"username" => $userData->name,
		"response" => $response
	);
	echo(json_encode($response_array));