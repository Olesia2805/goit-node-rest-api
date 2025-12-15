import nodemailer from "nodemailer";
import dotenv from "dotenv";

const nodemailerConfig = {
  host: "smtp.ukr.net",
  port: 465,
  secure: true,
  auth: {
    user: process.env.UKR_NET_EMAIL,
    pass: process.env.UKR_NET_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (emailData) => {
  const { to, subject, html } = emailData;

  const emailOptions = {
    from: process.env.UKR_NET_EMAIL,
    to,
    subject,
    html,
  };

  return transport.sendMail(emailOptions);
};

export default sendEmail;
