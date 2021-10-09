import { useState, useRef, useEffect } from 'react'
import './style.scss'
import { Icon } from 'react-icons-kit'
import { search } from 'react-icons-kit/feather'
import { ic_call_made } from 'react-icons-kit/md'
import { useHistory } from 'react-router-dom'
import { useQuery } from '../query/Index'
import Requests from '../../utils/Requests/Index'

export const SearchWithSuggestion = () => {
    const router = useHistory()
    const wrapperRef = useRef(null)
    const { searchquery } = useQuery()
    const [show, setShow] = useState(false)
    const [query, setQuery] = useState(null)
    const [items, setItems] = useState({ values: null, message: null })

    // Out side click
    const useOutsideClick = (ref) => {
        useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setShow(false)
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            }
        }, [ref])
    }
    useOutsideClick(wrapperRef)

    // Handle search
    const handleSearch = async event => {
        const value = event.target.value
        setQuery(value)
        if (!value) {
            setItems({ values: null, message: null })
            setShow(false)
            setQuery(null)
            return
        }

        const response = await Requests.Search.Seggestion(value)
        if (response.data.data && response.data.data.length) {
            setShow(true)
            setItems({ values: response.data.data, message: null })
        }
        else {
            setShow(true)
            setItems({ values: null, message: "No results found" })
        }
    }

    // Handle submit
    const handleSubmit = event => {
        event.preventDefault()
        if (query) {
            setItems({ values: null, message: null })
            setShow(false)

            let name = query
            name = name.replace(/ /g, "-")
            router.push(`/search?searchquery=${name}`)
        }
    }

    return (
        <div className="search-with-suggestion-container">
            <form onSubmit={handleSubmit}>
                <div className="form-group mb-0">
                    <input
                        type="text"
                        className="form-control shadow-none font-13"
                        placeholder="Search ..."
                        onChange={handleSearch}
                        defaultValue={searchquery ? searchquery : null}
                    />
                    <Icon icon={search} size={16} className="icon" />
                </div>
            </form>

            {/* Suggested items container */}
            {show ?
                <div className="suggest-container" ref={wrapperRef}>
                    <div className="card shadow border-0">
                        {items.values && items.values.length && items.values.map((product, i) =>
                            <div className="item d-flex"
                                key={i}
                                onClick={() =>
                                    // router.push(`/search?searchquery=${product.name}`)
                                    window.location.href = `/search?searchquery=${product.name}`
                                }
                            >
                                <div className="img-container">
                                    <img src={product.image} className="img-fluid" alt="..." />
                                </div>
                                <div><p>{product.name}</p></div>
                                <div className="ml-auto pt-2">
                                    <Icon icon={ic_call_made} size={15} />
                                </div>
                            </div>
                        )}

                        {items.message ?
                            <div className="message text-center p-4">
                                <p>No results found !</p>
                            </div>
                            : null}
                    </div>
                </div>
                : null}
        </div>
    )
}
