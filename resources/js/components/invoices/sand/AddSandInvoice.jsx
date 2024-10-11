import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import DataZabi from "../../hooks/DateZabi";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import SelectZabi from "../../hooks/SelectZabi";
import SelectZabi2 from "../../hooks/SelectZabi2";
import HeadPage from './HeadPage';
const AddSandInvoice = () => {
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
    const referenceNumberError = useRef(null);
    const timeRef = useRef(null);
    const dateRef = useRef(null);
    const dateError = useRef(null);
    const timeError = useRef(null);
    const typeSandRef = useRef(null);
    const tyepSandError = useRef(null);
    const weightError = useRef(null);
    const unitPriceError = useRef(null);
    const totalPriceError = useRef(null);
    const [loading, setLoading] = useState(false);
    const [factory, setFactory] = useState([
        {
            value: 'شهرداری ارسنجان',
            html: <div className="factoryAptionSelectFB">شهرداری ارسنجان</div>
        },
        {
            value: 'ریگزار جمال آباد',
            html: <div className="factoryAptionSelectFB">ریگزار جمال آباد</div>
        },
        {
            value: 'سایر',
            html: <div className="factoryAptionSelectFB">سایر</div>
        }
    ]);
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

    const [input, setInput] = useState({
        factroy: '',
        referenceNumber: '',
        billNumber: '',
        time: '',
        date: '',
        tyepSand: '',
        weight: '',
        unitPrice: '',
        totalPrice: '',
    });

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

    return (
        <div>
            <HeadPage
                loading={loading}
                title='ایجاد فاکتور شن و ماسه'
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
                                <label htmlFor="lastName">شماره قبض</label>
                                <input
                                    type="text"
                                    className="inputTextFB element"
                                    id="lastName"
                                    defaultValue={input.referenceNumber}
                                    onInput={e => handleSaveValInput(e, 'billNumber')}
                                    onFocus={e => clearInputError(e, billNumberError)}
                                />
                                <i className="icofont-ui-rating starFB" />
                            </div>
                            <div className="errorContainerFB elementError" id="billNumberError" ref={billNumberError}> </div>
                        </div>

                        <div className="containerInputFB">
                            <div className="divInputFB">
                                <label htmlFor="lastName">شماره حواله</label>
                                <input
                                    type="text"
                                    className="inputTextFB element"
                                    id="lastName"
                                    defaultValue={input.referenceNumber}
                                    onInput={e => handleSaveValInput(e, 'referenceNumber')}
                                    onFocus={e => clearInputError(e, lastNameErrorRef)}
                                />
                            </div>
                            <div className="errorContainerFB elementError" id="referenceNumberError" ref={referenceNumberError}> </div>
                        </div>
                    </section>
                    <section className="sectionFB">
                        <div className="containerInputFB">
                            <div className="divInputFB ">
                                <label > ساعت </label>
                                <div className="divDateBirth">
                                    <div className="divUpDateAcus element" ref={timeRef} id='time'
                                    >
                                        <input
                                            type="text"
                                            className="inputTextDateACus inputDayTDACus element"
                                            placeholder="00"
                                            onInput={(e) => handleSetTime(e, 'second')}
                                            onFocus={(e) => clearInputError(e, timeError, true)}
                                        />
                                        <span>:</span>
                                        <input
                                            type="text"
                                            className="inputTextDateACus inputMonthTDACus element"
                                            placeholder="00"
                                            onInput={(e) => handleSetTime(e, 'minute')}
                                            onFocus={(e) => clearInputError(e, timeError, true)}
                                        />
                                        <span>:</span>
                                        <input
                                            type="text"
                                            className="inputTextDateACus inputYearTDACus element"
                                            placeholder="00"
                                            onInput={(e) => { handleSetTime(e, 'hour') }}
                                            onFocus={(e) => clearInputError(e, timeError, true)}
                                        />
                                        <i className="icofont-ui-rating starFB" />
                                    </div>

                                    <div className="divDownDateAcus" >
                                        <select
                                            className="element"
                                            onChange={(e) => handleSetTime(e, 'second')}
                                            onClick={(e) => clearInputError(e, timeError, true)}
                                        >
                                            <option value=""> ثانیه </option>
                                            {optionSeconds}
                                        </select>
                                        <select
                                            className="element"
                                            onChange={(e) => handleSetTime(e, 'minute')}
                                            onClick={(e) => clearInputError(e, timeError, true)}
                                        >
                                            <option value=""> دقیقه </option>
                                            {optionMinutes}
                                        </select>
                                        <select
                                            className="element"
                                            onChange={(e) => { handleSetTime(e, 'hour') }}
                                            onClick={(e) => clearInputError(e, timeError, true)}
                                        >
                                            <option value=""> ساعت </option>
                                            {optionHours}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="errorContainerFB elementError" id='timeError' ref={timeError}> </div>
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
                    </section>
                    <section className="sectionFB">
                        <div className="containerInputFB">
                            <div className="divInputFB">
                                <label> نوع‌ شن‌وماسه </label>
                                <div
                                    id='factory'
                                    className="element"
                                    onClick={e => { clearInputError(e, factoryError) }}
                                >
                                    <SelectZabi
                                        primaryLabel='انتخاب'
                                        options={typeSand}
                                        saveOption={setTypeSandSelected}
                                        ref={typeSandRef}
                                    />
                                </div>
                                <i className="icofont-ui-rating starFB" />

                            </div>
                            <div className="errorContainerFB elementError" id='factoryError' ref={factoryError}> </div>
                        </div>
                        <div className="containerInputFB">
                            <div className="divInputFB">
                                <label htmlFor="lastName">شماره قبض</label>
                                <input
                                    type="text"
                                    className="inputTextFB element"
                                    id="lastName"
                                    defaultValue={input.referenceNumber}
                                    onInput={e => handleSaveValInput(e, 'billNumber')}
                                    onFocus={e => clearInputError(e, billNumberError)}
                                />
                                <i className="icofont-ui-rating starFB" />
                            </div>
                            <div className="errorContainerFB elementError" id="billNumberError" ref={billNumberError}> </div>
                        </div>
                    </section>
                    <section className="sectionFB">
                        <div className="containerInputFB">
                            <div className="divInputFB">
                                <label htmlFor="lastName">شماره قبض</label>
                                <input
                                    type="text"
                                    className="inputTextFB element"
                                    id="lastName"
                                    defaultValue={input.referenceNumber}
                                    onInput={e => handleSaveValInput(e, 'billNumber')}
                                    onFocus={e => clearInputError(e, billNumberError)}
                                />
                                <i className="icofont-ui-rating starFB" />
                            </div>
                            <div className="errorContainerFB elementError" id="billNumberError" ref={billNumberError}> </div>
                        </div>
                        <div className="containerInputFB">
                            <div className="divInputFB">
                                <label htmlFor="lastName">شماره قبض</label>
                                <input
                                    type="text"
                                    className="inputTextFB element"
                                    id="lastName"
                                    defaultValue={input.referenceNumber}
                                    onInput={e => handleSaveValInput(e, 'billNumber')}
                                    onFocus={e => clearInputError(e, billNumberError)}
                                />
                                <i className="icofont-ui-rating starFB" />
                            </div>
                            <div className="errorContainerFB elementError" id="billNumberError" ref={billNumberError}> </div>
                        </div>
                    </section>
                    <section className="sectionFB">

                    </section>
                </form>
            </div>

        </div>
    );
}
export default AddSandInvoice;