import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import HeadPage from '../HeadPage';
import SandRemittanceSearch from './SandRemittanceSearch';
import Skeleton from 'react-loading-skeleton';
import Pagination from '../../../hooks/Pagination';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const Show = () => {
    const MySwal = withReactContent(Swal);
    const [loading, setLoading] = useState(false);
    const hasCalledGetSandRemittances = useRef(false);
    const [sandRemittances, setSandRemittances] = useState(null);
    const [totalPage, setTotalPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0);
    const [search, setSearch] = useState({
        startDate: '',//تاریخ ثبت حواله
        endDate: '',
        date: '',//تاریخ خرید حواله
        id: '',
        buyerName: '',
        buyerLastName: '',
        buyerFather: '',
        remittanceNumber: '',
        price: '',
        isCompleted: true,
        factory: ''
    });

    useEffect(() => {
        if (!hasCalledGetSandRemittances.current) {
            getSandRemittances();
            hasCalledGetSandRemittances.current = true;
        }
    }, []);

    async function getSandRemittances(page = 1, startDate = search.startDate,
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

        try {
            setLoading(true);
            const response = await axios.get(`/api/v1/sandRemittances`, {
                params: { page, startDate, endDate, date, id, buyerName, buyerLastName, buyerFather, remittanceNumber, price, isCompleted, factory }
            });

            const datas = response.data.sandRemittances;
            setSandRemittances(datas.data);
            setTotalPage(datas.last_page);
            setTotalRecords(datas.total);
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
    const returnSandRemittances = () => {
        let length = sandRemittances.length;
        if (length == 0) {
            return <div className="notResultSearch_Se"> هیچ نتیجه‌ای یافت نشد!! </div>
        }
        let value = sandRemittances.map((sandRemittance, i) => {
            let price = Number(sandRemittance['price']).toLocaleString();
            let remainingPrice = Number(sandRemittance['remainingPrice']).toLocaleString();
            let date = sandRemittance['date'].split('-');
            let isCompleted = sandRemittance['isCompleted'] ? 'مانده' : 'تمام';
            return <div className="rowListShowACSI_Ge" key={i}>
                <span className="rowNumShowACSI_Ge">{i + 1}</span>
                <span className="ticketNumberACSI_Ge">{sandRemittance['id']}</span>
                <span className="remittanceNumber_Ge">{sandRemittance['remittanceNumber']}</span>
                <span className="customerACSI_Ge buyerName_Ge">{sandRemittance['buyerName']}{'  '}{sandRemittance['buyerLastName']} {'  '} <span className='bueryFather_Ge'>{sandRemittance['buyerFather']}</span> </span>
                <span className="price_Ge textAlignCenter_Ge">{price}</span>
                <span className="price_Ge textAlignCenter_Ge">{remainingPrice}</span>
                <span className="factory_Ge">{sandRemittance['factory']}</span>
                <span className="dateACSI_Ge">{`${date[0]}/${date[1]}/${date[2]}`}</span>
                <span className={`isCompleted_Ge ${sandRemittance['isCompleted'] ? 'true_Ge' : 'false_Ge'}`}>{isCompleted}</span>
                <div className="divEditACSI_Ge">
                    <Link className="--styleLessLink  btnEditACSI_Ge"
                        title=" ویرایش "
                        to={`/invoices/sandRemittance/edit/${sandRemittance['id']}`}
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
            <div className='containerShowGe containerShowCustomer' >
                <div className="divListShowGe">
                    <SandRemittanceSearch
                        getSandRemittances={getSandRemittances}
                        handelSetDataSearch={handelSetDataSearch}
                        totalRecords={totalRecords}
                    />

                    <div className="rowListShowGe headRowListShowGe rowListShowACSI_Ge">
                        <span className="rowNumShowACSI_Ge ">ردیف</span>
                        <span className="ticketNumberACSI_Ge ">شناسه</span>
                        <span className="remittanceNumber_Ge ">شماره حواله</span>
                        <span className="customerHeadACSI_Ge buyerName_Ge textAlignCenter_Ge">خریدار</span>
                        <span className="price_Ge textAlignCenter_Ge"> مبلغ </span>
                        <span className="price_Ge textAlignCenter_Ge"> مبلغ مانده </span>
                        <span className="factory_Ge">کارخانه</span>
                        <span className="dateACSI_Ge textAlignCenter_Ge">تاریخ خرید</span>
                        <span className="isCompleted_Ge">وضعیت</span>
                        <span className="editHeadShowACSI_Ge"> ویرایش  </span>
                        <span className="delHeadShowACSI_Ge"> حذف </span>
                    </div>
                    {sandRemittances ? returnSandRemittances() : <Skeleton height={40} count={12} />}
                    <Pagination
                        className="pagination-bar"
                        currentPage={currentPage}
                        totalPage={totalPage}
                        siblingCount={3}
                        onPageChange={page => { setCurrentPage(page); getSandRemittances(page) }}
                    />

                </div>
            </div>
        </div>
    )
}
export default Show;