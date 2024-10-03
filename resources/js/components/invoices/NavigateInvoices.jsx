import ScaleLoader from 'react-spinners/ScaleLoader';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Title from "../hooks/Title";
import Button from 'react-bootstrap/Button';
import axios from 'axios';
// import '../../../css/addCustomerContract.css';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const NavigateInvoices = () => {

    return (
        <>

            <Title title="فاکتورها" />
            {/* style css in home.css */}
            <div className="mainHome">

                <section className="categoryLinksHome">
                    <Link to="addConcreteSalesInvoice" className="linksHome --styleLessLink ">
                        <div className="divIcofontLinksHome">
                            <i className="icofont-attachment  iLinksHome2  " />
                            <i className="icofont-concrete-mixer iLinksHome3 " />
                            <i className="icofont-plus Iplus" />
                        </div>
                        <span>ایجاد فاکتور فروش بتن</span>
                    </Link>
                </section>

                <div className="borderDivHome"></div>

                <section className="categoryLinksHome">
                    <Link to="addBuyerContract" className="linksHome --styleLessLink ">
                        <div className="divIcofontLinksHome">
                            <i className="icofont-attachment  iLinksHome2  " />
                            <i className="icofont-oil-truck  iLinksHome3 " />
                            <i className="icofont-plus Iplus" />
                        </div>
                        <span>ایجاد فاکتور خرید سیمان</span>
                    </Link>

                    <Link to="sand/addSandInvoice" className="linksHome --styleLessLink ">
                        <div className="divIcofontLinksHome">
                            <i className="icofont-attachment  iLinksHome2  " />
                            <i className="icofont-articulated-truck iLinksHome3 " />
                            <i className="icofont-plus Iplus" />
                        </div>
                        <span>ایجاد فاکتور خرید شن‌وماسه</span>
                    </Link>

                    <Link to="addSellerContract" className="linksHome --styleLessLink ">
                        <div className="divIcofontLinksHome">
                            <i className="icofont-attachment  iLinksHome2  " />
                            <i className="icofont-truck-alt   iLinksHome3 " />
                            <i className="icofont-plus Iplus" />
                        </div>
                        <span>ایجاد فاکتور خرید آب</span>
                    </Link>
                </section>


            </div>
        </>
    )
}

export default NavigateInvoices;