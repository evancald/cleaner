const bcrypt = require('bcrypt-nodejs');

module.exports = {
  //Auth functions
  //1. Register
  register: (req, res) => {
    const { username, email, password, profilePicture } = req.body;
    bcrypt.hash(password, null, null, (err, hash) => {
      if (err) {
        return res.send('Something went wrong during hashing', err);
      }
      req.app.get('db').register_user([username, email, hash, profilePicture])
        .then(() => {
          res.status(200).send('User registered successfully')
        })
      })
    },
    //2. Login
    login: (req, res) => {
      const { username, password } = req.body;
      req.app.get('db').login_user([username])
        .then(user => {
          bcrypt.compare(password, user[0].password, (err, isCorrectPassword) => {
            if (err) {
              return res.send(err);
            } if (isCorrectPassword) {
              req.session.user = user[0];
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
    //3. Check Session
    userInfo: (req, res) => {
      res.status(200).send(req.session.user);
    },
    //4. Logout
    logout: (req, res) => {
      req.session.destroy();
      res.status(200).send();
    },
    //Dashboard functions
    //1. Get all listings
    getAllListings: (req, res) => {
      req.app.get('db').get_all_listings()
      .then((listings) => {
        res.status(200).send(listings);
      })
    },
    //2. Get a Specific Post
    getPost: (req, res) => {
      const { postid } = req.params;
      req.app.get('db').get_post([postid])
      .then((post) => {
        res.status(200).send(post);
      })
    },
    //3. Get Photos for Selected Post
    getPhotos: (req, res) => {
      const { postid } = req.params;
      req.app.get('db').get_photos([postid])
      .then((photos) => {
        res.status(200).send(photos);
      })
    },
    //4. Create New Listing
    newListing: (req, res) => {
      const { type, title, description, price, address, city, usState, zip, default_photo } = req.body;
      //console.log('default photo:', default_photo);
      const { userid:author } = req.session.user;
      req.app.get('db').create_new_listing([author, type, title, description, price, address, city, usState, zip, default_photo])
      .then((response) => {
        //console.log(response);
        res.status(200).send(response);
      })
      .catch(err => {
        console.log('Error:', err);
      })
    },
    //5. Add Photos for Listing
    addPhoto: (req, res) => {
      const { photo, postid } = req.body;
      req.app.get('db').add_photo([photo, postid])
      .then(() => {
        res.status(200).send();
      })
    },
    //6. Add Job to Users List of Jobs 'My Jobs'
    takeJob: (req, res) => {
      const { userid } = req.session.user;
      const { jobid } = req.body;
      req.app.get('db').take_job([userid, jobid])
      .then(() => {
        res.status(200).send();
      })
    },
    //7. Get My Jobs
    myJobs: (req, res) => {
      const { userid } = req.session.user;
      req.app.get('db').my_jobs([userid])
      .then(myJobs => {
        res.status(200).send(myJobs);
      })
    },
    //8. Get My Listings
    myListings: (req, res) => {
      const { userid } = req.session.user;
      req.app.get('db').get_my_listings([userid])
      .then(myListings => {
        res.status(200).send(myListings);
      })
    },
    //9. Delete Listing
    deleteListing: (req, res) => {
      const { postid } = req.params;
      req.app.get('db').delete_listing([postid])
      .then(() => {
        res.status(200).send();
      })
    }
  }