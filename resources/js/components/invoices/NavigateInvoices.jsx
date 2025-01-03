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
                    <Link to="concreteSalesInvoice" className="linksHome --styleLessLink ">
                        <div className="divIcofontLinksHome">
                            <i className="icofont-attachment  iLinksHome2  " />
                            <i className="icofont-concrete-mixer iLinksHome3 iLinksCementHome3 " />
                            <i className="icofont-plus Iplus" />
                        </div>
                        <span>ثبت فاکتور فروش بتن</span>
                    </Link>
                </section>

                <div className="borderDivHome"></div>

                <section className="categoryLinksHome">
                    <Link to="cement/addCementInvoice" className="linksHome --styleLessLink ">
                        <div className="divIcofontLinksHome">
                            <i className="icofont-attachment  iLinksHome2  " />
                            <i className="icofont-oil-truck  iLinksHome3 iLinksCementHome3 " />
                            <i className="icofont-plus Iplus" />
                        </div>
                        <span>ثبت فاکتور تخلیه سیمان</span>
                    </Link>

                    <Link to="sandRemittance" className="linksHome --styleLessLink ">
                        <div className="divIcofontLinksHome">
                            <i className="icofont-attachment  iLinksHome2  " />
                            <i className="icofont-law-document  iLinksHome3 iLinksSandHome3 " />
                            <i className="icofont-plus Iplus" />
                        </div>
                        <span>ثبت حواله خرید شن‌وماسه</span>
                    </Link>

                    <Link to="sand" className="linksHome --styleLessLink ">
                        <div className="divIcofontLinksHome">
                            <i className="icofont-attachment  iLinksHome2  " />
                            <i className="icofont-articulated-truck iLinksHome3 iLinksSandHome3 " />
                            <i className="icofont-plus Iplus" />
                        </div>
                        <span>ثبت فاکتور تخلیه شن‌وماسه</span>
                    </Link>

                    <Link to="water/addWaterInvoice" className="linksHome --styleLessLink ">
                        <div className="divIcofontLinksHome">
                            <i className="icofont-attachment  iLinksHome2  " />
                            <i className="icofont-truck-alt   iLinksHome3 iLinksWaterHome3 " />
                            <i className="icofont-plus Iplus" />
                        </div>
                        <span>ثبت فاکتور تخلیه آب</span>
                    </Link>
                </section>

                <div className="borderDivHome"></div>

                <section className="categoryLinksHome">
                    <Link to="proformaInvoice" className="linksHome --styleLessLink ">
                        <div className="divIcofontLinksHome">
                            <i className="icofont-attachment  iLinksHome2  " />
                            <i className="icofont-papers  iLinksHome3 iLinksProformaInvoiceHome3 " />
                            <i className="icofont-plus Iplus" />
                        </div>
                        <span>ثبت پیش فاکتور فروش </span>
                    </Link>

                    <Link to="salesInvoice" className="linksHome --styleLessLink ">
                        <div className="divIcofontLinksHome">
                            <i className="icofont-attachment  iLinksHome2  " />
                            <i className="icofont-page  iLinksHome3 iLinksSalesInvoiceHome3 " />
                            <i className="icofont-plus Iplus" />
                        </div>
                        <span>ثبت فاکتور فروش</span>
                    </Link>

                    

                    
                </section>

            </div>
        </>
    )
}

export default NavigateInvoices;