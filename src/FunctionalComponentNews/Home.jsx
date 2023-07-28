import React, { useState, useEffect } from 'react'
import NewsItem from './NewsItem'
import InfiniteScroll from "react-infinite-scroll-component";

export default function Home(props) {
    let [articles, setArticles] = useState([])
    let [totalResults, setTotalResults] = useState(0)
    let [page, setPage] = useState(1)

    async function getAPIData() {
        var response = ""
        try {
            if (props.search)
                response = await fetch(`https://newsapi.org/v2/everything?sortBy=publishedAt&page=1&q=${props.search}&language=${props.language}&pageSize=20&apiKey=1fa45e93aa7044728354f4eb37db73dc`)
            else
                response = await fetch(`https://newsapi.org/v2/everything?sortBy=publishedAt&page=1&q=${props.q}&language=${props.language}&pageSize=20&apiKey=1fa45e93aa7044728354f4eb37db73dc`)
            response = await response.json()
            setArticles(response.articles)
            setTotalResults(response.totalResults)

        }
        catch (error) {
            // alert("something Went Wrong!!!")
        }
    }
   var  fetchMoreData = async () => {
        setPage(page + 1)
        var response = ""
        try {
            if (props.search)
                response = await fetch(`https://newsapi.org/v2/everything?sortBy=publishedAt&page=${page}&q=${props.search}&language=${props.language}&pageSize=20&apiKey=1fa45e93aa7044728354f4eb37db73dc`)
            else
                response = await fetch(`https://newsapi.org/v2/everything?sortBy=publishedAt&page=${page}&q=${props.q}&language=${props.language}&pageSize=20&apiKey=1fa45e93aa7044728354f4eb37db73dc`)
            response = await response.json()
            setArticles(articles.concat(response.articles))
        }
        catch (error) {
            // alert("something Went Wrong!!!")
        }
    }
    useEffect(() => {
        getAPIData()
    }, [props])

    return (
        <div className='container-fluid'>
            <h5 className='background p-2 text-center text-light mt-1'>{props.search ? props.search : props.q} </h5>

            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length < totalResults}
                loader={
                    <div className='my-5 text-center'>
                        <div className='spinner-border' role='status'>
                            <span className='visually-hidden'>Loading...</span>
                        </div>
                    </div>

                }
            >
                <div className='row'>
                    {
                        articles.map((item, index) => {
                            return <NewsItem
                                key={index}
                                title={item.title.slice(0, 50) + "..."}
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

