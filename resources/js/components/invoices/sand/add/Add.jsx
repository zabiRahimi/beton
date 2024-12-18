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
import SearchMixersSelect from "../../searchSelectZabi/SearchMixersSelect";
import SearchDriversSelect from "../../searchSelectZabi/SearchDriversSelect";
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
    const remittanceIdRef = useRef(null);
    const remittanceIdError = useRef(null);
    const billNumberError = useRef(null);
    const timeRef = useRef(null);
    const dateRef = useRef(null);
    const dateError = useRef(null);
    const timeError = useRef(null);
    const typeSandRef = useRef(null);
    const typeSandError = useRef(null);
    const weightRef = useRef(null);
    const weightError = useRef(null);
    const unitPriceRef = useRef(null);
    const unitPriceError = useRef(null);
    const totalPriceError = useRef(null);
    const dumpTruckRef = useRef(null);
    const dumpTruckError = useRef(null);
    const driverRef = useRef(null);
    const driverError = useRef(null);
    const unitFareRef = useRef(null);
    const unitFareError = useRef(null);
    // const totalFareError = useRef(null);
    const totalPriceRef = useRef(null);
    const totalFareRef = useRef(null);
    const sandStoreRef = useRef(null);
    const sandStoreError = useRef(null);
    const hasCalledGetSandSellers = useRef(false);
    const hasCalledGetSandStores = useRef(false);
    const [loading, setLoading] = useState(true);
    const [remittanceOptions, setRemittanceOptions] = useState([]);
    const [remittanceId, setRemittanceId] = useState('');
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
    const [ticketNumber, setTicketNumber] = useState('');

    const [dumpTrucks, setDumpTrucks] = useState('');
    const [dumpTruckOptions, setDumpTruckOptions] = useState([]);
    const [drivers, setDrivers] = useState('');
    const [driverOptions, setDriverOptions] = useState([])
    const [sandStoreOptions, setSandStoreOptions] = useState([]);
    const [sandStoreId, setSandStoreId] = useState('');

    const [dumpTruckId, setDumpTruckId] = useState('');
    const [dumpTruckOwnerId, setDumpTruckOwnerId] = useState('');

    const [dumpTruckSelected, setDumpTruckSelected] = useState('');
    const [dumpTruckOwnerSelected, setDumpTruckOwnerSelected] = useState('');
    const [driverId, setDrvierId] = useState('');
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
        sandRemittance_id: '',
        billNumber: '',
        time: '',
        date: '',
        tyepSand: '',
        weight: '',
        unitPrice: '',
        totalPrice: '',
        truck_id: '',
        dumpTruckOwner_id: '',
        driver_id: '',
        unitFare: '',
        totalFare: '',
        sandStore_id: '',
        description: ''
    });
    RouteService({ setLoading, setTicketNumber, setRemittanceOptions, setDumpTrucks, setDumpTruckOptions, setDrivers, setDriverOptions, setSandStoreOptions });

    const { inputMixerSearch, optionsMixersSearched, mixerSearchWarning, elementMixerSearchWarning, handleClearAllSearchMixer } = SearchMixersSelect({ dataMixers: dumpTrucks });

    const { inputDriverSearch, optionsDriversSearched, driverSearchWarning, elementDriverSearchWarning, handleClearAllSearchDriver } = SearchDriversSelect({ dataDrivers: drivers });
    // const fetchData = async() =>{
    //     await axios.get("/api/v1/sandInvoice/fetchData").then((response) => {
    //         let data = response.data;

    //         // if (datas.length == 0) {
    //         //     MySwal.fire({
    //         //         icon: "warning",
    //         //         title: "هشدار",
    //         //         text: `هنوز هیچ کارخانه‌ای (فروشنده شن‌وماسه) ثبت نشده است. لازم است ابتدا کارخانه را ثبت کنید.`,
    //         //         confirmButtonText: "  ثبت کارخانه   ",
    //         //         showCancelButton: true,
    //         //         cancelButtonText: "کنسل",
    //         //         confirmButtonColor: "#3085d6",
    //         //         cancelButtonColor: "#d33",
    //         //         preConfirm: () => {
    //         //             navigate("/addCustomer");
    //         //         }
    //         //     });
    //         // } else {
    //         //     datas.map((data, i) => {
    //         //         setFactory(perv => ([...perv, {
    //         //             value: data.id,
    //         //             // cementStoreName: data.silo,
    //         //             html: <div className="factoryAptionSelectFB"> {data.name}  {data.lastName} </div>
    //         //         }]));
    //         //     })
    //         // }
    //     });
    // }
    useEffect(() => {
        remittanceId && setInput(prev => ({ ...prev, sandRemittance_id: remittanceId }));
    }, [remittanceId]);

    useEffect(() => {
        typeSandSelected && setInput(prev => ({ ...prev, tyepSand: typeSandSelected }));
    }, [typeSandSelected]);

    useEffect(() => {
        dumpTruckId && setInput(prev => ({ ...prev, truck_id: dumpTruckId }));
    }, [dumpTruckId]);

    useEffect(() => {
        dumpTruckOwnerId && setInput(prev => ({ ...prev, dumpTruckOwner_id: dumpTruckOwnerId }));
    }, [dumpTruckOwnerId]);

    useEffect(() => {
        driverId && setInput(prev => ({ ...prev, driver_id: driverId }));
    }, [driverId]);


    useEffect(() => {
        sandStoreId && setInput(prev => ({ ...prev, sandStore_id: sandStoreId }));
    }, [sandStoreId]);
    console.log(input);
    const handleSaveValInput = (e, input) => {
        let { value } = e.target;
        if (['weight', 'unitPrice', 'unitFare'].includes(input)) {
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

                didClose: () => resetForm(setInput, setDate, setFactory, factoryRef.current),
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
                    if (key !== 'remainingPrice') {
                        document.getElementById(key).classList.add('borderRedFB');
                        document.getElementById(key + 'Error').innerHTML = val;
                    }
                });
            }
        } finally {
            setLoading(false);
        }
    };

    const handleResetForm = () => {
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
                                <label htmlFor="billNumber">شماره قبض</label>
                                <input
                                    type="text"
                                    className="inputTextFB element"
                                    id="billNumber"
                                    defaultValue={input.billNumber}
                                    onInput={e => handleSaveValInput(e, 'billNumber')}
                                    onFocus={e => clearInputError(e, billNumberError)}
                                />
                                <i className="icofont-ui-rating starFB" />
                            </div>
                            <div className="errorContainerFB elementError" id="billNumberError" ref={billNumberError}> </div>
                        </div>
                        <div className="containerInputFB">
                            <div className="divInputFB">
                                <label> حواله  </label>
                                <div
                                    id='remittanceId'
                                    className="element"
                                    onClick={e => { clearInputError(e, remittanceIdError) }}
                                >
                                    <SelectZabi
                                        primaryLabel='انتخاب'
                                        options={remittanceOptions}
                                        saveOption={setRemittanceId}
                                        ref={remittanceIdRef}
                                    />
                                </div>
                                <i className="icofont-ui-rating starFB" />

                            </div>
                            <div className="errorContainerFB elementError" id='remittanceIdError' ref={remittanceIdError}> </div>
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
                                    id='typeSand'
                                    className="element"
                                    onClick={e => { clearInputError(e, typeSandError) }}
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
                            <div className="errorContainerFB elementError" id='typeSandError' ref={typeSandError}> </div>
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
                                    id='dumpTruck'
                                    className="element"
                                    onClick={e => { clearInputError(e, dumpTruckError) }}
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
                            <div className="errorContainerFB elementError" id='dumpTruckError' ref={dumpTruckError}> </div>
                        </div>
                        <div className="containerInputFB">
                            <div className="divInputFB">
                                <label>راننده  </label>
                                <div
                                    id='driver'
                                    className="element"
                                    onClick={e => { clearInputError(e, driverError) }}
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
                            <div className="errorContainerFB elementError" id='driverError' ref={driverError}> </div>
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
                                    onFocus={e => clearInputError(e, unitPriceError)}
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
                            <div className="errorContainerFB elementError" id="billNumberError" ref={unitPriceError}> </div>
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
                                    id='sandStore'
                                    className="element"
                                    onClick={e => { clearInputError(e, sandStoreError) }}
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
                            <div className="errorContainerFB elementError" id='sandStoreError' ref={sandStoreError}> </div>
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