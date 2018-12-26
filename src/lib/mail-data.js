const nodemailer = require("nodemailer");
const chalk = require("chalk");

const mailData = {
	auth:{
		user: "",
		password: ""
	},
	mailOption:{
		sendTo: "",
		subject: "",
		text: "",
		html: ""
	},
	sendMail: function(user,pwd,to,subject,text){
        var authMessage = {
        	    service: 'qq',  
                auth: {  
                user: user,  
                pass: pwd
            }
        }

		var transporter = nodemailer.createTransport(authMessage);

        var mailOptions = {  
            from: user, // 发送者  
            to: to, // 接受者,可以同时发送多个,以逗号隔开  
            subject: subject, // 标题  
            text: text, // 文本  
            html: '<p></p><h3 style="color:#7CFC00;text-shadow: 5px 5px 5px;">This is a NodeMail test mail</h3><p>欢迎和我进行技术交流~</p><p>\
                   Welcome to my personal blog~~click <a href="https://lixiaotiancai.github.io/"><b>here</b></a> to skip :-)</p>\
                   <img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=461073202,414975759&fm=27&gp=0.jpg"/>'
        };  

        
        transporter.sendMail(mailOptions, function (err, info) {  
            if (err) {  
                console.log(chalk.red("\n发送失败，请检查你的账号或密码是否有误。"));  
                return;  
            }  

            console.log(chalk.yellow('\n发送成功！！！'));  
        });  
	}
}

module.exports = mailData;