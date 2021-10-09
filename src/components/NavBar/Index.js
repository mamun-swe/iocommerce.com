import React, { useEffect, useState, useCallback } from 'react'
import './style.scss'
import { Icon } from 'react-icons-kit'
import { Images } from '../../utils/Images'
import { user } from 'react-icons-kit/icomoon'
import { Link, NavLink } from 'react-router-dom'
import { DropdownButton, Dropdown } from 'react-bootstrap'
import { ic_add_shopping_cart, ic_dehaze, ic_keyboard_arrow_right } from 'react-icons-kit/md'
import { useSelector, useDispatch } from 'react-redux'
import { productsList } from '../../redux/Actions/cartAction'
import { SearchWithSuggestion } from '../SearchWithSuggestion/SearchWithSuggestion'

import Requests from '../../utils/Requests/Index'
import ShoppingCart from '../ShoppingCart/Index'

const Index = () => {
    const dispatch = useDispatch()
    const [show, setShow] = useState(false)
    const [isOpen, setOpen] = useState(false)
    const [scrolled, setScrolled] = useState(true)
    const [categories, setCategories] = useState([])
    let { cartProducts } = useSelector((state => state.products))

    // Get Category
    const getCategories = useCallback(async () => {
        try {
            const response = await Requests.Category.Index()
            if (response.status === 200) {
                setCategories(response.data.data)
            }
        } catch (error) {
            if (error) console.log(error.response)
        }
    }, [])

    useEffect(() => {
        window.addEventListener('scroll', () => {
            let isTop = window.scrollY < 150
            if (isTop !== true) {
                setScrolled(false)
            } else {
                setScrolled(true)
            }
        })

        dispatch(productsList())
    }, [dispatch])

    useEffect(() => {
        getCategories()
    }, [getCategories])

    return (
        <div>
            <div className={scrolled ? "custom-navbar border-bottom" : "custom-navbar scrolled shadow"}>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="d-flex">
                                <div>
                                    <Link to="/"><img src={Images.Logo} className="img-fluid" alt="..." /></Link>
                                </div>

                                {/* Desktop Menu Items */}
                                <div className="page-links d-none d-lg-block px-2">
                                    <ul>
                                        <li>
                                            <DropdownButton
                                                title="Category"
                                                className="shadow-none"
                                            >
                                                {categories && categories.length ?
                                                    categories.map((category, i) =>
                                                        <Dropdown.Item
                                                            key={i}
                                                            as={Link}
                                                            to={`/category/${category.slug}`}
                                                        >{category.name}</Dropdown.Item>
                                                    ) : null}
                                            </DropdownButton>
                                        </li>
                                        <li><NavLink exact activeClassName="is-Active" to="/about">about</NavLink></li>
                                        <li><NavLink exact activeClassName="is-Active" to="/contact">contact</NavLink></li>
                                        <li>
                                            <SearchWithSuggestion />
                                        </li>
                                    </ul>
                                </div>

                                {/* Account Button */}
                                <div className="pr-2 d-none d-lg-block ml-auto">
                                    <div className="cart-box">
                                        <Link to="/login"
                                            type="button"
                                            className="btn rounded-circle shadow-none cart-btn">
                                            <Icon icon={user} size={22} />
                                        </Link>
                                    </div>
                                </div>

                                {/* Shopping Cart Button */}
                                <div className="pr-2 d-none d-lg-block">
                                    <div className="cart-box">
                                        <button
                                            type="button"
                                            className="btn rounded-circle shadow-none cart-btn"
                                            onClick={() => setShow(true)}
                                        >
                                            <Icon icon={ic_add_shopping_cart} size={22} />
                                        </button>
                                        {cartProducts ? <small>{cartProducts.length}</small> : <small>0</small>}
                                    </div>
                                </div>

                                {/* Bar Button */}
                                <div className="d-lg-none ml-auto">
                                    <button
                                        type="button"
                                        className="btn rounded-circle shadow-none p-1 bar-btn"
                                        onClick={() => setOpen(true)}>
                                        <Icon icon={ic_dehaze} size={25} />
                                    </button>
                                </div>
                            </div>
                            <div className="d-lg-none pt-3">
                                <SearchWithSuggestion />
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Mobile Menu Items */}
            <div
                className={isOpen ? "backdrop d-lg-none show-backdrop" : "backdrop d-lg-none"}
                onClick={() => setOpen(!isOpen)}>
            </div>
            <div className={isOpen ? "mobile-menu d-lg-none open-mobile-menu" : "mobile-menu d-lg-none hide-mobile-menu"}>

                {/* Menu Body */}
                <div className="menu-body p-3">
                    <ul>
                        <p className="font-14 mb-0">Categories</p>
                        <hr className="my-1" />

                        {categories && categories.map((item, i) =>
                            <li>
                                <NavLink
                                    exact
                                    activeClassName="is-Active"
                                    to={`/category/${item.slug}`}>
                                    {item.name}
                                    <Icon
                                        icon={ic_keyboard_arrow_right}
                                        className="float-right"
                                        size={20}
                                    />
                                </NavLink>
                            </li>
                        )}

                    </ul>
                </div>
            </div>

            {/* Navbar bottom in mobile */}
            <div className="navbar-bottom-mobile shadow d-lg-none">
                <div className="d-flex">
                    <div>
                        <Link
                            to="/login"
                            type="button"
                            className="btn shadow-none rounded-circle"
                        >
                            <Icon icon={user} size={22} />
                        </Link>
                    </div>
                    <div className="ml-auto">
                        <button
                            type="button"
                            className="btn shadow-none rounded-circle cart-btn"
                            onClick={() => setShow(true)}
                        >
                            <Icon icon={ic_add_shopping_cart} size={22} />
                            {cartProducts ? <small className="cart-quantity">{cartProducts.length}</small> : <small>0</small>}
                        </button>
                    </div>
                </div>
            </div>

            {/* Shopping Cart */}
            {show ? <ShoppingCart show={show} onHide={() => setShow(false)} /> : null}

        </div>
    );
};

export default Index;