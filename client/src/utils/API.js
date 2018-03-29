// import cors from 'cors';
import axios from "axios";
// import apiKey from "./key.js";
import filterParams from "./filterParams";


export default {
  // Gets all articles
  getArticles: function() {
    console.log("In API.js/getArticles");
    return axios.get("/api/articles");
  },
  // Gets the article with the given id
  getArticle: function(id) {
    return axios.get("/api/articles/" + id);
  },
  // Deletes the article with the given id
  deleteArticle: function(id) {
    return axios.delete("/api/articles/" + id);
  },
  saveArticle: function(articleData) {
    return axios.post("/api/articles", articleData);
  },

  // Searches for an article and returns the search
  getArticlesByTopic: function(params) {
   // return axios.post("/api/");
    console.log("In API.js/getArticlesByTopic; Passed query params value:", params);
    console.log("In API.js/getArticlesByTopic; Filtered params value:", filterParams(params));
    return axios.get("/api/nyt", { params: filterParams(params) });
       
  }
};
