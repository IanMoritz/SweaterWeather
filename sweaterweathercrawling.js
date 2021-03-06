console.log('The bot is starting');

// Require the modules 
var Forecast = require('forecast');
var Twit = require('twit');
var geocoder = require('geocoder');
var twitconfig = require('./config/twitconfig');
var forecastconfig = require('./config/forecastconfig')
var forecast = new Forecast(forecastconfig);
var T = new Twit(twitconfig);

tweetIt();
setInterval(tweetIt, 1000*60*60*4);

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
llConversion();

        function llConversion (){ 
            geocoder.geocode(locToLL, function ( err, data ) {  //geocoder module saving the day
                if (err) {
                    console.log("llConversion error:");
                    console.log (err)
                    sendError(); 
                }

            // var fs = require ('fs');  //write JSON 1/3
            // var json = JSON.stringify(data,null,2);  //write JSON 2/3
            // fs.writeFile("geocoder.JSON", json);  //write JSON 3/3
            lat = data.results[0].geometry.location.lat; 
            long = data.results[0].geometry.location.lng;
            // console.log('Converted to location:');
            // console.log(lat + ', ' + long);
            // console.log(); 
            fCast();

                function fCast(){
                    forecast.get([lat, long], true, function( err, result ) {
                        if (err) {
                            console.log('Forecast error:')
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

                    //WEATHER REPORT
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
                        if (currentTemp < 10) {
                            options = [
                            'The weather is calling for maximum sweaters ',
                            'The weather is calling for all the sweaters you have ',
                            "Start with a snuggie."
                            ]
                            tnecks = options[Math.floor(Math.random() * options.length)]                                
                        }

                        if (currentTemp >= 10 && currentTemp < 30) {
                            options = [
                            'The weather is calling for maximum sweaters and a cup of hot choclate. ',
                            "4 sweaters... or just wear a winter jacket. ",
                            'Brrrrr! Bundle up with a wool turtleneck. ',
                            "You're going to need a hat and gloves too. "
                            ]
                            tnecks = options[Math.floor(Math.random() * options.length)]                                
                        }

                        if (currentTemp >= 30 && currentTemp < 40) {
                            options = [
                            'The weather is calling for two thick turtlenecks. ',
                            "You're going to need your jacket today. "
                            ]
                            tnecks = options[Math.floor(Math.random() * options.length)]                                
                        }

                        if (currentTemp >= 40 && currentTemp < 50) {
                            options = [
                            'One nice sweatershirt should do the trick! ',
                            "Grab a light jacket on your way out. "
                            ]
                            tnecks = options[Math.floor(Math.random() * options.length)]                                
                        }

                        if (currentTemp >= 50 && currentTemp < 60) {
                            options = [
                            'The weather is calling for one light sweater today. ',
                            "Find your lightest sweater. "
                            ]
                            tnecks = options[Math.floor(Math.random() * options.length)]                                
                        }

                        if (currentTemp >= 60 && currentTemp < 70) {
                            options = [
                            'The weather is calling for longsleeves. ',
                            "Negative 1 sweater. ",
                            "Pack the sweaters away, a light jacket will do! "
                            ]
                            tnecks = options[Math.floor(Math.random() * options.length)]                                
                        }                        

                        if (currentTemp >= 70 && currentTemp < 80) {
                            options = [
                            "It is too warm for a sweater. Go with shortsleeves instead. ",
                            "Negative 2 sweaters. ",
                            "Shorts and shortsleeves today. "
                            ]
                            tnecks = options[Math.floor(Math.random() * options.length)]
                        }

                        if (currentTemp >= 80 && currentTemp < 90) {
                            options = [
                            "It's a hot one. No sweaters today. Break out the linen, jorts, and searsucker. ",
                            "Negative 3 sweaters. ",
                            "Suns out, guns out. ",
                            "Tank top today. ",
                            "Wear as little as possible. "
                            ]
                            tnecks = options[Math.floor(Math.random() * options.length)]
                        }

                        if (currentTemp >= 90 && currentTemp < 100) {
                            options = [
                            'No sweaters. Grab your sunscreen and shortsleeves! ',
                            "Tell Grandma to hold off on that new sweater, today you'll only need a t-shirt. ",
                            "Find  your bathing suit and the closest body of water. "
                            ]
                            tnecks = options[Math.floor(Math.random() * options.length)]
                        }

                        if (currentTemp >= 100) {
                            options = [
                            'The weather is calling for a bathing suit and A LOT of air conditioning. ',
                            "Forget the sweaters, AC should be your best friend today. ",
                            "Knit yourself a sweater out of sunscreen. "
                            ]
                            tnecks = options[Math.floor(Math.random() * options.length)]                                
                        }

                        // if (currentSummary === "rain") {
                        //     var extra = "Add a rain jacket! ";
                        // }
                        // else if (currentSummary === "snow"){
                        //     var extra = "Add your gloves and mittens ";
                        // }
                        // else {
                        //     var extra = "";
                        // }

                        var subWeatherLat = weatherLat.toFixed(4);
                        var subWeatherLong = weatherLong.toFixed(4);

                            composeTweet();

                            function composeTweet (){
                                part1 = ""
                                part2 = tnecks
                                part3 = "It is " + currentTemp  + "° and " + currentSummary
                                part4 = " in "+ locToLL + " " 
                                part5 = "http://forecast.io/#/f/" + subWeatherLat + "," + subWeatherLong

                                part1L = part1.length
                                part2L = part2.length
                                part3L = part3.length
                                part4L = part4.length
                                part5L = part5.length

                                option1 = part1L + part2L + part3L + part4L + part5L
                                option2 = part1L + part2L + part3L + part4L
                                option3 = part1L + part2L + part3L 
                                option4 = part1L + part2L     
                                                              
                                if (option1 <= 140){
                                    newtweet = part1 + part2 + part3 + part4 + part5
                                    sendIt(newtweet);
                                }
                                else if (option1 > 140){
                                    if (option2 <= 140){
                                        newtweet = part1 + part2 + part3 + part4
                                        sendIt(newtweet);
                                    }
                                    else if (option2 > 140){
                                        if (option3 <= 140){
                                            newtweet = part1 + part2 + part3 
                                            sendIt(newtweet);
                                        }
                                        else {
                                            newtweet = part1 + part2  
                                            sendIt(newtweet);
                                        }
                                    }
                                }
                            }
                        }  //tneck
                    })  //forecast
                }  //fcast
            })  //geocode
        }  //llconversion
    };


function sendError(){  
    newTweet = "There was an error! Don't unfollow me!"
    sendIt(newTweet);  
}

function sendIt(txt) {
    var tweet = {
        status: (txt)
    }

T.post('statuses/update', tweet, tweeted);

    function tweeted(err, data, response) {
        if (err) {
            console.log("Something went wrong!");
         } else {
            console.log("It worked!");
            console.log();
            console.log(txt);
        }
    }
}
