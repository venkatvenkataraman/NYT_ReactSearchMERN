const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const Note = require("./Note");

// const bookSchema = new Schema({
//   title: { type: String, required: true },
//   author: { type: String, required: true },
//   synopsis: String,
//   date: { type: Date, default: Date.now }
// });

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
const ArticleSchema = new Schema({
  // `title` is required and of type String
  title: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  // `link` is required and of type String
  url: {
    type: String,
    required: true
  },
  saved: {
    type: Boolean,
    default: false 
  },
  summary: {
    type: String,
    required: false
  }
  // `note` is an object that stores a Note id
  // The ref property links the ObjectId to the Note model
  // This allows us to populate the Article with an associated Note
  // note: {
  //   type: Schema.Types.ObjectId,
  //   ref: "Note"
  // }
});

// This creates our model from the above schema, using mongoose's model method
const Article = mongoose.model("Article", ArticleSchema);

// Export the Article model
module.exports = Article;

