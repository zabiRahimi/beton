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
    const hasCalledgetSandInvoices = useRef(false);
    const [sandInvoices, setSandInvoices] = useState(null);
    const [totalPage, setTotalPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0);
    const [search, setSearch] = useState({
        startDate: '',//تاریخ ثبت حواله
        endDate: '',
        date: '',//تاریخ بارگیری
        id: '',
        billNumber: '',
        sandType: '',
        sandStoreId: '',
        dumpTruckOwnerId: '',
        dumpTruckOwnerName: '',
        dumpTruckOwnerLastName: '',
        dumpTruckId: '',
        numberplate: '',
        driverId: '',
        driverName: '',
        driverLastName: '',
        sandRemittanceId: '',
        sandRemittanceNumber: '',
        sandRemittanceBuyerName: '',
        sandRemittanceBuyerLastName: '',
        sandRemittancePrice: '',
        factory: ''
    });

    useEffect(() => {
        if (!hasCalledgetSandInvoices.current) {
            getSandInvoices();
            hasCalledgetSandInvoices.current = true;
        }
    }, []);

    async function getSandInvoices(
        page = 1,
        startDate = search.startDate,
        endDate = search.endDate,
        date = search.date,
        id = search.id,
        billNumber = search.billNumber,
        sandType = search.sandType,
        sandStoreId = search.sandStoreId,
        dumpTruckOwnerId = search.dumpTruckOwnerId,
        dumpTruckOwnerName = search.dumpTruckOwnerName,
        dumpTruckOwnerLastName = search.dumpTruckOwnerLastName,
        dumpTruckId = search.dumpTruckId,
        numberplate = search.numberplate,
        driverId = search.driverId,
        driverName = search.driverName,
        driverLastName = search.driverLastName,
        sandRemittanceId = search.sandRemittanceId,
        sandRemittanceNumber = search.sandRemittanceNumber,
        sandRemittanceBuyerName = search.sandRemittanceBuyerName,
        sandRemittanceBuyerLastName = search.sandRemittanceBuyerLastName,
        sandRemittancePrice = search.sandRemittancePrice,
        factory = search.factory) {

        try {
            setLoading(true);
            const response = await axios.get(`/api/v1/sandInvoices`, {
                params: {
                    page,
                    startDate,
                    endDate,
                    date,
                    id,
                    billNumber,
                    sandType,
                    sandStoreId,
                    dumpTruckOwnerId,
                    dumpTruckOwnerName,
                    dumpTruckOwnerLastName,
                    dumpTruckId,
                    numberplate,
                    driverId,
                    driverName,
                    driverLastName,
                    sandRemittanceId,
                    sandRemittanceNumber,
                    sandRemittanceBuyerName,
                    sandRemittanceBuyerLastName,
                    sandRemittancePrice,
                    factory
                }
            });

            const data = response.data.sandInvoices;
            setSandInvoices(data.data);
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
    const returnSandInvoices = () => {
        let length = sandInvoices.length;
        if (length == 0) {
            return <div className="notResultSearch_Se"> هیچ نتیجه‌ای یافت نشد!! </div>
        }
        let value = sandInvoices.map((sandInvoice, i) => {
            let price = Number(sandInvoice['price']).toLocaleString();
            let remainingPrice = Number(sandInvoice['remainingPrice']).toLocaleString();
            let sandRemittance = sandInvoice['sand_remittance'];
            let dumpTruck = sandInvoice['truck'];
            let date = sandInvoice['date'].split('-');
            let numberplate=dumpTruck.numberplate.split('-');
            let dumpTruckOwner= dumpTruck.customer;

            return <div className="rowListShowACSI_Ge" key={i}>
                <span className="rowNumShowACSI_Ge">{i + 1}</span>
                <span className="ticketNumberACSI_Ge">{sandInvoice['id']}</span>
                <span className="remittanceNumber_Ge">{sandInvoice['billNumber']}</span>
                <span className="customerACSI_Ge buyerName_Ge">
                    {sandRemittance['buyerName']}{'  '}{sandRemittance['buyerLastName']} {'  '}
                    <span className='bueryFather_Ge'>{sandRemittance['remittanceNumber']}</span>
                </span>
                <span className="dumpTruckOwner_Ge textAlignCenter_Ge">
                    <span className='dumpTruckOwnerName_Ge'>{dumpTruckOwner['name']}{'  '}{dumpTruckOwner['lastName']}</span>
                    <span className='dumpTruckNumberplate_Ge'>
                        <div className="numberplateDiv">
                            <span className="numberplateDivS1">{numberplate[0]}</span>
                            <span className="numberplateDivS2">{numberplate[3] == 'ا' ? 'الف' : numberplate[3]}</span>
                            <span className="numberplateDivS3">{numberplate[1]}</span>
                            <span className="numberplateDivS4">{numberplate[2]}</span>
                        </div>
                    </span>
                </span>
                <span className="sandType_Ge sandType2_Ge textAlignCenter_Ge">{sandInvoice['sandType']}</span>
                
                <span className="dateACSI_Ge">{`${date[0]}/${date[1]}/${date[2]}`}</span>

                <div className="divEditACSI_Ge">
                    <Link className="--styleLessLink  btnEditACSI_Ge"
                        title=" ویرایش "
                        to={`/invoices/sandRemittance/edit/${sandInvoice['id']}`}
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
                title='مشاهده فاکتورهای شن و ماسه'
                displayBtnAdd={true}
                displayBtnShow={false}
            />
            <div className='containerShowGe containerShowCustomer' >
                <div className="divListShowGe">
                    <Search
                        getSandInvoices={getSandInvoices}
                        handelSetDataSearch={handelSetDataSearch}
                        totalRecords={totalRecords}
                    />

                    <div className="rowListShowGe headRowListShowGe rowListShowACSI_Ge">
                        <span className="rowNumShowACSI_Ge ">ردیف</span>
                        <span className="ticketNumberACSI_Ge ">شناسه</span>
                        <span className="remittanceNumber_Ge ">شماره قبض</span>
                        <span className="customerHeadACSI_Ge buyerName_Ge textAlignCenter_Ge">حواله</span>
                        <span className="dumpTruckOwner_Ge textAlignCenter_Ge"> کمپرسی </span>
                        <span className="sandType_Ge textAlignCenter_Ge"> شن‌‌‌وماسه </span>
                        <span className="dateACSI_Ge textAlignCenter_Ge">تاریخ </span>
                        <span className="editHeadShowACSI_Ge"> ویرایش  </span>
                        <span className="delHeadShowACSI_Ge"> حذف </span>
                    </div>
                    {sandInvoices ? returnSandInvoices() : <Skeleton height={40} count={12} />}
                    {/* <Pagination
                        className="pagination-bar"
                        currentPage={currentPage}
                        totalPage={totalPage}
                        siblingCount={3}
                        onPageChange={page => { setCurrentPage(page); getSandInvoices(page) }}
                    /> */}

                </div>
            </div>
        </div>
    )
}
export default Show;