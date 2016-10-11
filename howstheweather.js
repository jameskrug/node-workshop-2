var api = require("./library/request-json.js");
var colors = require("colors");
var request = require("request");
var prompt = require("prompt");
var ForecastIo = require('forecastio');
var forecastIo = new ForecastIo("b57c7ecdd8927a9c843b5aeeefb5f3a0");
var Table = require("cli-table");
var table = new Table();
var moment = require("moment");



prompt.get("Select city: ", function(err,userInput){
    if (err){
        console.log("bad stuff happened");
    }
    else{
        var place = userInput["Select city: "];
    }
    var sendUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=" + place;
    api.requestJson(sendUrl, function(err, data){
        if (err){
            console.log("broken");
        }
        else{
            var city = {};
            city.lat = data.results[0].geometry.location.lat;
            city.lng = data.results[0].geometry.location.lng;
            weatherFinder(city);
        }
    });
});


function weatherFinder(cityCoordinates){
    forecastIo.forecast(cityCoordinates.lat, cityCoordinates.lng).then(function(data){
        var weeklyForecast = [];
        console.log("current weather: ".red, data.currently.summary.blue);
        console.log("tomorrow: ".red, data.daily.summary.green)
        for (var i = 1; i <= 5; i++){
            var theDate = moment.unix(data.daily.data[i].time).format("ddd, MMM Do");
            table.push(
                {[theDate] : (data.daily.data[i].summary).yellow}
            );
        }
        console.log("next five days: ".zebra);
        console.log(table.toString());
    });
}