var nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USERNAME, // Your email id
    pass: process.env.EMAIL_PASSWORD // Your password
  }
});

// setup e-mail data with unicode symbols
var mailOptions = {
  from: process.env.EMAIL_USERNAME, // sender address
  to: process.env.EMAIL_TO // list of receivers
};

function sendEmail(data) {
  mailOptions.subject = '新的申请 - ' + data.subject;
  mailOptions.html = [
    '<h1>' + data.subject + '</h1>',
    '<p>姓名：' + data.name + '</p>',
    '<p>邮箱：' + data.email + '</p>',
    '<p>手机：' + data.phone + '</p>',
    '<p>' + data.content + '</p>'
  ].join('');

  // send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: ' + info.response);
  });
}

module.exports = function(req, res) {
  if (process.env.IGNORE_EMAIL === 'true') {
    console.log('Ignoring sending email...');
  } else {
    sendEmail(req.body);
  }
  res.send({success: true});
};
