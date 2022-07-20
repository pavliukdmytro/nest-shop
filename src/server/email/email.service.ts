import { Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import * as process from 'process';

@Injectable()
export class EmailService {
  sendEmail(to: string, subject: string, html: string) {
    // console.log(process.env.EMAIL_STRING);
    // console.log(process.env.EMAIL_PASSWORD_STRING);
    // console.log('_________');
    const transporter = createTransport({
      service: 'gmail',
      // host: 'smtp.gmail.com',
      // port: 465,
      // secure: false,
      // requireTLS: true,
      host: 'smtp.gmail.com',
      port: 587,
      // secure: false, // use SSL
      // debug: true,
      auth: {
        user: process.env.EMAIL_STRING,
        pass: process.env.EMAIL_PASSWORD_STRING,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_STRING,
      subject: 'Sending Email using Node.js',
      html,
      to,
    };

    // console.log(mailOptions);

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }
}
