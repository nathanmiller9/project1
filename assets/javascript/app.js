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