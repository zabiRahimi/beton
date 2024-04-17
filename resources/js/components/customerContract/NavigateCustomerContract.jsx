import ScaleLoader from 'react-spinners/ScaleLoader';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Title from "../hooks/Title";
import Button from 'react-bootstrap/Button';
import axios from 'axios';
// import '../../../css/addCustomerContract.css';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const NavigateCustmoerContract = () => {
  
    return (
        <>
          
            <Title title="ایجاد قرارداد مشتری" />
            {/* style css in home.css */}
            <div className="mainHome">
                <Link to="addPersonnelContract" className="linksHome --styleLessLink ">
                    <div className="divIcofontLinksHome">
                        <i className="icofont-law-document  iLinksHome2  " />
                        <i className="icofont-hotel-boy iLinksHome3 " />
                        <i className="icofont-plus Iplus" />
                    </div>
                    <span>ایجاد قرارداد پرسنل</span>
                </Link>

                <Link to="addBuyerContract" className="linksHome --styleLessLink ">
                    <div className="divIcofontLinksHome">
                        <i className="icofont-law-document  iLinksHome2  " />
                        <i className="icofont-business-man iLinksHome3 " />
                        <i className="icofont-plus Iplus" />
                    </div>
                    <span>ایجاد قرارداد خریدار</span>
                </Link>

                <Link to="addSellerContract" className="linksHome --styleLessLink ">
                    <div className="divIcofontLinksHome">
                        <i className="icofont-law-document  iLinksHome2  " />
                        <i className="icofont-business-man iLinksHome3 " />
                        <i className="icofont-plus Iplus" />
                    </div>
                    <span>ایجاد قرارداد فروشنده</span>
                </Link>
            </div>
        </>
    )
}

export default NavigateCustmoerContract;