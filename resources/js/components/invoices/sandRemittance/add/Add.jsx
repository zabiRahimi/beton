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
import { handleSetDate, htmlFor, formatNub } from './Helper';
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
    const dayInputRef = useRef(null);
    const daySelectRef = useRef(null);

    const monthInputRef = useRef(null);
    const monthSelectRef = useRef(null);

    const yearInputRef = useRef(null);
    const yearSelectRef = useRef(null);

    const factoryRef = useRef(null);
    const factoryError = useRef(null);
    const buyerNameError = useRef(null);
    const buyerLastNameError = useRef(null);
    const buyerFatherError = useRef(null);
    const remittanceNumberError = useRef(null);
    const dateRef = useRef(null);
    const dateError = useRef(null);
    const amountRef = useRef(null);
    const amountError = useRef(null);
    const [loading, setLoading] = useState(false);
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
        factory && setInput(prev => ({ ...prev, factory }));
    }, [factory]);


    const handleSaveValInput = (e, input) => {
        let { value } = e.target;
        if (input == 'amount') {
            value = value.replace(/,/g, '');
        }
        setInput(prev => ({ ...prev, [input]: value }));
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

    const resetForm = (apply = true) => {
        setInvoice([sampleInvoice]);
        setInput({
            customer_id: '',
            invoice: [{
                date: '',
                time: '',
                weight: '',
                cubicMeters: "",
                concrete_id: '',
                truck_id: '',
                ownerId: '',
                driver_id: '',
                cementStore_id: '',
                unitPrice: '',
                totalPrice: '',
                fare: '',
                maskanMeli: '',
                vahed: '',
                address: '',
                concretingPosition: ''
            }],
        });

        setCustomerId('');
        setConcreteId('');
        setTruckId('');
        setOwnerId('');
        setDriverId('');
        setCementStoreId('');
        setCheckedMaskanMeli();

        setTime({
            second: '',
            minute: '',
            hour: ''
        });

        setDate({
            day: '',
            month: '',
            year: ''
        });

        setUnitPrice('');
        setFare('');

        setCheckedValue('');
        setMaskan(['']);

        setVahed('');
        setAddress('');
        setConcretingPosition('');

        refInvoice[`cubicMeters0`].current.innerHTML = '0';

        refInvoice[`totalPrice0`].current.innerHTML = '0';

        refCustomer_id.current.updateData('انتخاب');
        refInvoice[`concrete_id0`].current.updateData('انتخاب');
        refInvoice[`cementStore_id0`].current.updateData('انتخاب');
        refInvoice[`truck_id0`].current.updateData('انتخاب');
        refInvoice[`driver_id0`].current.updateData('انتخاب');
        handleRemoveAllError();

        // در برخی مواقع لازم نیست کدهای داخل شرط استفاده شود
        if (apply) {
            window.scrollTo({ top: 0 });
        }
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
                                    defaultValue={input.remittanceNumber}
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
                                <label htmlFor='amount'> مبلغ حواله </label>
                                <input
                                    type="text"
                                    id='amount'
                                    className="inputTextUnitFB ltrFB element"
                                    onInput={e => {
                                        handleSaveValInput(e, 'amount');
                                        formatNub(amountRef.current);
                                    }}
                                    onFocus={e => clearInputError(e, amountError)}
                                    ref={amountRef}

                                />
                                <span
                                    className="unitFB"
                                    onClick={() => htmlFor('amount')}
                                >
                                    تومان
                                </span>
                                <i className="icofont-ui-rating starFB" />
                            </div>
                            <div
                                className="errorContainerFB elementError"
                                id='amountError'
                                ref={amountError}
                            >
                            </div>
                        </div>

                        {/* <div className="containerInputFB">
                            <div className="divInputFB">
                                <label htmlFor="amount">مبلغ حواله</label>
                                <input
                                    type="text"
                                    className="inputTextFB element"
                                    id="amount"
                                    onInput={e => handleSaveValInput(e, 'amount')}
                                    onFocus={e => clearInputError(e, amountError)}
                                />
                                <i className="icofont-ui-rating starFB" />
                            </div>
                            <div className="errorContainerFB elementError" id="amountError" ref={amountError}> </div>
                        </div> */}
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