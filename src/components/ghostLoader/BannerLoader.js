import React from 'react'
import Skeleton from 'react-loading-skeleton'

// Banner loader
export const BannerLoader = (props) => {
    return (
        <div className="container py-2">
            <div className="row">
                <div className="col-12">
                    <Skeleton
                        circle={props.circle}
                        height={250}
                    />
                </div>
            </div>
        </div>
    )
};
