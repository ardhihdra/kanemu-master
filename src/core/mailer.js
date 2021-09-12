"use strict";
const nodemailer = require("nodemailer");

async function cloudmailin() {
    let hostname = 'cloudmailin.net';
    let username = process.env.CLOUDMAILIN_USERNAME;
    let password = process.env.CLOUDMAILIN_PASSWORD;
  
    const transporter = await nodemailer.createTransport({
        host: hostname,
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: username,
            pass: password,
        },
        logger: true
    });
    return transporter
}

const testMailer = async function() {
    const testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass, // generated ethereal password
        },
    });
    return transporter
}

const emailTemplate = (payload) => {
    let html = `<ul><li>Date : ${new Date().toLocaleDateString()}`
    for(let py in payload) {
        html += `<li>${py} : ${payload[py]}</li>`
    }
    html += '</ul>'
    return html
}

// async..await is not allowed in global scope, must use a wrapper
const send = async function (payload) {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    const transporter = await cloudmailin();
    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: '"Kanemu 🍹"', // sender address 
        to: "ardhi.rofi@gmail.com", // list of receivers
        subject: "Order Baru ✔", // Subject line
        text: "Assalamualaikum?", // plain text body
        html: `<b>${emailTemplate(payload)}</b>`, // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

module.exports = {
    send
}