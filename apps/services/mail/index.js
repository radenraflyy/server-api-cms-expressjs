const nodemailer = require('nodemailer')
const Mustache = require('mustache')
const {gmail, password} = require('../../config')
const fs = require('fs')

const transporter = nodemailer.createTransport({
  host: "smtp.example.com",
  port: 587,
  secure: false,
  auth: {
      user: gmail,
      pass: password,
  }
})

const otpMail = async (email, data) => {
  try {
    let template = fs.readFileSync('apps/views/email/otp.html', 'utf8');

    let message = {
      from: gmail,
      to: email,
      subject: 'Code OTP For Registration Is: ',
      html: Mustache.render(template, data),
    };

    return await transporter.sendMail(message);
  } catch (ex) {
    console.log(ex);
  }
};

module.exports = { otpMail }