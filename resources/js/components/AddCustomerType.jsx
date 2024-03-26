import Button from 'react-bootstrap/Button';
import { useLoaderData, useParams } from "react-router-dom";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import Title from "./hooks/Title";
import "../../css/formBeton.css";
import "../../css/addCustomerType.css";
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


const AddCustomerType = () => {

    const formRef = useRef(null);
    const MySwal = withReactContent(Swal);

    const [customerTypes, setCustomerTypes] = useState(null);
    console.log(customerTypes);
    const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    const [type, setType] = useState();

    /** ست کردن موارد لازم هنگامی که کاربر ویرایش نوع مشتری را انتخاب می‌کند */
    const [editCustomerTyep, setEditCustomerTyep] = useState(false);

    const [editType, setEditType] = useState({
        id: null,
        type: null
    });

    useEffect(() => {
        getData()
    }, [])

    async function getData() {
        let customerTData;

        // await localforage.getItem("products").then((value) => {
        //     customerTData = value.filter((item) => item.id == params.id);
        // });

        let val = await axios.get("/api/v1/getAllCustomerType").then((response) => {
            customerTData = response.data.CustomerTypes;
        });
        // customerTData=[[id=>1, name=>'eee']]

        setCustomerTypes(customerTData)
    }

    const showCustomerTypes = () => {
        let value = customerTypes.map((customerType, i) => {
            // return <span key={i}>{customerType['type']}<i>{customerType['id']}</i></span>
            return <div className="rowListShowGe rowListACuT" key={i}>
                <span className="rowNumShowGe rowNumACuT">{i + 1}</span>
                <span className="typeShowGe typeACuT"> {customerType['type']} </span>

                <div className="divEditGe">
                    <button className="--styleLessBtn btnEditGe" title=" ویرایش "
                        onClick={() => showFormForEdit(customerType['id'], customerType['type'])}
                    >
                        <i className="icofont-pencil iEditGe" />
                    </button>
                </div>

                <div className="divDelGe">

                    <button className="--styleLessBtn btnDelGe" title=" حذف ">
                        <i className="icofont-trash iDelGe" />
                    </button>
                </div>

            </div>

        })

        return value;
    }

    /**
     * 
     * @param {*} event 
     * @param {state form is add or edit} state
     * true = state add
     * false = state edit 
     */
    const handleChangeInput = (event, state) => {
        console.log(state);
        const val = event.target.value;
        if (state) {
            setType(val);
        } else {
            setEditType(old => ({ ...old, type: val }));
        }



    }

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post(
            '/api/v1/addCustomerType',
            { type },
            {
                headers:
                {
                    'X-CSRF-TOKEN': token,
                    'Content-Type': 'application/json; charset=utf-8'
                }
            }
        ).then(response => {

            // const id = response.data.zabi;
            const id = response;


            setCustomerTypes(prevTypes => [...prevTypes, response.data.CustomerTypes]);

            formRef.current.reset();

            // setIndex(prev => ({ ...prev, book_id: id, book: input.book }));

            // setBook({ id, ...input });

            // //کتاب ایجاد شده را به آرایه کتابها اضافه می‌کند
            // valBooks.push({ id, ...input });

            // setValBooks(valBooks);

            // setInput({ book: '', link: '' });

            // Swal.fire({
            //     position: 'center',
            //     icon: 'success',
            //     title: 'ثبت کتاب با موفقیت انجام شد ',
            //     showConfirmButton: false,
            //     timer: 3000
            // })
        })
            .catch(
            // error => {
            //     notify.current.innerHTML = ''
            //     if (error.response.status == 422) {
            //         const elementError = Object.keys(error.response.data.errors)[0];
            //         let divError;
            //         switch (elementError) {
            //             case 'book':
            //                 divError = bookError.current
            //                 break;
            //             case 'link':
            //                 divError = linkError.current
            //         }
            //         divError.innerHTML = `<div class="error">${error.response.data.errors[elementError][0]}</div>`
            //         divError.scrollIntoViewIfNeeded({ behavior: "smooth" });
            //     }
            //     else {
            //         notify.current.innerHTML = `<div class='error'>'خطایی رخ داده است، مطمعن شوید دیتابیس فعال است.'</div>`
            //         notify.current.scrollIntoViewIfNeeded({ behavior: "smooth" });
            //     }
            // }
        )
    }

    const showFormForEdit = (id, type) => {
        setEditCustomerTyep(true);
        setEditType({ id, type });
        handleScrollTo();
    }

    const changeIputForEdit = () => {

    }

    const handleScrollTo = () => {
        // formRef.current.scrollIntoView({ behavior: 'smooth' });
        window.scrollTo({
            top: formRef.current.offsetTop - 20,
            behavior: 'smooth'
        });
    };

    const handleSubmitEdit = (e) => {
        e.preventDefault();
        console.log('edit');

        axios.patch(
            `/api/v1/editCustomerType/${editType['id']}`,
            { type: editType['type'] },
            {
                headers:
                {
                    'X-CSRF-TOKEN': token,
                    'Content-Type': 'application/json; charset=utf-8'
                }
            }
        ).then(response => {
            const result = response.data.customerType;
            console.log(result);
            // setCustomerTypes(prevTypes => [...prevTypes, response.data.CustomerTypes]);

            formRef.current.reset();
            setCustomerTypes(prevItems => {
                return prevItems.map(item => {
                    if (item.id === result['id']) {
                        return { ...item, 'type': result['type'] };
                    }
                    return item;
                });
            });

            MySwal.fire({
                icon: "success",
                title: "با موفقیت ویرایش شد",
                confirmButtonText: "  متوجه شدم  ",
                timer: 3000,
                timerProgressBar: true,
                customClass: {
                    timerProgressBar: '--progressBarColorBlue',
                }
            })
        })
            .catch(error => {
                console.log(error.response.data.errors);
                if (error.response.status == 422) {
                    
                }
            }
                // error => {
                //     notify.current.innerHTML = ''
                //     if (error.response.status == 422) {
                //         const elementError = Object.keys(error.response.data.errors)[0];
                //         let divError;
                //         switch (elementError) {
                //             case 'book':
                //                 divError = bookError.current
                //                 break;
                //             case 'link':
                //                 divError = linkError.current
                //         }
                //         divError.innerHTML = `<div class="error">${error.response.data.errors[elementError][0]}</div>`
                //         divError.scrollIntoViewIfNeeded({ behavior: "smooth" });
                //     }
                //     else {
                //         notify.current.innerHTML = `<div class='error'>'خطایی رخ داده است، مطمعن شوید دیتابیس فعال است.'</div>`
                //         notify.current.scrollIntoViewIfNeeded({ behavior: "smooth" });
                //     }
                // }
            )
    }

    return (
        <>
            <Title title="تعریف نوع مشتری" />

            <div className="containerACuT">

                <div className="divRightACuT">
                    <form action="" className="formBeton" ref={formRef}>

                        <h5 className={`titleFormFB ${editCustomerTyep ? '' : 'hideGe'}`}>ویرایش نوع مشتری</h5>


                        <div className="sectionFB">
                            <div className="divInputFB divInputFB2">
                                <label>نوع مشتری</label>
                                <input
                                    type="text"
                                    className="inputTextFB"
                                    defaultValue={editCustomerTyep ? editType['type'] : ''}
                                    onChange={(event) => handleChangeInput(event, !editCustomerTyep)}
                                    autoFocus
                                />
                            </div>


                        </div>

                        <div className={`sectionFB divBtnsFB ${!editCustomerTyep ? '' : 'hideGe'}`}>
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
                            >
                                پاک کن
                            </Button>


                        </div>

                        <div className={`sectionFB divBtnsFB ${!editCustomerTyep ? 'hideGe' : ''}`}>


                            <Button
                                variant="info"
                                className="btnSaveFB"
                                onClick={handleSubmitEdit}
                            >
                                ویرایش
                            </Button>
                        </div>

                    </form>
                </div>

                <div className="divLeftACuT">
                    {/* divListACut */}
                    <div className='containerShowGe divListACut '>
                        <h4 className="titleShowGe"> نوع مشتری تعریف شده </h4>
                        {/* <div className='listACuT'> */}
                        <div className="divListShowGe ">
                            <div className="rowListShowGe headRowListShowGe">
                                <span className="rowNumShowGe ">ردیف</span>
                                <span className="typeShowGe headTypeShowGe typeACuT">نوع مشتری</span>

                                <span className="headEditShowGe"> ویرایش  </span>
                                <span className="headDelShowGe"> حذف </span>

                            </div>
                            {customerTypes ? showCustomerTypes() : <Skeleton height={30} count={8} />}

                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default AddCustomerType;



