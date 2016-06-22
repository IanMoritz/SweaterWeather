console.log('The bot is starting');

// Require the modules 
var Forecast = require('forecast');
var Twit = require('twit');
var geocoder = require('geocoder');

//Initialize APIs:
//Forecast API
var forecast = new Forecast({
    service: 'forecast.io',
    key: '55126e7085ee164957d8e51eff9fa606',
    units: 'f', // Only the first letter is parsed 
    cache: false, // Cache API requests? 
    ttl: { // How long to cache requests. Uses syntax from moment.js: http://momentjs.com/docs/#/durations/creating/ 
        minutes: 59,
        seconds: 0
    }
});

//Twitter API
var T = new Twit({
    consumer_key: 'dx4ShG5omRipVLofSBNTlyGaU',
    consumer_secret: 'zSP1UhufDM7hqDLJXHkImcRxB95gz8JOr38d5JeTAeMcp1yAO5',
    access_token: '728397151160668160-jTKxakMfi31tLLJt2SaAahmwCpjPmbG',
    access_token_secret: 'IwXYe2eHeeW3h1MLHVeLugodo0kTbA4Bh86DjaMmSvV6G',
    timeout_ms: 60 * 60 * 1000, // optional HTTP request timeout to apply to all requests. 
})

//var stream = T.stream('user');
//stream.on('tweet',tweetEvent);

tweetIt();
setInterval(tweetIt, 1000*60*60*3);

function tweetIt(eventMsg){

var city = [
"New York City, New York",
"Los Angeles, California",
"Chicago, Illinois",
"Houston, Texas",
"Philadelphia, Pennsylvania",
"Phoenix, Arizona",
"San Antonio, Texas",
"San Diego, California",
"Dallas, Texas",
"San Jose, California",
"Austin, Texas",
"Jacksonville, Florida",
"Indianapolis, Indiana",
"San Francisco, California",
"Columbus, Ohio",
"Fort Worth, Texas",
"Charlotte, North Carolina",
"Detroit, Michigan",
"El Paso, Texas",
"Memphis, Tennessee",
"Boston, Massachusetts",
"Seattle, Washington",
"Denver, Colorado",
"Washington, DC",
"Nashville-Davidson, Tennessee",
"Baltimore, Maryland",
"Louisville/Jefferson, Kentucky",
"Portland, Oregon",
"Oklahoma , Oklahoma",
"Milwaukee, Wisconsin",
"Las Vegas, Nevada",
"Albuquerque, New Mexico",
"Tucson, Arizona",
"Fresno, California",
"Sacramento, California",
"Long Beach, California",
"Kansas , Missouri",
"Mesa, Arizona",
"Virginia Beach, Virginia",
"Atlanta, Georgia",
"Colorado Springs, Colorado",
"Raleigh, North Carolina",
"Omaha, Nebraska",
"Miami, Florida",
"Oakland, California",
"Tulsa, Oklahoma",
"Minneapolis, Minnesota",
"Cleveland, Ohio",
"Wichita, Kansas",
"Arlington, Texas",
"New Orleans, Louisiana",
"Bakersfield, California",
"Tampa, Florida",
"Honolulu, Hawaii",
"Anaheim, California",
"Aurora, Colorado",
"Santa Ana, California",
"St. Louis, Missouri",
"Riverside, California",
"Corpus Christi, Texas",
"Pittsburgh, Pennsylvania",
"Lexington-Fayette, Kentucky",
"Stockton, California",
"Cincinnati, Ohio",
"St. Paul, Minnesota",
"Toledo, Ohio",
"Newark, New Jersey",
"Greensboro, North Carolina",
"Plano, Texas",
"Henderson, Nevada",
"Lincoln, Nebraska",
"Buffalo, New York",
"Fort Wayne, Indiana",
"Jersey , New Jersey",
"Chula Vista, California",
"Orlando, Florida",
"St. Petersburg, Florida",
"Norfolk, Virginia",
"Chandler, Arizona",
"Laredo, Texas",
"Madison, Wisconsin",
"Durham, North Carolina",
"Lubbock, Texas",
"Winston-Salem, North Carolina",
"Garland, Texas",
"Glendale, Arizona",
"Hialeah, Florida",
"Reno, Nevada",
"Baton Rouge, Louisiana",
"Irvine, California",
"Chesapeake, Virginia",
"Irving, Texas",
"Scottsdale, Arizona",
"North Las Vegas, Nevada",
"Fremont, California",
"San Bernardino, California",
"Boise, Idaho",
"Birmingham, Alabama",]

var locToLL = city[Math.floor(Math.random() * city.length)]
// console.log(locToLL);
llConversion();

    function llConversion (){ 
        geocoder.geocode(locToLL, function ( err, data ) {  //geocoder module saving the day
            if (err) {
                console.log (err)
                sendError(); 
            }
        // var fs = require ('fs');  //write JSON 1/3
        // var json = JSON.stringify(data,null,2);  //write JSON 2/3
        // fs.writeFile("geocoder.JSON", json);  //write JSON 3/3
        var lat = data.results[0].geometry.location.lat; 
        var long = data.results[0].geometry.location.lng;
        // console.log('Converted to location:');
        // console.log(lat + ', ' + long);
        // console.log(); 
        fCast();

            function fCast(){
                forecast.get([lat, long], true, function( err, result ) {
                    if (err) {
                        console.log(err)
                        sendError(); 
                    }
                // var fs = require ('fs');  //write JSON 1/3
                // var json = JSON.stringify(result,null,2);  //write JSON 2/3
                // fs.writeFile("forecast.JSON", json);  //write JSON 3/3

                //Add location that weather API is using so location can be included in tweet
                currentTemp = Math.round(parseFloat(result.currently.temperature, 10));
                currentSummary = result.currently.summary.toLowerCase(),
                dailySummary = result.daily.data[0].summary,
                weeklySummary = result.daily.summary,
                dailyTempMin = result.daily.data[0].apparentTemperatureMin,
                dailyTempMax = result.daily.data[0].apparentTemperatureMax,
                dailyIcon =  result.daily.data[0].icon,
                weatherLat = result.latitude,
                weatherLong = result.longitude,
                status = dailyIcon.replace(/-/g, " ");

                // console.log('WEATHER REPORT:'); 
                // console.log("Current temp:");
                // console.log(currentTemp);
                // console.log(); 
                // console.log("Current summary:");
                // console.log(currentSummary);
                // console.log(); 
                // console.log("Daily summary:");
                // console.log(dailySummary);
                // console.log(); 
                // console.log("Weekly summary:");
                // console.log(weeklySummary);
                // console.log(); 
                // console.log("Daily min temp:");
                // console.log(dailyTempMin);
                // console.log(); 
                // console.log("Daily max temp:");
                // console.log(dailyTempMax);
                // console.log(); 
                // console.log("Daily icon:");
                // console.log(dailyIcon);
                // console.log();
                tneckConversion();

                    function tneckConversion (){
                        if (currentTemp < 0) {
                            var tnecks = 'The weather is calling for all the sweaters you have';
                        }

                        if (currentTemp >= 0 && currentTemp < 10) {
                            var tnecks = 'The weather is calling for maximum sweaters ';
                        }

                        if (currentTemp >= 10 && currentTemp < 20) {
                            var tnecks = 'The weather is calling for maximum sweaters and a cup of hot choclate.';
                        }

                        if (currentTemp >= 20 && currentTemp < 30) {
                            var tnecks = 'Brrrrr! Bundle up with a wool turtleneck. ';
                        }

                        if (currentTemp >= 30 && currentTemp < 40) {
                            var tnecks = 'The weather is calling for two thick turtleneck. ';
                        }

                        if (currentTemp >= 40 && currentTemp < 50) {
                            var tnecks = 'One nice sweatershirt should do the trick! ';
                        }

                        if (currentTemp >= 50 && currentTemp < 60) {
                            var tnecks = 'The weather is calling for one light sweater today. ';
                        }

                        if (currentTemp >= 60 && currentTemp < 70) {
                            var tnecks = 'The weather is calling for longsleeves. ';
                        }                        

                        if (currentTemp >= 70 && currentTemp < 80) {
                            var tnecks = "It is a little warm for a sweater. It's shortleeves and shorts weather. ";
                        }

                        if (currentTemp >= 80 && currentTemp < 90) {
                            var tnecks = "It's a hot one. No sweaters today. Break out the linen, jorts, and searsucker. ";
                        }

                        if (currentTemp >= 90 && currentTemp < 100) {
                            var tnecks = 'No sweaters today. Grab your sunscreen and shortsleeves!  ';
                        }

                        if (currentTemp >= 100) {
                            var tnecks = 'The weather is calling for a bathing suit and air conditioning. ';
                        }

                        if (currentSummary === "rain") {
                            var extra = "Add a rain jacket! ";
                        }
                        else if (currentSummary === "snow"){
                            var extra = "Add your gloves and mittens ";
                        }
                        else {
                            var extra = "";
                        }

                        var subWeatherLat = weatherLat.toFixed(4);
                        var subWeatherLong = weatherLong.toFixed(4);

                        var r = Math.floor(Math.random() * 100);

                        var newtweet = tnecks + extra + "It is " + currentTemp + " degrees and " + currentSummary + " in " + locToLL + ". http://forecast.io/#/f/" + subWeatherLat + "," + subWeatherLong;
                        console.log(newtweet);

                        function lengthCheck (){
                            if (newtweet.length >= 140) { //shortened version
                                var newtweet = tnecks + extra + "It is " + currentTemp + " degrees and " + currentSummary + " in " + locToLL 
                                lengthCheck();
                            }
                            else if (newtweet.length <= 140) { 
                                sendIt(newtweet);
                            }
                        }
                    }
                })
            }
        })   
    }
};

function sendError(){  
    errorTweet = "There was an error! Don't unfollow me!"
    sendIt(errorTweet);  
}

function sendIt(txt) {
    // console.log(from);
    // if (from === null || from === "Sweaters_Today") {
    //     //console.log("I made it here 1");
    //     exit();
    // }
    // else {
    var tweet = {
        status: (txt)
    }

    T.post('statuses/update', tweet, tweeted);

        function tweeted(err, data, response) {
            if (err) {
                console.log("Error posting");
                console.log(err);
            } else {
                console.log("It worked!");
                console.log();
                console.log(txt);
            }
        }
//  }
}

//add more responses 
