import React, { Component } from 'react'
import NewsItem from './NewsItem'
import InfiniteScroll from "react-infinite-scroll-component";

export default class Home extends Component {
  constructor() {
    super()
    this.state = {
      articles: [],
      totalResults: 0,
      page: 1
    }
  }
  getAPIData = async () => {
    var response = ""
    try {
      if (this.props.search)
        response = await fetch(`https://newsapi.org/v2/everything?sortBy=publishedAt&page=1&q=${this.props.search}&language=${this.props.language}&pageSize=20&apiKey=9c872195bd8a4c2bb1744dad3f2f0121`)
      else
        response = await fetch(`https://newsapi.org/v2/everything?sortBy=publishedAt&page=1&q=${this.props.q}&language=${this.props.language}&pageSize=20&apiKey=9c872195bd8a4c2bb1744dad3f2f0121`)
      response = await response.json()
      this.setState({
        articles: response.articles,
        totalResults: response.totalResults
      })
    }
    catch (error) {
      // alert("Something Went Wrong!!!")
    }
  }
  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 })
    var response = ""
    try {
      if (this.props.search)
        response = await fetch(`https://newsapi.org/v2/everything?sortBy=publishedAt&page=${this.state.page}&q=${this.props.search}&language=${this.props.language}&pageSize=20&apiKey=9c872195bd8a4c2bb1744dad3f2f0121`)
      else
        response = await fetch(`https://newsapi.org/v2/everything?sortBy=publishedAt&page=${this.state.page}&q=${this.props.q}&language=${this.props.language}&pageSize=20&apiKey=9c872195bd8a4c2bb1744dad3f2f0121`)
      response = await response.json()
      this.setState({
        articles: this.state.articles.concat(response.articles)
      })
    }
    catch (error) {
      // alert("Something Went Wrong!!!")
    }
  }
  componentDidMount() {
    this.getAPIData()
  }
  componentDidUpdate(old) {
    if (this.props !== old)
      this.getAPIData()
  }
  render() {
    return (
      <div className='container-fluid'>
        <h5 className='background p-2 text-center text-light mt-1'>{this.props.search ? this.props.search : this.props.q} News</h5>
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length < this.state.totalResults}
          loader={
            <div className='my-5 text-center'>
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          }
        >
          <div className='row'>
            {
              this.state.articles.map((item, index) => {
                return <NewsItem
                  key={index}
                  title={item.title.slice(0, 80) + "..."}
                  description={item.description}
                  pic={item.urlToImage}
                  url={item.url}
                  source={item.source.name}
                  date={item.publishedAt}
                />
              })
            }
          </div>
        </InfiniteScroll>
      </div>
    )
  }
}
