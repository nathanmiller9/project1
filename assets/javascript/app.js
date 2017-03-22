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

// loads video embedded video player
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
var searchCount = 1;

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
		$("#recipient").html($("#recipient-input").val());
	}	
})

$("#mixtape-name-input-btn").on("click", function () {
	if (!$("#mixtape-name-input").val()) {
		alert("Cannot be empty!");
	}
	else {
		$("#mixtape-name-input-btn").hide();
		$("#mixtape-name-input").hide();
		$("#mixtape").html($("#mixtape-name-input").val());
	}	
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
	var removeSong = $('<div class="btn btn-danger" value="X">');
	removeSong.attr("data-")
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
$("#youtube-submit").on("click", function(e) {
	e.preventDefault();

	$("#result-container").show();

	$.ajax({
		cache: false,
		data: $.extend({
			key: youtubeKey,
			q: $("#youtube-search").val(),
			part: "snippet"
		}, {maxResults: 1, type: "video"}),
		dataType: "json",
		type: "GET",
		url: "https://www.googleapis.com/youtube/v3/search"
	}).done(function(response) {
		$("#player").remove();

		var newDiv = $("<div>").attr("id", "player");
		$("#result-video-container").html(newDiv);

		$("#search-query").val("");

		var str = JSON.stringify(response);
		console.log(response);
		var videoId = response.items[0].id.videoId;
		var videoTitle = response.items[0].snippet.title;
		var videoURL = "https://youtube.com/watch?v=" + videoId;
		$("#result-id-container").text(videoId);
		$("#result-title-container").text(videoTitle);
		var a = $("<a>").text(videoURL);
		a.attr("href", videoURL);
		a.attr("target", "_blank");
		$("#result-link-container").html(a);
		$("#result-json-container").html("<small>" + str + "</small");

		//show vid element
		$("#result-video-container").show();
		player = new YT.Player('player', {
		  height: '390',
		  width: '640',
		  videoId: videoId,
		  events: {
		    'onReady': onPlayerReady
		  }
		});
		$("iframe").addClass("embed-responsive-item");
		searchCount++;

		// adds resulting video to mixtape playlist
		ref.child("playlist").push({
			videoTitle: videoTitle,
			videoId: videoId
		});

		//	CLOSE TO IDENTICAL TO CLICKING IN MIXTAPE PLAYLIST IF ALREADY EXIST (SEE BELOW)
		//DISPLAY INFO + ADD OPTIONS FOR THAT SONG
		//		if user searches for new song while existing song is selected
		
		// need to keep track of firebase parent key so that button could be properly set up for functioning "Add Note" button
		var songArray = [];

		ref.child("playlist").once("value", function(snapshot) {
			snapshot.forEach(function(childSnapshot) {
				songArray.push(childSnapshot.key);
			});
		});

		var videoFirebaseKey = songArray[songArray.length - 1];

		$("#active-song-container").show();
		$("#active-song-title").text(videoTitle);
		$("#active-song-add-button").attr("data-firebase-key", videoFirebaseKey);
		
		//DELETE EXISTING NOTES FROM SOME OTHER SONG
		$("#active-song-notes").empty();
	});
});

// ------------------------------------------------------------------



// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  event.target.playVideo();
}

$("#search-button")

//delete/clear firebase
$("#delete-button").on("click", function() {
	ref.set({
		null: null
	});
	$("#mixtape-container").empty();
});

//play vid from clickable list of songs that are already on firebase
$(document).on("click", ".song", function() {
	//PLAY VID UPON CLICKING ON SONG FROM MIXTAPE LIST
	var videoId = $(this).attr("data-video-id");
	var videoTitle;
	var videoFirebaseKey = $(this).attr("data-firebase-key");

	//		grab video title from firebase based on this' videoId
	ref.child("playlist").child(videoFirebaseKey).once("value", function(snapshot) {
		videoTitle = snapshot.val().videoTitle;
	});

	$("#player").remove();

	var newDiv = $("<div>").attr("id", "player");
	$("#result-video-container").html(newDiv);
	$("#result-video-container").show();
	player = new YT.Player('player', {
	  height: '390',
	  width: '640',
	  videoId: videoId,
	  events: {
	    'onReady': onPlayerReady
	  }
	});
	$("iframe").addClass("embed-responsive-item");

	//DISPLAY INFO + ADD OPTIONS FOR THAT SONG
	$("#active-song-container").show();
	$("#active-song-title").text(videoTitle);
	$("#active-song-add-button").attr("data-firebase-key", videoFirebaseKey);
	
	//DELETE EXISTING NOTES FROM SOME OTHER SONG
	$("#active-song-notes").empty();

	//DISPLAY EXISTING NOTES FOR THAT SONG
	ref.child("playlist").child(videoFirebaseKey).child("notes").once("value", function(snapshot) {
		snapshot.forEach(function(childSnapshot) {
			var content = childSnapshot.val().content;
			var newDiv = $("<div class='note'>").text(content);
			$("#active-song-notes").append(newDiv);
		});
	});
});

$("#active-song-add-button").on("click", function(e) {
	e.preventDefault();

	var videoFirebaseKey = $(this).attr("data-firebase-key");

	ref.child("playlist").child(videoFirebaseKey).child("notes").push({
		content: $("#active-song-textarea").val()
	});

	//add new notes to active song note area
	var newNoteContent = $("#active-song-textarea").val();
	var newDiv = $("<div class='note'>").text(newNoteContent);
	$("#active-song-notes").append(newDiv);

	$("#active-song-textarea").val("");
});

// display accumulated songs from firebase
// Retrieve new posts as they are added to our database
ref.child("playlist").on("child_added", function(snapshot) {
  var playlist = snapshot.val();
  var li = $("<li>").text(playlist.videoTitle);
  li.addClass("song");
  li.css("cursor", "pointer");
  li.attr("data-video-id", playlist.videoId);
  li.attr("data-firebase-key", snapshot.key);
  $("#mixtape-container").append(li);
});