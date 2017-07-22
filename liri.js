// declare npm packages (dependencies)
var twitter = require("twitter");
var request = require("request");
var spotify = require("node-spotify-api");
var keys = require("./keys");

// calling user input variables:
var input = process.argv[2];
var selection = process.argv[3];

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
twitterInfo();



// spotify function
var spotifyInfo = function() {
    var sClient = new spotify(keys.spotifyKeys);

    if(process.argv.length <= 4 || typeof selection === 'string') {
        sClient.search({
            type: 'track',
            query: "Spire Reverie"
        }, function(error, data) {
            if (error) {
                console.log("Spotify error. FIX IT.")
            }
            else {
                spotifyOutput(data);
            }
        });
    }
}

// test function
spotifyInfo();

var spotifyOutput = function(data) {
    // data from spotify api
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

