import React, { useEffect, useState } from 'react'
import './style.scss'
import ReactPlayer from 'react-player/youtube'
import HtmlParser from 'react-html-parser'
import Modal from 'react-bootstrap/Modal'
import { Icon } from 'react-icons-kit'
import { ic_close } from 'react-icons-kit/md'
import { useDispatch } from 'react-redux'
import { addProduct } from '../../redux/Actions/cartAction'
import { Reviews, ReviewForm } from '../review'


export const ProductModal = (props) => {
    const dispatch = useDispatch()
    const [smallImages, setsmallImages] = useState([])
    const [largeImage, setLargeImage] = useState(null)

    useEffect(() => {
        if (props.data && props.data.images) {
            if (props.data.images.large) {
                setLargeImage(props.data.images.large)
            }

            if (props.data.images.additional && props.data.images.additional.length) {
                setsmallImages([
                    props.data.images.large,
                    ...props.data.images.additional
                ])
            }
        }
    }, [props])

    // handle add to cart
    const addToCart = data => {
        const newData = {
            id: data._id,
            cartId: Date.now(),
            name: data.name,
            sku: data.sku,
            price: data.salePrice,
            image: data.images.small,
            quantity: 1
        }
        dispatch(addProduct(newData))
    }

    return (
        <div>
            <Modal
                show={props.show}
                onHide={props.onHide}
                centered
                size={"xl"}
                className="custom-product-modal"
            >
                <Modal.Header className="pt-2 px-1 pb-0 border-0">
                    <button
                        type="button"
                        className="btn rounded-0 shadow-none ml-auto"
                        onClick={props.onHide}
                    >
                        <Icon icon={ic_close} size={25} />
                    </button>
                </Modal.Header>
                <Modal.Body>

                    {/* Pre-loader */}
                    {props.loading ?
                        <div className="py-4">
                            <p className="text-center font-14 text-muted">Loading...</p>
                        </div> : null
                    }

                    {/* Product data */}
                    {!props.loading && props.data ?
                        <div className="row">

                            {/* Product images */}
                            <div className="col-12 col-lg-7 mb-4 mb-lg-0">
                                <div className="large-image-container text-center mb-3 w-100">
                                    <img src={largeImage} className="img-fluid" alt="..." />
                                </div>

                                {smallImages && smallImages.length ?
                                    <div className="small-images-container">
                                        <ul className="p-0">
                                            {smallImages.map((image, j) =>
                                                <li
                                                    key={j}
                                                    onClick={() => setLargeImage(image)}
                                                >
                                                    <div className="small-image-container border">
                                                        <img src={image} className="img-fluid" alt="..." />
                                                    </div>
                                                </li>
                                            )}
                                        </ul>
                                    </div>
                                    : null
                                }
                            </div>

                            {/* Product content */}
                            <div className="col-12 col-lg-5">
                                <p className="mb-3 font-18">{props.data.name}</p>
                                <p className="mb-0 font-13">SKU : {props.data.sku}</p>
                                <p className="mb-0 font-13">Price: Tk. {props.data.salePrice || 0}</p>
                                <p className="mb-3 font-13">Stock Amount: {props.data.stockAmount}</p>

                                <div className="mb-4">
                                    <button
                                        type="button"
                                        className="btn btn-add-cart shadow-none rounded"
                                        onClick={() => addToCart(props.data)}
                                    >Add Shopping Cart</button>
                                </div>

                                {props.data.description ?
                                    <div>
                                        <p className="mb-2 font-14">Product Description:</p>
                                        {HtmlParser(props.data.description)}
                                    </div>
                                    : null
                                }
                            </div>

                            {/* Product reviews */}
                            <div className="col-12 mt-4">
                                <Reviews data={props.data} />
                                <ReviewForm data={props.data} />
                            </div>

                            {/* Product video */}
                            <div className="col-12 mt-4">
                                {props.data.video ?
                                    <div className="w-100">
                                        <p className="mb-2 font-14">Product Video</p>
                                        <ReactPlayer
                                            url={props.data.video}
                                            controls={true}
                                            width={"100% !important"}
                                            height={300}
                                        />
                                    </div>
                                    : null
                                }
                            </div>
                        </div>
                        : null
                    }
                </Modal.Body>
            </Modal>
        </div>
    );
};
