var yahooWeather = require("../lib/weather-data");
var chalk = require("chalk");

const minimist = require("minimist");
const YQL = require('yql');

var arg = minimist(process.argv.slice(2));
var city = arg.weather;
var query = new YQL(yahooWeather.yahooStr.replace("${city}",city));


const weather = {
	init:function(){
		query.exec(function(err, data) {
			if(!err){
				//不允许--weather单指令
				if(typeof(city)==="boolean"){yahooWeather.errMessage();return;};
				if(data.query.results === null){
					//查不到该城市
					yahooWeather.errMessage();
				}else{
                    var location = data.query.results.channel.location;  
                    var forecast = data.query.results.channel.item.forecast;
                    yahooWeather.printMessage(location,forecast);
                }
            }else{
            	//不允许--weather=后为空
        	    if(city==""){yahooWeather.errMessage();}
            }
});
    }
}

module.exports = weather;