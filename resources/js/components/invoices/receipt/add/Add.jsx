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
    handleSetTime,
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
    const cutomerIdRef= useRef(null);
    const customer_idError= useRef(null);
    const dateRef = useRef(null);
    const hasCalledGetSandSellers = useRef(false);
    const hasCalledGetSandStores = useRef(false);
    const [loading, setLoading] = useState(true);
    
    
    const [ticketNumber, setTicketNumber] = useState('');
    const [customer_id, setCustomer_id] = useState('');


    
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
        document_receivable_id:'',
        date: '',
        Price: '',
        sand_remittance_id:'',
        cement_remittance_id:'',
        isDocument:0,
        isSandRemittance:0,
        isCementRemittance:0,
        namber:'',//شماره چک، شماره کارت، شماره حساب
        bank:'',
        bank_branch:'',
        date_check:'',
        owner:'',//صاحب چک، صاحب حساب یا کارت دریافت کننده
        description: ''
    });

    useEffect(() => {
        if (customer_id) {
            setInput(prev => ({ ...prev, customer_id }));
        }
    }, [customer_id]);

    const { inputCustomerSearch, optionsCustomersSearched, customerSearchWarning, elementCustomerSearchWarning, handleClearAllSearchCustomer } = SearchCustomersSelect({ dataCustomers: concreteBuyers.datas });

    // RouteService({ setLoading, setTicketNumber, setRemittanceOptions, setDumpTrucks, setDumpTruckOptions, setDrivers, setDriverOptions, setSandStoreOptions });


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
                                        options={cutomers}
                                        saveOption={setCustomer_id}
                                        input={inputCustomerSearch}
                                        optionsSearched={optionsCustomersSearched}
                                        warning={customerSearchWarning}
                                        elementWarning={elementCustomerSearchWarning}
                                        clearSearch={handleClearAllSearchCustomer}
                                        ref={cutomerIdRef}
                                    />
                                </div>
                                <i className="icofont-ui-rating starFB" />
                            </div>
                            <div className="errorContainerFB elementError" id='customer_idError' ref={customer_idError}> </div>
                        </div>
                        <div className="containerInputFB">
                            <div className="divInputFB">
                                <label> حواله  </label>
                                <div
                                    id='sandRemittance_id'
                                    className="element"
                                    onClick={e => { clearInputError(e, sandRemittance_idError) }}
                                >
                                    <SelectZabi
                                        primaryLabel='انتخاب'
                                        options={remittanceOptions}
                                        saveOption={setSandRemittance_id}
                                        ref={sandRemittance_idRef}
                                    />
                                </div>
                                <i className="icofont-ui-rating starFB" />

                            </div>
                            <div className="errorContainerFB elementError" id='sandRemittance_idError' ref={sandRemittance_idError}> </div>
                        </div>
                        {/* </section> */}
                        {/* <section className="sectionFB"> */}
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
                                            value={time.second || ''}
                                            onInput={(e) => handleSetTime(e, 'second', time, setTime, setInput)}
                                            onFocus={(e) => clearInputError(e, timeError, true)}
                                        />
                                        <span>:</span>
                                        <input
                                            type="text"
                                            className="inputTextDateACus inputMonthTDACus element"
                                            placeholder="00"
                                            value={time.minute || ''}
                                            onInput={(e) => handleSetTime(e, 'minute', time, setTime, setInput)}
                                            onFocus={(e) => clearInputError(e, timeError, true)}
                                        />
                                        <span>:</span>
                                        <input
                                            type="text"
                                            className="inputTextDateACus inputYearTDACus element"
                                            placeholder="00"
                                            value={time.hour || ''}
                                            onInput={(e) => { handleSetTime(e, 'hour', time, setTime, setInput) }}
                                            onFocus={(e) => clearInputError(e, timeError, true)}
                                        />
                                        <i className="icofont-ui-rating starFB" />
                                    </div>

                                    <div className="divDownDateAcus" >
                                        <select
                                            className="element"
                                            value={time.second || ''}
                                            onChange={(e) => handleSetTime(e, 'second', time, setTime, setInput)}
                                            onClick={(e) => clearInputError(e, timeError, true)}
                                        >
                                            <option value=""> ثانیه </option>
                                            {optionSeconds}
                                        </select>
                                        <select
                                            className="element"
                                            value={time.minute || ''}
                                            onChange={(e) => handleSetTime(e, 'minute', time, setTime, setInput)}
                                            onClick={(e) => clearInputError(e, timeError, true)}
                                        >
                                            <option value=""> دقیقه </option>
                                            {optionMinutes}
                                        </select>
                                        <select
                                            className="element"
                                            value={time.hour || ''}
                                            onChange={(e) => { handleSetTime(e, 'hour', time, setTime, setInput) }}
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
                                <label> نوع‌ شن‌وماسه </label>
                                <div
                                    id='sandType'
                                    className="element"
                                    onClick={e => { clearInputError(e, sandTypeError) }}
                                >
                                    <SelectZabi
                                        primaryLabel='انتخاب'
                                        options={sandType}
                                        saveOption={setSandTypeSelected}
                                        ref={sandTypeRef}
                                    />
                                </div>
                                <i className="icofont-ui-rating starFB" />

                            </div>
                            <div className="errorContainerFB elementError" id='sandTypeError' ref={sandTypeError}> </div>
                        </div>
                        <div className="containerInputFB">
                            <div className="divInputFB">
                                <label htmlFor="weight">وزن بار</label>
                                <input
                                    type="text"
                                    className="inputTextUnitFB ltrFB element"
                                    id="weight"
                                    onInput={e => {
                                        handleSaveValInput(e, 'weight');
                                        formatNub(weightRef.current);
                                        handleTotalPriceCalculation(e, 'weight', input, setInput, totalPriceRef.current);
                                        handleTotalFareCalculation(e, 'weight', input, setInput, totalFareRef.current)
                                    }}
                                    onFocus={e => clearInputError(e, weightError)}
                                    ref={weightRef}
                                />
                                <span
                                    className="unitFB"
                                    onClick={() => htmlFor('weight')}
                                >
                                    کیلوگرم
                                </span>
                                <i className="icofont-ui-rating starFB" />
                            </div>
                            <div className="errorContainerFB elementError" id="weightError" ref={weightError}> </div>
                        </div>
                        <div className="containerInputFB">
                            <div className="divInputFB">
                                <label htmlFor="unitPrice">قیمت واحد</label>
                                <input
                                    type="text"
                                    className="inputTextUnitFB ltrFB element"
                                    id="unitPrice"
                                    onInput={e => {
                                        handleSaveValInput(e, 'unitPrice');
                                        formatNub(unitPriceRef.current);
                                        handleTotalPriceCalculation(e, 'unitPrice', input, setInput, totalPriceRef.current)
                                    }}
                                    onFocus={e => clearInputError(e, unitPriceError)}
                                    ref={unitPriceRef}
                                />
                                <span
                                    className="unitFB"
                                    onClick={() => htmlFor('unitPrice')}
                                >
                                    تومان
                                </span>
                                <i className="icofont-ui-rating starFB" />
                            </div>
                            <div className="errorContainerFB elementError" id="unitPriceError" ref={unitPriceError}> </div>
                        </div>


                        <div className="containerInputFB">
                            <div className="divInputFB">
                                <label> قیمت کل </label>
                                <div className="mainTotalPriceACSL_FB">
                                    <div className="totalPriceACSL_FB"
                                        ref={totalPriceRef}
                                    >0</div>
                                    <span className="spanTotalPriceACSL_FB">
                                        تومان
                                    </span>
                                </div>
                            </div>
                        </div>
                        {/* <div className="containerInputFB">
                            <div className="divInputFB">
                                <label htmlFor="totalPrice">قیمت کل</label>
                                <input
                                    type="text"
                                    className="inputTextFB element"
                                    id="totalPrice"
                                    defaultValue={input.totalPrice}
                                    onInput={e => handleSaveValInput(e, 'totalPrice')}
                                    onFocus={e => clearInputError(e, totalPriceError)}
                                />
                                <i className="icofont-ui-rating starFB" />
                            </div>
                            <div className="errorContainerFB elementError" id="totalPriceError" ref={totalPriceError}> </div>
                        </div> */}
                    </section>
                    <section className="sectionFB">
                        <div className="containerInputFB">
                            <div className="divInputFB">
                                <label>کمپرسی و مالک  </label>
                                <div
                                    id='truck_id'
                                    className="element"
                                    onClick={e => { clearInputError(e, truck_idError) }}
                                >
                                    <SelectZabi2
                                        primaryLabel='انتخاب'
                                        options={dumpTruckOptions}
                                        saveOption={setDumpTruckId}
                                        saveOption2={setDumpTruckOwnerId}
                                        input={inputMixerSearch}
                                        optionsSearched={optionsMixersSearched}
                                        warning={mixerSearchWarning}
                                        elementWarning={elementMixerSearchWarning}
                                        clearSearch={handleClearAllSearchMixer}
                                        ref={dumpTruckRef}
                                    />
                                </div>
                                <i className="icofont-ui-rating starFB" />
                            </div>
                            <div className="errorContainerFB elementError" id='truck_idError' ref={truck_idError}> </div>
                        </div>
                        <div className="containerInputFB">
                            <div className="divInputFB">
                                <label>راننده  </label>
                                <div
                                    id='driver_id'
                                    className="element"
                                    onClick={e => { clearInputError(e, driver_idError) }}
                                >
                                    <SelectZabi2
                                        primaryLabel='انتخاب'
                                        options={driverOptions}
                                        saveOption={setDrvierId}
                                        input={inputDriverSearch}
                                        optionsSearched={optionsDriversSearched}
                                        warning={driverSearchWarning}
                                        elementWarning={elementDriverSearchWarning}
                                        clearSearch={handleClearAllSearchDriver}
                                        ref={driverRef}
                                    />
                                </div>
                                <i className="icofont-ui-rating starFB" />
                            </div>
                            <div className="errorContainerFB elementError" id='driver_idError' ref={driver_idError}> </div>
                        </div>
                        <div className="containerInputFB">
                            <div className="divInputFB">
                                <label htmlFor="unitFare">کرایه هر تن</label>
                                <input
                                    type="text"
                                    className="inputTextUnitFB ltrFB element"
                                    id="unitFare"
                                    onInput={e => {
                                        handleSaveValInput(e, 'unitFare');
                                        formatNub(unitFareRef.current);
                                        handleTotalFareCalculation(e, 'unitFare', input, setInput, totalFareRef.current)
                                    }}
                                    onFocus={e => clearInputError(e, unitFareError)}
                                    ref={unitFareRef}
                                />
                                <span
                                    className="unitFB"
                                    onClick={() => htmlFor('unitFare')}
                                >
                                    تومان
                                </span>
                                <i className="icofont-ui-rating starFB" />
                            </div>
                            <div className="errorContainerFB elementError" id="unitFareError" ref={unitFareError}> </div>
                        </div>

                        <div className="containerInputFB">
                            <div className="divInputFB">
                                <label> کل کرایه </label>
                                <div className="mainTotalPriceACSL_FB">
                                    <div className="totalPriceACSL_FB"
                                        ref={totalFareRef}
                                    >0</div>
                                    <span className="spanTotalPriceACSL_FB">
                                        تومان
                                    </span>
                                </div>
                            </div>
                        </div>
                        {/* <div className="containerInputFB">
                            <div className="divInputFB">
                                <label htmlFor="totalFare">کل کرایه</label>
                                <input
                                    type="text"
                                    className="inputTextFB element"
                                    id="totalFare"
                                    defaultValue={input.totalFare}
                                    onInput={e => handleSaveValInput(e, 'totalFare')}
                                    onFocus={e => clearInputError(e, totalFareError)}
                                />
                                <i className="icofont-ui-rating starFB" />
                            </div>
                            <div className="errorContainerFB elementError" id="totalFareError" ref={totalFareError}> </div>
                        </div> */}
                    </section>
                    <section className="sectionFB">
                        <div className="containerInputFB">
                            <div className="divInputFB">
                                <label>سیلوی تخلیه  </label>
                                <div
                                    id='sandStore_id'
                                    className="element"
                                    onClick={e => { clearInputError(e, sandStore_idError) }}
                                >
                                    <SelectZabi
                                        primaryLabel='انتخاب'
                                        options={sandStoreOptions}
                                        saveOption={setSandStoreId}
                                        ref={sandStoreRef}
                                    />
                                </div>
                                <i className="icofont-ui-rating starFB" />

                            </div>
                            <div className="errorContainerFB elementError" id='sandStore_idError' ref={sandStore_idError}> </div>
                        </div>
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