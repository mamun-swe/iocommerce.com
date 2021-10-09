import React from 'react'
import './style.scss'
import Skeleton from 'react-loading-skeleton'

// General products loader
export const ProductsLoader = (props) => {
    return (
        <div className="product-loader-container">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        {props.items ?
                            [...Array(props.items).keys()].map((item) =>
                                <div className="card rounded-0 border-0" key={item}>
                                    <div className="card-body p-2">
                                        <Skeleton height={200} />
                                    </div>
                                </div>
                            ) : null
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}