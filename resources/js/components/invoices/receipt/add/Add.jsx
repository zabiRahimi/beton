import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import DataZabi from "../../../hooks/DateZabi";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import SelectZabi from "../../../hooks/SelectZabi";
import SelectZabi2 from "../../../hooks/SelectZabi2";
import RouteService from "./RouteService";
import SearchDriversSelect from "../../searchSelectZabi/SearchDriversSelect";
import SearchCustomersSelect from "./searchSelectZabi/SearchCustomersSelect";
import HeadPage from '../HeadPage';
import {
    handleSetDate,
    htmlFor,
    formatNub,
    resetForm,
    handleTotalPriceCalculation,
    handleTotalFareCalculation
} from './Helper';

const Add = () => {
    const MySwal = withReactContent(Swal);
    const {
        optionDays,
        optionMonth,
        optionShortYears,
    } = DataZabi();

    const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    const form = useRef(null);
    const cutomer_idRef = useRef(null);
    const customer_idError = useRef(null);
    const dateRef = useRef(null);
    const dateError = useRef(null);
    const document_receivable_idRef = useRef(null);
    const document_receivable_idError = useRef(null);
    const priceRef = useRef(null);
    const priceError = useRef(null);
    const forRef = useRef(null);
    const forError = useRef(null);
    const how_to_payRef = useRef(null);
    const how_to_payError = useRef(null);
    const sand_remittance_idRef = useRef(null);
    const sand_remittance_idError = useRef(null);
    const cement_remittance_idRef = useRef(null);
    const cement_remittance_idError = useRef(null);
    const numberRef = useRef(null);
    const numberError = useRef(null);
    const bankRef = useRef(null);
    const bankError = useRef(null);
    const bank_branchRef = useRef(null);
    const bank_branchError = useRef(null);
    const date_checkRef = useRef(null);
    const date_checkError = useRef(null);
    const ownerRef = useRef(null);
    const ownerError = useRef(null);
    const descriptionRef = useRef(null);
    const descriptionError = useRef(null);
    const hasCalledGetSandSellers = useRef(false);
    const hasCalledGetSandStores = useRef(false);
    const [loading, setLoading] = useState(true);


    const [ticketNumber, setTicketNumber] = useState('');
    const [customer_id, setCustomer_id] = useState('');
    const [how_to_pay, setHow_to_pay] = useState('');
    const [checkIsSelected, setCheckIsSelected] = useState(false);
    const [documentReceivableDisplay, setDocumentReceivableDisplay] = useState(false);
    const [payType, setPayType] = useState(
        {
            display: false,
            dateLabel: '',
            numberLabel: '',
            ownerLabel: ''
        }
    );

    const [date, setDate] = useState({
        day: '',
        month: '',
        year: ''
    });

    const [date_check, setDate_check] = useState({
        day: '',
        month: '',
        year: ''
    });



    const [input, setInput] = useState({
        customer_id: '',
        date: '',
        document_receivable_id: '',
        price: '',
        for: '',//بابت خرید...
        how_to_pay: '',//نحوه پرداخت
        sand_remittance_id: '',
        cement_remittance_id: '',
        isDocument: 0,
        isSandRemittance: 0,
        isCementRemittance: 0,
        number: '',//شماره چک، شماره کارت، شماره حساب
        bank: '',
        bank_branch: '',
        date_check: '',
        owner: '',//صاحب چک، صاحب حساب یا کارت دریافت کننده
        description: ''
    });

    useEffect(() => {
        if (customer_id) {
            setInput(prev => ({ ...prev, customer_id }));
        }
    }, [customer_id]);

    useEffect(() => {
        if (how_to_pay) {
            setCheckIsSelected(how_to_pay == 'وصول چک' ? true : false);
            how_to_pay == 'کارت به کارت' && setPayType({
                display: true,
                dateLabel: 'تاریخ پرداخت',
                numberLabel: 'شماره کارت مقصد',
                ownerLabel: 'صاحب کارت مقصد'

            });
            how_to_pay == 'واریز به حساب' && setPayType({
                display: true,
                dateLabel: 'تاریخ پرداخت',
                numberLabel: '',
                ownerLabel: ''

            })
            setInput(prev => ({ ...prev, how_to_pay }));
        }
    }, [how_to_pay]);

    const { customerOptions, dataCustomers, how_to_payOptions, documentReceivableOptions, } = RouteService({ setLoading, setTicketNumber, checkIsSelected, setDocumentReceivableDisplay, setPayType });
    const { inputCustomerSearch, optionsCustomersSearched, customerSearchWarning, elementCustomerSearchWarning, handleClearAllSearchCustomer } = SearchCustomersSelect({ dataCustomers });



    // const { inputDriverSearch, optionsDriversSearched, driverSearchWarning, elementDriverSearchWarning, handleClearAllSearchDriver } = SearchDriversSelect({ dataDrivers: drivers });



    const handleSaveValInput = (e, input) => {
        let { value } = e.target;
        if (['weight', 'unitPrice', 'unitFare'].includes(input)) {
            value = value.replace(/,/g, '');
        }
        setInput(prev => ({ ...prev, [input]: value }));
    }

    const clearInputError = (e, refErr, time = false, date = false) => {
        e.target.classList.remove('borderRedFB');
        refErr.current && (refErr.current.innerHTML = '');
        const parentWithClass = e.target.closest('.borderRedFB');
        parentWithClass && parentWithClass.classList.remove('borderRedFB');
        date && dateRef.current.classList.remove('borderRedFB');
        time && timeRef.current.classList.remove('borderRedFB');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post(
                '/api/v1/sandInvoices',
                { ...input },
                {
                    headers:
                    {
                        'X-CSRF-TOKEN': token,
                        'Content-Type': 'application/json; charset=utf-8'
                    }
                }
            );

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

                didClose: () => resetForm(
                    setInput,
                    setDate,
                    setTime,
                    setSandRemittance_id,
                    sandRemittance_idRef.current,
                    setSandTypeSelected,
                    sandTypeRef.current,
                    totalPriceRef.current,
                    setDumpTruckId,
                    setDumpTruckOwnerId,
                    dumpTruckRef.current,
                    setDrvierId,
                    driverRef.current,
                    totalFareRef.current,
                    setSandStoreId,
                    sandStoreRef.current,
                ),
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
                    // نادیده گرفتن خطای مربوط به remainingPrice
                    if (key !== 'totalPrice' && key !== 'dumpTruckOwner_id' && key !== 'totalFare') {
                        document.getElementById(key).classList.add('borderRedFB');
                        document.getElementById(key + 'Error').innerHTML = val;
                    }
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
                title='ثبت رسید دریافت'
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
                    <section className="sectionFB">
                        <div className="containerInputFB">
                            <div className="divInputFB">
                                <label> مشتری </label>
                                <div
                                    id='customer_id'
                                    className="element"
                                    onClick={e => { clearInputError(e, customer_idError) }}
                                >
                                    <SelectZabi2
                                        primaryLabel='انتخاب'
                                        options={customerOptions}
                                        saveOption={setCustomer_id}
                                        input={inputCustomerSearch}
                                        optionsSearched={optionsCustomersSearched}
                                        warning={customerSearchWarning}
                                        elementWarning={elementCustomerSearchWarning}
                                        clearSearch={handleClearAllSearchCustomer}
                                        ref={cutomer_idRef}
                                    />
                                </div>
                                <i className="icofont-ui-rating starFB" />
                            </div>
                            <div className="errorContainerFB elementError" id='customer_idError' ref={customer_idError}> </div>
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
                                            value={date.day || ''}
                                            onInput={(e) => handleSetDate(e, 'day', date, setDate, setInput)}
                                            onFocus={(e) => clearInputError(e, dateError, false, true)}
                                        />
                                        <span>/</span>
                                        <input
                                            type="text"
                                            className="inputTextDateACus inputMonthTDACus element"
                                            placeholder="1"
                                            value={date.month || ''}
                                            onInput={(e) => handleSetDate(e, 'month', date, setDate, setInput)}
                                            onFocus={(e) => clearInputError(e, dateError, false, true)}
                                        />
                                        <span>/</span>
                                        <input
                                            type="text"
                                            className="inputTextDateACus inputYearTDACus element"
                                            placeholder="1300"
                                            value={date.year || ''}
                                            onInput={(e) => { handleSetDate(e, 'year', date, setDate, setInput) }}
                                            onFocus={(e) => clearInputError(e, dateError, false, true)}
                                        />
                                        <i className="icofont-ui-rating starFB" />
                                    </div>

                                    <div className="divDownDateAcus" >
                                        <select
                                            className="element"
                                            value={date.day || ''}
                                            onChange={(e) => handleSetDate(e, 'day', date, setDate, setInput)}
                                            onClick={(e) => clearInputError(e, dateError, false, true)}
                                        >
                                            <option value="">روز</option>
                                            {optionDays}
                                        </select>
                                        <select
                                            className="element"
                                            value={date.month || ''}
                                            onChange={(e) => handleSetDate(e, 'month', date, setDate, setInput)}
                                            onClick={(e) => clearInputError(e, dateError, false, true)}
                                        >
                                            <option value="">ماه</option>
                                            {optionMonth}
                                        </select>
                                        <select
                                            className="element"
                                            value={date.year || ''}
                                            onChange={(e) => { handleSetDate(e, 'year', date, setDate, setInput) }}
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
                                <label htmlFor="price">مبلغ</label>
                                <input
                                    type="text"
                                    className="inputTextUnitFB ltrFB element"
                                    id="price"
                                    name='price'
                                    onInput={e => {
                                        handleSaveValInput(e);
                                        formatNub(priceRef.current);
                                        handleTotalPriceCalculation(e, 'unitPrice', input, setInput, totalPriceRef.current)
                                    }}
                                    onFocus={e => clearInputError(e, priceError)}
                                    ref={priceRef}
                                />
                                <span
                                    className="unitFB"
                                    onClick={() => htmlFor('unitPrice')}
                                >
                                    تومان
                                </span>
                                <i className="icofont-ui-rating starFB" />
                            </div>
                            <div className="errorContainerFB elementError" id="priceError" ref={priceError}> </div>
                        </div>

                        <div className="containerInputFB">
                            <div className="divInputFB">
                                <label htmlFor="for">بابت</label>
                                <input
                                    type="text"
                                    className="inputTextFB element"
                                    id="for"
                                    name='for'
                                    defaultValue={input.for}
                                    onInput={e => handleSaveValInput(e)}
                                    onFocus={e => clearInputError(e, forError)}
                                    ref={forRef}
                                />
                                <i className="icofont-ui-rating starFB" />
                            </div>
                            <div className="errorContainerFB elementError" id="forError" ref={forError}> </div>
                        </div>
                    </section>
                    <section className="sectionFB">
                        <div className="containerInputFB">
                            <div className="divInputFB">
                                <label>نحوه پرداخت</label>
                                <div
                                    id='how_to_pay'
                                    className="element"
                                    onClick={e => { clearInputError(e, how_to_payError) }}
                                >
                                    <SelectZabi
                                        primaryLabel='انتخاب'
                                        options={how_to_payOptions}
                                        saveOption={setHow_to_pay}
                                        ref={how_to_payRef}
                                    />
                                </div>
                                <i className="icofont-ui-rating starFB" />
                            </div>
                            <div className="errorContainerFB elementError" id='how_to_payError' ref={how_to_payError}> </div>
                        </div>
                        {
                            documentReceivableDisplay ?
                                ''
                                : payType.display &&
                                <>
                                    <div className="containerInputFB">
                                        <div className="divInputFB ">
                                            <label htmlFor="day"> {payType.dateLabel} </label>
                                            <div className="divDateBirth">
                                                <div className="divUpDateAcus element" ref={date_checkRef} id='date'
                                                >
                                                    <input
                                                        type="text"
                                                        className="inputTextDateACus inputDayTDACus element"
                                                        placeholder="1"
                                                        id="day"
                                                        value={date_check.day || ''}
                                                        onInput={(e) => handleSetDate(e, 'day', date_check, setDate, setInput)}
                                                        onFocus={(e) => clearInputError(e, date_checkError, false, true)}
                                                    />
                                                    <span>/</span>
                                                    <input
                                                        type="text"
                                                        className="inputTextDateACus inputMonthTDACus element"
                                                        placeholder="1"
                                                        value={date_check.month || ''}
                                                        onInput={(e) => handleSetDate(e, 'month', date_check, setDate, setInput)}
                                                        onFocus={(e) => clearInputError(e, date_checkError, false, true)}
                                                    />
                                                    <span>/</span>
                                                    <input
                                                        type="text"
                                                        className="inputTextDateACus inputYearTDACus element"
                                                        placeholder="1300"
                                                        value={date_check.year || ''}
                                                        onInput={(e) => { handleSetDate(e, 'year', date_check, setDate, setInput) }}
                                                        onFocus={(e) => clearInputError(e, date_checkError, false, true)}
                                                    />
                                                    <i className="icofont-ui-rating starFB" />
                                                </div>

                                                <div className="divDownDateAcus" >
                                                    <select
                                                        className="element"
                                                        value={date_check.day || ''}
                                                        onChange={(e) => handleSetDate(e, 'day', date_check, setDate, setInput)}
                                                        onClick={(e) => clearInputError(e, date_checkError, false, true)}
                                                    >
                                                        <option value="">روز</option>
                                                        {optionDays}
                                                    </select>
                                                    <select
                                                        className="element"
                                                        value={date_check.month || ''}
                                                        onChange={(e) => handleSetDate(e, 'month', date_check, setDate, setInput)}
                                                        onClick={(e) => clearInputError(e, date_checkError, false, true)}
                                                    >
                                                        <option value="">ماه</option>
                                                        {optionMonth}
                                                    </select>
                                                    <select
                                                        className="element"
                                                        value={date_check.year || ''}
                                                        onChange={(e) => { handleSetDate(e, 'year', date_check, setDate, setInput) }}
                                                        onClick={(e) => clearInputError(e, date_checkError, false, true)}
                                                    >
                                                        <option value="">سال</option>
                                                        {optionShortYears}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="errorContainerFB elementError" id='date_checkError' ref={date_checkError}> </div>
                                    </div>
                                    <div className="containerInputFB">
                                        <div className="divInputFB">
                                            <label htmlFor="number">{payType.numberLabel}</label>
                                            <input
                                                type="text"
                                                className="inputTextFB ltrFB element"
                                                id="number"
                                                name='number'
                                                onInput={e => {
                                                    handleSaveValInput(e);

                                                }}
                                                onFocus={e => clearInputError(e, numberError)}
                                                ref={numberRef}
                                            />
                                        </div>
                                        <div className="errorContainerFB elementError" id="numberError" ref={numberError}> </div>
                                    </div>

                                    <div className="containerInputFB">
                                        <div className="divInputFB">
                                            <label htmlFor="owner">{payType.ownerLabel}</label>
                                            <input
                                                type="text"
                                                className="inputTextFB element"
                                                id="owner"
                                                name='owner'

                                                onInput={e => handleSaveValInput(e)}
                                                onFocus={e => clearInputError(e, ownerError)}
                                                ref={ownerRef}
                                            />
                                            <i className="icofont-ui-rating starFB" />
                                        </div>
                                        <div className="errorContainerFB elementError" id="ownerError" ref={ownerError}> </div>
                                    </div>

                                    <div className="containerInputFB">
                                        <div className="divInputFB">
                                            <label htmlFor="bank">بانک</label>
                                            <input
                                                type="text"
                                                className="inputTextFB element"
                                                id="bank"
                                                name='bank'
                                                defaultValue={input.for}
                                                onInput={e => handleSaveValInput(e)}
                                                onFocus={e => clearInputError(e, bankError)}
                                                ref={bankRef}
                                            />
                                            <i className="icofont-ui-rating starFB" />
                                        </div>
                                        <div className="errorContainerFB elementError" id="bankError" ref={bankError}> </div>
                                    </div>

                                    <div className="containerInputFB">
                                        <div className="divInputFB">
                                            <label htmlFor="band_branch">شعبه</label>
                                            <input
                                                type="text"
                                                className="inputTextFB element"
                                                id="band_branch"
                                                name='band_branch'
                                                defaultValue={input.for}
                                                onInput={e => handleSaveValInput(e)}
                                                onFocus={e => clearInputError(e, bank_branchError)}
                                                ref={bank_branchRef}
                                            />
                                            <i className="icofont-ui-rating starFB" />
                                        </div>
                                        <div className="errorContainerFB elementError" id="bank_branchError" ref={bank_branchError}> </div>
                                    </div>
                                </>
                        }

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
                            onClick={() => resetForm(
                                setInput,
                                setDate,
                                setTime,
                                setSandRemittance_id,
                                sandRemittance_idRef.current,
                                setSandTypeSelected,
                                sandTypeRef.current,
                                totalPriceRef.current,
                                setDumpTruckId,
                                setDumpTruckOwnerId,
                                dumpTruckRef.current,
                                setDrvierId,
                                driverRef.current,
                                totalFareRef.current,
                                setSandStoreId,
                                sandStoreRef.current,
                            )}

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