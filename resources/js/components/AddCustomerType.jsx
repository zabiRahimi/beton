import Button from 'react-bootstrap/Button';
import { useLoaderData, useParams } from "react-router-dom";

import Title from "./hooks/Title";
import "../../css/formBeton.css";
import "../../css/addCustomerType.css";
import { useEffect, useState } from 'react';
import axios from 'axios';


export async function loader({ params }) {
    let customerTData;

    // await localforage.getItem("products").then((value) => {
    //     customerTData = value.filter((item) => item.id == params.id);
    // });

    // let val=await axios.get("/api/v1/getAllCustomerType").then((response) => {
    //     customerTData= response.data.CustomerTypes;
    // });
    // // customerTData=[[id=>1, name=>'eee']]

    return { customerTData };
}


const AddCustomerType = () => {

    // const { customerTData } = useLoaderData();
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
            return <span key={i}>{customerType['type']}<i>{customerType['id']}</i></span>

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
                    <div className='divListACut'>
                        <h4> نوع مشتری تعریف شده </h4>
                        <div className='listACuT'>
                            {customerTypes ? showCustomerTypes():''}
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



