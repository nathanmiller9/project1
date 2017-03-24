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

// Push songs into firebase
$("#search-button").on("click", function (e) {
	e.preventDefault();
	ref.child("playlist").push({
		artist: $("#artist-query").val(),
		song: $("#song-query").val(),
	})	
})

//Displays current song list 
ref.child("playlist").on("child_added" , function (songItem) {
		var songList = $("<li>")
		var songAndArtist;
		var songKey = songItem.getKey();
		songAndArtist = songItem.val().artist + " - " + songItem.val().song;
		songList.text(songAndArtist);
		songList.attr({"id": songKey})
		var removeButton = $("<button>").attr({"class": "checkbox", "song-key": songKey}).text("X");
		songList.prepend(removeButton);
		$("#mixtape-container").append(songList);
	})

// Disable search button 
ref.child("playlist").on("value", function(children) {
		var numChild = children.numChildren();
		if (numChild >= 20) {
			$("#search-button").prop("disabled",true);
		}
		else {
			$("#search-button").prop("disabled", false);
		}
})

// Remove song from playlist button
$(document.body).on("click", ".checkbox", function() {
	//remove from playlist
	var remKey = $(this).attr("song-key");
	$("#" + remKey).remove();

	//remove from firebase
	ref.child("playlist").child(remKey).remove();
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
