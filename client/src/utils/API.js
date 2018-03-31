import axios from "axios";
import filterParams from "./filterParams";

export default {
  // Gets articles from the NYT API
  getArticles: function(params) {
    return axios.get("/api/nyt", { params: filterParams(params) });
  },

  // Gets all saved articles
  getSavedArticles: function() {
    return axios.get("/api/articles");
  },
  // // Gets all articles
  // getArticles: function() {
  //   console.log("In API.js/getArticles");
  //   // console.trace();
  //   return axios.get("/api/articles");
  // },

  // // Gets the article with the given id
  // getArticle: function(id) {
  //   return axios.get("/api/articles/" + id);
  // },
  // Deletes the article with the given id
  deleteArticle: function(id) {
    return axios.delete("/api/articles/" + id);
  },
  saveArticle: function(articleData) {
    console.log ("In API.js/saveArticle. Article to save", articleData);
    // return axios.post("/api/articles", articleData);
    return axios.post("/api/articles", articleData)
                .then (response => response.data)
                .catch(error => {
                  if (error.response) {
                    console.log(error.response);
                  }
                  // event.preventDefault();
                });
  },

  // Searches for an article and returns the search
  getArticlesByTopic: function(params) {
   // return axios.post("/api/");
    console.log("In API.js/getArticlesByTopic; Passed query params value:", params);
    console.log("In API.js/getArticlesByTopic; Filtered params value:", filterParams(params));
    return axios.get("/api/nyt", { params: filterParams(params) });
       
  }
};
