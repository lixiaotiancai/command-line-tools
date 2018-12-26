var chalk = require("chalk");

var a = [];
var lenMax = 25;
var len = lenMax;
var add = false;



function colorChange(){
    var num = Math.round(Math.random()*255);
	var b = true;
	return function(){
    	if(b){
    		num++;
    		if(num==255){b = !b}
 	    }else{
    		num--;
    	if(num==0){b = !b}
   	    }
    	return num;
    }
}

var colorChangea = colorChange();
var colorChangeb = colorChange();
var colorChangec = colorChange();


const colorword = {
	init:function(){
		setInterval(function(){
            for(var j=0; j<(lenMax-len)/2; j++){
				a.push(" ");
			}
			for(var i=0;i<len;i++){
				var str = String.fromCharCode(Math.floor( Math.random() * 26) + "a".charCodeAt(0));
				str = chalk.rgb(colorChangea(),colorChangeb(),colorChangec()).bold(str);
				a.push(str);
			}
			console.log(a.join(''));
			if(add){
				len += 2;
				if(len==lenMax){add = !add};
			}else{
				len -= 2;
				if(len==1){add = !add}
			}
			a = [];
		},5)
	}
}
module.exports = colorword;