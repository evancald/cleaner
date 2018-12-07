require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const massive = require('massive');
const session = require('express-session');
const controller = require('./controller');
const searchController = require('./searchController');

const { SERVER_PORT, DATABASE_STRING, SESSION_SECRET } = process.env;

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

//Create Listing
app.post('/api/listings/new', controller.newListing);

//Search Listings
app.get('/api/searchPosts', searchController.searchListings)

app.listen(SERVER_PORT, () => {
  console.log(`Server listening on port ${SERVER_PORT}`)
});
