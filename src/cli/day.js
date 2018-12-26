var chalk = require("chalk");
const readline = require('readline');

var date = new Date();
var nowYear = date.getFullYear();
var nowMonth = date.getMonth()+1;
var now = date.getDate();

function c(str){
  return chalk.cyan(str);
}

const day = {
	init:function(){
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question(c("请输入要查询的年份："),function(year){
        	var year = Number(year) || nowYear;  
        	rl.pause();
            rl.question(c("请输入要查询的月份："),function(month){
        	    var month = Number(month) || nowMonth;                  
								
				var time = new Date(year,month,0);
				var dayInMonth = time.getDate();         //这个月有多少天
				var firstDay = new Date(year,month-1,1);
				var firstDayWeek = firstDay.getDay();    //这个月第一天是星期几
				var segLine = " -----------------------------------------";
				segLine = chalk.cyan(segLine);
				var segVerLine = chalk.cyan("|");
				var arr = [];
				var dateStr = segVerLine;
				var AllInMonth;                          //这个月算上空格总共的天数
				for(var i=4;i<7;i++){
					if(7*i >= firstDayWeek+dayInMonth){
					AllInMonth = 7*i;
					break;
					}
				}  
                console.log("\n");
		        console.log(segLine);
				console.log(`${segVerLine}            ${chalk.yellowBright(year + "年")}      ${chalk.yellowBright(month + "月")}              ${segVerLine}`);
				console.log(segLine);
				console.log(`${segVerLine} ${chalk.yellowBright("Sun")} ${segVerLine} ${chalk.yellowBright("Mon")} ${segVerLine} ${chalk.yellowBright("Tue")} ${segVerLine} ${chalk.yellowBright("Wen")} ${segVerLine} ${chalk.yellowBright("Thu")} ${segVerLine} ${chalk.yellowBright("Fri")} ${segVerLine} ${chalk.yellowBright("Sat")} ${segVerLine} `);
       			var d = 1;
				for (var i=0; i<AllInMonth; i++) {
					(i<firstDayWeek) || (i>=firstDayWeek+dayInMonth) ? 
					arr.push(" ") : arr.push(d++);
				}
				for (var index in arr){
		    		if(arr[index] === " "){
		    			dateStr += `     ${segVerLine}`;
		   		 }else if(arr[index]>=10){
		    			if(arr[index] === now && month === nowMonth && year === nowYear){arr[index] = chalk.bgKeyword("red")(chalk.yellow(arr[index]))}
		    			dateStr+=`  ${arr[index]} ${segVerLine}`
		 		   }
		  		  else{
             		   if(arr[index] === now && month === nowMonth && year === nowYear){arr[index] = chalk.bgKeyword("red")(chalk.yellow(arr[index]))}
		    			dateStr+=`  ${arr[index]}  ${segVerLine}`
		  		  }
		  		  if(index%7 === 6 && index < AllInMonth-1){
		    			dateStr += "\n";
		    			dateStr += segVerLine;
		    		}
				}
       		    console.log(dateStr);
        		console.log(segLine);				
        		rl.close();   
            });
        });
		
	}
}

module.exports = day;