import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import MyImage from './NewsMonkeyLogo.png'

export default class News extends Component {
        static defaultProps = {
            country: 'in',
            pageSize: 9,
            category: 'general'
        }
        static propTypes = {
            country: PropTypes.string,
            pageSize: PropTypes.number,
            category: PropTypes.string
        }

        constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
        document.title = `NewsMonkey - ${this.props.category}`;
    }

    async componentDidMount(){
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=119fe3ec85f84f1381378c879b445be9&page=1&pagesize=${this.props.pageSize}`;
        this.setState({loading: true});
        let data = await fetch(url);
        let parsedData = await data.json();

        this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false})
    }

    handlePreviousClick = async ()=>{
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=119fe3ec85f84f1381378c879b445be9&page=${this.state.page - 1}&pagesize=${this.props.pageSize}`;
        this.setState({loading: true});
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            page: this.state.page-1,
            articles: parsedData.articles,
            loading: false
        })

    }
    handleNextClick = async ()=>{
        if(!(this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=119fe3ec85f84f1381378c879b445be9&page=${this.state.page + 1}&pagesize=${this.props.pageSize}`;
            this.setState({loading: true});
            let data = await fetch(url);
            let parsedData = await data.json();

            this.setState({
                page: this.state.page+1,
                articles: parsedData.articles,
                loading: false
            })

        }
    }

    render() {
        return (
            <div className='container my-3'>
                <h1 className='text-center my-4'>NewsMonkey - Top headlines</h1>
                {this.state.loading && <Spinner/>}
                <div className="row">
                    {!this.state.loading && this.state.articles.map((element) => {
                        return (
                            <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title?element.title.slice(0, 50)+"...":""} description={element.description?element.description.slice(0, 88)+"...":""} imgUrl={element.urlToImage?element.urlToImage:MyImage} newsUrl={element.url} author={element.author?element.author:"Unknown"} date={element.publishedAt}/>
                            </div>
                        );
                    })}

                </div>
                <div className="mx-auto mt-5" style={{width: 'fit-content'}}>
                    <button disabled={this.state.page<=1} className="btn btn-danger mx-1" type="submit" onClick={this.handlePreviousClick}>&lt;Previous</button>
                    {/* <button className="btn btn-light mx-1 border border-danger" type="submit">1</button>
                    <button className="btn btn-light mx-1 border border-danger" type="submit">2</button>
                    <button className="btn btn-light mx-1 border border-danger" type="submit">3</button>
                    <button className="btn btn-light mx-1 border border-danger" type="submit">4</button>
                    <button className="btn btn-light mx-1 border border-danger" type="submit">5</button> */}
                    <button disabled={this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)} className="btn btn-danger mx-1" type="submit" onClick={this.handleNextClick}>Next&gt;</button>
                </div>
            </div>
        )
    }
}




