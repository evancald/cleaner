require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const massive = require('massive');
const session = require('express-session');

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

app.listen(SERVER_PORT, () => {
  console.log(`Server listening on port ${SERVER_PORT}`)
});
