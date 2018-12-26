const readline = require('readline');
const chalk = require('chalk');
var mailData = require("../lib/mail-data");

function c(str){
  return chalk.cyan(str);
}

const mail = {
	  init: function(){
		    
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question(c("请输入邮箱账号(仅限qq邮箱)："),function(user){
        	  mailData.auth.user += user;
        	  rl.pause();

        	  rl.question(c("请输入POP3/SMTP授权码："),function(pwd){
        		    mailData.auth.password += pwd;
        		    rl.pause();

                rl.question(c("请输入收件人地址："),function(adress){
                    mailData.mailOption.sendTo += adress;
                    rl.pause();

                    rl.question(c("请输入主题："),function(address){
                        mailData.mailOption.subject = address;
                        rl.pause();

                            rl.question(c("请输入正文："),function(text){
                            mailData.mailOption.text = text;
                            

                            mailData.sendMail(mailData.auth.user,
                                              mailData.auth.password,
                                              mailData.mailOption.sendTo,
                                              mailData.mailOption.subject,
                                              mailData.mailOption.text);


                            rl.close();
                        });
                    });

                });
        	  });
        });
	  }
}

module.exports = mail;