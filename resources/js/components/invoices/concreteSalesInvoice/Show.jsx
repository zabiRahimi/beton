import { useState } from 'react';
import HeadPage from './HeadPage';

const Show = () => {
    const [loading, setLoading] = useState(false);
    //     useEffect(() => {
    //         // این شرط اطمینان می‌دهد که متد فقط یک بار اجرا شود
    //         if (!hasCalledGetConcreteSalesInvoices.current) {
    //             getConcreteSalesInvoices();
    //             hasCalledGetConcreteSalesInvoices.current = true;
    //         }
    //     }, []);
    //     const [search, setSearch] = useState({
    //         startDate: '',
    //         endDate: '',
    //         id: '',
    //         concrete_id: '',
    //         customer_id: '',
    //         customerName: '',
    //         customerLastName: '',
    //         truck_id: '',
    //         numberplate: '',
    //         owner_id: '',
    //         ownerName: '',
    //         ownerLastName: '',
    //         driver_id: '',
    //         driverName: '',
    //         driverLastName: '',
    //     });
    //     async function getConcreteSalesInvoices(
    //         page = 1,
    //         startDate = search.startDate,
    //         endDate = search.endDate,
    //         id = search.id,
    //         concrete_id = search.concrete_id,
    //         customer_id = search.customer_id,
    //         customerName = search.customerName,
    //         customerLastName = search.customerLastName,
    //         truck_id = search.truck_id,
    //         numberplate = search.numberplate,
    //         owner_id = search.owner_id,
    //         ownerName = search.ownerName,
    //         ownerLastName = search.ownerLastName,
    //         driver_id = search.driver_id,
    //         driverName = search.driverName,
    //         driverLastName = search.driverLastName) {
    //         setLoading(true)
    //         await axios.get(`/api/v1/getConcreteSalesInvoices?page=${page}`, {
    //             params: {
    //                 startDate,
    //                 endDate,
    //                 id,
    //                 concrete_id,
    //                 customer_id,
    //                 customerName,
    //                 customerLastName,
    //                 truck_id,
    //                 numberplate,
    //                 owner_id,
    //                 ownerName,
    //                 ownerLastName,
    //                 driver_id,
    //                 driverName,
    //                 driverLastName
    //             }
    //         }).then((response) => {
    //             const salesInvoices = response.data.concreteSalesInvoices;
    //             setConcreteSalesInvoices(salesInvoices.data);
    //             setTotalPage(salesInvoices.last_page);
    //             setTotalRecords(salesInvoices.total);
    //             if (salesInvoices.current_page == 1) {
    //                 setTicketNumber(salesInvoices.data[0]['id'] + 1);
    //             }
    //             window.scrollTo({
    //                 top: top,
    //                 behavior: 'smooth'
    //             });
    //         }).catch(
    //             error => {
    //                 if (error.response && error.response.status == 422) {
    //                     const objErrors = error.response.data.errors;
    //                     // دریافت اولین کلید آبجکت و سپس مقدار آن
    //                     const firstKey = Object.keys(objErrors)[0];
    //                     const firstValue = objErrors[firstKey];
    //                     MySwal.fire({
    //                         icon: "warning",
    //                         title: "هشدار",
    //                         html: `<div style="color: red;">${firstValue[0]}</div>`,
    //                         confirmButtonText: "متوجه شدم!",
    //                         confirmButtonColor: "#d33",
    //                     });
    //                 }
    //             }
    //         )
    //         setTimeout(() => {
    //             // setLoading(false)
    //         }, 300);
    //     }

    //     /**
//     * از طریق کامپوننت فرزند این متد فراخوانی و مقدار دهی می‌شود
//     * from AddCustomerSearch.jsx
//     * @param {} data 
//     */
//     const handelSetDataSearch = (data) => {
//         setSearch(data);
//     }

//     /**
//      * رکوردهای مشتریان ایجاد شده را با فرمت‌دهی مناسب جهت نمایش بر می گرداند
//      * @returns 
//      */
//     const returnCreatedCustomerRecords = () => {
//         let length = concreteSalesInvoices.length;
//         if (length == 0) {
//             return <div className="notResultSearch_Se"> هیچ نتیجه‌ای یافت نشد!! </div>
//         }
//         let value = concreteSalesInvoices.map((concreteSalesInvoice, i) => {
//             let numberplate = concreteSalesInvoice['truck'].numberplate.split('-');
//             let date = concreteSalesInvoice['date'].split('-');
//             return <div className="rowListShowACSI_Ge" key={i}>
//                 <span className="rowNumShowACSI_Ge">{i + 1}</span>{/* ردیف */}
//                 <span className="ticketNumberACSI_Ge">{concreteSalesInvoice['id']}</span>{/* قبض */}
//                 <span className="customerACSI_Ge">{concreteSalesInvoice['customer'].name}{'  '}{concreteSalesInvoice['customer'].lastName}</span>{/* خریدار */}
//                 <span className="concreteACSI_Ge">{concreteSalesInvoice['concrete'].concreteName}</span>{/* بتن */}
//                 <span className="truckACSI_Ge"><div className="numberplateDiv">
//                     <span className="numberplateDivS1">{numberplate[0]}</span>
//                     <span className="numberplateDivS2">{numberplate[3] == 'ا' ? 'الف' : numberplate[3]}</span>
//                     <span className="numberplateDivS3">{numberplate[1]}</span>
//                     <span className="numberplateDivS4">{numberplate[2]}</span>
//                 </div></span>{/* میکسر */}
//                 <span className="driverACSI_Ge"> {concreteSalesInvoice['driver'].name}{'  '}{concreteSalesInvoice['driver'].lastName}</span>{/* راننده */}
//                 <span className="dateACSI_Ge">{`${date[0]}/${date[1]}/${date[2]}`}</span>{/* تاریخ */}
//                 <span className="timeACSI_Ge">{concreteSalesInvoice['time']}</span>{/* ساعت */}
//                 <div className="divEditACSI_Ge">
//                     <button className="--styleLessBtn btnEditACSI_Ge" title=" ویرایش "
//                         onClick={() => { showEditForm(concreteSalesInvoice.id); handleRemoveErrorCustomer() }}
//                     >
//                         <i className="icofont-pencil iEditGe" />
//                     </button>
//                 </div>
//                 <div className="divDelACSI_Ge">
//                     <button className="--styleLessBtn btnDelACSI_Ge" title=" حذف ">
//                         <i className="icofont-trash iDelGe" />
//                     </button>
//                 </div>
//             </div>
//         })
//         return value;
//     }

    return (
        <div className=''>
            <HeadPage
                loading={loading}
                title='مشاهده فاکتورهای خرید بتن'
                displayBtnAdd={true}
                displayBtnShow={false}
            />
        </div>
    )
}
export default Show;