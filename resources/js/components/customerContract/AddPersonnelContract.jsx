import Title from "../hooks/Title";
import useChangeForm from '../hooks/useChangeForm';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { createRef, useEffect, useRef, useState } from "react";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import ScaleLoader from 'react-spinners/ScaleLoader';
const AddPersonnelContract = () => {
    const MySwal = withReactContent(Swal);

    const form = useRef(null);
    const formCurrent = form.current;
    const container = useRef(null);
    const btnAddGeRef = useRef(null);
    const btnGetGeRef = useRef(null);

    const personnelErrorRef = useRef(null);
    const startContractErrorRef = useRef(null);
    const endContractErrorRef = useRef(null);
    const calculateWagesErrorRef = useRef(null);
    const fixedSalaryErrorRef = useRef(null);
    const workFridayErrorRef = useRef(null);
    const overtimeErrorRef = useRef(null);
    const absencePenaltyErrorRef = useRef(null);
    const insuranceStatusErrorRef = useRef(null);

    const [loading, setLoading] = useState(false);
    const [disabledBtnShowForm, setDisabledBtnShowForm] = useState(true);
    const [disabledBtnShowRecords, setDisabledBtnShowRecords] = useState(false);

    const [widthComponent, setWidthComponent] = useState(0);
    useEffect(() => {

        let widths = container.current.offsetWidth;
        setWidthComponent(widths)
    }, []);

    const [input, setInput] = useState({
        startContract: '',
        endContract: '',
        calculateWages: '',
        fixedSalary: '',
        workFriday: '',
        overtime: '',
        absencePenalty: '',
        insuranceStatus: '',
    });

    const { showAddCustomerForm, showCreatedCustomers, flexDirection, editMode, resetForm, hideGetCustomer,containerShowGeRef } = useChangeForm({ formCurrent });



    /**
     * نمایش فرم افزودن مشتری
     */
    // const showAddCustomerForm = () => {
    //     // form.current.reset();
    //     // setDisabledBtnShowRecords(false);
    //     // setDisabledBtnShowForm(true);

    //     // setFlexDirection('columnGe');

    //     // setEditCustomer(false)
    //     // resetForm(false);

    // }

    /**
    * لیست مشترهای ایجاد شده را نمایش می دهد
    */
    //  const showCreatedCustomers = () => {
    //     // form.current.reset();
    //     // resetForm();
    //     // setDisabledBtnShowForm(false);
    //     // setDisabledBtnShowRecords(true);

    //     // setFlexDirection('columnReverseGe');

    //     // setHideGetCustomer(false);

    // }

    /**
     * رکوردهای قراردادهای ایجاد شده را جهت نمایش بر می گرداند
     * @returns 
     */
    // const returnCreatedPersonnelContract = () => {
    //     let numberRow = customers.length;
    //     const reversedCustomers = customers.slice().reverse(); // کپی آرایه اولیه و معکوس کردن آن
    //     let value = reversedCustomers.map((customer, i) => {

    //         return <div className="rowListShowGe" key={i}>
    //             <span className="rowNumShowGe">{numberRow - i}</span>
    //             <span className="nameShowGE">{customer['name']}</span>
    //             <span className="lastNameShowGE">{customer['lastName']}</span>
    //             <div className="divEditGe">
    //                 <button className="--styleLessBtn btnEditGe" title=" ویرایش "
    //                     onClick={() => showCustomerEditForm(customer.id)}
    //                 >
    //                     <i className="icofont-pencil iEditGe" />
    //                 </button>
    //             </div>

    //             <div className="divDelGe">

    //                 <button className="--styleLessBtn btnDelGe" title=" حذف ">
    //                     <i className="icofont-trash iDelGe" />
    //                 </button>
    //             </div>

    //         </div>

    //     })

    //     return value;
    // }

    const handleSubmit = () => {

    }
    const handleSubmitEdit = () => {

    }

    return (
        <div className="containerAddPeC" ref={container} >
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
            <Title title="ایجاد قرارداد پرسنل" />
            <div className="headPageGe">
                <button
                    className={`--styleLessBtn btnAddGe ${disabledBtnShowForm ? 'disabledBtnGe' : 'enabledBtnGe'}`}
                    ref={btnAddGeRef}
                    onClick={() => showAddCustomerForm()}
                // disabled={disabledBtnShowForm}
                >
                    تعریف مشتری
                </button>

                <button
                    className={`--styleLessBtn btnGetGe ${disabledBtnShowRecords ? 'disabledBtnGe' : 'enabledBtnGe'} `}
                    ref={btnGetGeRef}
                    onClick={showCreatedCustomers}
                    disabled={disabledBtnShowRecords}
                >
                    مشاهده مشتری‌ها
                </button>
            </div>
            <div className={`containerMainAS_Ge ${flexDirection}`}>

                <div className="continerAddGe containerAddCustomer">
                    <form action="" className="formBeton" ref={form}>
                        <h5 className={`titleFormFB ${editMode ? '' : 'hideGe'}`}>ویرایش مشتری</h5>

                        <div className="sectionFB">

                            <div className="containerInputFB">
                                <div className="divInputFB">
                                    <label htmlFor="name">نام مشتری</label>
                                    <select
                                        className="element"
                                    //  value={day}
                                    //  ref={daySelect}
                                    //  onChange={(e) => changeDay(e)}
                                    //  onClick={(e) => delErr(e, dateOfBirthErrorRef, false, true)}

                                    >

                                    </select>
                                    <i className="icofont-ui-rating starFB" />
                                </div>
                                <div className="errorContainerFB elementError" id="nameError" ref={personnelErrorRef}> </div>
                            </div>
                        </div>


                        <div className={`sectionFB divBtnsFB ${!editMode ? '' : 'hideGe'}`}>
                            <Button
                                variant="success"
                                className="btnSaveFB"
                                onClick={handleSubmit}
                            >
                                ثبت
                            </Button>

                            <Button
                                type="reset"
                                variant="warning"
                                className="btnDelFB"
                                onClick={resetForm}
                            >
                                پاک کن
                            </Button>


                        </div>

                        <div className={`sectionFB divBtnsFB ${!editMode ? 'hideGe' : ''}`}>


                            <Button
                                variant="info"
                                className="btnSaveFB"
                                onClick={handleSubmitEdit}
                            >
                                ویرایش
                            </Button>
                        </div>
                    </form>
                </div>

                <div
                    className={`containerShowGe containerShowCustomer  ${hideGetCustomer ? 'hideGe' : ''}`}
                    ref={containerShowGeRef}
                >
                    <h4 className="titleShowGe"> قراردادهای ایجاد شده</h4>
                    <div className="divListShowGe">

                        <div className="rowListShowGe headRowListShowGe">
                            <span className="rowNumShowGe ">ردیف</span>
                            <span className="nameShowGE ">نام پرسنل</span>
                            <span className="lastNameShowGE">نام خانوادگی</span>

                            <span className="headEditShowGe"> ویرایش  </span>
                            <span className="headDelShowGe"> حذف </span>

                        </div>

                        {/* {customers ? returnCreatedCustomerRecords() : <Skeleton height={40} count={12} />} */}


                    </div>
                </div>

            </div>
        </div>
    )
}

export default AddPersonnelContract;