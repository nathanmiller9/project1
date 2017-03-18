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

// Initialize Firebase
var config = {
apiKey: "AIzaSyAuYP04nQL20GAouCjVi0e47yMf_VFaHkc",
	authDomain: "project1-c9b34.firebaseapp.com",
	databaseURL: "https://project1-c9b34.firebaseio.com",
	storageBucket: "project1-c9b34.appspot.com",
	messagingSenderId: "490424550879"
};
firebase.initializeApp(config);

var database = firebase.database();

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