// News.js
import React, { Component } from 'react';
import Newsitems from './Newsitems';
import Spiner from './Spiner';
import PropTypes from 'prop-types';
import './News.css'; 

class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 6,
    category: 'general',
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - News Dekho`;
  }

  async updateNews() {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7d10785d03034b0bb5bd4f07309aaeca&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });

    try {
      let data = await fetch(url);
      let parsedData = await data.json();
      console.log(parsedData);
      this.setState({
        articles: parsedData.articles,
        totalResults: parsedData.totalResults,
        loading: false,
      });
    } catch (error) {
      console.error('Error fetching news:', error);
      this.setState({ loading: false });
    }
  }

  async componentDidMount() {
    this.updateNews();
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.category !== this.props.category) {
      this.updateNews();
    }
  }

  handlePrevClick = async () => {
    this.setState({ page: this.state.page - 1 });
    this.updateNews();
  };

  handleNextClick = async () => {
    this.setState({ page: this.state.page + 1 });
    this.updateNews();
  };

  render() {
    return (
      <div className="container my-3">
        <div className="text-center">
        <img src="./images/logonews.png" alt="News Dekho Logo" className="news-logo" onError={(e) => e.target.src = 'placeholder.png'} style={{ marginTop: '0' }} />
        <h1 className="news-title my-3 mt-5">
            <span style={{ fontStyle: 'italic', fontWeight: 'bold' }}>News Dekho!</span>
          </h1>
          <h2 className="news-subtitle mt-3 mb-4">
            <span style={{ fontStyle: 'italic', fontWeight:'bold', color: 'white'  }} className="news-subtitle-text">Top Headlines:</span> {this.capitalizeFirstLetter(this.props.category) }
          </h2>
        </div>
        {this.state.loading && <Spiner></Spiner>}
        <div className="row">
          {this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <Newsitems
                  title={element.title ? element.title : ''}
                  description={element.description ? element.description : ''}
                  imageUrl={element.urlToImage}
                ></Newsitems>
              </div>
            );
          })}
        </div>
        <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePrevClick}
          >
            &larr; Previous
          </button>
          <button
            disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)}
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
