import Button from 'react-bootstrap/Button';
import { useLoaderData, useParams } from "react-router-dom";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import Title from "./hooks/Title";
import "../../css/formBeton.css";
import "../../css/addCustomerType.css";
import { useEffect, useState } from 'react';
import axios from 'axios';





const AddCustomerType = () => {

    const [customerTypes, setCustomerTypes] = useState(null);
   
    console.log(customerTypes);

    const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    const [type, setType] = useState();

    useEffect(()=>{
        getData()
    },[])

    async function getData() {
        let customerTData;
    
        // await localforage.getItem("products").then((value) => {
        //     customerTData = value.filter((item) => item.id == params.id);
        // });
    
        let val=await axios.get("/api/v1/getAllCustomerType").then((response) => {
            customerTData= response.data.CustomerTypes;
        });
        // customerTData=[[id=>1, name=>'eee']]
    
        setCustomerTypes(customerTData)
    }

    const showCustomerTypes= () =>{
        let value = customerTypes.map((customerType, i)=>{
            // return <span key={i}>{customerType['type']}<i>{customerType['id']}</i></span>
            return  <div className="rowListShowGe rowListACuT" key={i}>
            <span className="rowNumShowGe rowNumACuT">{i+1}</span>
            <span className="typeShowGe typeACuT"> {customerType['type']} </span>

            <div className="divEditGe">
                <button className="--styleLessBtn btnEditGe" title=" ویرایش "
                    // onClick={showFormEditCustomer}
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

    const handleChangeInput = (event) => {
        // const value= e.current.value;
        setType(event.target.value);
        

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

            // form.current.reset();

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

    return (
        <>
            <Title title="تعریف نوع مشتری" />

            <div className="containerACuT">

                <div className="divRightACuT">
                    <form action="" className="formBeton">
                        <div className="sectionFB">
                            <div className="divInputFB divInputFB2">
                                <label>نوع مشتری</label>
                                <input
                                    type="text"
                                    className="inputTextFB"
                                    // value={type}
                                    onChange={handleChangeInput}
                                    autoFocus
                                />
                            </div>


                        </div>

                        <div className="sectionFB divBtnsFB">
                            <Button
                                variant="success"
                                className="btnSaveFB"
                                onClick={handleSubmit}
                            >
                                ثبت
                            </Button>

                            <Button type="reset" variant="warning"> پاک کن </Button>
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
                            {customerTypes ? showCustomerTypes():<Skeleton height={30} count={8} />}
                            {/* <span> خریدار بتن </span>
                            <span> خریدار ضایعات </span>
                            <span> فروشنده شن و ماسه </span>
                            <span> فروشنده سیمان </span>
                            <span> فروشنده آب </span>
                            <span> فروشنده پودرسنگ </span>
                            <span> پرسنل </span>
                            <span> مالک خودرو </span>
                            <span> راننده میکسر </span>
                            <span> راننده لودر </span>
                            <span> راننده پمپ </span>
                            <span> اپراتور پمپ </span> */}
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default AddCustomerType;



