import React, { useCallback, useEffect, useState } from 'react'
import { useQuery } from '../../components/query/Index'
import { ProductsLoader } from '../../components/ghostLoader/ProductsLoader'

import Navbar from '../../components/NavBar/Index'
import ProductList from '../../components/Products/Index'
import Footer from '../../components/Footer/Index'
import Requests from '../../utils/Requests/Index'

const Index = () => {
    const { searchquery } = useQuery()
    const [data, setData] = useState([])
    const [isLoading, setLoading] = useState(true)

    // Fetch data
    const fetchData = useCallback(async () => {
        try {
            const response = await Requests.Search.Results(searchquery)
            if (response.status === 200) {
                setData(response.data.data)
            }
            setLoading(false)
        } catch (error) {
            if (error) setLoading(false)
        }
    }, [searchquery])

    useEffect(() => {
        fetchData()
    }, [searchquery, fetchData])


    return (
        <div className="search-result-index">
            <Navbar />

            {isLoading && !data.length ? <ProductsLoader items={12} /> : null}
            {!isLoading && !data.length ? <p className="text-center mt-4">No results found!!!</p> : null}

            {!isLoading && data.length ?
                <div>
                    <div className="container text-center pt-3">
                        <div className="row">
                            <div className="col-12">
                                <p className="font-18 font-weight-bolder text-muted mb-1">Search for <span className="text-dark">{searchquery}</span></p>
                            </div>
                        </div>
                    </div>
                    <ProductList
                        items={data}
                        loading={isLoading}
                    />
                </div>
                : null
            }

            <Footer />
        </div >
    );
};

export default Index;