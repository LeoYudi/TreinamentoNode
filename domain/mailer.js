const nodemailer = require('nodemailer');

const mailer = (emails, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: emails,
    subject: subject,
    text: text,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error)
      console.log(error);
    else
      console.log('Email enviado: ' + info.response);
  })
}

module.exports = mailer;