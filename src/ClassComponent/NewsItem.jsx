import React from 'react'

export default function NewsItem(props){
            return (
            <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-12">
                <div className="card">
                    {
                        props.pic?
                        <img src={props.pic} height="200px" className="card-img-top" alt="..." />:
                        <img src="/image/1.png" height="200px" className="card-img-top" alt="..." />
                    }
                    <div className="card-body">
                        <h5 className="card-title">{props.title}</h5>
                        <div className="d-flex justify-content-between ">
                            <h6 className='date'> {props.source}</h6>
                            <h6 className='date'> {`${(new Date(props.date)).getDate()}/${(new Date(props.date)).getMonth()}/${(new Date(props.date)).getFullYear()}`}</h6>
                        </div>
                        <hr />
                        <p className="card-text">{props.description}.</p>
                        <a href={props.url} rel="noreferrer" target='_blank' className="btn background w-100 btn-sm">Read Full Article</a>
                    </div>
                </div>
            </div>
        )
    }

