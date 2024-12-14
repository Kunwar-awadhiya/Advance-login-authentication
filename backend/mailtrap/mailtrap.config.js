/*
import dotenv from 'dotenv';
dotenv.config();

import Nodemailer from "nodemailer";
import { MailtrapTransport } from "mailtrap";

const TOKEN = process.env.MAILTRAP_TOKEN;

const transport = Nodemailer.createTransport(
  MailtrapTransport({
    token: TOKEN,
  })
);

const sender = {
  address: "mailtrap@demomailtrap.com",
  name: "Mailtrap Test",
};
const recipients = [
  "keven3605y@gmail.com",
];

transport
  .sendMail({
    from: sender,
    to: recipients,
    subject: "You are awesome!",
    text: "Congrats for sending test email with Mailtrap!",
    category: "Integration Test",
  })
  .then(console.log, console.error);


import { MailtrapClient } from "mailtrap";
import dotenv from 'dotenv';
dotenv.config();

export const MailtrapClient = new MailtrapClient({token: process.env.MAILTRAP_TOKEN});

export const sender = {
  email : "keven3605y@gmail.com",
  name : "kunwar ",
};




import { MailtrapClient as MTClient } from "mailtrap";
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Create a new Mailtrap client using the token from your environment variables
export const mailtrapClient = new MTClient({ token: process.env.MAILTRAP_TOKEN });

// Define the sender's information
export const sender = {
  email: "keven3605y@gmail.com",
  name: "Kunwar",
};


*/

/*
import { MailtrapClient } from "mailtrap";
import dotenv from "dotenv";

dotenv.config();

export const mailtrapClient = new MailtrapClient({
	endpoint: process.env.MAILTRAP_ENDPOINT,
	token: process.env.MAILTRAP_TOKEN,
});

export const sender = {
	email: "mailtrap@demomailtrap.com",
	name: "Keven",
};

*/


import { MailtrapClient } from "mailtrap";
import dotenv from "dotenv";

dotenv.config();

export const mailtrapClient = new MailtrapClient({
	endpoint: process.env.MAILTRAP_ENDPOINT,
	token: process.env.MAILTRAP_TOKEN,
});

export const sender = {
	email: "mailtrap@demomailtrap.com",
	name: "Keven",
};