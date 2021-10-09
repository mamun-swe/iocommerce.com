import React from 'react'
import './style.scss'
import Icon from 'react-icons-kit'
import { Link } from 'react-router-dom'
import { Carousel } from 'react-bootstrap'
import { chevronLeft, chevronRight } from 'react-icons-kit/feather'
import { BannerLoader } from '../ghostLoader/BannerLoader'

const Index = (props) => {
    if (props.loading) return <BannerLoader />

    return (
        <div className="custom-slider-container">
            <div className="container">
                <div className="row">

                    {/* Slider Container */}
                    <div className="col-12">
                        <div className="slider-container">
                            <Carousel
                                nextIcon={<Icon icon={chevronRight} className="next-icon" size={25} />}
                                prevIcon={<Icon icon={chevronLeft} className="prev-icon" size={25} />}
                            >
                                {props.items && props.items.length > 0 && props.items.map((item, i) =>
                                    <Carousel.Item key={i}>
                                        <div className="slider-card">
                                            <Link to={`/category/${item.category}`}>
                                                <img src={item.image} className="img-fluid" alt="..." />
                                            </Link>
                                        </div>
                                    </Carousel.Item>
                                )}
                            </Carousel>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Index;