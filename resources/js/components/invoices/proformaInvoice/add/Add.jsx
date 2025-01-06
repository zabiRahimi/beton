import { createRef, useEffect, useRef, useState } from 'react';
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
    handleAddProduct,
    handleRemoveProduct,
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

    const productError = useRef([]);

    const descriptionRef = useRef(null);
    const descriptionError = useRef(null);

    const isRef = useRef(false);



    const [refProducts, setRefProducts] = useState({});


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
            {
                product: '',
                type: '',
                amount: '',
                countingUnit: '',
                unitPrice: '',
                totalPrice: '',
            },
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
    const errorRefs = useRef([])
    const productRefs = useRef([])
    const [productsRef, setProductsRef] = useState({});

    /**
      * برای تخصیص رف به هر اینپوت محصولات 
     */
      useEffect(() => {
        if (input.products) {
            let refs = input.products.reduce((acc, cur, i) => {
                acc[`product${i}`] = createRef();
                acc[`productError${i}`] = createRef();

                acc[`type${i}`] = createRef();
                acc[`typeError${i}`] = createRef();

                acc[`amount${i}`] = createRef();
                acc[`amountError${i}`] = createRef();

                acc[`unit${i}`] = createRef();
                acc[`unitError${i}`] = createRef();

                acc[`unitPrice${i}`] = createRef();
                acc[`unitPriceError${i}`] = createRef();

                acc[`totalPrice${i}`] = createRef();
                acc[`totalPriceError${i}`] = createRef();

                return acc;
            }, {});
            setProductsRef(refs);
            // isRef.current = true;
        }
    }, [input.products]);

    // useEffect(() => {
    //      // بازسازی ref ها پس از هر تغییر در 
    //       errorRefs.current = input.products.map((product, i) =>{ 
    //         // `${product}Error`.current[i] || createRef()
    //         Object.keys(product).map((pro)=> {if(!pro.current[i]){return createRef()}});
    //     }); 
    //     }, [input.products]);
    // useEffect(() => {
    //     // بازسازی ref ها پس از هر تغییر در input.products
    //     errorRefs.current = input.products.map((product, i) => {
    //       return Object.keys(product).map((pro) => {
    //         if (!errorRefs.current[i]) {
    //           return createRef();
    //         }
    //         return errorRefs.current[i];
    //       });
    //     });
    //   }, [input.products]);

    // useEffect(() => { // بازسازی ref ها پس از هر تغییر در input.products
    //     errorRefs.current = input.products.map((product, i) => ({ productError: errorRefs.current[i]?.productError || createRef(), typeError: errorRefs.current[i]?.typeError || createRef(), amountError: errorRefs.current[i]?.amountError || createRef(), countingUnitError: errorRefs.current[i]?.countingUnitError || createRef(), unitPriceError: errorRefs.current[i]?.unitPriceError || createRef(), totalPriceError: errorRefs.current[i]?.totalPriceError || createRef(), }));
    // }, [input.products]);


    RouteService({ setLoading, setTicketNumber });


    const handleSaveValInput = (e, input) => {
        let { value } = e.target;
        if (['unitPrice', 'totalPrice'].includes(input)) {
            value = value.replace(/,/g, '');
        }
        setInput(prev => ({ ...prev, [input]: value }));
    }


    const handleSaveValInputProducts = (e, index) => {
        const { name, value } = e.target;
        const products = [...input.products];
        products[index][name] = value;
        setInput({ ...input, products });
    };

    const clearInputError = (e, refErr, date = false) => {
        console.log(refErr);
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
                                            className="inputTextDateACus  element"
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

                        <div className="containerInput100FB">
                            <div className="divInput100FB">
                                <label htmlFor="address">آدرس</label>
                                <textarea
                                    id="address"
                                    className="textarea100FB"
                                    defaultValue={input.address}
                                    onInput={e => handleSaveValInput(e, 'address')}
                                    onFocus={(e) => clearInputError(e, addressError)}

                                />
                            </div>
                            <div className="errorContainerFB elementError" id="addressError" ref={addressError}> </div>
                        </div>
                    </section>
                    {
                        input.products.map((product, i) => (
                            <section className="sectionFB" key={i}>
                                <div className="containerInputFB">
                                    <div className="divInputFB">
                                        <label> نام محصول </label>
                                        <input
                                            type="text"
                                            className="inputTextFB  element"
                                            id={`product${i}}`}
                                            name='product'
                                            onInput={e => handleSaveValInputProducts(e, i)}
                                            onFocus={(e) => clearInputError(e,productsRef[`productError${i}`])}
                                        />
                                        <i className="icofont-ui-rating starFB" />
                                    </div>
                                    <div className="errorContainerFB elementError" id={`productError${i}}`} ref={productsRef[`productError${i}`]}  > </div>
                                </div>

                                <div className="containerInputFB">
                                    <div className="divInputFB">
                                        <label htmlFor="type" className='labelTypeFB'>
                                            <span>نوع محصول</span>
                                            <span>(عیار)</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="inputTextFB  element"
                                            id={`type${i}}`}
                                            name='type'
                                            onInput={e => {
                                                handleSaveValInputProducts(e, i);
                                            }}
                                            onFocus={e => clearInputError(e,productsRef[`typeError${i}`])}

                                        />

                                        <i className="icofont-ui-rating starFB" />
                                    </div>
                                    <div className="errorContainerFB elementError" id={`typeError${i}}`} ref={productsRef[`typeError${i}`]} > </div>
                                </div>

                                <div className="containerInputFB">
                                    <div className="divInputFB">
                                        <label> مقدار </label>
                                        <input
                                            type="text"
                                            className="inputTextFB centerFB element"
                                            id={`amount${i}}`}
                                            name='amount'
                                            onInput={e => {
                                                handleSaveValInputProducts(e, i);
                                                handleTotalPriceCalculation(e,`amount${i}`, input, setInput, productsRef[`totalPrice${i}`].current);
                                            }}
                                            onFocus={(e) => clearInputError(e,productsRef[`amountError${i}`])}
                                        />
                                        <i className="icofont-ui-rating starFB" />
                                    </div>
                                    <div className="errorContainerFB elementError" id={`amountError${i}}`} ref={productsRef[`amountError${i}`]} > </div>
                                </div>

                                <div className="containerInputFB">
                                    <div className="divInputFB">
                                        <label htmlFor='unit'> واحد اندازه‌گیری </label>
                                        <input
                                            type="text"
                                            className="inputTextFB  element"
                                            id={`unit${i}}`}
                                            name='unit'
                                           
                                            onInput={e => handleSaveValInputProducts(e, i)}
                                            onFocus={(e) => clearInputError(e,productsRef[`unitError${i}`])}
                                        />
                                        <i className="icofont-ui-rating starFB" />
                                    </div>
                                    <div className="errorContainerFB elementError" id={`unitError${i}}`} ref={productsRef[`unitError${i}`]} > </div>
                                </div>

                                <div className="containerInputFB">
                                    <div className="divInputFB">
                                        <label htmlFor="unitPrice">قیمت واحد</label>
                                        <input
                                            type="text"
                                            className="inputTextUnitFB ltrFB element"
                                            id={`unitPrice${i}}`}
                                            name='unitPrice'
                                            onInput={e => {
                                                handleSaveValInputProducts(e, i);
                                                formatNub(productsRef[`unitPrice${i}`].current);
                                                handleTotalPriceCalculation(e,`unitPrice${i}`, input, setInput, productsRef[`totalPrice${i}`].current);
                                            }}
                                            onFocus={e => clearInputError(e,productsRef[`unitPriceError${i}`])}
                                            ref={productsRef[`unitPrice${i}`]}

                                        />
                                        <span className="unitFB"
                                            onClick={() => htmlFor('unitPrice')}
                                        >
                                            تومان
                                        </span>
                                        <i className="icofont-ui-rating starFB" />
                                    </div>
                                    <div className="errorContainerFB elementError" id={`unitPriceError${i}}`}  ref={productsRef[`unitPriceError${i}`]}> </div>
                                </div>

                                <div className="containerInputFB">
                                    <div className="divInputFB">
                                        <label htmlFor="totalPrice">قیمت کل</label>
                                        <input
                                            type="text"
                                            className="inputTextUnitFB ltrFB element"
                                            id={`totalPrice${i}}`}
                                            name='totalPrice'
                                           
                                            onInput={e => {
                                                handleSaveValInputProducts(e, i);
                                                formatNub(productsRef[`totalPrice${i}`].current);
                                            }}
                                            onFocus={e => clearInputError(e,productsRef[`totalPriceError${i}`])}
                                            ref={productsRef[`totalPrice${i}`]}
                                        />
                                        <span className="unitFB"
                                            onClick={() => htmlFor('unitPrice')}
                                        >
                                            تومان
                                        </span>
                                        <i className="icofont-ui-rating starFB" />
                                    </div>
                                    <div className="errorContainerFB elementError" id={`totalPriceError${i}}`}  ref={productsRef[`totalPriceError${i}`]}> </div>
                                </div>

                                <div className='divAddDelProductFB'>
                                    <div className='divAddProductFB'>
                                        {(input.products.length == i + 1) &&
                                            <button className='btnAddProductFB'
                                                onClick={(e) => {
                                                    handleAddProduct(e, input, setInput);
                                                }}
                                            >
                                                <i className='icofont-plus' />
                                                <span> اضافه کردن محصول</span>
                                            </button>
                                        }

                                    </div>
                                    <div className="divDelProductFB">
                                        {input.products.length != 1 &&
                                            <button className="btnDelProductFB"
                                                onClick={(e) => {
                                                    handleRemoveProduct(e, i, input, setInput);
                                                }}
                                            >
                                                <i className="icofont-close"></i>
                                                <span>حذف محصول</span>
                                            </button>
                                        }
                                    </div>
                                </div>
                            </section>
                        ))
                    }


                    <section className="sectionFB">
                        <div className="containerInput100FB">
                            <div className="divInput100FB">
                                <label> توضیحات </label>
                                <textarea
                                    className="textarea100FB descriptionFB element"
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