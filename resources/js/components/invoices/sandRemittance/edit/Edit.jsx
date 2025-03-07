import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import DataZabi from "../../../hooks/DateZabi";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import SelectZabi from "../../../hooks/SelectZabi";
import HeadPage from '../HeadPage';
import RouteService from "./RouteService";
import {
    handleSetDate,
    clearInputError,
    htmlFor, 
    formatNub,
    handleOptionRadioChange
} from './Helper';

const Edit = () => {
    const { sandRemittanceId } = useParams();
    const MySwal = withReactContent(Swal);
    const {
        optionDays,
        optionMonth,
        optionShortYears,
    } = DataZabi();

    const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    const loadingEnd = useRef(false);
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
    const remainingPriceRef = useRef(null);
    const remainingPriceError = useRef(null);
    const [loading, setLoading] = useState(true);
    const [sandRemittance, setSandRemittance] = useState(null);
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
    const [selectedOptionRadio, setSelectedOptionRadio] = useState('');
    const [input, setInput] = useState({
        buyerName: '',
        buyerLastName: '',
        buyerFather: '',
        remittanceNumber: '',
        date: '',
        price: '',
        remainingPrice: '',
        factory: '',
        isCompleted: '',
        description: ''
    });

    RouteService({ sandRemittanceId, setLoading, setSandRemittance });

    useEffect(() => {
        factory && setInput(prev => ({ ...prev, factory }));
    }, [factory]);

    useEffect(() => {
        sandRemittance && pasteData(sandRemittance);
    }, [sandRemittance]);

    useEffect(() => {
        if (sandRemittance) {
            priceRef.current.value && (priceRef.current.value = parseFloat(input.price).toLocaleString());
        }
    }, [sandRemittance, loadingEnd.current, loading]);

    useEffect(() => {
        if (sandRemittance) {
            remainingPriceRef.current.value && (remainingPriceRef.current.value = parseFloat(input.remainingPrice).toLocaleString());
        }
    }, [sandRemittance, loadingEnd.current, loading]);

    const pasteData = (sandRemittance) => {
        const { id, created_at, updated_at, ...remainingData } = sandRemittance;

        // تنظیم ورودی‌های فرم
        setInput({
            ...remainingData,
        });

        factoryRef.current && factoryRef.current.updateData(remainingData.factory);
        if (remainingPriceRef.current && remainingData.remainingPrice !== undefined) {
            const remainingPrice = Number(remainingData.remainingPrice);
            remainingPriceRef.current.innerHTML = remainingPrice.toLocaleString();
        }

        setSelectedOptionRadio(remainingData.isCompleted ? 'مانده' : 'تمام');

        // تنظیم تاریخ و زمان
        if (remainingData.date) {
            let [year, month, day] = remainingData.date.split("-");
            setDate({ day, month, year });
        }
        loadingEnd.current = true;
    };

    const handleSaveValInput = (e, input) => {
        let { value } = e.target;
        if (input == 'price' || input == 'remainingPrice') {
            value = value.replace(/,/g, '');
            if (input == 'price') {
                remainingPriceRef.current.classList.add('borderRedFB');
                remainingPriceError.current.innerHTML = 'هنگام ویرایش مبلغ حواله، لازم است مبلغ مانده را نیز اصلاح کنید.';
            }
        }

        if (input == 'isCompleted') {
            let message;
            if (value == 0) {
                message = 'آیا مطمعن هستید؟ \n چنانچه گزینه "تمام" را انتخاب کنید، مقدار باقیمانده حواله صفر می‌شود،  !! \n چنانچه از این کار مطمعن بودید به صورت خودکار مقدار مانده در توضیحات ثبت می‌شود.'
            } else {
                message = 'آیا مطمعن هستید؟ در این صورت باید مقدار مانده را اصلاح کنید';
            }

            swalForSaveValInput(message, value, input);
            return;
        }
        setInput(prev => ({ ...prev, [input]: value }));

    }

    const swalForSaveValInput = (message, value, input0) => {
        MySwal.fire({
            icon: "warning",
            title: "<span style='color:red'>هشدار</span>",
            text: message,
            confirmButtonText: " مطمعن هستم! ",
            showCancelButton: true,
            cancelButtonText: " خیر ",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
        }).then((result) => {
            if (result.isConfirmed) {
                if (value == 0) {
                    const NewDescription = `\n توجه: چون کاربر به صورت دستی گزینه 'تمام' را انتخاب کرده مقدار مانده قبلی حواله در زیر درج شده است \n ${Number(input.remainingPrice).toLocaleString()}`;
                    const description = input.description + NewDescription;
                    remainingPriceRef.current.innerHTML = 0;
                    setInput(prev => ({ ...prev, remainingPrice: 0, [input0]: value, description }));
                } else {
                    setInput(prev => ({ ...prev, [input0]: value }));
                }
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                if (value == 0) {
                    setSelectedOptionRadio('مانده');

                } else {
                    setSelectedOptionRadio('تمام');

                }
            }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.patch(
                `/api/v1/sandRemittances/${sandRemittanceId}`,
                { ...input },
                {
                    headers: {
                        'X-CSRF-TOKEN': token,
                        'Content-Type': 'application/json; charset=utf-8'
                    }
                }
            );

            form.current.reset();
            MySwal.fire({
                icon: "success",
                title: "با موفقیت ثبت شد",
                confirmButtonText: "متوجه شدم",
                timer: 3000,
                timerProgressBar: true,
                customClass: {
                    timerProgressBar: '--progressBarColorBlue',
                },
            });
        } catch (error) {
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

                    document.getElementById(key).classList.add('borderRedFB');
                    document.getElementById(key + 'Error').innerHTML = val;

                });
            }
        } finally {
            setLoading(false);
        }
    };


    return (
        <div>
            <HeadPage
                loading={loading}
                title='ویرایش حواله خرید شن‌وماسه'
                displayBtnAdd={true}
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
                                        {sandRemittanceId}
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
                                    value={input.buyerName || ''}
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
                                    value={input.buyerLastName || ''}
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
                                    value={input.buyerFather || ''}
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
                                    value={input.remittanceNumber || ''}
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
                                            value={date.day}
                                            onChange={(e) => handleSetDate(e, 'day', date, setDate, setInput, dayInputRef.current, daySelectRef.current)}
                                            onClick={(e) => clearInputError(e, dateError, false, true)}
                                            ref={daySelectRef}
                                        >
                                            <option value="">روز</option>
                                            {optionDays}
                                        </select>
                                        <select
                                            className="element"
                                            value={date.month}
                                            onChange={(e) => handleSetDate(e, 'month', date, setDate, setInput, monthInputRef.current, monthSelectRef.current)}
                                            onClick={(e) => clearInputError(e, dateError, false, true)}
                                            ref={monthSelectRef}
                                        >
                                            <option value="">ماه</option>
                                            {optionMonth}
                                        </select>
                                        <select
                                            className="element"
                                            value={date.year}
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
                                    defaultValue={input.price}
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

                        <div className="containerInputFB">
                            <div className="divInputFB">
                                <label htmlFor='remainingPrice'> مبلغ مانده </label>
                                <input
                                    type="text"
                                    id='remainingPrice'
                                    defaultValue={input.remainingPrice}
                                    className="inputTextUnitFB ltrFB element"
                                    onInput={e => {
                                        handleSaveValInput(e, 'remainingPrice');
                                        formatNub(remainingPriceRef.current);
                                    }}
                                    onFocus={e => clearInputError(e, remainingPriceError)}
                                    ref={remainingPriceRef}
                                />
                                <span
                                    className="unitFB"
                                    onClick={() => htmlFor('price')}
                                >
                                    تومان
                                </span>
                            </div>
                            <div
                                className="errorContainerFB elementError"
                                id='remainingPriceError'
                                ref={remainingPriceError}
                            >
                            </div>
                        </div>

                        <div className="containerInputFB">
                            <div className="divInputFB">
                                <label> وضعیت حواله </label>
                                <div className="divRadioFB">
                                    <label>
                                        <input
                                            type="radio"
                                            className='radioTrue_FB'
                                            value="1"
                                            checked={selectedOptionRadio === 'مانده'}
                                            onChange={e => {
                                                handleOptionRadioChange(e, setSelectedOptionRadio);
                                                handleSaveValInput(e, 'isCompleted');
                                            }}
                                        />
                                        <span className="trueLabel_FB">مانده</span>
                                    </label>

                                    <label className=''>
                                        <input
                                            type="radio"
                                            value="0"
                                            checked={selectedOptionRadio === 'تمام'}
                                            onChange={e => {
                                                handleOptionRadioChange(e, setSelectedOptionRadio);
                                                handleSaveValInput(e, 'isCompleted');
                                            }}
                                        />
                                        <span className="falseLabel_FB">تمام</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="sectionFB">
                        <div className="containerInputFB">
                            <div className="divInputFB">
                                <label htmlFor="description">توضیحات</label>
                                <textarea
                                    className="textareaFB element"
                                    id="description"
                                    value={input.description || ''}
                                    onInput={e => handleSaveValInput(e, 'description')}
                                />
                            </div>
                            <div className="errorContainerFB elementError"> </div>
                        </div>

                    </section>
                    <div className='sectionFB divBtnsFB' >
                        <Button
                            variant="info"
                            className="btnSaveFB"
                            onClick={handleSubmit}
                        >
                            ویرایش
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default Edit;