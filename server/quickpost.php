<?php
	require_once("reddit.php");
	$reddit = new reddit();
	$userData = $reddit->getUser();
	if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    	$title = $_POST['post_title'];
		$link = $_POST['post_link'];
		$subreddit = $_POST['post_subreddit'];
		$response = $reddit->createStory($title, $link, $subreddit);

		if (is_string($response)) {
 		   $post_response = 'The subreddit '. $subreddit . ' was not found.'  ;
		}elseif ($response->jquery[22][3][0] == "that link has already been submitted") {
			$post_response = "That link has already been submitted to " . $subreddit;
		}else{
			$post_response = "Link Submitted successfully!";
		}
	}
	$response_array = array(
		"loggedIn" => true,
		"username" => $userData->name,
		"response" => $post_response
	);
	echo(json_encode($response_array));