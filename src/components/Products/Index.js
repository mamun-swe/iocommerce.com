import React, { useState } from 'react'
import './style.scss'
import { ProductsLoader } from '../ghostLoader/ProductsLoader'
import { ProductModal } from '../ProductModal/ProductModal'
import Requests from '../../utils/Requests/Index'

const Index = (props) => {
    const [product, setProduct] = useState({ data: null, show: false, loading: true })

    // Handle product view
    const handleProductView = async (slug) => {
        try {
            setProduct(exProduct => ({ ...exProduct, show: true, loading: true }))
            const response = await Requests.Product.Show(slug)
            if (response.status === 200) {
                setTimeout(() => {
                    setProduct(exProduct => ({ ...exProduct, data: response.data.data, loading: false }))
                }, 2000)
            }
        } catch (error) {
            if (error) console.log(error)
        }
    }

    if (props.loading) return <ProductsLoader items={12} />

    return (
        <div className="products-container">
            {props.items && props.items.length ?
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            {props.items.map((item, i) =>
                                <div className="card rounded-0 border-0 p-2" key={i}>
                                    <div className="card-body p-0">
                                        <div className="img-container">
                                            <img src={item.image} className="img-fluid" alt={item.name} />
                                        </div>
                                        <div className="p-3">
                                            <p className="font-15 font-weight-bolder mb-0">{item.name}</p>
                                            <p className="font-13 mb-0">Tk. {item.salePrice}</p>
                                        </div>

                                        <div className="card-overlay">
                                            <div className="flex-center flex-column">
                                                <button
                                                    type="button"
                                                    className="btn rounded-0 shadow-none px-4"
                                                    onClick={() => handleProductView(item.slug)}
                                                >View</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="col-12 text-center py-3">
                            <button
                                type="button"
                                className="btn load-more-btn shadow-none"
                                disabled={props.moreLoading}
                                onClick={props.loadMore}
                            >{props.moreLoading ? "Loading..." : "Load More"}</button>
                        </div>
                    </div>
                </div>
                : null
            }

            {/* Product view modal */}
            {product.show &&
                <ProductModal
                    show={product.show}
                    loading={product.loading}
                    data={product.data}
                    onHide={() => setProduct({ ...product, show: false })}
                />
            }
        </div>
    );
};

export default Index;