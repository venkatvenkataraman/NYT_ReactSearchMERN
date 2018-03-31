import React, { Component } from "react";
import API from "../../utils/API";
import {Article} from '../../components/Article'
// import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import { Panel, PanelHeading, PanelBody } from '../../components/Panel';

// import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
// import { List, ListItem } from "../../components/List";
import { List } from "../../components/List";
import { Input, FormBtn } from "../../components/Form";
// import { Input, TextArea, FormBtn } from "../../components/Form";

// const db = require("../../../models");

class Articles extends Component {
  state = {
    articles: [],
    savedArticles: [],
    // showResults: false,
    // error:"",
    topic: "",
    startyear: "",
    endyear: "",
    message: "Begin your search for articles!"
  };

  getArticles = () => {
    API.getArticles({
      q: this.state.q,
      start_year: this.state.start_year,
      end_year: this.state.end_year
    })
      .then(res =>
        this.setState({
          articles: res.data,
          message: !res.data.length
            ? "No New Articles Found, Try a Different Query"
            : ""
        })
      )
      .catch(err => console.log(err));
  };

  removeActiveArticle = id => {
    const activeArticleToRemove = this.state.articles.find(article => article._id === id);
    const copyOfArticlesInState = this.state.articles;
    const index = this.state.articles.indexOf(activeArticleToRemove);
    if (index > -1) {
      copyOfArticlesInState.splice(index, 1);
    }
    this.setState({
      articles: copyOfArticlesInState
    });
    console.log("In Articles.js/removeActiveArticles. All articles back in state, except for the saved article", this.state.articles);
 }

  updateSavedArticlesStateAfterSave = article =>{
    // console.trace();
    // console.log(this.state);
    console.log("In Articles.js/updateSavedArticlesStateAfterSave, this.state.savedArticles is:", this.state.savedArticles);
    var updatedSavedArticles = this.state.savedArticles;
    console.log("In Articles.js/updateSavedArticlesStateAfterSave BEFORE PUSH var updatedSavedArticles is: ", updatedSavedArticles );
    updatedSavedArticles = updatedSavedArticles.concat(article);
    console.log("In Articles.js/updateSavedArticlesStateAfterSave: var updatedSavedArticles is: ", updatedSavedArticles );
    this.setState({
      savedArticles: updatedSavedArticles
    });
    console.log("In Articles.js/updateSavedArticlesStateAfterSave: this.state.savedArticles is: ", this.state.savedArticles);
  }

  //function to save an article
  saveArticle = id => {
    const article = this.state.articles.find(article => article._id === id);
    console.log ("In Articles.js/saveArticle. Article to save", article);

    API.saveArticle(article)
      
      .then (this.removeActiveArticle(id))

      .then (this.updateSavedArticlesStateAfterSave(article))
      
      .then (this.forceUpdate())

      .then (
        console.log ("In Articles.js/saveArticle. this.state.articles: ", this.state.articles))
      .then (
        console.log ("In Articles.js/saveArticle. this.state.savedArticles: ", this.state.savedArticles)
      );
      // window.location.reload(true);
      //  .then(res => this.getArticles());

  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    console.log("In Articles.js/handleFormSubmit");
    console.log(this.state.topic, this.state.startyear, this.state.endyear);
    event.preventDefault();
    if (this.state.topic && this.state.startyear && this.state.endyear) {
      API.getArticlesByTopic({
        q: this.state.topic,
        start_year: this.state.startyear,
        end_year: this.state.endyear
      })
        // .then(res =>
        //   this.setState({
        //     articles: res.data,
        //     message: !res.data.length
        //       ? "No New Articles Found, Try a Different Query"
        //       : ""
        //   })
        // )
        .then(res => {
        // .then(res => this.loadArticles())
          console.log("In Articles.js/handleFormSubmit: Search response is: ", res);
          this.setState({
              articles: res.data,
              showResults: true,
              error:"",
              topic: "",
              startyear: "",
              endyear: ""
          });
          console.log("State is: ", this.state);
        }
        )
        .catch(err => console.log(err));
        //   .catch(err => 
        //    this.setState({error: err.message}));

    } //if
  }; //handleFormSubmit

  componentDidMount() {
    this.getSavedArticles();
  }
  
  getSavedArticles = () => {
    API.getSavedArticles()
      .then(res =>
        this.setState({
          savedArticles: res.data
        })
      )
      .catch(err => console.log(err));
  };



    // deleteArticle = id => {
  //   API.deleteArticle(id)
  //     .then(res => this.loadArticles())
  //     .catch(err => console.log(err));
  // };

  handleArticleDelete = id => {
    API.deleteArticle(id).then(res => this.getSavedArticles());
  };

  render() {
    return (
      <Container fluid>
        <Row>
          {/* <Col size="md-6"> */}
          <Col size="sm-10" offset='sm-1'>
            <Jumbotron>
              <h2>New York Times Article Scrubber</h2>
              <h3>Search for and annotate articles of interest!</h3>
            </Jumbotron>
            <Panel>
              <PanelHeading>
                <h4>Search</h4>
              </PanelHeading>
              <PanelBody>
                    <form>
                      <Input
                        value={this.state.topic}
                        onChange={this.handleInputChange}
                        name="topic"
                        placeholder="Topic (required)"
                      />
                      <Input
                        value={this.state.startyear}
                        onChange={this.handleInputChange}
                        name="startyear"
                        placeholder="Start Year (required)"
                      />
                      <Input
                        value={this.state.endyear}
                        onChange={this.handleInputChange}
                        name="endyear"
                        placeholder="End Year (required)"
                      />
                      <FormBtn
                        disabled={!(this.state.topic && this.state.startyear && this.state.endyear)}
                        onClick={this.handleFormSubmit}
                        // onClick={()=>console.log(this.handleFormSubmit && "Submitting search form")}
                      >
                        Search
                      </FormBtn>
                    </form>
              </PanelBody>
            </Panel>

          </Col>
        </Row>

        <Row>
          <Col size="sm-10" offset='sm-1'> 
            <Panel>
             <PanelHeading>
               <h4>Search Results</h4>
             </PanelHeading>
             <PanelBody>
               {this.state.articles.length ? (
                <List>
                  {this.state.articles.map(articleItem => (
                    <Article
                      key={articleItem._id}
                      _id={articleItem._id}
                      title={articleItem.headline.main}
                      url={articleItem.web_url}
                      date={articleItem.pub_date}
                      summary={articleItem.snippet}
                      handleClick= {this.saveArticle} //{this.handleArticleSave}
                      buttonText="Save Article"
                    />
                  ))}
                </List>
               ) : (
                <h2 className="text-center">{this.state.message}</h2>
               )}
              </PanelBody>
            </Panel>
          </Col>
        </Row>

        <Row>
          <Col size="sm-10" offset='sm-1'>
            <Panel>
            <PanelHeading>
               <h4>Saved Articles</h4>
             </PanelHeading>
             <PanelBody>
              {this.state.savedArticles.length ? (
                <List>
                  {this.state.savedArticles.map(articleItem => (
                    <Article
                      key={articleItem._id}
                      _id={articleItem._id}
                      title={articleItem.title}
                      url={articleItem.url}
                      date={articleItem.date}
                      summary={articleItem.snippet}
                      handleClick={this.handleArticleDelete}
                      buttonText="Delete Article"
                      saved
                    />
                  ))}
                </List>
              ) : (
                <h2 className="text-center">No Saved Articles</h2>
              )}
              </PanelBody>
            </Panel>
          </Col>
        </Row>

      </Container>
    );
  }
}

export default Articles;
