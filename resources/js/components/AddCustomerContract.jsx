import ScaleLoader from 'react-spinners/ScaleLoader';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Title from "./hooks/Title";
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import '../../css/addCustomerContract.css';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const AddCustomerContract = () => {
    const MySwal = withReactContent(Swal);
    const container = useRef(null)

    const [loading, setLoading] = useState(false);

    const [widthComponent, setWidthComponent] = useState(0);
    useEffect(() => {

        let widths = container.current.offsetWidth;
        setWidthComponent(widths)
    }, []);
    return (
        <div className="containerAddCustomerContract" ref={container}>
            <ScaleLoader color="#fff" height={90} width={8} radius={16} loading={loading} cssOverride={{
                backgroundColor: '#6d6b6b',
                position: 'fixed',
                top: 0,
                width: widthComponent + 'px',
                height: '100vh',
                zIndex: 100,
                opacity: 0.2,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }} />
            <Title title="ایجاد قرارداد مشتری" />

            <div className="">
                <Link to="addCustomerContract" className="linksHome --styleLessLink ">
                    <div className="divIcofontLinksHome">
                        <i className="icofont-ui-v-card  iLinksHome iTruck " />
                        <i className="icofont-plus Iplus" />
                    </div>
                    <span>ایجاد قرار داد مشتری</span>
                </Link>
            </div>
        </div>
    )
}

export default AddCustomerContract;