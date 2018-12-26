const packageJson = require("../../package.json");
const chalk = require("chalk");

var str = ""

module.exports = {
	init:()=>{
		console.log(chalk.yellow(packageJson.version));
		str = "______________________________________" +
		      "\n\n" +
		      "    THIS IS THE LATEST VERSION!!!" +
		      "\n\n" +
		      "______________________________________"
		console.log(chalk.cyan(str));
	}
}