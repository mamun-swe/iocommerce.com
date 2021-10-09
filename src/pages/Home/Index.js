import React, { useState, useEffect, useCallback } from 'react'
import Requests from '../../utils/Requests/Index'

import Navbar from '../../components/NavBar/Index'
import Slider from '../../components/Slider/Index'
import Service from '../../components/Services/Index'
import ProductList from '../../components/Products/Index'
import Footer from '../../components/Footer/Index'

const Index = () => {
    const [bannerLoading, setBannerLoading] = useState(true)
    const [productLoading, setProductLoading] = useState(true)
    const [moreLoading, setMoreLoading] = useState(false)
    const [page, setPage] = useState(2)
    const [banners, setBanners] = useState([])
    const [products, setproducts] = useState([])

    // Get Banners
    const getBanners = useCallback(async () => {
        try {
            const response = await Requests.Banner.Index()
            if (response.status === 200) {
                setBanners(response.data.data)
                setBannerLoading(false)
            }
        } catch (error) {
            if (error) console.log(error.response)
        }
    }, [])

    // Get home products
    const getHomeProducts = useCallback(async (page) => {
        try {
            const response = await Requests.Home.Products(page)
            if (response.status === 200) {
                setproducts(response.data.data)
                setProductLoading(false)
            }
        } catch (error) {
            if (error) console.log(error.response)
        }
    }, [])

    useEffect(() => {
        getBanners()
    }, [getBanners])

    useEffect(() => {
        getHomeProducts(1)
    }, [getHomeProducts])

    // load more
    const handleLoadMore = async () => {
        try {
            setMoreLoading(true)
            const response = await Requests.Home.Products(page)
            if (response.status === 200) {
                setproducts([...products, ...response.data.data])
                setPage(page + 1)
            }
            setMoreLoading(false)
        } catch (error) {
            if (error) console.log(error.response)
        }
    }

    return (
        <div>
            <Navbar />
            <Slider loading={bannerLoading} items={banners} />
            <Service />
            <ProductList
                isloading={productLoading}
                items={products}
                moreLoading={moreLoading}
                loadMore={() => handleLoadMore()}
            />
            <Footer />
        </div>
    );
};

export default Index;