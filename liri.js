var keys = require("./keys.js");
var omdb = require('omdb');
var Spotify = require('node-spotify-api');
var fs = require('fs');
var Twitter = require('twitter');
var request = require("request");
var action = process.argv[2];
var value = process.argv[3];

switch (action) {
  case "movie-this":
    movie();
    break;

  case "my-tweets":
    tweets();
    break;

  case "spotify-this-song":
    music();
    break;

  case "do-what-it-says":
    dwis();
    break;
}
 

function movie() {
	request("http://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=40e9cece", function(error, response, body) {

	  // If the request is successful (i.e. if the response status code is 200)
	  if (!error && response.statusCode === 200) {

	    
	    console.log("Movie Title: " + JSON.parse(body).Title);
	    console.log("Year: " + JSON.parse(body).Year);
	    console.log("Rating: " + JSON.parse(body).imdbRating);
	    console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
	    console.log("Country: " + JSON.parse(body).Country);
	    console.log("Language: " + JSON.parse(body).Language);
	    console.log("Plot: " + JSON.parse(body).Plot);
	    console.log("Actors: " + JSON.parse(body).Actors);
	    // console.log(JSON.parse(body));
	  }
	});
};

function tweets(){

	var params = {screen_name: 'NodeJSApp1'};
	var client = new Twitter(keys);
	var path = "statuses/user_timeline";

	client.get(path, params, function(error, tweets, repsonse){

		for (var i = 0; i < tweets.length; i++) {
			tweets[i].text

			console.log(tweets[i].text);
		}

		if(error) throw error;
		// console.log(tweets);


	});


};


function music () {


	// var clientid = 'aad4a312335049dd8c79af79ca12013f';
	// var clientsecret = '2f91ac93fe91450a8d703e82d04ad761';
	
	var spotify = new Spotify({
	  id: 'aad4a312335049dd8c79af79ca12013f',
	  secret: '2f91ac93fe91450a8d703e82d04ad761'
	});

	spotify.search({ type: 'track', query: value }, function(err, data) {
	  if (err) {
	    return console.log('Error occurred: ' + err);
	  }
	 
	console.log("Data: ", data); 
	});

};



