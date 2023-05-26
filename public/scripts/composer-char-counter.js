$(document).ready(function () {
	// --- our code goes here ---
	const $textarea = $(".new-tweet-textarea");
	$textarea.on("input", function (e) {
		e.preventDefault();
		$(".invalid").slideUp();
		const $tweetLength = $(this).val().length;
		const $counter = $(this).next().children(".counter");
		$counter.text(140 - $tweetLength);
		if ($tweetLength > 140) {
			$counter.addClass("error");
		} else {
			$counter.removeClass("error");
		}
	});
});
