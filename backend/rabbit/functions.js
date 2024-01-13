var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com", // hostname
    secureConnection: false, // TLS requires secureConnection to be false
    port: 587, // port for secure SMTP
    tls: {
       ciphers:'SSLv3',
       rejectUnauthorized: false
    },
    auth: {
        user: 'jobfinder1956@outlook.com',
        pass: 'Marco@outlook1999'
    }
});

/////

let sendWelcome = async () =>{
    try{
        var mailOptions = {
            from: '"jobfinder " <jobfinder1956@outlook.com>', // sender address (who sends)
            to: req.body.emailto, // list of receivers (who receives)
            subject: 'welcome emial', // Subject line
            /*text: 'Hello world ', // plaintext body*/
            html: `<p>welcone to showcase</h1> `
        };
        
        // send mail with defined transport object
        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                return console.log(error);
            }
            console.log('Message sent: ' + info.response);
            res.status(200).json('sucess')
        });
    }catch(error){
        console.log(error)
        res.status(400).json({error : error.message})
    }

}


