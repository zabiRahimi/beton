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
    handleSetDate,
    htmlFor,
    formatNub,
    resetForm,
    handleTotalPriceCalculation,
} from './Helper';

const Add = () => {
    let navigate = useNavigate();
    const MySwal = withReactContent(Swal);
    const {
        optionDays,
        optionMonth,
        optionShortYears,
    } = DataZabi();

    const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    const form = useRef(null);

    const dateRef = useRef(null);
    const dateError = useRef(null);

    const buyerRef = useRef(null);
    const buyerError = useRef(null);

    const nationalCodeRef = useRef(null);
    const nationalCodeError = useRef(null);

    const addressRef = useRef(null);
    const addressError = useRef(null);

    const telRef = useRef(null);
    const telError = useRef(null);

    const descriptionRef = useRef(null);
    const descriptionError = useRef(null);

    const isRef = useRef(false);



    const [refProducts, setRefProducts] = useState({});

    /**
        * برای تخصیص رف به هر اینپوت محصولات 
       */
    // useEffect(() => {
    //     if (invoice) {
    //         let refs = invoice.reduce((acc, cur, i) => {
    //             acc[`productRef${i}`] = createRef();
    //             acc[`productError${i}`] = createRef();

    //             acc[`typeRef${i}`] = createRef();
    //             acc[`typeError${i}`] = createRef();

    //             acc[`amountRef${i}`] = createRef();
    //             acc[`amountError${i}`] = createRef();

    //             acc[`unitRef${i}`] = createRef();
    //             acc[`unitError${i}`] = createRef();

    //             acc[`unitPriceRef${i}`] = createRef();
    //             acc[`unitPriceError${i}`] = createRef();

    //             acc[`totalPriceRef${i}`] = createRef();
    //             acc[`totalPriceError${i}`] = createRef();

    //             return acc;
    //         }, {});
    //         setRefInvoice(refs);
    //         isRef.current = true;
    //     }
    // }, [invoice]);


    const [loading, setLoading] = useState(true);
    const [ticketNumber, setTicketNumber] = useState('');

    const [date, setDate] = useState({
        day: '',
        month: '',
        year: ''
    });


    const [input, setInput] = useState({
        date: '',
        buyer: '',
        nationalCode: '',
        address: '',
        tel: '',
        products: [
            {
                product: '',
                type: '',
                amount: '',
                countingUnit: '',
                unitPrice: '',
                totalPrice: '',
            },
        ],
        description: '',
        unitPrice: '',
        isTax: '',
    });

    RouteService({ setLoading, setTicketNumber });


    const handleSaveValInput = (e, input) => {
        let { value } = e.target;
        if (['unitPrice', 'totalPrice'].includes(input)) {
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
                title='ایجاد پیش فاکتور'
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
                                <label htmlFor="buyer">خریدار</label>
                                <input
                                    type="text"
                                    className="inputTextFB element"
                                    id="buyer"
                                    // defaultValue={input.billNumber}
                                    onInput={e => handleSaveValInput(e, 'buyer')}
                                    onFocus={e => clearInputError(e, buyerError)}
                                    ref={buyerRef}
                                />
                                <i className="icofont-ui-rating starFB" />
                            </div>
                            <div className="errorContainerFB elementError" id="buyerError" ref={buyerError}> </div>
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

                        <div className="containerInputFB">
                            <div className="divInputFB">
                                <label htmlFor="nationalCode">کد ملی </label>
                                <input
                                    type="text"
                                    id="nationalCode"
                                    className="inputTextFB ltrFB element"
                                    defaultValue={input.nationalCode}
                                    onInput={e => handleSaveValInput(e, 'nationalCode')}
                                    onFocus={(e) => clearInputError(e, nationalCodeError)}
                                />
                            </div>
                            <div className="errorContainerFB elementError" id="nationalCodeError" ref={nationalCodeError}> </div>
                        </div>

                        <div className="containerInputFB">
                            <div className="divInputFB">
                                <label htmlFor="tel">شماره تماس</label>
                                <input type="text" id="tel" className="inputTextFB ltrFB element"
                                    value={input['tel'] || ''}
                                    onInput={e => handleSaveValInput(e, 'tel')}
                                    onFocus={(e) => clearInputError(e, telError)}

                                />
                            </div>
                            <div className="errorContainerFB elementError" id="telError" ref={telError}> </div>
                        </div>

                        <div className="containerInputFB">
                            <div className="divInputFB">
                                <label htmlFor="address">آدرس</label>
                                <textarea
                                    id="address"
                                    className="textareaAddressACu"
                                    defaultValue={input.address}
                                    onInput={e => handleSaveValInput(e, 'address')}
                                    onFocus={(e) => clearInputError(e, addressError)}

                                />
                            </div>
                            <div className="errorContainerFB elementError" id="addressError" ref={addressError}> </div>
                        </div>
                    </section>
                    <section className="sectionFB">
                        <div className="containerInputFB">
                            <div className="divInputFB">
                                <label> نام محصول </label>
                                <input
                                    type="text"
                                    className="inputTextFB ltrFB element"
                                    id="tel"
                                    value={input['tel'] || ''}
                                    onInput={e => handleSaveValInput(e, 'tel')}
                                    onFocus={(e) => clearInputError(e, )}
                                />
                                <i className="icofont-ui-rating starFB" />
                            </div>
                            <div className="errorContainerFB elementError" id='productError' > </div>
                        </div>

                        <div className="containerInputFB">
                            <div className="divInputFB">
                                <label htmlFor="type" className='labelTypeFB'>
                                    <span>نوع محصول</span>
                                    <span>(عیار)</span>
                                </label>
                                <input
                                    type="text"
                                    className="inputTextFB ltrFB element"
                                    id="type"
                                    onInput={e => {
                                        handleSaveValInput(e, 'type');
                                    }}
                                    onFocus={e => clearInputError(e, )}
                                    
                                />
                               
                                <i className="icofont-ui-rating starFB" />
                            </div>
                            <div className="errorContainerFB elementError" id="typeError" > </div>
                        </div>

                        <div className="containerInputFB">
                            <div className="divInputFB">
                                <label> مقدار </label>
                                <input
                                    type="text"
                                    className="inputTextFB ltrFB element"
                                    id="tel"
                                    value={input['tel'] || ''}
                                    onInput={e => handleSaveValInput(e, 'tel')}
                                    onFocus={(e) => clearInputError(e, )}
                                />
                                <i className="icofont-ui-rating starFB" />
                            </div>
                            <div className="errorContainerFB elementError" id='productError' > </div>
                        </div>

                        <div className="containerInputFB">
                            <div className="divInputFB">
                                <label htmlFor='unit'> واحد اندازه‌گیری </label>
                                <input
                                    type="text"
                                    className="inputTextFB ltrFB element"
                                    id="unit"
                                    value={input['unit'] || ''}
                                    onInput={e => handleSaveValInput(e, 'unit')}
                                    onFocus={(e) => clearInputError(e, )}
                                />
                                <i className="icofont-ui-rating starFB" />
                            </div>
                            <div className="errorContainerFB elementError" id='unitError' > </div>
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
                                        // formatNub(unitPriceRef.current);
                                        // handleTotalPriceCalculation(e, 'unitPrice', input, setInput, totalPriceRef.current)
                                    }}
                                    onFocus={e => clearInputError(e, )}
                                   
                                />
                                <span    className="unitFB"
                                    onClick={() => htmlFor('unitPrice')}
                                >
                                    تومان
                                </span>
                                <i className="icofont-ui-rating starFB" />
                            </div>
                            <div className="errorContainerFB elementError" id="unitPriceError" > </div>
                        </div>

                        <div className="containerInputFB">
                            <div className="divInputFB">
                                <label htmlFor="totalPrice">قیمت کل</label>
                                <input
                                    type="text"
                                    className="inputTextUnitFB element"
                                    id="totalPrice"
                                    defaultValue={input.totalPrice}
                                    onInput={e => handleSaveValInput(e, 'totalPrice')}
                                    onFocus={e => clearInputError(e, )}
                                />
                                  <span    className="unitFB"
                                    onClick={() => htmlFor('unitPrice')}
                                >
                                    تومان
                                </span>
                                <i className="icofont-ui-rating starFB" />
                            </div>
                            <div className="errorContainerFB elementError" id="totalPriceError" > </div>
                        </div>
                    </section>

                    <section className="sectionFB">
                        <div className="containerInputFB">
                            <div className="divInputFB">
                                <label> توضیحات </label>
                                <textarea
                                    className="inputTextFB ltrFB element"
                                    id="description"
                                    onInput={e => handleSaveValInput(e, 'description')}
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