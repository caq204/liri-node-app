var keys = require('./keys.js');
var request = require("request");
var spotify = require("node-spotify-api");
var fs = require("fs");

var task = process.argv.slice(2);

//node liri.js movie-this Mr.America
//process.argv.slice(2) = ["movie-this"]
//["2","5","7"]
//["10"]

if(task[0] === "movie-this"){
    if(task.length == 1){
        request("http://www.omdbapi.com/?t=Mr.nobody&apikey=d20f5114&", function(err, res,body){
            //console.log(body);
        console.log("Movie Name: "+JSON.parse(body).Title);
        console.log("Movie Year: "+JSON.parse(body).Year);
        console.log("Movie Rating: "+JSON.parse(body).Rating);
        console.log("Rotten Tomatoes Rating: "+JSON.parse(body).Rating);
        console.log("Movie Country: "+JSON.parse(body).Country);
        console.log("Movie Language: "+JSON.parse(body).Language);
        console.log("Movie Plot: "+JSON.parse(body).Plot);
        console.log("Movie Actors: "+JSON.parse(body).Actors);
        })
    }
    else{
        request("http://www.omdbapi.com/?t="+task[1]+"&apikey=d20f5114&", function(err, res,body){
            //console.log(body);
        console.log("Movie Name: "+JSON.parse(body).Title);
        console.log("Movie Year: "+JSON.parse(body).Year);
        console.log("Movie Rating: "+JSON.parse(body).Rating);
        console.log("Rotten Tomatoes Rating: "+JSON.parse(body).Rating);
        console.log("Movie Country: "+JSON.parse(body).Country);
        console.log("Movie Language: "+JSON.parse(body).Language);
        console.log("Movie Plot: "+JSON.parse(body).Plot);
        console.log("Movie Actors: "+JSON.parse(body).Actors);
            })
    }
}

function spotify(inputs) {

	var spotify = new Spotify(keys.spotifyKeys);
		if (!inputs){
        	inputs = 'The Sign';
    	}
		spotify.search({ type: 'track', query: inputs }, function(err, data) {
			if (err){
	            console.log('Error occurred: ' + err);
	            return;
	        }

	        var songInfo = data.tracks.items;
	        console.log("Artist(s): " + songInfo[0].artists[0].name);
	        console.log("Song Name: " + songInfo[0].name);
	        console.log("Preview Link: " + songInfo[0].preview_url);
	        console.log("Album: " + songInfo[0].album.name);
	});
}


function movie(inputs) {

	var queryUrl = "http://www.omdbapi.com/?t=" + inputs + "&y=&plot=short&apikey=40e9cece";

	request(queryUrl, function(error, response, body) {
		if (!inputs){
        	inputs = 'Mr Nobody';
    	}
		if (!error && response.statusCode === 200) {

		    console.log("Title: " + JSON.parse(body).Title);
		    console.log("Release Year: " + JSON.parse(body).Year);
		    console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
		    console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
		    console.log("Country: " + JSON.parse(body).Country);
		    console.log("Language: " + JSON.parse(body).Language);
		    console.log("Plot: " + JSON.parse(body).Plot);
		    console.log("Actors: " + JSON.parse(body).Actors);
		}
	});
};

