module.exports = {
  searchListings: (req, res) => {
    const { searchText, city, type } = req.query;
    const { userid } = req.session.user;
    req.app.get('db').get_all_listings()
    .then(listings => {
      if (searchText) {
        listings = listings.filter(listing => {
          return listing.title.toLowerCase().indexOf(searchText.toLowerCase()) !== -1;
        })
      }
      if (city) {
        listings = listings.filter(listing => {
          return listing.city.toLowerCase().indexOf(city.toLowerCase()) !== -1;
        })
      }
      if (type === 'job') {
        listings = listings.filter(listing => {
          return listing.type === 'job';
        })
      }
      if (type === 'service') {
        listings = listings.filter(listing => {
          return listing.type === 'service';
        })
      }
      res.status(200).send(listings);
    })
  }
}