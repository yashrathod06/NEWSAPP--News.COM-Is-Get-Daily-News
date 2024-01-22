import React from 'react'

const NewsItem = (props)=> {

    let {title, description, imgURL,newsURL, author, date, source} = props;
    return (
      <div className='my-3'>
        <div className="card">
        <div style={{display : 'flex',
                    justifyContent: 'flex-end',
                    position: 'absolute',
                    right: '0'
                    }}>
          <span className="badge rounded-pill bg-danger" >{source}</span>
        </div>
            <img src={!imgURL?"https://history-computer.com/wp-content/uploads/2023/01/shutterstock_2093652733-2048x1247.jpg":imgURL} className="card-img-top" alt="/"/>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}</p>
                {/* <p className="card-text"><small className="text-body-secondary">By {!author?"Unknown":author} On {new Date(date).toGMTString}</small></p> */}
                <p className="card-text"><small className="text-danger">By {!author?"Unknown":author} on {new Date (date).toGMTString()}</small></p>
                <a href={newsURL} className="btn btn-dark">Read More</a>
            </div>
        </div>
      </div>
    )
}

export default NewsItem
