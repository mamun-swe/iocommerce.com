import React, { useCallback, useEffect, useState } from 'react'
import './style.scss'
import { useParams } from 'react-router-dom'
import { BannerLoader } from '../../components/ghostLoader/BannerLoader'
import { ProductsLoader } from '../../components/ghostLoader/ProductsLoader'

import Navbar from '../../components/NavBar/Index'
import ProductList from '../../components/Products/Index'
import Footer from '../../components/Footer/Index'
import Requests from '../../utils/Requests/Index'

const Index = () => {
    const { slug } = useParams()
    const [page, setPage] = useState(2)
    const [data, setData] = useState({})
    const [products, setProducts] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [productLoading, setProductLoading] = useState(true)
    const [moreLoading, setMoreLoading] = useState(false)

    // Get category 
    const getCategory = useCallback(async () => {
        try {
            const response = await Requests.Category.Show(slug)
            if (response.status === 200) {
                setData(response.data.data)
                setLoading(false)
            }
        } catch (error) {
            if (error) console.log(error.response)
        }
    }, [slug])

    // Get category products
    const getCategoryProducts = useCallback(async (id, page) => {
        try {
            setProductLoading(true)
            const response = await Requests.Category.Products(id, page)
            if (response.status === 200) {
                setProducts(response.data.data)
                setProductLoading(false)
            }
        } catch (error) {
            if (error) console.log(error.response)
        }
    }, [])

    useEffect(() => {
        getCategory()
    }, [slug, getCategory])

    useEffect(() => {
        if (data && data._id) getCategoryProducts(data._id, 1)
    }, [data, getCategoryProducts])

    // load more
    const handleLoadMore = async () => {
        try {
            setMoreLoading(true)
            const response = await Requests.Category.Products(data._id, page)
            if (response.status === 200) {
                setProducts([...products, ...response.data.data])
                setPage(page + 1)
            }
            setMoreLoading(false)
        } catch (error) {
            if (error) console.log(error.response)
        }
    }

    if (isLoading) return <BannerLoader />

    return (
        <div className="category-index">
            <Navbar />

            {/* Header */}
            <div className="header">
                <div className="container">
                    <div className="row">
                        <div className="col-12 py-3">
                            <div className="banner-container">
                                <img src={data.image} className="img-fluid" alt="..." />
                                <div className="banner-overlay">
                                    <div className="flex-center flex-column text-center">
                                        <h3 className="mb-0">{data.name}</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {productLoading ?
                <ProductsLoader items={12} /> :
                <ProductList
                    items={products}
                    loading={isLoading}
                    moreLoading={moreLoading}
                    loadMore={() => handleLoadMore()}
                />
            }

            <Footer />
        </div>
    );
};

export default Index;