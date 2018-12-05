module.exports = {
  searchListings: (req, res) => {
    const { searchText, type, ownPost, city, zip } = req.query;
    console.log(searchText);
    const { userid } = req.session.user;
    req.app.get('db').get_all_listings()
    .then(listings => {
      let searchResult = listings;
      if (searchText) {
        searchResult = listings.filter(listing => {
          return listing.title.toLowerCase().indexOf(searchText.toLowerCase()) !== -1;
        })
      }
      res.status(200).send(searchResult);
    })
  }
}