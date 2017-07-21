// declare npm packages (dependencies)
var twitter = require("twitter");
var request = require("request");
var spotify = require("spotify");
var keys = require("./keys");

// calling user input variables:
var input = process.argv[2];
var selection = process.argv[3];

// twitter function: print out those tweeeets!
var twitterInfo = function() {
    var client = new twitter(keys.twitterKeys);

    var parameter = {
        username: 'iimjustgud',
        count: 12
    };

    client.get('statuses/user_timeline', parameter, function(error, tweets, response) {
        if (error) {
            console.log("Twitter error. FIX IT.");
        } 
        else {
            // display 10 tweets, using 12 because if not, it'll only show 8
            for(var i = 1; i <= 12; i++) {
                // for cleanliness :)
                console.log('');
                // viewed the object, and called 'text' to print out the tweet
                // works, but comes with an error 'text' being undefined...
                console.log(i + ': ' + tweets[i]['text']);
                console.log('')
            }
        }
    });
}
// test function
twitterInfo();


