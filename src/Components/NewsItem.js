import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {
        let {title, description, imgUrl, newsUrl, author, date} = this.props;
        return (
            <div>
                <div className="card my-3">
                    <img src={imgUrl} className="card-img-top" alt="..." style={{height: "40vh"}}/>
                        <div className="card-body">
                            <h5 className="card-title">{title}</h5>
                            <p className="card-text">{description}</p>
                            <p className="card-text"><small className="text-muted">By {author}</small></p>
                            <p className="card-text"><small className="text-muted">Updated on {new Date(date).toGMTString()}</small></p>
                            <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-sm btn-danger">View full article</a>
                        </div>
                </div>
            </div>
        )
    }
}

export default NewsItem