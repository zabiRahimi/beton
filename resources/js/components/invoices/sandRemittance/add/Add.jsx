import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import DataZabi from "../../../hooks/DateZabi";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import SelectZabi from "../../../hooks/SelectZabi";
import SelectZabi2 from "../../../hooks/SelectZabi2";
import HeadPage from '../HeadPage';
const Add = () => {
    let navigate = useNavigate();
    const MySwal = withReactContent(Swal);
    const {
        optionDays,
        optionMonth,
        optionShortYears,
        optionHours,
        optionMinutes,
        optionSeconds,
    } = DataZabi();

    const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    const form = useRef(null);
    const factoryRef = useRef(null);
    const factoryError = useRef(null);
    const billNumberError = useRef(null);
    const remittanceNumberError = useRef(null);
    const timeRef = useRef(null);
    const dateRef = useRef(null);
    const dateError = useRef(null);
    const timeError = useRef(null);
    const typeSandRef = useRef(null);
    const typeSandError = useRef(null);
    const weightError = useRef(null);
    const unitPriceError = useRef(null);
    const totalPriceError = useRef(null);
    const dumpTruckRef = useRef(null);
    const dumpTruckError = useRef(null);
    const driverRef = useRef(null);
    const driverError = useRef(null);
    const unitFareError = useRef(null);
    const totalFareError = useRef(null);
    const sandStoreRef = useRef(null);
    const sandStoreError = useRef(null);
    const hasCalledGetSandSellers = useRef(false);
    const hasCalledGetSandStores = useRef(false);
    const [loading, setLoading] = useState(false);
    const [factory, setFactory] = useState([]);
    const [factorySelected, setFactorySelected] = useState('');
    const [typeSand, setTypeSand] = useState([
        {
            value: 'ماسه شسته',
            html: <div className="sandAptionSelectFB">ماسه شسته</div>
        },
        {
            value: 'ماسه 06',
            html: <div className="sandAptionSelectFB">ماسه 06</div>
        },
        {
            value: 'شن بادامی',
            html: <div className="sandAptionSelectFB">شن بادامی</div>
        },
        {
            value: 'شن نخودی',
            html: <div className="sandAptionSelectFB">شن نخودی</div>
        },
        {
            value: 'سایر',
            html: <div className="sandAptionSelectFB">سایر</div>
        }
    ]);
    const [typeSandSelected, setTypeSandSelected] = useState('');

    const [dumpTruck, setDumpTruck] = useState([]);
    const [dumpTruckSelected, setDumpTruckSelected] = useState('');
    const [dumpTruckOwnerSelected, setDumpTruckOwnerSelected] = useState('');
    const [driver, setDriver] = useState([]);
    const [driverIdSelected, setDriverIdSelected] = useState('');
    const [date, setDate] = useState({
        day: '',
        month: '',
        year: ''
    });
    const [time, setTime] = useState({
        second: '',
        minute: '',
        hour: ''
    });
    const [sandStores, setSandStores] = useState([]);
    const [sandStoreIdSelected, setSandStoreIdSelected] = useState('');


    const [input, setInput] = useState({
        buyerName: '',
        buyerLastName: '',
        buyerFather: '',
        factory: '',
        date: '',
        amount: '',
        description: ''
    });

    useEffect(() => {
        if (!hasCalledGetSandSellers.current) {
            getSandSellers();
            hasCalledGetSandSellers.current = true;
        }
    }, []);

    useEffect(() => {
        if (!hasCalledGetSandStores.current) {
            getSandStores();
            hasCalledGetSandStores.current = true;
        }
    }, []);

    const getSandSellers = async () => {
        await axios.get("/api/v1/sandInvoice/getSandSellers").then((response) => {
            let datas = response.data.sandSellers;
            if (datas.length == 0) {
                MySwal.fire({
                    icon: "warning",
                    title: "هشدار",
                    text: `هنوز هیچ کارخانه‌ای (فروشنده شن‌وماسه) ثبت نشده است. لازم است ابتدا کارخانه را ثبت کنید.`,
                    confirmButtonText: "  ثبت کارخانه   ",
                    showCancelButton: true,
                    cancelButtonText: "کنسل",
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    preConfirm: () => {
                        navigate("/addCustomer");
                    }
                });
            } else {
                datas.map((data, i) => {
                    setFactory(perv => ([...perv, {
                        value: data.id,
                        // cementStoreName: data.silo,
                        html: <div className="factoryAptionSelectFB"> {data.name}  {data.lastName} </div>
                    }]));
                })
            }
        });
    }

    const getSandStores = async () => {
        await axios.get("/api/v1/sandInvoice/getSandStores").then((response) => {
            let datas = response.data.sandStores;
            if (datas.length == 0) {
                MySwal.fire({
                    icon: "warning",
                    title: "هشدار",
                    text: `هنوز هیچ سیلوی شن‌وماسه‌ای ثبت نشده است. لازم است ابتدا سیلو را ثبت کنید.`,
                    confirmButtonText: "  ثبت سیلو   ",
                    showCancelButton: true,
                    cancelButtonText: "کنسل",
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    preConfirm: () => {
                        navigate("/addSandStore");
                    }
                });
            } else {
                datas.map((data, i) => {
                    setSandStores(perv => ([...perv, {
                        value: data.id,
                        // cementStoreName: data.silo,
                        html: <div className="factoryAptionSelectFB"> {data.silo} </div>
                    }]));
                })
            }
        });
    }

    const handleSetDate = (e, input) => {
        let { value } = e.target,
            valDate;
        value = value.toString();
        if (input == 'day') {
            (value != 0 && value.length == 1) && (value = '0' + value);
            (value.length >= 3 && value[0] === '0') && (value = value.slice(1));
            if (value == '' || (Number(value) >= 0 && Number(value) <= 31)) {
                setDate(prev => ({ ...prev, [input]: value }));

            } else {
                e.target.value = date.day;
            }
            valDate = date.year + '-' + date.month + '-' + value;

            // setInput(perv => {
            //     let newInvoice;
            //     newInvoice = [...perv.invoice];
            //     newInvoice[i] = { ...newInvoice[i], date: valDate };
            //     return { ...perv, invoice: newInvoice };
            // });


        } else if (input == 'month') {
            (value != 0 && value.length == 1) && (value = '0' + value);
            (value.length >= 3 && value[0] === '0') && (value = value.slice(1));
            if (value == '' || (Number(value) >= 0 && Number(value) <= 12)) {
                setDate(prev => ({ ...prev, [input]: value }));
            }
            else {
                e.target.value = date.month;
            }
            valDate = date.year + '-' + value + '-' + date.day;

            // setInput(perv => {
            //     let newInvoice;
            //     newInvoice = [...perv.invoice];
            //     newInvoice[i] = { ...newInvoice[i], date: valDate };
            //     return { ...perv, invoice: newInvoice };
            // });

        } else if (input = 'year') {
            if (value == '' || (Number(value) >= 1 && Number(value) <= 1500)) {
                setDate(prev => ({ ...prev, [input]: value }));

            } else {
                e.target.value = date.year;
            }
            valDate = value + '-' + date.month + '-' + date.day;

            // setInput(perv => {
            //     let newInvoice;
            //     newInvoice = [...perv.invoice];
            //     newInvoice[i] = { ...newInvoice[i], date: valDate };
            //     return { ...perv, invoice: newInvoice };
            // });

        }
    }

    const handleSetTime = (e, input) => {
        let { value } = e.target,
            valTime;
        value = value.toString();
        if (input == 'second') {
            (value != 0 && value.length == 1) && (value = '0' + value);
            (value.length >= 3 && value[0] === '0') && (value = value.slice(1));

            if (value == '' || (Number(value) >= 0 && Number(value) <= 60)) {
                setTime(prev => ({ ...prev, [input]: value }));

            } else {

                e.target.value = time.second;
            }
            valTime = time.hour + ':' + time.minute + ':' + value;

            // setInput(perv => {
            //     let newInvoice;
            //     newInvoice = [...perv.invoice];
            //     newInvoice[i] = { ...newInvoice[i], time: valTime };
            //     return { ...perv, invoice: newInvoice };
            // });


        } else if (input == 'minute') {
            (value != 0 && value.length == 1) && (value = '0' + value);
            (value.length >= 3 && value[0] === '0') && (value = value.slice(1));

            if (value == '' || (Number(value) >= 0 && Number(value) <= 60)) {
                setTime(prev => ({ ...prev, [input]: value }));


            } else {
                e.target.value = time.minute;
            }

            valTime = time.hour + ':' + value + ':' + time.second;

            // setInput(perv => {
            //     let newInvoice;
            //     newInvoice = [...perv.invoice];
            //     newInvoice[i] = { ...newInvoice[i], time: valTime };
            //     return { ...perv, invoice: newInvoice };
            // });

        } else if (input = 'hour') {
            (value != 0 && value.length == 1) && (value = '0' + value);
            (value.length >= 3 && value[0] === '0') && (value = value.slice(1));

            if (value == '' || (Number(value) >= 0 && Number(value) <= 24)) {
                setTime(prev => ({ ...prev, [input]: value }));

            } else {
                e.target.value = time.hour;
            }

            valTime = value + ':' + time.minute + ':' + time.second;

            // setInput(perv => {
            //     let newInvoice;
            //     newInvoice = [...perv.invoice];
            //     newInvoice[i] = { ...newInvoice[i], time: valTime };
            //     return { ...perv, invoice: newInvoice };
            // });

        }
    }

    const handleSaveValInput = (e, input) => {
    }

    const clearInputError = (e, refErr, time = false, date = false) => {
        e.target.classList.remove('borderRedFB');
        refErr.current && (refErr.current.innerHTML = '')
        date && dateRef.current.classList.remove('borderRedFB');
        time && timeRef.current.classList.remove('borderRedFB');
    }

    const handleSubmit = () => {
    }

    const handleResetForm = () => {
    }

    return (
        <div>
            <HeadPage
                loading={loading}
                title='ثبت حواله خرید شن‌وماسه'
                displayBtnAdd={false}
                displayBtnShow={true}
            />

            <div className="continerAddGe">
                <form className="formBeton" ref={form}>
                    <section className="sectionFB">
                        <div className="containerInputFB">
                            <div className="divInputFB">
                                <label>شماره فاکتور </label>
                                <div className="mainTicketNumberACSI_FB">
                                    <div className="ticketNumberACSI_FB">
                                        {/* {ticketNumber + i} */}
                                        1
                                    </div>
                                </div>
                            </div>
                            <div className="errorContainerFB elementError"> </div>
                        </div>
                    </section>
                    <section className='sectionFB'>
                        <div className="containerInputFB">
                            <div className="divInputFB">
                                <label htmlFor="buyerName">نام خریدار</label>
                                <input
                                    type="text"
                                    className="inputTextFB element"
                                    id="buyerName"
                                    defaultValue={input.remittanceNumber}
                                    onInput={e => handleSaveValInput(e, 'billNumber')}
                                    onFocus={e => clearInputError(e, billNumberError)}
                                />
                                <i className="icofont-ui-rating starFB" />
                            </div>
                            <div className="errorContainerFB elementError" id="billNumberError" ref={billNumberError}> </div>
                        </div>
                        <div className="containerInputFB">
                            <div className="divInputFB">
                                <label htmlFor="billNumber">نام‌خانوادگی خریدار</label>
                                <input
                                    type="text"
                                    className="inputTextFB element"
                                    id="billNumber"
                                    defaultValue={input.remittanceNumber}
                                    onInput={e => handleSaveValInput(e, 'billNumber')}
                                    onFocus={e => clearInputError(e, billNumberError)}
                                />
                                <i className="icofont-ui-rating starFB" />
                            </div>
                            <div className="errorContainerFB elementError" id="billNumberError" ref={billNumberError}> </div>
                        </div>
                        <div className="containerInputFB">
                            <div className="divInputFB">
                                <label htmlFor="billNumber">نام پدر</label>
                                <input
                                    type="text"
                                    className="inputTextFB element"
                                    id="billNumber"
                                    defaultValue={input.remittanceNumber}
                                    onInput={e => handleSaveValInput(e, 'billNumber')}
                                    onFocus={e => clearInputError(e, billNumberError)}
                                />
                                
                            </div>
                            <div className="errorContainerFB elementError" id="billNumberError" ref={billNumberError}> </div>
                        </div>
                    </section>

                    <section className='sectionFB'>
                    
                        <div className="containerInputFB">
                            <div className="divInputFB">
                                <label htmlFor="remittanceNumber">شماره حواله</label>
                                <input
                                    type="text"
                                    className="inputTextFB element"
                                    id="remittanceNumber"
                                    defaultValue={input.remittanceNumber}
                                    onInput={e => handleSaveValInput(e, 'remittanceNumber')}
                                    onFocus={e => clearInputError(e, lastNameErrorRef)}
                                />
                            </div>
                            <div className="errorContainerFB elementError" id="remittanceNumberError" ref={remittanceNumberError}> </div>
                        </div>
                        
                        <div className="containerInputFB">
                            <div className="divInputFB ">
                                <label htmlFor="day">تاریخ  </label>
                                <div className="divDateBirth">
                                    <div className="divUpDateAcus element" ref={dateRef} id='date'
                                    >
                                        <input
                                            type="text"
                                            className="inputTextDateACus inputDayTDACus element"
                                            placeholder="1"
                                            id="day"
                                            defaultValue={date.day}
                                            onInput={(e) => handleSetDate(e, 'day')}
                                            onFocus={(e) => clearInputError(e, dateError, false, true)}
                                        />
                                        <span>/</span>
                                        <input
                                            type="text"
                                            className="inputTextDateACus inputMonthTDACus element"
                                            placeholder="1"
                                            defaultValue={date.month}
                                            onInput={(e) => handleSetDate(e, 'month')}
                                            onFocus={(e) => clearInputError(e, dateError, false, true)}
                                        />
                                        <span>/</span>
                                        <input
                                            type="text"
                                            className="inputTextDateACus inputYearTDACus element"
                                            placeholder="1300"
                                            defaultValue={date.year}
                                            onInput={(e) => { handleSetDate(e, 'year') }}
                                            onFocus={(e) => clearInputError(e, dateError, false, true)}
                                        />
                                        <i className="icofont-ui-rating starFB" />
                                    </div>

                                    <div className="divDownDateAcus" >
                                        <select
                                            className="element"
                                            defaultValue={date.day}
                                            onChange={(e) => handleSetDate(e, 'day')}
                                            onClick={(e) => clearInputError(e, dateError, false, true)}
                                        >
                                            <option value="">روز</option>
                                            {optionDays}
                                        </select>
                                        <select
                                            className="element"
                                            defaultValue={date.month}
                                            onChange={(e) => handleSetDate(e, 'month')}
                                            onClick={(e) => clearInputError(e, dateError, false, true)}
                                        >
                                            <option value="">ماه</option>
                                            {optionMonth}
                                        </select>
                                        <select
                                            className="element"
                                            defaultValue={date.year}
                                            onChange={(e) => { handleSetDate(e, 'year') }}
                                            onClick={(e) => clearInputError(e, dateError, false, true)}
                                        >
                                            <option value="">سال</option>
                                            {optionShortYears}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="errorContainerFB elementError" id='dateError' ref={dateError}> </div>
                        </div>
                        
                        <div className="containerInputFB">
                            <div className="divInputFB">
                                <label htmlFor="weight">مبلغ حواله</label>
                                <input
                                    type="text"
                                    className="inputTextFB element"
                                    id="weight"
                                    defaultValue={input.weight}
                                    onInput={e => handleSaveValInput(e, 'weight')}
                                    onFocus={e => clearInputError(e, weightError)}
                                />
                                <i className="icofont-ui-rating starFB" />
                            </div>
                            <div className="errorContainerFB elementError" id="weightError" ref={weightError}> </div>
                        </div>
                        <div className="containerInputFB">
                            <div className="divInputFB">
                                <label>کارخانه  </label>
                                <div
                                    id='factory'
                                    className="element"
                                    onClick={e => { clearInputError(e, factoryError) }}
                                >
                                    <SelectZabi
                                        primaryLabel='انتخاب'
                                        options={factory}
                                        saveOption={setFactorySelected}
                                        ref={factoryRef}
                                    />
                                </div>
                                <i className="icofont-ui-rating starFB" />

                            </div>
                            <div className="errorContainerFB elementError" id='factoryError' ref={factoryError}> </div>
                        </div>
                    </section>
                   
                    <section className="sectionFB">
                        <div className="containerInputFB">
                            <div className="divInputFB">
                                <label htmlFor="description">توضیحات</label>
                                <textarea

                                    // className="textareaAddressACu"
                                    className="textareaFB element"
                                    id="description"
                                    defaultValue={input.description}
                                    onInput={e => handleSaveValInput(e, 'description')}
                                />
                            </div>
                            <div className="errorContainerFB elementError"> </div>
                        </div>

                    </section>
                    <section className="sectionFB divBtnsFB">
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
                            onClick={handleResetForm}
                        >
                            پاک کن
                        </Button>
                    </section>
                </form>
            </div>

        </div>
    );
}
export default Add;