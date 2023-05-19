/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
	//target the form element
	const $form = $("form");

	const loadTweets = function () {
		//make a GET request to the server
		$.ajax({
			url: "http://localhost:8080/tweets",
			method: "GET",
		}).then((res) => {
			console.log("successful: ", res);
			renderTweets(res);
		});
	};
	loadTweets();

	//add the event listener for submit
	$form.submit((event) => {
		event.preventDefault();

		//seriarize the form data
		const formData = $form.serialize();

		//make a post request to the server
		$.ajax({
			url: "http://localhost:8080/tweets",
			method: "POST",
			data: formData,
		}).then(() => {
			loadTweets();
		});
		console.log("event: ", event);

		//clear the form inputs
		$form[0].reset();
	});
});
const renderTweets = function (tweets) {
	const $tweetsContainer = $("#tweets-container");

	// Clear the container before appending new tweets
	$tweetsContainer.empty();

	// loops through tweets
	for (const tweet of tweets) {
		// calls createTweetElement for each tweet
		const $tweet = createTweetElement(tweet);
		// takes return value and appends it to the tweets container
		$tweetsContainer.append($tweet);
	}
};

const createTweetElement = function (tweet) {
	// Create the necessary elements for a tweet
	const $tweet = $("<article>").addClass("tweet");
	const $header = $("<div>").addClass("article-header");
	const $avaterContainer = $("<div>");
	const $avatar = $("<img>").attr("src", tweet.user.avatars);
	const $name = $("<h4>").text(tweet.user.name);
	const $handle = $("<span>").text(tweet.user.handle);
	const $content = $("<p>").text(tweet.content.text);
	const $footer = $("<footer>");
	const $createdAt = $("<span>")
		//.text(formatTimestamp(tweet.created_at))
		.text(tweet.created_at)
		.addClass("date");
	const $iconContainer = $("<ul>");
	//const $iconList = $("<li>");
	const $flag = $("<i>").addClass("fa-sharp fa-solid fa-flag");
	const $retweet = $("<i>").addClass("fa-sharp fa-solid fa-retweet");
	const $heart = $("<i>").addClass("fa-solid fa-heart");

	// Append the elements to the tweet container
	// $iconList.append($flag);
	// $iconList.append($retweet);
	// $iconList.append($heart);
	// $iconContainer.append($iconList);
	$iconContainer.append(
		$("<li>").append($flag),
		$("<li>").append($retweet),
		$("<li>").append($heart)
	);
	$avaterContainer.append($avatar, $name);
	$header.append($avaterContainer, $handle);
	$footer.append($createdAt, $iconContainer);
	$tweet.append($header, $content, $footer);

	return $tweet;
};
