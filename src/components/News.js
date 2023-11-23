import React, { Component } from 'react'
import Newsitems from './Newsitems'
import Spiner from './Spiner';
import PropTypes from 'prop-types';



export class News extends Component {
  static defaultProps ={
    country: 'in',
    pageSize :6,
    category: 'general'

  }
  static propTypes ={
    country :PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }

  
    constructor() 
    {
        super();
        console.log("hello i am constructor");
        this.state = {
        articles: [],
        loading:false,
        page:1
        }
    }

  async componentDidMount() {
    console.log("cdm");
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=7d10785d03034b0bb5bd4f07309aaeca&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
  }

  handlePrevClick = async () => {
    console.log("previous clicked");
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=7d10785d03034b0bb5bd4f07309aaeca&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);

    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      loading: false,
    });
  };

  handleNextClick = async () => {
    console.log("next clicked");
    if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=7d10785d03034b0bb5bd4f07309aaeca&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
      this.setState({ loading: true });
      let data = await fetch(url);
      let parsedData = await data.json();
      console.log(parsedData);

      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles,
        loading: false,
      });
    }
  };

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center">News Dekho!- Top Headlines</h1>
        {this.state.loading && <Spiner></Spiner>}

        <div className="row">
          {this.state.articles.map((element) => {
            return (
              <div className="col md-4" key={element.url}>
                <Newsitems
                  title={element.title ? element.title : ""}
                  description={element.description ? element.description : ""}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                ></Newsitems>
              </div>
            );
          })}
          <div className="container d-flex justify-content-between">
            <button
              disabled={this.state.page <= 1}
              type="button"
              className="btn btn-dark"
              onClick={this.handlePrevClick}
            >
              &larr;Previous
            </button>
            <button
              disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)}
              type="button"
              className="btn btn-dark"
              onClick={this.handleNextClick}
            >
              Next&rarr;
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default News;