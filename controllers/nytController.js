const axios = require("axios");
const db = require("../models");

// Defining methods for the nytController

// findAll searches the NYT API and returns only the entries we haven't already saved
module.exports = {
  findAll: function(req, res) {
    const params = Object.assign(
      { api_key: "9b3adf57854f4a19b7b5782cdd6e427a" },
      req.query
    );
    console.log("In nytController.js/findAll params = ", params);
    const query = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + params.api_key + "&q=" + params.q +
                  "&begin_date=" + params.start_year + "0101&end_date=" + params.end_year + "1231"
    console.log("In nytController.js/findAll Full query for axios.get = ", query);
    // axios.get("https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=b9f91d369ff59547cd47b931d8cbc56b:0:74623931&q=Hillary%20Clinton&begin_date=19950101&end_date=19961231")
    // axios
    //   .get("https://api.nytimes.com/svc/search/v2/articlesearch.json", {
    //     params
    //   })
    axios
      .get(query)
      .then(response => {
        db.Article
          .find()
          .then(dbArticles =>
            response.data.response.docs.filter(article =>
              dbArticles.every(
                dbArticle => dbArticle._id.toString() !== article._id
              )
            )
          )
          .then(articles => res.json(articles))
          .catch(err => res.status(422).json(err));
      });
  }
};
