import { useEffect, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import DataZabi from "../../../hooks/DateZabi";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import SelectZabi from "../../../hooks/SelectZabi";
import HeadPage from '../HeadPage';
import RouteService from "./RouteService";
import { handleSetDate, htmlFor, formatNub, resetForm } from './Helper';
const Add = () => {
    const MySwal = withReactContent(Swal);
    const {
        optionDays,
        optionMonth,
        optionShortYears,
    } = DataZabi();

    const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    const form = useRef(null);
    const dayInputRef = useRef(null);
    const daySelectRef = useRef(null);

    const monthInputRef = useRef(null);
    const monthSelectRef = useRef(null);

    const yearInputRef = useRef(null);
    const yearSelectRef = useRef(null);

    const buyerNameError = useRef(null);
    const buyerLastNameError = useRef(null);
    const buyerFatherError = useRef(null);
    const remittanceNumberError = useRef(null);
    const dateRef = useRef(null);
    const dateError = useRef(null);
    const priceRef = useRef(null);
    const priceError = useRef(null);
    const factoryDiv = useRef(null);
    const factoryRef = useRef(null);
    const factoryError = useRef(null);
    const [loading, setLoading] = useState(true);
    const [ticketNumber, setTicketNumber] = useState();
    const factorys = [
        {
            value: 'شهرداری ارسنجان',
            html: <div className="factoryAptionSelectFB"> شهرداری ارسنجان </div>
        },
        {
            value: 'ریگزار جمال‌آباد',
            html: <div className="factoryAptionSelectFB"> ریگزار جمال‌آباد </div>
        },
        {
            value: 'سایر',
            html: <div className="factoryAptionSelectFB"> سایر </div>
        }
    ];
    const [factory, setFactory] = useState('');
    
    const [date, setDate] = useState({
        day: '',
        month: '',
        year: ''
    });

    const [input, setInput] = useState({
        buyerName: '',
        buyerLastName: '',
        buyerFather: '',
        remittanceNumber: '',
        date: '',
        price: '',
        remainingPrice: '',
        factory: '',
        description: ''
    });

    RouteService({ setLoading, setTicketNumber });

    useEffect(() => {
        factory && setInput(prev => ({ ...prev, factory }));
    }, [factory]);


    const handleSaveValInput = (e, input) => {
        let { value } = e.target;
        if (input == 'price') {
            value = value.replace(/,/g, '');
            /**
             * چون قیمت اولیه مبلغ باقیمانده باید
             * با مبلغ حواله برابر باشد اینجا مبلغ باقیمانده مقدار دهی میشود
             */
            setInput(prev => ({ ...prev, remainingPrice: value }));
        }
        setInput(prev => ({ ...prev, [input]: value }));

    }

    const clearInputError = (e, refErr, date = false, factory = false) => {
        e.target.classList.remove('borderRedFB');
        refErr.current && (refErr.current.innerHTML = '')
        date && dateRef.current.classList.remove('borderRedFB');
        factory && factoryDiv.current.classList.remove('borderRedFB');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await axios.post(
            '/api/v1/sandRemittances',
            { ...input },
            {
                headers:
                {
                    'X-CSRF-TOKEN': token,
                    'Content-Type': 'application/json; charset=utf-8'
                }
            }
        ).then((response) => {
            setTicketNumber(ticketNumber + 1);
            form.current.reset();
            MySwal.fire({
                icon: "success",
                title: "با موفقیت ثبت شد",
                confirmButtonText: "  متوجه شدم  ",
                timer: 3000,
                timerProgressBar: true,
                customClass: {
                    timerProgressBar: '--progressBarColorBlue',
                },

                didClose: () => resetForm(setInput, setDate, setFactory, factoryRef.current),
            });
        })
            .catch(
                error => {

                    if (error.response && error.response.status == 422) {

                        let id = Object.keys(error.response.data.errors)[0];
                        const element = document.getElementById(id);
                        // بررسی اینکه آیا عنصر وجود دارد قبل از اسکرول کردن 
                        if (element) { 
                            let scrollPosition = window.scrollY || window.pageYOffset;
                             const top = element.getBoundingClientRect().top + scrollPosition - 20;
                              window.scrollTo({ top: top, behavior: 'smooth' }); 
                            }
                        Object.entries(error.response.data.errors).map(([key, val]) => {
                            //نادیده گرفتن خطای مربوط به remainingPrice
                            if (key !== 'remainingPrice') {
                            document.getElementById(key).classList.add('borderRedFB');
                            document.getElementById(key + 'Error').innerHTML = val;
                            }
                        });
                    }
                }
            )

        setLoading(false);
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
                                        {ticketNumber}
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
                                    onInput={e => handleSaveValInput(e, 'buyerName')}
                                    onFocus={e => clearInputError(e, buyerNameError)}
                                />
                                <i className="icofont-ui-rating starFB" />
                            </div>
                            <div className="errorContainerFB elementError" id="buyerNameError" ref={buyerNameError}> </div>
                        </div>
                        <div className="containerInputFB">
                            <div className="divInputFB">
                                <label htmlFor="buyerLastName">نام‌خانوادگی خریدار</label>
                                <input
                                    type="text"
                                    className="inputTextFB element"
                                    id="buyerLastName"
                                    onInput={e => handleSaveValInput(e, 'buyerLastName')}
                                    onFocus={e => clearInputError(e, buyerLastNameError)}
                                />
                                <i className="icofont-ui-rating starFB" />
                            </div>
                            <div className="errorContainerFB elementError" id="buyerLastNameError" ref={buyerLastNameError}> </div>
                        </div>
                        <div className="containerInputFB">
                            <div className="divInputFB">
                                <label htmlFor="buyerFather">نام پدر</label>
                                <input
                                    type="text"
                                    className="inputTextFB element"
                                    id="buyerFather"
                                    onInput={e => handleSaveValInput(e, 'buyerFather')}
                                    onFocus={e => clearInputError(e, buyerFatherError)}
                                />

                            </div>
                            <div className="errorContainerFB elementError" id="buyerFatherError" ref={buyerFatherError}> </div>
                        </div>
                    </section>

                    <section className='sectionFB'>

                        <div className="containerInputFB">
                            <div className="divInputFB">
                                <label htmlFor="remittanceNumber">شماره حواله</label>
                                <input
                                    type="text"
                                    className="inputTextFB ltrFB element"
                                    id="remittanceNumber"
                                    onInput={e => handleSaveValInput(e, 'remittanceNumber')}
                                    onFocus={e => clearInputError(e, remittanceNumberError)}
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
                                            placeholder="01"
                                            id="day"
                                            defaultValue={date.day}
                                            onInput={(e) => handleSetDate(e, 'day', date, setDate, setInput, dayInputRef.current, daySelectRef.current)}
                                            onFocus={(e) => clearInputError(e, dateError, false, true)}
                                            ref={dayInputRef}
                                        />
                                        <span>/</span>
                                        <input
                                            type="text"
                                            className="inputTextDateACus inputMonthTDACus element"
                                            placeholder="01"
                                            defaultValue={date.month}
                                            onInput={(e) => handleSetDate(e, 'month', date, setDate, setInput, monthInputRef.current, monthSelectRef.current)}
                                            onFocus={(e) => clearInputError(e, dateError, false, true)}
                                            ref={monthInputRef}
                                        />
                                        <span>/</span>
                                        <input
                                            type="text"
                                            className="inputTextDateACus inputYearTDACus element"
                                            placeholder="1300"
                                            defaultValue={date.year}
                                            onInput={(e) => { handleSetDate(e, 'year', date, setDate, setInput, yearInputRef.current, yearSelectRef.current) }}
                                            onFocus={(e) => clearInputError(e, dateError, false, true)}
                                            ref={yearInputRef}
                                        />
                                        <i className="icofont-ui-rating starFB" />
                                    </div>

                                    <div className="divDownDateAcus" >
                                        <select
                                            className="element"
                                            defaultValue={date.day}
                                            onChange={(e) => handleSetDate(e, 'day', date, setDate, setInput, dayInputRef.current, daySelectRef.current)}
                                            onClick={(e) => clearInputError(e, dateError, false, true)}
                                            ref={daySelectRef}
                                        >
                                            <option value="">روز</option>
                                            {optionDays}
                                        </select>
                                        <select
                                            className="element"
                                            defaultValue={date.month}
                                            onChange={(e) => handleSetDate(e, 'month', date, setDate, setInput, monthInputRef.current, monthSelectRef.current)}
                                            onClick={(e) => clearInputError(e, dateError, false, true)}
                                            ref={monthSelectRef}
                                        >
                                            <option value="">ماه</option>
                                            {optionMonth}
                                        </select>
                                        <select
                                            className="element"
                                            defaultValue={date.year}
                                            onChange={(e) => { handleSetDate(e, 'year', date, setDate, setInput, yearInputRef.current, yearSelectRef.current) }}
                                            onClick={(e) => clearInputError(e, dateError, false, true)}
                                            ref={yearSelectRef}
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
                                <label htmlFor='price'> مبلغ حواله </label>
                                <input
                                    type="text"
                                    id='price'
                                    className="inputTextUnitFB ltrFB element"
                                    onInput={e => {
                                        handleSaveValInput(e, 'price');
                                        formatNub(priceRef.current);
                                    }}
                                    onFocus={e => clearInputError(e, priceError)}
                                    ref={priceRef}

                                />
                                <span
                                    className="unitFB"
                                    onClick={() => htmlFor('price')}
                                >
                                    تومان
                                </span>
                                <i className="icofont-ui-rating starFB" />
                            </div>
                            <div
                                className="errorContainerFB elementError"
                                id='priceError'
                                ref={priceError}
                            >
                            </div>
                        </div>

                        <div className="containerInputFB">
                            <div className="divInputFB">
                                <label>کارخانه  </label>
                                <div
                                    id='factory'
                                    className="element"
                                    onClick={e => { clearInputError(e, factoryError, false, true) }}
                                    ref={factoryDiv}
                                >
                                    <SelectZabi
                                        primaryLabel='انتخاب'
                                        options={factorys}
                                        saveOption={setFactory}
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
                                    className="textareaFB element"
                                    id="description"
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
                            onClick={() => resetForm(setInput, setDate, setFactory, factoryRef.current)}
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