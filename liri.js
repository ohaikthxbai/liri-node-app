// declare npm packages (dependencies) and global variables
var twitter = require("twitter");
var request = require("request");
var spotify = require("node-spotify-api");
var keys = require("./keys");
var fs = require("fs");
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
    do-what-it-says BONUS.... not actually bonus
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
        console.log("No user input; a search has been made for you: ");
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
    console.log("");
    console.log("Artist: " + artists);
    console.log("Album: " + album);
    console.log("Track Name: " +track);
    console.log("Song Preview: " + preview);
    console.log("");
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
                console.log("Movie Information: ");
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
                console.log("If you haven't watched " + selection + ", then you should!: http://www.imdb.com/title/tt0485947/");
                console.log("You can watch it on Netflix!");
                console.log("");
                // Testing
                //console.log(omdbData['Actors']);
                console.log("Here's some information on the film: ");
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
    console.log("");
    console.log("Title: " + mTitle);
    console.log("Year: " + mYear);
    console.log("Synopsis: " + mPLot);
    console.log("IMDB Rating: " + imdbRating);
    console.log("Rotten Tomatoes Rating: " + rTomaRating);
    console.log("Lanuage: " + mLang);
    console.log("Cast: " + mCast);
    console.log("");
}
/* - - - - - - - - - - - JUST DO IT - - - - - - - - - - */
var justDoIt = function() {
    fs.readFile('random.txt', 'utf8', function(error, data) {
        if (error) {
            console.log("Error! Can't DO IT: " + error)
        }
        // split the data in text since it runs the 'command' and writes the 'selection' 
        var rndmData = data.split(',');
        command = rndmData[0];
        selection = rndmData[1];
        //console.log(data);

        switch(command) {
            case 'my-tweets':
            twitterInfo();
            break;
            case 'spotify-this-song':
            spotifyInfo();
            break;
            case 'movie-this':
            movieInfo();
        }

    });
}
// testing
//justDoIt();

/* - - - - - - - - - - COMMAND FUNCTION - - - - - - - - - - - */
// must be added at the end of the script.
// if added before all the code, nothing works.
switch(command) {
    case 'my-tweets':
        twitterInfo();
        break;
    case 'spotify-this-song':
        spotifyInfo();
        break;
    case 'movie-this':
        movieInfo();
        break;
    case 'do-what-it-says':
        justDoIt();
        break;
    default:
        console.log("DOES NOT COMPUTE, TRY AGAIN");
}