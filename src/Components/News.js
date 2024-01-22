import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
// import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'
import Spinner from './Spinner'


const News = (props)=> {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)
    
    

    const CapitalizeFirstLatter = (string)=>{
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    // constructor(props){
    //     super(props)
    //     }
        
    const updateNews =  async ()=>{
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`
        setLoading(true)
        let data = await fetch(url);
        props.setProgress(30);
        let paredData = await data.json()
        props.setProgress(70);
        setArticles(paredData.articles)
        setTotalResults(paredData.totalResults)
        setLoading(false)

        props.setProgress(100);
    }  

    useEffect( () => {
        document.title = `${CapitalizeFirstLatter(props.category)} - News.COM`;
        updateNews()
        // eslint-disable-next-line
    },[])


    // const handlePreviousClick = async()=>{
    //     setPage(page - 1)
    //     updateNews();
    // }
    // const handleNextClick = async()=>{
    //     setPage(page + 1)
    //     updateNews();
    // }

    const fetchMoreData = async()=>{
        
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`
        setPage(page + 1)
        setLoading(false)
        let data = await fetch(url);
        let paredData = await data.json()
        setArticles(articles.concat(paredData.articles))
        setTotalResults(paredData.totalResults)
    };

    return (
      <>
        <h2 className='text-center' style={{margin:'25px', marginTop: '90px'}}>News COM - {CapitalizeFirstLatter(props.category)} Headlines</h2>
        {loading && <Spinner/>}
        
        <InfiniteScroll
            dataLength={articles.length}
            next={fetchMoreData}
            hasMore={articles.length !== totalResults}
            loader={loading && <Spinner/>}
        >
        <div className="container">

        <div className="row">
            {articles.map((element)=>{
                return <div className="col-md-4" key={element.url}>
                <NewsItem title = {element.title?element.title:""} description = {element.description?element.description:""} imgURL = {element.urlToImage} newsURL = {element.url} author = {element.author} date ={element.publishedAt} source = {element.source.name}/>
                </div>
            })}
        </div>  
        </div>
        </InfiniteScroll>
      </>
    )
}

News.defaultProps = {
    country : 'in',
    pageSize : 6,
    category : 'general',
} 

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category : PropTypes.string,
} 

export default News
