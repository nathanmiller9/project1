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

//load iFrame/embedded video player
// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  event.target.playVideo();
}

$(document).ready(function(){

$("#edit-area").hide();

});

$("#start-button").on("click", function () {
	$("#start-button").hide();
	$("#sample").hide();
	$("#spacer").hide();
	$("#edit-area").show();
});

$("#recipient-input-btn").on("click", function (e) {
	e.preventDefault();
	if (!$("#recipient-input").val()) {
		alert("Cannot be empty!");
	}
	else {
		$("#recipient-input-btn").hide();
		$("#recipient-input").hide();
		$("#recipient").hide();
		$("#giftee").html("A mix for " + $("#recipient-input").val());
		$("#firebase-title").hide();
		// $("#mixtape").html($("#mixtape-name-input").val() + " mix");
		$("#playlist-title").html($("#mixtape-name-input").val() + " Mix");
		$("#mixtape-name").hide();
	}	
})


// Push songs into firebase
$("#search-button").on("click", function (e) {
	e.preventDefault();
	
	$.ajax({
		cache: false,
		data: $.extend({
			key: youtubeKey,
			q: $("#artist-query").val() + " " + $("#song-query").val(),
			part: "snippet"
		}, {maxResults: 1, type: "video", videoEmbeddable: "true", videoSyndicated: "true"}),
		dataType: "json",
		type: "GET",
		url: "https://www.googleapis.com/youtube/v3/search"
	}).done(function(response) {
		var str = JSON.stringify(response);
		console.log(response);
		var videoId = response.items[0].id.videoId;
		var videoTitle = response.items[0].snippet.title;
		var videoURL = "https://youtube.com/watch?v=" + videoId;
		$("#player").remove();
		$("#result-video-container").append($("<div id='player'>"));

		//show and play YouTube video result
		$("#result-video-container").show();
		player = new YT.Player('player', {
		  height: '390',
		  width: '640',
		  videoId: videoId,
		  events: {
		    'onReady': onPlayerReady
		  }
		});

		//add song object to playlist in firebase
		ref.child("playlist").push({
			artist: $("#artist-query").val(),
			song: $("#song-query").val(),
			videoId: videoId
		});
		
		//Load song onto "Selected Song" panel
		$("#active-song-container").show();
		$("#active-song-title").text($("#song-query").val() + " - " + $("#artist-query").val());
		
		//DELETE EXISTING NOTES FROM SOME OTHER SONG
		$("#active-song-notes").empty();

		// get key of recently added song
		var songArray = [];

		ref.child("playlist").once("value", function(snapshot) {
			snapshot.forEach(function(childSnapshot) {
				songArray.push(childSnapshot.key);
			});
		});

		var latestFirebaseKey = songArray[songArray.length - 1];

		//add data-key to "Add Note" button in "Selected Song"
		$("#active-song-add-button").attr("data-firebase-key", latestFirebaseKey);
		$("#active-song-add-gif-button").attr("data-firebase-key", latestFirebaseKey);
		$("#gif-search-button").attr("data-firebase-key", latestFirebaseKey);
		$("#img-add-button").attr("data-firebase-key", latestFirebaseKey);

		//add notes for song
		ref.child("playlist").child(latestFirebaseKey).child("notes").once("value", function(snapshot) {
			snapshot.forEach(function(childSnapshot) {
				if(childSnapshot.child(type).exists() === false) {
					var content = childSnapshot.val().content;
					var newDiv = $("<div class='note'>").text(content);
					$("#active-song-notes").append(newDiv);
				} else {
					var gifLink = childSnapshot.val().content;
					var newDiv = $("<div class='note'>").append($("<img>").attr("src", gifLink));
					$("#active-song-notes").append(newDiv);
				}
				
			});
		});

		//clear search values
		$("#artist-query").val("");
		$("#song-query").val("");
	});
});

//Displays current song list 
ref.child("playlist").on("child_added" , function (songItem) {
		var songList = $("<li class='song-item'>");
		var songAndArtist;
		var songKey = songItem.getKey();
		songAndArtist = songItem.val().artist + " - " + songItem.val().song;
		songList.text(songAndArtist);
		songList.attr({"id": songKey})
		var removeButton = $("<button>").attr({"class": "checkbox", "song-key": songKey}).text("X");
		songList.prepend(removeButton);
		$("#mixtape-container").append(songList);

		console.log(songList);
});

// Disable search button 
ref.child("playlist").on("value", function(children) {
		var numChild = children.numChildren();
		if (numChild >= 20) {
			$("#search-button").prop("disabled",true);
		}
		else {
			$("#search-button").prop("disabled", false);
		}
});

// Remove song from playlist button
$(document.body).on("click", ".checkbox", function() {
	//remove from playlist
	var remKey = $(this).attr("song-key");
	$("#" + remKey).remove();

	//remove from firebase
	ref.child("playlist").child(remKey).remove();
});

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

});

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

});

//Add a note to selected song
$("#active-song-add-button").on("click", function(e) {
	e.preventDefault();
	var songKey = $(this).attr("data-firebase-key");
	var noteContent = $("#active-song-text-input").val().trim();
	var now = new Date();
	var timestamp = now.toLocaleString();

	if(noteContent !== "") {
		ref.child("playlist").child(songKey).child("notes").push({
			type: "text",
			content: noteContent,
			time: timestamp
		});
	}

	//add new notes to active song note area
	var newNoteContent = $("#active-song-text-input").val();
	var newDiv = $("<div class='note'>").text(newNoteContent);
	$("#active-song-notes").append(newDiv);

	$("#active-song-text-input").val("");
});

//search for GIPHY gifs
$("#gif-search-button").on("click", function(e) {
	e.preventDefault();
	var firebaseKey = $(this).attr("data-firebase-key");
	var query = $("#gif-search-query").val();
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + query + "&api_key=dc6zaTOxFJmzC&limit=10";
    $.ajax({
    	url: queryURL,
    	method: "GET"
    }).done(function(response) {
    	var results = response.data;

		var resultsContainer = $("#gif-results");
		resultsContainer.empty();

    	for(var i = 0; i < results.length; i++) {
    		var singleResultSpan = $("<span class='result-container'>");

    		var img = $("<img class='result'>");
    		img.attr("src", results[i].images.fixed_height.url);
    		img.attr("data-firebase-key", firebaseKey);

    		singleResultSpan.prepend(img);

    		resultsContainer.prepend(singleResultSpan);
    	}
    });
});

$(document).on("click", ".result", function() {
	var firebaseKey = $(this).attr("data-firebase-key");
	var now = new Date();
	var timestamp = now.toLocaleString();

	console.log(firebaseKey);
	ref.child("playlist").child(firebaseKey).child("notes").push({
		type: "giphy",
		content: $(this).attr("src"),
		time: timestamp
	});

	var gifLink = $(this).attr("src");
	var newDiv = $("<div class='note'>").append($("<img>").attr("src", gifLink));
	$("#active-song-notes").append(newDiv);

	$("#gif-results").empty();
	$("#gif-search-query").val("");
	$("#gif-modal").modal("hide");

});

$("#img-add-button").on("click", function(e) {
	e.preventDefault();
	var firebaseKey = $(this).attr("data-firebase-key");
	var now = new Date();
	var timestamp = now.toLocaleString();

	console.log(firebaseKey);
	ref.child("playlist").child(firebaseKey).child("notes").push({
		type: "img",
		content: $("#img-link").val(),
		time: timestamp
	});

	var imgLink = $("#img-link").val();
	var newDiv = $("<div class='note'>").append($("<img>").attr("src", imgLink));
	$("#active-song-notes").append(newDiv);

	$("#img-modal").modal("hide");
});

//for Delete Confirmation mixtape modal
$("#confirm-delete-button").on("click", function(e) {
	e.preventDefault();
	ref.set(null);
	$("#mixtape-container").empty();
	$("#delete-modal").modal("hide");
})

$("#cancel-button").on("click", function(e) {
	e.preventDefault();
	$("#delete-modal").modal("hide");
})

$(document).on("click", ".song-item", function() {
	//Load song onto "Selected Song" panel
	$("#active-song-container").show();
	$("#active-song-title").text($(this).text());
	
	//DELETE EXISTING NOTES FROM SOME OTHER SONG
	$("#active-song-notes").empty();

	// get key of recently added song
	var latestFirebaseKey = $(this).attr("id");

	//add data-key to "Add Note" button in "Selected Song"
	$("#active-song-add-button").attr("data-firebase-key", latestFirebaseKey);
	$("#active-song-add-gif-button").attr("data-firebase-key", latestFirebaseKey);
	$("#gif-search-button").attr("data-firebase-key", latestFirebaseKey);
	$("#img-add-button").attr("data-firebase-key", latestFirebaseKey);

	//add notes for song
	ref.child("playlist").child(latestFirebaseKey).child("notes").once("value", function(snapshot) {
		snapshot.forEach(function(childSnapshot) {
			console.log(childSnapshot.val());
			if(childSnapshot.val().type === "text") {
				var content = childSnapshot.val().content;
				var newDiv = $("<div class='note'>").text(content);
				$("#active-song-notes").append(newDiv);
			} else {
				var imgLink = childSnapshot.val().content;
				var newDiv = $("<div class='note'>").append($("<img>").attr("src", imgLink));
				$("#active-song-notes").append(newDiv);
			}
		});
	});
});