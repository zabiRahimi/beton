import { ScaleLoader } from 'react-spinners';
import Title from '../../hooks/Title'
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';


const headPage = ({ loading }) => {
    const container = useRef(null);
    const btnAddGeRef = useRef(null);
    const btnGetGeRef = useRef(null);
    const [disabledBtnShowForm, setDisabledBtnShowForm] = useState(true);
    const [disabledBtnShowRecords, setDisabledBtnShowRecords] = useState(false);


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
            <Title title='sand' />
            <div className="headPageGe">
                {/* <button
                    className={`--styleLessBtn btnAddGe ${disabledBtnShowForm ? 'disabledBtnGe' : 'enabledBtnGe'}`}
                    // ref={btnAddGeRef} onClick={() => showAddForm(true)}
                    disabled={disabledBtnShowForm}
                >
                    ایجاد فاکتور
                </button> */}

                {/* <button
                    className={`--styleLessBtn btnGetGe ${disabledBtnShowRecords ? 'disabledBtnGe' : 'enabledBtnGe'} `}
                    ref={btnGetGeRef}
                    // onClick={() => { showCreatedRecord(true); handleRemoveAllError() }}
                    disabled={disabledBtnShowRecords}
                >
                    مشاهده فاکتورها
                </button> */}
                <Link to="editSandInvoice" className="btnGetGe --styleLessLink ">
                    ایجاد فاکتور
                </Link>
                <Link to="showSandInvoices" className="btnGetGe --styleLessLink ">
                    مشاهده فاکتورها
                </Link>
            </div>
        </div>
    )
}
export default headPage;