import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import HeadPage from '../HeadPage';
import SandRemittanceSearch from './SandRemittanceSearch';
import RouteService from './RouteService';
import Skeleton from 'react-loading-skeleton';
// import { Pagination } from 'react-bootstrap';
import Pagination from '../../../hooks/Pagination';

const Show = () => {
    const [loading, setLoading] = useState(false);
    const hasCalledGetConcreteSalesInvoices = useRef(false);
    const containerShowGeRef = useRef(null);
    const [sandRemittances, setConcreteSalesInvoices] = useState(null);
    /**
   * ############### states for paginate
   */
    const [totalPage, setTotalPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0);

    const { concretes } = RouteService({ setLoading });

    useEffect(() => {
        // این شرط اطمینان می‌دهد که متد فقط یک بار اجرا شود
        if (!hasCalledGetConcreteSalesInvoices.current) {
            getSandRemittances();
            hasCalledGetConcreteSalesInvoices.current = true;
        }
    }, []);
    const [search, setSearch] = useState({
        startDate: '',//تاریخ ثبت حواله
        endDate: '',
        date: '',//تاریخ خرید حواله
        id: '',
        buyerName:'',
        buyerLastName:'',
        buyerFather:'',
        remittanceNumber:'',
        price:'',
        isCompleted:'',
        factory:''
    });
    async function getSandRemittances(
        page = 1,
        startDate = search.startDate,
        endDate = search.endDate,
        date = search.date,
        id = search.id,
        buyerName = search.buyerName,
        buyerLastName = search.buyerLastName,
        buyerFather = search.buyerFather,
        remittanceNumber = search.remittanceNumber,
        price = search.price,
        isCompleted = search.isCompleted,
        factory = search.factory) {
        setLoading(true)
        await axios.get(`/api/v1/sandRemittances?page=${page}`, {
            params: {
                startDate,
                endDate,
                date,
                id,
                buyerName,
                buyerLastName,
                buyerFather,
                remittanceNumber,
                price,
                isCompleted,
                factory
            }
        }).then((response) => {
            const salesInvoices = response.data.sandRemittances;
            setConcreteSalesInvoices(salesInvoices.data);
            setTotalPage(salesInvoices.last_page);
            setTotalRecords(salesInvoices.total);
            // if (salesInvoices.current_page == 1) {
            //     setTicketNumber(salesInvoices.data[0]['id'] + 1);
            // }
            window.scrollTo({
                top: top,
                behavior: 'smooth'
            });
        }).catch(
            error => {
                if (error.response && error.response.status == 422) {
                    const objErrors = error.response.data.errors;
                    // دریافت اولین کلید آبجکت و سپس مقدار آن
                    const firstKey = Object.keys(objErrors)[0];
                    const firstValue = objErrors[firstKey];
                    MySwal.fire({
                        icon: "warning",
                        title: "هشدار",
                        html: `<div style="color: red;">${firstValue[0]}</div>`,
                        confirmButtonText: "متوجه شدم!",
                        confirmButtonColor: "#d33",
                    });
                }
            }
        )
        setTimeout(() => {
            setLoading(false)
        }, 300);
    }

    /**
    * از طریق کامپوننت فرزند این متد فراخوانی و مقدار دهی می‌شود
    * from AddCustomerSearch.jsx
    * @param {} data 
    */
    const handelSetDataSearch = (data) => {
        setSearch(data);
    }

    /**
     * رکوردهای مشتریان ایجاد شده را با فرمت‌دهی مناسب جهت نمایش بر می گرداند
     * @returns 
     */
    const returnSandRemittances = () => {
        let length = sandRemittances.length;
        if (length == 0) {
            return <div className="notResultSearch_Se"> هیچ نتیجه‌ای یافت نشد!! </div>
        }
        let value = sandRemittances.map((sandRemittance, i) => {
            let price = Number(sandRemittance['price']).toLocaleString();
            let remainingPrice = Number(sandRemittance['remainingPrice']).toLocaleString();
            let date = sandRemittance['date'].split('-');
            let isCompleted = sandRemittance['isCompleted']? 'مانده':'تمام';
            return <div className="rowListShowACSI_Ge" key={i}>
                <span className="rowNumShowACSI_Ge">{i + 1}</span>
                <span className="ticketNumberACSI_Ge">{sandRemittance['id']}</span>
                <span className="ticketNumberACSI_Ge">{sandRemittance['remittanceNumber']}</span>
                <span className="customerACSI_Ge">{sandRemittance['buyerName']}{'  '}{sandRemittance['buyerLastName']} {'  '} <span>{sandRemittance['buyerFather']}</span> </span>
                <span className="concreteACSI_Ge">{price}</span>
                <span className="concreteACSI_Ge">{remainingPrice}</span>
                
               
                <span className="dateACSI_Ge">{`${date[0]}/${date[1]}/${date[2]}`}</span>
                <span className="dateACSI_Ge">{isCompleted}</span>
                <div className="divEditACSI_Ge">
                    <Link className="--styleLessLink  btnEditACSI_Ge"
                        title=" ویرایش "
                        to={`/invoices/concreteSalesInvoice/edit/${sandRemittances['id']}`}
                    // onClick={() => { showEditForm(concreteSalesInvoice.id); handleRemoveErrorCustomer() }}
                    >
                        <i className="icofont-pencil iEditGe" />
                    </Link>
                </div>
                <div className="divDelACSI_Ge">
                    <button className="--styleLessBtn btnDelACSI_Ge" title=" حذف ">
                        <i className="icofont-trash iDelGe" />
                    </button>
                </div>
            </div>
        })
        return value;
    }

    return (
        <div className=''>
            <HeadPage
                loading={loading}
                title='مشاهده فاکتورهای خرید بتن'
                displayBtnAdd={true}
                displayBtnShow={false}
            />
            <div className='containerShowGe containerShowCustomer'
                ref={containerShowGeRef}
            >

                <div className="divListShowGe">
                    {/* <SandRemittanceSearch
                        getSandRemittances={getSandRemittances}
                        handelSetDataSearch={handelSetDataSearch}
                        concretes={concretes}
                        totalRecords={totalRecords}
                    /> */}

                    <div className="rowListShowGe headRowListShowGe rowListShowACSI_Ge">
                        <span className="rowNumShowACSI_Ge ">ردیف</span>
                        <span className="ticketNumberACSI_Ge ">شناسه</span>
                        <span className="ticketNumberACSI_Ge ">شماره حواله</span>
                        <span className="customerHeadACSI_Ge">خریدار</span>
                        <span className="concreteACSI_Ge textAlignCenter"> مبلغ </span>
                        <span className="concreteACSI_Ge textAlignCenter"> مبلغ مانده </span>
                        <span className="dateACSI_Ge textAlignCenter">تاریخ خرید</span>
                        <span className="driverHeadACSI_Ge">وضعیت</span>
                        <span className="editHeadShowACSI_Ge"> ویرایش  </span>
                        <span className="delHeadShowACSI_Ge"> حذف </span>
                    </div>
                    {sandRemittances ? returnSandRemittances() : <Skeleton height={40} count={12} />}
                    {/* <Pagination
                        className="pagination-bar"
                        currentPage={currentPage}
                        totalPage={totalPage}
                        siblingCount={3}
                        onPageChange={page => { setCurrentPage(page); getSandRemittances(page) }}
                    /> */}

                </div>
            </div>
        </div>
    )
}
export default Show;