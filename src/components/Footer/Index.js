import React from 'react'
import './style.scss'
import { Icon } from 'react-icons-kit'
import { Link } from 'react-router-dom'
import { Images } from '../../utils/Images'
import { facebook, instagram } from 'react-icons-kit/icomoon'

const Index = () => {

    return (
        <div className="footer">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-lg-4 text-center text-lg-left pr-lg-5">
                        <img src={Images.Logo} className="img-fluid" alt="..." />
                        <p>iocommerce is committed to provide best quality product for customers and keep fast delivery service.</p>
                        <ul>
                            <li><a href="https://www.facebook.com"><Icon icon={facebook} size={18} /></a></li>
                            <li><a href="https://www.instagram.com"><Icon icon={instagram} size={19} /></a></li>
                        </ul>
                    </div>
                    <div className="col-12 col-lg-4 text-center text-lg-left">
                        <h5>my account</h5>
                        <div><Link to="/login" type="button" className="btn shadow-none rounded-0">my account</Link></div>
                        <div><Link to="/login" type="button" className="btn shadow-none rounded-0">Login account</Link></div>
                        <div><Link to="/register" type="button" className="btn shadow-none rounded-0">Register</Link></div>
                    </div>
                    <div className="col-12 col-lg-4 text-center text-lg-left">
                        <h5>customer service</h5>
                        <div><Link to="/about" type="button" className="btn shadow-none rounded-0">about us</Link></div>
                        <div><Link to="/terms-conditions" type="button" className="btn shadow-none rounded-0">Terms & Conditions</Link></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Index;