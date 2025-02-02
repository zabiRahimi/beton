import { useEffect, useRef, useState } from 'react';
import { ScaleLoader } from 'react-spinners';
import Title from '../../hooks/Title'
import { Link } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';



const HeadPage = ({ loading, title, displayBtnAdd, displayBtnShow, displayBtnPrint
    , pRef }) => {
    const container = useRef(null);
    const btnAddGeRef = useRef(null);
    const btnGetGeRef = useRef(null);
    const [disabledBtnShowForm, setDisabledBtnShowForm] = useState(true);
    const [disabledBtnShowRecords, setDisabledBtnShowRecords] = useState(false);
    const printRef = useRef(pRef)

    const handlePrint = useReactToPrint({

        contentRef: printRef.current,

    });
    /**
    * دریافت و ذخیره پهنای کامپوننت برای نمایش بهتر لودر
    */
    const [widthComponent, setWidthComponent] = useState(0);
    useEffect(() => {
        let widths = container.current.offsetWidth;
        setWidthComponent(widths)
    }, []);
    return (
        <div ref={container}>
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
            <Title title={title} />
            <div className="headPageGe">
                {
                    displayBtnAdd &&
                    <Link to="/invoices/receipt" className="btnAddGe --styleLessLink ">
                        ثبت رسید دریافت
                    </Link>
                }

                {
                    displayBtnShow &&
                    <Link to="/invoices/receipt/show" className="btnGetGe --styleLessLink ">
                        مشاهده رسید‌ها
                    </Link>
                }


                {
                    displayBtnPrint &&

                    <button className='btnPrintGe' onClick={() => handlePrint()}>
                        <i className="icofont-print" />
                        <span> چاپ </span>
                    </button>

                }

            </div>
        </div>
    )
}
export default HeadPage;