require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const massive = require('massive');
const session = require('express-session');
const controller = require('./controller');
const searchController = require('./searchController');
//const nodemailer = require('nodemailer');
//const sgTransport = require('nodemailer-sendgrid-transport');

const { SERVER_PORT, DATABASE_STRING, SESSION_SECRET, SENDGRID_API_KEY } = process.env;

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(session({
  secret: SESSION_SECRET,
  resave: true,
  saveUninitialized: true
}));

massive(DATABASE_STRING)
  .then(db => {
    app.set('db', db);
    console.log('Database is connected');
  })
  .catch(err => {
    console.log('Database connection error', err);
  })

// using SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(SENDGRID_API_KEY);

//const client = nodemailer.createTransport(sgTransport(options))

//Endpoints

//Auth
app.post('/api/auth/register', controller.register);
app.post('/api/auth/login', controller.login);
app.get('/api/auth/me', controller.userInfo);
app.post('/api/auth/logout', controller.logout);

//Content
//All Posts
app.get('/api/listings/all', controller.getAllListings);
//Single Post
app.get('/api/listings/:postid', controller.getPost);
app.get('/api/photos/:postid', controller.getPhotos);
//My Jobs
app.get('/api/myJobs', controller.myJobs);

//My listings
app.get('/api/myListings', controller.myListings);

//Create Listing
app.post('/api/listings/new', controller.newListing);
app.post('/api/addPhoto', controller.addPhoto);

//Delete Listing
app.delete('/api/listings/:postid', controller.deleteListing);

//Search Listings
app.get('/api/searchPosts', searchController.searchListings);

//Take Job (add job to user's 'my jobs' list)
app.put('/api/listings/takeJob', controller.takeJob);

//Send Email Message
app.post('/api/sendMessage', (req, res) => {
  const { toEmail, message, postTitle } = req.body
  const msg = {
    to: toEmail,
    from: 'no-reply@cleanerapp.com',
    subject: `New message about ${postTitle}`,
    text: message
  };
  sgMail.send(msg);
  res.status(200).send('success');
})

app.listen(SERVER_PORT, () => {
  console.log(`Server listening on port ${SERVER_PORT}`)
});
