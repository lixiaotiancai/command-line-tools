var chalk = require("chalk");

var segLine = chalk.red(" -----------------------------------------");
var segVerLine = chalk.red("|");
var segLine2 = chalk.yellow("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
var segLine3 = chalk.blue("=============================");

function temporaryChange (temp) {
	return Math.round((temp - 32) / 1.8);
}

yahooWeather = {
	yahooStr: 'select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="${city}")',

    printMessage: function (location,forecast) {
    	console.log("\n");
    	console.log(`      ${chalk.cyan(location.city+"天气预报")}    `);
    	console.log(segLine2);
    	for(var i=0; i<7; i++){
    		console.log(chalk.yellow(`         第${i+1}天`));
    		console.log(`${chalk.cyan("日期:          ")+"  "+chalk.green(forecast[i].date)}`);
    		console.log(`${chalk.cyan("星期:          ")+"  "+chalk.green(forecast[i].day)}`);
    	    console.log(`${chalk.cyan("最低温度:      ")+"  "+chalk.green(temporaryChange(forecast[i].low)+"℃")}`);
    	    console.log(`${chalk.cyan("最高温度:      ")+"  "+chalk.green(temporaryChange(forecast[i].high)+"℃")}`);
    	    console.log(`${chalk.cyan("天气:          ")+"  "+chalk.green(forecast[i].text)}`);
    	    console.log(segLine3);
    	}
    },

    errMessage: function () {
    	console.log(segLine);
    	console.log(`${segVerLine}               ${chalk.yellow("WARNING!!!")}                ${segVerLine}`);
    	console.log(`${segVerLine}                                         ${segVerLine}`);
    	console.log(`${segVerLine}         ${chalk.red("输入的地区或指令不合法")}          ${segVerLine}`);
    	console.log(`${segVerLine}                                         ${segVerLine}`);
    	console.log(segLine);
    }
}

module.exports = yahooWeather;