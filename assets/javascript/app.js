// Set up YouTube Data API
var youtubeKey = "AIzaSyAuYP04nQL20GAouCjVi0e47yMf_VFaHkc";

// Initialize Firebase
var config = {
	apiKey: "AIzaSyAuYP04nQL20GAouCjVi0e47yMf_VFaHkc",
	authDomain: "project1-c9b34.firebaseapp.com",
	databaseURL: "https://project1-c9b34.firebaseio.com",
	storageBucket: "project1-c9b34.appspot.com",
	messagingSenderId: "490424550879"
};
firebase.initializeApp(config);
var ref = firebase.database().ref();


$(document).ready(function(){

$("#edit-area").hide();

});

$("#start-button").on("click", function () {
	$("#start-button").hide();
	$("#edit-area").show();
})

$("#recipient-input-btn").on("click", function () {
	if (!$("#recipient-input").val()) {
		alert("Cannot be empty!");
	}
	else {
		$("#recipient-input-btn").hide();
		$("#recipient-input").hide();
		$("#recipient").html("for: " + $("#recipient-input").val());
	}	
})

$("#mixtape-name-input-btn").on("click", function () {
	if (!$("#mixtape-name-input").val()) {
		alert("Cannot be empty!");
	}
	else {
		$("#mixtape-name-input-btn").hide();
		$("#mixtape-name-input").hide();
		$("#mixtape").html($("#mixtape-name-input").val() + " mix");
	}	
})


$("#search-button").on("click", function (e) {
	e.preventDefault();

	ref.child("playlist").push({
		artist: $("#artist-query").val();
		song: $("#song-query").val();
	})	
})

// song list append
$("#song-add").on("click", function(event) {
	event.preventDefault();
	var songCount = 0;

	// creates p element with the name of the song to be added
	var newSong = $("#song-search").val().trim();
	var addSongP = $("<p>");
	addSongP.attr("id", "song" + songCount);
	addSongP.append(" ", newSong);

	// creates button to remove the song if necessary
	var removeSong = $('<div class="btn btn-danger" value="X">')
})


// imgur API
$("#imgur-submit").on("click", function () {
	
	var imgQuery = $("#imgur-search").val();
	var imgurUrl = "";
	
	$.ajax({
		url: imgurUrl,
		method: "GET"
	}).done(function (image) {
		// save picture into database
	})

})

// youtube API
$("#youtube-submit").on("click", function () {

	var youtubeQuery = $("#youtube-search").val();
	var youtubeUrl = "";

	$.ajax({
		url: youtubeUrl,
		method: "GET"
	}).done(function (video) {
		// save video into database
	})

})
