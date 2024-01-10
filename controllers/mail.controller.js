const nodemailler = require('nodemailer');
const fs = require('fs');
const util = require('util');


const readFileAsync = util.promisify(fs.readFile);
let emailTemplate;

(async () => {
    try {
        emailTemplate = await readFileAsync('./template/index.html', 'utf-8');
    } catch (error) {
        console.error('Error reading email template:', error);
    }
})();


const sendEmail = async (req, res) => {
    const { name, email } = req.body;

    const formattedEmail = emailTemplate.replace('{username}', name);

    let transporter = nodemailler.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });

    let mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: `Message from ${name}`,
        html: formattedEmail
    }

    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            console.log('Error occurs', err);
        } else {
            console.log('Email sent!!! ', data);
        }
    })

    res.send('Email sent!!!');
}

module.exports = sendEmail;