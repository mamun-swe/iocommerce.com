import React from 'react'
import './style.scss'
import { Link } from 'react-router-dom'

const Index = () => {
    return (
        <div className="dashboard">
            <div className="header text-center mt-3">
                <h5>my account</h5>
            </div>
            <div className="body mb-4">
                <p>From your account dashboard you can view your recent orders, manage your shipping and billing addresses, and edit your password and account details.</p>
                <div className="text-center my-4">
                    <Link
                        to="/"
                        type="button"
                        className="btn shadow-none text-white"
                    >Return to shop</Link>
                </div>
            </div>
        </div>
    );
};

export default Index;