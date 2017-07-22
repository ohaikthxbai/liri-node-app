// declare npm packages (dependencies) and global variables
var twitter = require("twitter");
var request = require("request");
var spotify = require("node-spotify-api");
var keys = require("./keys");
// installed and tried the omdb npm, but couldn't get it to work.
//var omdb = require('omdb-client');
// omdb and movie variables
var omdbData;
// movie information
var mTitle, 
    mYear, 
    imdbRating, 
    rTomaRating,
    mLang, 
    mPLot, 
    mCast

// calling user input variables:
// user command
var command = process.argv[2];
/*  my-tweets
    spotify-this-song
    movie-this
    do-what-it-says 
*/
// user's input
var selection = process.argv[3];

/* - - - - - - - - - - TWITTER SECTION - - - - - - - - - */

// twitter function: print out those tweeeets!
var twitterInfo = function() {
    var tClient = new twitter(keys.twitterKeys);

    var parameter = {
        username: 'iimjustgud',
        count: 22
    };

    tClient.get('statuses/user_timeline', parameter, function(error, tweets, response) {
        if (error) {
            console.log("Twitter error. FIX IT.");
        } 
        else {
            // TWEET TEST
            console.log(tweets[0]);
            // contains a ton of information within the object of each tweet
            // look for the 'text' property
            // display 20 tweets, using 22 because if not, it'll only show 18
            // fix later
            for(var i = 1; i <= 22; i++) {
                // for cleanliness :)
                console.log('');
                // viewed the object, and called 'text' to print out the tweet
                // works, but comes with an error 'text' being undefined...
                console.log(i + ': ' + tweets[i]['text']);
                console.log('');
            }
        }
    });
}
// test function
//twitterInfo();

/* - - - - - - - - - - SPOTIFY SECTION - - - - - - - - - */

// spotify function
var spotifyInfo = function() {
    var sClient = new spotify(keys.spotifyKeys);
    // check if the input isn't empty and if it's a string
    // mmmm these statements are a bit repetitive...
    if(!selection === undefined || typeof selection === 'string') {
        // call spotify search method with user's input (selection)
        sClient.search({
            type: 'track',
            query: selection
        }, function(error, data) {
            if (error) {
                console.log("Spotify error. FIX IT:" + error);
            }
            else {
                spotifyOutput(data);
            }
        });
    }
    // if the input is empty, default search is this
    else {
        selection = "The Sign Ace of Base";
        sClient.search({
            type: 'track',
            query: selection
        }, function(error, data) {
            if (error) {
                console.log("Spotify error. FIX IT:" + error);
            }
            else {
                spotifyOutput(data);
            }
        });
    }
}

// test function
//spotifyInfo();

var spotifyOutput = function(data) {
    // SPOTIFY API
    // data['tracks'] are the results from the search
    // data['tracks']['items'] accesses the items property with a value of an array of objects: [object Object],[object Object]
    // ..[0/1] is first or second object in items
    // ..['name'] is one of the properties of the selected object from items
    // the object contains more objects with property, value objects.
    var artists = data['tracks']['items'][1]['artists'][0]['name'];
    var album = data['tracks']['items'][1]['album']['name'];
    var track = data['tracks']['items'][1]['name'];
    var preview = data['tracks']['items'][1]['external_urls']['spotify'];
    console.log("Artist: " + artists);
    console.log("Album: " + album);
    console.log("Track Name: " +track);
    console.log("Song Preview: " + preview);
    // TESTING
    //console.log(JSON.stringify((data['tracks']['items'][1])));
}

/* - - - - - - - - - - OMDB SECTION - - - - - - - - - */
// TRIED THE OMDB-CLIENT NPM INSTALL, BUT STRUGGLED TO GET IT TO WORK
// USING REQUEST AND THE OMDBAPI URL WITH REQUEST KEY INSTEAD

var movieInfo = function(data) {
    // omdb npm didn't work :(
    if(!selection === undefined || typeof selection === 'string') {
        request('http://www.omdbapi.com/?apikey=40e9cece&t=' + selection + '&tomatoes=true', function(error, response, body) {
            if (error) {
                console.log("OMDB ERROR, PLEASE FIX:" + error);
            } 
            else {
                omdbData = JSON.parse(body);
                // Testing object and properties
                //console.log(omdbData['Title']);
                movieOutput(omdbData);
            }
        });
    }
    else {
        selection = 'Mr. Nobody';
        request('http://www.omdbapi.com/?apikey=40e9cece&t=' + selection + '&tomatoes=true', function(error, response, body) {
            if (error) {
                console.log("OMDB ERROR, PLEASE FIX: " + error);
            } 
            else {
                omdbData = JSON.parse(body);
                // Testing
                //console.log(omdbData['Actors']);
                movieOutput(omdbData);
            }
        });
    }
}
// test function
//movieInfo();
// creating a new function to separate the code. This will display all the data from the API.
var movieOutput = function() {
    // assign variabels to movie details
    mTitle = omdbData['Title'];
    mYear = omdbData['Year'];
    imdbRating =  omdbData['imdbRating'] + "/10";
    rTomaRating = omdbData['tomatoRating'];
    mLang =  omdbData['Language'];
    mPLot = omdbData['Plot'];
    mCast = omdbData['Actors'];
    // display them to console
    console.log("Film Title: " + mTitle);
    console.log("Year: " + mYear);
    console.log("Film Plot: " + mPLot);
    console.log("IMDB Rating: " + imdbRating);
    console.log("Rotten Tomatoes Rating: " + rTomaRating);
    console.log("Lanuage: " + mLang);
    console.log("Cast: " + mCast);
}

