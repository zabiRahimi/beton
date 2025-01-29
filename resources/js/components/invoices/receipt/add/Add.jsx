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
import SearchCustomersSelect from "./searchSelectZabi/SearchCustomersSelect";
import HeadPage from '../HeadPage';
import {
    handleSetDate,
    htmlFor,
    formatNub,
    resetForm,
} from './Helper';
import SearchDocumentsAndRemittancesSelect from './searchSelectZabi/SearchDocumentsAndRemittancesSelect';

const Add = () => {
    const MySwal = withReactContent(Swal);
    const {
        optionDays,
        optionMonth,
        optionShortYears,
    } = DataZabi();

    const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    const form = useRef(null);
    const customer_idRef = useRef(null);
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
    const [sandIsSelected, setSandIsSelected] = useState(false);
    const [cementIsSelected, setCementIsSelected] = useState(false);
    const [documentReceivableDisplay, setDocumentReceivableDisplay] = useState(false);
    const [sandRemittanceDisplay, setSandRemittanceDisplay] = useState(false);
    const [cementRemittanceDisplay, setCementRemittanceDisplay] = useState(false);

    const [document_receivable_id, setDocument_receivable_id] = useState('');
    const [sand_remittance_id, setSand_remittance_id] = useState('');
    const [cement_remittance_id, setCement_remittance_id] = useState('');

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
        price: '',
        for: '',//بابت خرید...
        how_to_pay: '',//نحوه پرداخت
        isDocument: 0,
        isSandRemittance: 0,
        isCementRemittance: 0,
        document_receivable_id: '',
        sand_remittance_id: '',
        cement_remittance_id: '',
        date_check: '',//تاریخ چک، تاریخ کارت به کارت، تاریخ واریزی به حساب
        number: '',//شماره چک، شماره کارت، شماره حساب
        owner: '',//صاحب چک، صاحب حساب یا کارت دریافت کننده
        bank: '',
        bank_branch: '',
        description: ''
    });

    useEffect(() => {
        if (customer_id) {
            setInput(prev => ({ ...prev, customer_id }));
        }
    }, [customer_id]);

    useEffect(() => {
        if (document_receivable_id) {
            setInput(prev => ({ ...prev, document_receivable_id }));
        }
    }, [document_receivable_id]);

    useEffect(() => {
        if (sand_remittance_id) {
            setInput(prev => ({ ...prev, sand_remittance_id }));
        }
    }, [sand_remittance_id]);

    useEffect(() => {
        if (cement_remittance_id) {
            setInput(prev => ({ ...prev, cement_remittance_id }));
        }
    }, [cement_remittance_id]);

    const paymentOptions = {
        'کارت به کارت': {
            display: true,
            dateLabel: 'تاریخ پرداخت',
            numberLabel: 'شماره کارت مقصد',
            ownerLabel: 'صاحب کارت مقصد'
        },
        'واریز به حساب': {
            display: true,
            dateLabel: 'تاریخ پرداخت',
            numberLabel: 'شماره حساب',
            ownerLabel: 'صاحب حساب'
        },
        'پول نقد': {
            display: false,
            dateLabel: '',
            numberLabel: '',
            ownerLabel: ''
        },
        'سایر': {
            display: false,
            dateLabel: '',
            numberLabel: '',
            ownerLabel: ''
        },
        'حواله سیمان': {
            display: true,
            dateLabel: 'تاریخ حواله',
            numberLabel: 'شماره حواله',
            ownerLabel: 'خریدار حواله'
        },
        'حواله شن و ماسه': {
            display: true,
            dateLabel: 'تاریخ حواله',
            numberLabel: 'شماره حواله',
            ownerLabel: 'خریدار حواله'
        }
    };

    useEffect(() => {
        if (how_to_pay) {
            setDocumentReceivableDisplay(false);
            setSandRemittanceDisplay(false);
            setCementRemittanceDisplay(false);
            setCheckIsSelected(how_to_pay === 'وصول چک');
            setSandIsSelected(how_to_pay === 'حواله شن و ماسه');
            setCementIsSelected(how_to_pay === 'حواله سیمان');
            const payTypeConfig = paymentOptions[how_to_pay];
            if (payTypeConfig) {
                setPayType(payTypeConfig);
            }
            setInput(prev => ({
                ...prev,
                how_to_pay,
                document_receivable_id: '',
                sand_remittance_id: '',
                cement_remittance_id: '',
                isDocument: 0,
                isCementRemittance: 0,
                isSandRemittance: 0,
                date_check: '',
                owner: '',
                number: '',
                bank: '',
                bank_branch: '',
            }));
            setDate_check({
                day: '',
                month: '',
                year: ''
            });
            setHow_to_pay('');
            const elements = document.getElementsByClassName('elementRemittance');
            for (var i = 0; i < elements.length; i++) {
                elements[i].classList.remove('borderRedFB');
                elements[i].value= '';
            }
            const errorElements = document.getElementsByClassName('errorRemittance');
            for (var i = 0; i < errorElements.length; i++) {
                errorElements[i].innerHTML = '';
            }
        }
    }, [how_to_pay]);

    useEffect(() => {
        if (document_receivable_id) {
            setInput(prev => ({ ...prev, document_receivable_id }));
        }
    }, [document_receivable_id]);

    useEffect(() => {
        if (sand_remittance_id) {
            setInput(prev => ({ ...prev, sand_remittance_id }));
        }
    }, [sand_remittance_id]);

    useEffect(() => {
        if (cement_remittance_id) {
            setInput(prev => ({ ...prev, cement_remittance_id }));
        }
    }, [cement_remittance_id]);

    const {
        customerOptions,
        dataCustomers,
        how_to_payOptions,
        documentReceivableOptions,
        dataDocumentReceivables,
        sandRemittanceOptions,
        dataSandRemittances,
        cementRemittanceOptions,
        dataCementRemittances,

    } = RouteService({
        setLoading,
        setTicketNumber,
        checkIsSelected,
        setCheckIsSelected,
        sandIsSelected,
        setSandIsSelected,
        cementIsSelected,
        setCementIsSelected,
        setDocumentReceivableDisplay,
        setSandRemittanceDisplay,
        setCementRemittanceDisplay,
        setPayType,
        setInput
    });

    const { inputCustomerSearch, optionsCustomersSearched, customerSearchWarning, elementCustomerSearchWarning, handleClearAllSearchCustomer } = SearchCustomersSelect({ dataCustomers });

    const {
        inputDoReSearch: inputCheckSearch,
        optionsDoReSearched: optionsCheckSearched,
        doReSearchWarning: checkSearchWarning,
        elementDoReSearchWarning: elementCheckSearchWarning,
        handleClearAllSearchDoRe: handleClearAllSearchCheck
    } = SearchDocumentsAndRemittancesSelect({
        dataDoRes: dataDocumentReceivables,
        type: 'check'
    });

    const {
        inputDoReSearch: inputSandRemittanceSearch,
        optionsDoReSearched: optionsSandRemittancesSearched,
        doReSearchWarning: sandRemittanceSearchWarning,
        elementDoReSearchWarning: elementSandRemittanceSearchWarning,
        handleClearAllSearchDoRe: handleClearAllSearchSandRemittance
    } = SearchDocumentsAndRemittancesSelect({
        dataDoRes: dataSandRemittances,
        type: 'remittance'
    });

    const {
        inputDoReSearch: inputCementRemittanceSearch,
        optionsDoReSearched: optionsCementRemittanceSearched,
        doReSearchWarning: cementRemittanceSearchWarning,
        elementDoReSearchWarning: elementCementRemittanceSearchWarning,
        handleClearAllSearchDoRe: handleClearAllSearchCementRemittance
    } = SearchDocumentsAndRemittancesSelect({
        dataDoRes: dataCementRemittances,
        type: 'remittance'
    });

    const handleSaveValInput = (e) => {
        let { value, name } = e.target;
        if (name == 'price') {
            value = value.replace(/,/g, '');
        }
        setInput(prev => ({ ...prev, [name]: value }));
    }

    const clearInputError = (e, refErr, date = false) => {
        e.target.classList.remove('borderRedFB');
        refErr.current && (refErr.current.innerHTML = '');
        const parentWithClass = e.target.closest('.borderRedFB');
        parentWithClass && parentWithClass.classList.remove('borderRedFB');
        date && dateRef.current.classList.remove('borderRedFB');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post(
                '/api/v1/receipts',
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
                    setCustomer_id,
                    customer_idRef.current,
                    setDate,
                    setHow_to_pay,
                    how_to_payRef.current,
                    setDocument_receivable_id,
                    document_receivable_idRef.current,
                    setSand_remittance_id,
                    sand_remittance_idRef.current,
                    setCement_remittance_id,
                    cement_remittance_idRef.current,
                    setDate_check,
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
                                        ref={customer_idRef}
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
                                            name='day'
                                            value={date.day || ''}
                                            onInput={(e) => handleSetDate(e, date, setDate, '', '', setInput)}
                                            onFocus={(e) => clearInputError(e, dateError, true)}
                                        />
                                        <span>/</span>
                                        <input
                                            type="text"
                                            className="inputTextDateACus inputMonthTDACus element"
                                            placeholder="1"
                                            name='month'
                                            value={date.month || ''}
                                            onInput={(e) => handleSetDate(e, date, setDate, '', '', setInput)}
                                            onFocus={(e) => clearInputError(e, dateError, true)}
                                        />
                                        <span>/</span>
                                        <input
                                            type="text"
                                            className="inputTextDateACus inputYearTDACus element"
                                            placeholder="1300"
                                            name='year'
                                            value={date.year || ''}
                                            onInput={(e) => { handleSetDate(e, date, setDate, '', '', setInput) }}
                                            onFocus={(e) => clearInputError(e, dateError, true)}
                                        />
                                        <i className="icofont-ui-rating starFB" />
                                    </div>

                                    <div className="divDownDateAcus" >
                                        <select
                                            className="element"
                                            name='day'
                                            value={date.day || ''}
                                            onChange={(e) => handleSetDate(e, date, setDate, '', '', setInput)}
                                            onClick={(e) => clearInputError(e, dateError, true)}
                                        >
                                            <option value="">روز</option>
                                            {optionDays}
                                        </select>
                                        <select
                                            className="element"
                                            name='month'
                                            value={date.month || ''}
                                            onChange={(e) => handleSetDate(e, date, setDate, '', '', setInput)}
                                            onClick={(e) => clearInputError(e, dateError, true)}
                                        >
                                            <option value="">ماه</option>
                                            {optionMonth}
                                        </select>
                                        <select
                                            className="element"
                                            name='year'
                                            value={date.year || ''}
                                            onChange={(e) => { handleSetDate(e, date, setDate, '', '', setInput) }}
                                            onClick={(e) => clearInputError(e, dateError, true)}
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
                                    onClick={e => { clearInputError(e, how_to_payError); }}
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
                            (documentReceivableDisplay || sandRemittanceDisplay || cementRemittanceDisplay) ?
                                <>
                                    {
                                        documentReceivableDisplay &&
                                        <div className="containerInputFB">
                                            <div className="divInputFB">
                                                <label> چک </label>
                                                <div
                                                    id='document_receivable_id'
                                                    className="element elementRemittance"
                                                    onClick={e => { clearInputError(e, document_receivable_idError); }}
                                                >
                                                    <SelectZabi2
                                                        primaryLabel='انتخاب'
                                                        options={documentReceivableOptions}
                                                        saveOption={setDocument_receivable_id}
                                                        input={inputCheckSearch}
                                                        optionsSearched={optionsCheckSearched}
                                                        warning={checkSearchWarning}
                                                        elementWarning={elementCheckSearchWarning}
                                                        clearSearch={handleClearAllSearchCheck}
                                                        ref={document_receivable_idRef}
                                                    />
                                                </div>
                                                <i className="icofont-ui-rating starFB" />
                                            </div>
                                            <div className="errorContainerFB elementError errorRemittance" id='document_receivable_idError' ref={document_receivable_idError}> </div>
                                        </div>
                                    }

                                    {
                                        sandRemittanceDisplay &&
                                        <div className="containerInputFB">
                                            <div className="divInputFB">
                                                <label> حواله شن و ماسه </label>
                                                <div
                                                    id='sand_remittance_id'
                                                    className="element elementRemittance"
                                                    onClick={e => { clearInputError(e, sand_remittance_idError) }}
                                                >
                                                    <SelectZabi2
                                                        primaryLabel='انتخاب'
                                                        options={sandRemittanceOptions}
                                                        saveOption={setSand_remittance_id}
                                                        input={inputSandRemittanceSearch}
                                                        optionsSearched={optionsSandRemittancesSearched}
                                                        warning={sandRemittanceSearchWarning}
                                                        elementWarning={elementSandRemittanceSearchWarning}
                                                        clearSearch={handleClearAllSearchSandRemittance}
                                                        ref={sand_remittance_idRef}
                                                    />
                                                </div>
                                                <i className="icofont-ui-rating starFB" />
                                            </div>
                                            <div className="errorContainerFB elementError errorRemittance" id='sand_remittance_idError' ref={sand_remittance_idError}> </div>
                                        </div>
                                    }

                                    {
                                        cementRemittanceDisplay &&
                                        <div className="containerInputFB">
                                            <div className="divInputFB">
                                                <label> حواله سیمان </label>
                                                <div
                                                    id='cement_remittance_id'
                                                    className="element elementRemittance"
                                                    onClick={e => { clearInputError(e, cement_remittance_idError) }}
                                                >
                                                    <SelectZabi2
                                                        primaryLabel='انتخاب'
                                                        options={cementRemittanceOptions}
                                                        saveOption={setCement_remittance_id}
                                                        // input={inputCustomerSearch}
                                                        // optionsSearched={optionsCustomersSearched}
                                                        // warning={customerSearchWarning}
                                                        // elementWarning={elementCustomerSearchWarning}
                                                        // clearSearch={handleClearAllSearchCustomer}
                                                        ref={cement_remittance_idRef}
                                                    />
                                                </div>
                                                <i className="icofont-ui-rating starFB" />
                                            </div>
                                            <div className="errorContainerFB elementError errorRemittance" id='cement_remittance_idError' ref={cement_remittance_idError}> </div>
                                        </div>
                                    }
                                </>



                                : payType.display &&
                                <>
                                    <div className="containerInputFB">
                                        <div className="divInputFB ">
                                            <label htmlFor="day"> {payType.dateLabel} </label>
                                            <div className="divDateBirth">
                                                <div className="divUpDateAcus element elementRemittance" ref={date_checkRef} id='date_check'
                                                >
                                                    <input
                                                        type="text"
                                                        className="inputTextDateACus inputDayTDACus element"
                                                        placeholder="1"
                                                        name='day'
                                                        value={date_check.day || ''}
                                                        onInput={
                                                            (e) => {
                                                                handleSetDate(e, '', '', date_check, setDate_check, setInput);
                                                            }
                                                        }
                                                        onFocus={(e) => clearInputError(e, date_checkError, true)}
                                                    />
                                                    <span>/</span>
                                                    <input
                                                        type="text"
                                                        className="inputTextDateACus inputMonthTDACus element"
                                                        placeholder="1"
                                                        name='month'
                                                        value={date_check.month || ''}
                                                        onInput={(e) => handleSetDate(e, '', '', date_check, setDate_check, setInput)}
                                                        onFocus={(e) => clearInputError(e, date_checkError, true)}
                                                    />
                                                    <span>/</span>
                                                    <input
                                                        type="text"
                                                        className="inputTextDateACus inputYearTDACus element"
                                                        placeholder="1300"
                                                        name='year'
                                                        value={date_check.year || ''}
                                                        onInput={(e) => { handleSetDate(e, '', '', date_check, setDate_check, setInput) }}
                                                        onFocus={(e) => clearInputError(e, date_checkError, true)}
                                                    />
                                                </div>

                                                <div className="divDownDateAcus" >
                                                    <select
                                                        className="element"
                                                        name='day'
                                                        value={date_check.day || ''}
                                                        onChange={(e) => handleSetDate(e, '', '', date_check, setDate_check, setInput)}
                                                        onClick={(e) => clearInputError(e, date_checkError, true)}
                                                    >
                                                        <option value="">روز</option>
                                                        {optionDays}
                                                    </select>
                                                    <select
                                                        className="element"
                                                        name='month'
                                                        value={date_check.month || ''}
                                                        onChange={e => handleSetDate(e, '', '', date_check, setDate_check, setInput)}
                                                        onClick={e => clearInputError(e, date_checkError, true)}
                                                    >
                                                        <option value="">ماه</option>
                                                        {optionMonth}
                                                    </select>
                                                    <select
                                                        className="element"
                                                        name='year'
                                                        value={date_check.year || ''}
                                                        onChange={e => handleSetDate(e, '', '', date_check, setDate_check, setInput)}
                                                        onClick={e => clearInputError(e, date_checkError, true)}
                                                    >
                                                        <option value="">سال</option>
                                                        {optionShortYears}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="errorContainerFB elementError errorRemittance" id='date_checkError' ref={date_checkError}> </div>
                                    </div>
                                    <div className="containerInputFB">
                                        <div className="divInputFB">
                                            <label htmlFor="number">{payType.numberLabel}</label>
                                            <input
                                                type="text"
                                                className="inputTextFB ltrFB element elementRemittance"
                                                id="number"
                                                name='number'
                                                onInput={e => handleSaveValInput(e)}
                                                onFocus={e => clearInputError(e, numberError)}
                                                ref={numberRef}
                                            />
                                        </div>
                                        <div className="errorContainerFB elementError errorRemittance" id="numberError" ref={numberError}> </div>
                                    </div>

                                    <div className="containerInputFB">
                                        <div className="divInputFB">
                                            <label htmlFor="owner">{payType.ownerLabel}</label>
                                            <input
                                                type="text"
                                                className="inputTextFB element elementRemittance"
                                                id="owner"
                                                name='owner'
                                                onInput={e => handleSaveValInput(e)}
                                                onFocus={e => clearInputError(e, ownerError)}
                                                ref={ownerRef}
                                            />
                                        </div>
                                        <div className="errorContainerFB elementError errorRemittance" id="ownerError" ref={ownerError}> </div>
                                    </div>

                                    {
                                        payType.numberLabel !== 'شماره حواله' &&
                                        <>
                                            <div className="containerInputFB">
                                                <div className="divInputFB">
                                                    <label htmlFor="bank">بانک</label>
                                                    <input
                                                        type="text"
                                                        className="inputTextFB element elementRemittance"
                                                        id="bank"
                                                        name='bank'
                                                        onInput={e => handleSaveValInput(e)}
                                                        onFocus={e => clearInputError(e, bankError)}
                                                        ref={bankRef}
                                                    />
                                                </div>
                                                <div className="errorContainerFB elementError errorRemittance" id="bankError" ref={bankError}> </div>
                                            </div>

                                            <div className="containerInputFB">
                                                <div className="divInputFB">
                                                    <label htmlFor="bank_branch">شعبه</label>
                                                    <input
                                                        type="text"
                                                        className="inputTextFB element elementRemittance"
                                                        id="bank_branch"
                                                        name='bank_branch'
                                                        onInput={e => handleSaveValInput(e)}
                                                        onFocus={e => clearInputError(e, bank_branchError)}
                                                        ref={bank_branchRef}
                                                    />
                                                </div>
                                                <div className="errorContainerFB elementError errorRemittance" id="bank_branchError" ref={bank_branchError}> </div>
                                            </div>
                                        </>
                                    }
                                </>
                        }

                    </section>
                    <section className="sectionFB">
                        <div className="containerInput100FB">
                            <div className="divInput100FB">
                                <label> توضیحات </label>
                                <textarea
                                    className="textarea100FB descriptionFB element"
                                    id="description"
                                    name='description'
                                    onInput={e => handleSaveValInput(e)}
                                    onFocus={(e) => clearInputError(e, descriptionError)}

                                />
                            </div>
                            <div className="errorContainerFB elementError" id='descriptionError' ref={descriptionError}> </div>
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