const bcrypt = require('bcrypt-nodejs');

module.exports = {
  //Auth
  register: (req, res) => {
    const { username, password } = req.body;
    bcrypt.hash(password, null, null, (err, hash) => {
      if (err) {
        return res.send('Something went wrong during hashing', err);
      }
      req.app.get('db').register_user([username, hash])
        .then(() => {
          res.status(200).send('User registered successfully')
        })
      })
    },
    login: (req, res) => {
      const { username, password } = req.body;
      req.app.get('db').login_user([username])
        .then(user => {
          bcrypt.compare(password, user[0].password, (err, isCorrectPassword) => {
            if (err) {
              return res.send(err);
            } if (isCorrectPassword) {
              req.session.user = user[0];
              console.log(req.session.user);
              res.status(200).send(user[0]);
            } else {
              res.status(200).send();
            }
          })
        })
        .catch(err => {
          res.status(500).send(err);
        })
    },
    userInfo: (req, res) => {
      res.status(200).send(req.session.user);
    },
    logout: (req, res) => {
      req.session.destroy();
      res.status(200).send();
    },
    //Dashboard
    getAllListings: (req, res) => {
      req.app.get('db').get_all_listings()
      .then((listings) => {
        res.status(200).send(listings);
      })
    },
    //New Listing
    newListing: (req, res) => {
      const { type, title, description, price, address, city, usState, zip,} = req.body;
      const { author } = req.session.user.id;
      console.log('Author:', author);
      req.app.get('db').create_new_listing([author, type, title, description, price, address, city, usState, zip])
      .then(() => {
        res.status(200).send();
      })
      .catch(err => {
        console.log('Error:', err);
      })
    }
  }