import React, { Component } from "react";
import API from "../../utils/API";
import { Article } from '../../components/Article'
// import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import { Panel, PanelHeading, PanelBody } from '../../components/Panel';

// import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
// import { List, ListItem } from "../../components/List";
import { Input, FormBtn } from "../../components/Form";
// import { Input, TextArea, FormBtn } from "../../components/Form";

class Articles extends Component {
  state = {
    results: [],
    showResults: false,
    error:"",
    topic: "",
    startyear: "",
    endyear: ""
    // url: "",
    // date: ""
  };

  componentDidMount() {
    this.loadArticles();
  }

  loadArticles = () => {
    console.log("Reached Articles.js/loadArticles function");
    API.getArticles()
      .then(res =>
        this.setState({ results: res.data, topic: "" })
      )
      .catch(err => console.log(err));
  };

  //function to save an article
  saveArticle = (article) => {
  //creating new article object
      let newArticle = {
          title: article.headline.main,
          date: article.pub_date,
          url: article.web_url,
          saved: true,
          summary: article.snippet
      }
      console.log("In src/pages/Articles.js/save Article. To save Article: ", newArticle);
  
      //calling the API
      API
        .saveArticle(newArticle)
        .then(results => {
          //removing the saved article from the results in state
          let unsavedArticles = this.state.results.filter(article => article.headline.main !== newArticle.title)
          this.setState({results: unsavedArticles})
        })
        .catch(err => console.log(err));
  } //saveArticle function

  deleteArticle = id => {
    API.deleteArticle(id)
      .then(res => this.loadArticles())
      .catch(err => console.log(err));
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
          console.log("Search response is: ", res);
          this.setState({
              results: res.data,
              //results: res.data.response.docs,
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

  render() {
    return (
      <Container fluid>
        <Row>
          {/* <Col size="md-6"> */}
          <Col size="sm-10" offset='sm-1'>
            <Jumbotron>
              <h4>New York Times Article Scrubber</h4>
              <h5>Search for and annotate articles of interest!</h5>
            </Jumbotron>
            <Panel>
              <PanelHeading>
                <h5>Search</h5>
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
                      {/* <TextArea
                        value={this.state.synopsis}
                        onChange={this.handleInputChange}
                        name="synopsis"
                        placeholder="Synopsis (Optional)"
                      /> */}
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
            { !this.state.results ?
              (<h5>No results Found.  Please try again</h5>) :
              this.state.results.length>0 ? (
                <Panel>
                  <PanelHeading>
                    <h2>Results</h2>
                  </PanelHeading>
                  <PanelBody>
                    {
                      this.state.results.map((article, i) => (
                          <Article
                            key={i}
                            title={article.headline.main}
                            url={article.web_url}
                            summary={article.snippet}
                            date={article.pub_date}
                            type='Save'
                            onClick={() => this.saveArticle(article)}
                          />
                        )
                      )
                    }
                    <FormBtn type='warning' additional='btn-block' onClick={this.getMoreResults}>Get more results</FormBtn>
                  </PanelBody>
                </Panel>
              ) : ''
            }

          </Col>
          {/* <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Articles On My List</h1>
            </Jumbotron>
            {this.state.articles.length ? (
              <List>
                {this.state.articles.map(article => (
                  <ListItem key={article._id}>
                    <Link to={"/articles/" + article._id}>
                      <strong>
                        {article.topic} by {article.author}
                      </strong>
                    </Link>
                    <DeleteBtn onClick={() => this.deleteArticle(article._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col> */}
        </Row>
      </Container>
    );
  }
}

export default Articles;
