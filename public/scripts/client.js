/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// import { format, render, cancel, register } from "timeago.js";

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

		const $tweetInpit = $("#tweet-text");
		const tweetText = $tweetInpit.val();

		console.log("tweet value: ", tweetText);
		//If the tweet is empty
		if (!tweetText) {
			showMessage("Tweet cannot be empty. Please write something! :)");
			return; //stop the submission
		}

		//If tweet exceed 140 char
		if (tweetText.length > 140) {
			showMessage("Tweet exceeds 140 characters");
			return; //stop the submission
		}

		//if all the validation passes, seriarize the form data
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

	// Function to show an error message on the page
	function showMessage(message) {
		const $errorMessage = $("<div>").text(message).addClass("invalid");
		$form.append($errorMessage);

		//remove the message aftere 3 seconds
		setTimeout(() => {
			$errorMessage.remove();
		}, 3000);

		//or disapear when user click the input
		// $tweetInpit.on("click", () => {
		// 	$errorMessage.remove();
		// });
	}
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
		.text(timeago.format(tweet.created_at, "en_US"))
		// .text(tweet.created_at)
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
