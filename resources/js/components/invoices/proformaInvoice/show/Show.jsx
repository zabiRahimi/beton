import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import HeadPage from '../HeadPage';
import Search from './Search';
import Skeleton from 'react-loading-skeleton';
import Pagination from '../../../hooks/Pagination';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const Show = () => {
    const MySwal = withReactContent(Swal);
    const [loading, setLoading] = useState(false);
    const hasCalledgetProforamInvoices = useRef(false);
    const [proformaInvoices, setProformaInvoices] = useState(null);
    const [totalPage, setTotalPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0);
    const [search, setSearch] = useState({
        startDate: '',//تاریخ ثبت پیش فاکتور
        endDate: '',
        date: '',//تاریخ پیش فاکتور
        id: '',
        buyer: '',
        tel: '',
        nationalCode: '',
    });

    useEffect(() => {
        if (!hasCalledgetProforamInvoices.current) {
            getProforamInvoices();
            hasCalledgetProforamInvoices.current = true;
        }
    }, []);

    async function getProforamInvoices(
        page = 1,
        startDate = search.startDate,
        endDate = search.endDate,
        date = search.date,
        id = search.id,
        buyer = search.buyer,
        tel = search.tel,
        nationalCode = search.nationalCode,
    ) {

        try {
            setLoading(true);
            console.log(111);
            const response = await axios.get(`/api/v1/proformaInvoices`, {
                params: {
                    page,
                    startDate,
                    endDate,
                    date,
                    id,
                    buyer,
                    tel,
                    nationalCode
                }
            });

            console.log(response.data);
            const data = response.data.proformaInvoices;
            setProformaInvoices(data.data);
            setTotalPage(data.last_page);
            setTotalRecords(data.total);
            window.scrollTo({ top: top, behavior: 'smooth' });
        } catch (error) {
            if (error.response && error.response.status === 422) {
                const objErrors = error.response.data.errors;
                const firstKey = Object.keys(objErrors)[0];
                const firstValue = objErrors[firstKey][0];

                MySwal.fire({
                    icon: "warning",
                    title: "هشدار",
                    html: `<div style="color: red;">${firstValue}</div>`,
                    confirmButtonText: "متوجه شدم!",
                    confirmButtonColor: "#d33",
                });
            }
        } finally {
            setLoading(false);
        }
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
    const returnProforamInvoices = () => {
        let length = proformaInvoices.length;
        if (length == 0) {
            return <div className="notResultSearch_Se"> هیچ نتیجه‌ای یافت نشد!! </div>
        }
        let value = proformaInvoices.map((proformaInvoice, i) => {
           
            let date = proformaInvoice['date'].split('-');
           

            return <div className="rowListShowACSI_Ge" key={i}>
                <span className="rowNumShowACSI_Ge">{i + 1}</span>
                <span className="ticketNumberACSI_Ge">{proformaInvoice['id']}</span>
                <span className="customerACSI_Ge buyerName_Ge">
                    {proformaInvoice['buyer']}
                </span>

                <span className="dateACSI_Ge">{`${date[0]}/${date[1]}/${date[2]}`}</span>
                <div className="divDisplayACSI_Ge">
                    <Link className="--styleLessLink  btnEditACSI_Ge"
                        title=" مشاهده "
                        to={`/invoices/proformaInvoice/display/${proformaInvoice['id']}`}
                    >
                        <i className="icofont-black-board  iDisplayGe" />
                    </Link>
                </div>
                <div className="divEditACSI_Ge">
                    <Link className="--styleLessLink  btnEditACSI_Ge"
                        title=" ویرایش "
                        to={`/invoices/proformaInvoice/edit/${proformaInvoice['id']}`}
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
                title='مشاهده پیش فاکتورها'
                displayBtnAdd={true}
                displayBtnShow={false}
            />
            <div className='containerShowGe containerShowCustomer' >
                <div className="divListShowGe">
                    <Search
                        getProforamInvoices={getProforamInvoices}
                        handelSetDataSearch={handelSetDataSearch}
                        totalRecords={totalRecords}
                    />

                    <div className="rowListShowGe headRowListShowGe rowListShowACSI_Ge">
                        <span className="rowNumShowACSI_Ge ">ردیف</span>
                        <span className="ticketNumberACSI_Ge ">شناسه</span>
                        <span className="customerHeadACSI_Ge buyerName_Ge textAlignCenter_Ge">خریدار</span>
                        <span className="dateACSI_Ge textAlignCenter_Ge">تاریخ </span>
                        <span className="displayHeadShowACSI_Ge"> مشاهده  </span>
                        <span className="editHeadShowACSI_Ge"> ویرایش  </span>
                        <span className="delHeadShowACSI_Ge"> حذف </span>
                    </div>
                    {proformaInvoices ? returnProforamInvoices() : <Skeleton height={40} count={12} />}
                    {/* <Pagination
                        className="pagination-bar"
                        currentPage={currentPage}
                        totalPage={totalPage}
                        siblingCount={3}
                        onPageChange={page => { setCurrentPage(page); getProforamInvoices(page) }}
                    /> */}

                </div>
            </div>
        </div>
    )
}
export default Show;