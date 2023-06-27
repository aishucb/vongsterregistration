const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

// Middleware
const corsOptions = { origin: "https://ek11-frontend.onrender.com" };
app.use(express.json());
app.use(cors(corsOptions));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
      console.log(`App is listening on PORT ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

// Create a transporter using the SMTP server details
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'minnucb79@gmail.com', // SMTP username
      pass: '7559054755' // SMTP password
    }
  });

// Route for form submission
app.post("/", (req, res) => {
    // Retrieve form data
    const { name, email, message } = req.body;
  
    // Define the email options
    const mailOptions = {
      from: 'minnucb79@gmail.com', // Sender address
      to: 'aiswaryacb755@gmail.com', // List of recipients
      subject: 'New Form Submission', // Subject line
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`, // Plain text body
      html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong> ${message}</p>` // HTML body
    };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ message: 'Error sending email' });
    } else {
      console.log('Email sent:', info.response);
      res.status(200).json({ message: 'Email sent successfully' });
    }
  });
});

// Default route
app.get("/", (req, res) => {
  res.status(201).json({ message: "Connected to Backend!" });
});
