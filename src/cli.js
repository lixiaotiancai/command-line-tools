const minimist = require("minimist");
const CONFIG = require("./config");

let cfg={};
let cli={};

//这里设置一个计数器，统计cfg.args的属性数量，如果属性数量>2
//说明指令用的是单"-"且后面是多字母形式，则会导致比如-h和-hasdas
//得到的结果是一样的，但这不是我们所期望的，所以这里增加一个判定
//当单“-”后面有多字母时返回默认指令。

function countAdd(){
    var count = 0;
    return function(){
        return ++count;
    }
}
var c = countAdd();

const cliAction = {
	initCli:function(){
		const COMMAND = CONFIG.COMMAND;
        COMMAND.forEach(function(cmd){
        	cli[cmd] = require(`./cli/${cmd}.js`);
        });
	},

	initArgs:function(){
		const args = cfg.args;
		let cliName = cliAction.getCli(args);

		if(!cli[cliName]){
			cliName = CONFIG.DEFAULT_CMD;
		}
		cli[cliName].init(args);
    //console.log(cli);
	},

	getCli:function(args){
      if(!args) {
        	return CONFIG.DEFAULT_CMD;
      }

        let res;
        const cmds = args._ || {};

        Object.keys(args).some(function(key){
        	if(CONFIG.CLI_PARAMS[key]){
        		res = CONFIG.CLI_PARAMS[key];
        		return true;
        	}
        	return false;
        });

        if(!res) {
        	cmds.some(function(key){
        		if (CONFIG.CLI_PARAMS[key]) {
        			res = CONFIG.CLI_MAP[key];
        			return true;
        		}

        		return false;
        	});
        }
        //console.log(res);
        return res || CONFIG.DEFAULT_CMD;
	},

	init:function(){
		cliAction.initCli();
		cliAction.initArgs();
	}
}

module.exports = {
	init: ()=> {

  cfg.args = minimist(process.argv.slice(2));   //取到 - 之后的参数
    
    for(var key in cfg.args){
        if(c()>2){
            cfg.args = {_:[], help:true};
        }
    }

		//console.log(cfg.args);

		cliAction.init();  // 初始化
	}
}