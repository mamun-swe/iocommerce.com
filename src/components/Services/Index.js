import React from 'react'
import './style.scss'
import { Images } from '../../utils/Images'

const Index = () => {
    return (
        <div className="core-services">
            <div className="container pt-5 pb-lg-5">
                <div className="row">

                    <div className="col-6 col-lg-3 mb-5 mb-lg-0 text-center px-4">
                        <img src={Images.Service1} className="img-fluid mb-4" alt="..." />
                        <h5 className="mb-3">Best Quality</h5>
                        <p className="text-muted d-none d-lg-block">Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator.</p>
                    </div>

                    <div className="col-6 col-lg-3 mb-5 mb-lg-0 text-center px-4">
                        <img src={Images.Service2} className="img-fluid mb-4" alt="..." />
                        <h5 className="mb-3">MasterChefs</h5>
                        <p className="text-muted d-none d-lg-block">Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator.</p>
                    </div>

                    <div className="col-6 col-lg-3 mb-5 mb-lg-0 text-center px-4">
                        <img src={Images.Service3} className="img-fluid mb-4" alt="..." />
                        <h5 className="mb-3">Fast Delivery</h5>
                        <p className="text-muted d-none d-lg-block">Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator.</p>
                    </div>

                    <div className="col-6 col-lg-3 mb-5 mb-lg-0 text-center px-4">
                        <img src={Images.Service4} className="img-fluid mb-4" alt="..." />
                        <h5 className="mb-3">Set Meal Deals</h5>
                        <p className="text-muted d-none d-lg-block">Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator.</p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Index;