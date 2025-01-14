import { Link, useLocation } from "react-router-dom";
import "../../css/home.css";
import Title from "./hooks/Title";
import { useEffect, useState } from "react";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';


const Home = () => {
    const { pathname } = useLocation();
    const [cementInventorys, setCementInventorys] = useState(null);
    const [sandInventorys, setSandInventorys] = useState(null);
    const [waterInventorys, setWaterInventorys] = useState(null);
    const [loadingCement, setLoadingCement] = useState(true);
    const [loadingSand, setLoadingSand] = useState(true);
    const [loadingWater, setLoadingWater] = useState(true);
    const [totalCement, setTotalCement] = useState(0);
    const [totalSand, setTotalSand] = useState(0);
    const [totalWater, setTotalWater] = useState(0);


    useEffect(() => {
        if ('scrollRestoration' in history) {
            // Back off, browser, I got this...
            history.scrollRestoration = 'manual';
        }

        window.scrollTo(0, 0);
        getCementInventorys();
        getSandInventorys();
        getWaterInventorys();

    }, []);

    // جهت بدست آوردن مجموع مقادیر سیلوهای سیمان
    useEffect(() => {
        if (cementInventorys && cementInventorys.length > 0) {
            let sum = cementInventorys.reduce((total, item) => total + parseInt(item.amount), 0);
            setTotalCement(sum);
        }

    }, [cementInventorys]);

    // جهت بدست آوردن مجموع مقادیر سیلوهای شن‌وماسه
    useEffect(() => {
        if (sandInventorys && sandInventorys.length > 0) {
            let sum = sandInventorys.reduce((total, item) => total + parseInt(item.amount), 0);
            setTotalSand(sum);
        }

    }, [sandInventorys]);

    // جهت بدست آوردن مجموع مقادیر مخازن آب
    useEffect(() => {
        if (waterInventorys && waterInventorys.length > 0) {
            let sum = waterInventorys.reduce((total, item) => total + parseInt(item.amount), 0);
            setTotalWater(sum);
        }

    }, [waterInventorys]);

    async function getCementInventorys() {
        await axios.get("/api/v1/getCementInventorys").then((response) => {
            setCementInventorys(response.data.cementInventorys);
            setLoadingCement(false);
        });
    }

    async function getSandInventorys() {
        await axios.get("/api/v1/getSandInventorys").then((response) => {
            setSandInventorys(response.data.sandInventorys);
            setLoadingSand(false);
        });
    }

    async function getWaterInventorys() {
        await axios.get("/api/v1/getWaterInventorys").then((response) => {
            setWaterInventorys(response.data.waterInventorys);
            setLoadingWater(false);
        });
    }



    /**
      * رکوردهای سیلوهای سیمان ایجاد شده را با فرمت‌دهی مناسب جهت نمایش بر می گرداند
      * @returns 
      */
    const returnCreatedCementSiloRecords = () => {
        if (cementInventorys && cementInventorys.length > 0) {
            let value = cementInventorys.map((cementInventory, i) => {
                return <div className="rowSiloRHome" key={i}>
                    <div className="nameSiloRHome"> {cementInventory['silo']} </div>
                    <div className="amountSiloRHome"> {parseInt(cementInventory['amount']).toLocaleString()} </div>
                    <div className="unitSiloRhome"> کیلوگرم </div>
                </div>
            });
            return value;
        } else {
            return <div className="notRowSiloRHome" >
                هنوز هیچ سیلویی تعریف نشده است.
            </div>
        }
    }

    /**
      * رکوردهای سیلوهای شن‌وماسه ایجاد شده را با فرمت‌دهی مناسب جهت نمایش بر می گرداند
      * @returns 
      */
    const returnCreatedSandSiloRecords = () => {
        if (sandInventorys && sandInventorys.length > 0) {
            let value = sandInventorys.map((sandInventory, i) => {
                return <div className="rowSiloRHome" key={i}>
                    <div className="nameSiloRHome"> {sandInventory['silo']} </div>
                    <div className="amountSiloRHome"> {parseInt(sandInventory['amount']).toLocaleString()} </div>
                    <div className="unitSiloRhome"> کیلوگرم </div>
                </div>
            });
            return value;
        } else {
            return <div className="notRowSiloRHome" >
                هنوز هیچ سیلویی تعریف نشده است.
            </div>
        }
    }

    /**
      * رکوردهای مخزن‌های آب ایجاد شده را با فرمت‌دهی مناسب جهت نمایش بر می گرداند
      * @returns 
      */
    const returnCreatedWaterReservoirRecords = () => {
        if (waterInventorys && waterInventorys.length > 0) {
            let value = waterInventorys.map((waterInventory, i) => {
                return <div className="rowSiloRHome" key={i}>
                    <div className="nameSiloRHome"> {waterInventory['reservoir']} </div>
                    <div className="amountSiloRHome"> {parseInt(waterInventory['amount']).toLocaleString()} </div>
                    <div className="unitSiloRhome"> کیلوگرم </div>
                </div>
            });
            return value;
        } else {
            return <div className="notRowSiloRHome" >
                هنوز هیچ مخزنی تعریف نشده است.
            </div>
        }
    }

    return (
        <div className="containerHome">
            <Title title="داشبورد" />
            <main className="mainHome">
                <section className="categoryLinksHome firstCategoryLinksHome">
                    <Link to="invoices" className="linksHome --styleLessLink ">
                        <div className="divIcofontLinksHome">
                            <i className="icofont-attachment   iLinksHome factureLinkIHome " />
                            <i className="icofont-plus Iplus" />
                        </div>
                        <span>ثبت فاکتور</span>
                    </Link>

                    <Link to="customerContract" className="linksHome --styleLessLink ">
                        <div className="divIcofontLinksHome">
                            <i className="icofont-ui-clip-board miscellaneousIncomeIHome   iLinksHome iTruck " />
                            <i className="icofont-plus Iplus" />
                        </div>
                        <span>ثبت درآمدهای متفرقه</span>
                    </Link>

                    <Link to="customerContract" className="linksHome --styleLessLink ">
                        <div className="divIcofontLinksHome">
                            <i className="icofont-ui-file  CurrentCostsIHome  iLinksHome iTruck " />
                            <i className="icofont-plus Iplus" />
                        </div>
                        <span>ثبت هزینه‌های جاری</span>
                    </Link>

                    <Link to="customerContract" className="linksHome --styleLessLink ">
                        <div className="divIcofontLinksHome">
                            <i className="icofont-search-stock   iLinksHome  " />
                            {/* <i className="icofont-plus Iplus" /> */}
                        </div>
                        <span>آمار</span>
                    </Link>

                    <Link to="receipts" className="linksHome --styleLessLink ">
                    <div className="divIcofontLinksHome">
                        <i className="icofont-swoosh-down sDownRIHome "/>
                            <i className="icofont-coins  receiptsIHome  iLinksHome  " />
                            <i className="icofont-plus Iplus" />
                        </div>
                        <span> ثبت دریافتی‌ها </span>
                    </Link>
                </section>

                <div className="borderDivHome"></div>

                <section className="categoryLinksHome displayGoodsInventoryHome">
                    <Link to="addCementStore" className="linksDGIHome --styleLessLink ">
                        <div className="titleLinksDGIHome">
                            موجودی سیمان
                        </div>
                        <div className="divILinksDGIHome">
                            <i className="icofont-database  iLinkDGIHome cementILkDGIHome   " />
                        </div>
                        <div className="divStoreLDGIHome">
                            {loadingCement ? <Skeleton height={30} count={1} /> : returnCreatedCementSiloRecords()}
                        </div>
                        <div className="divTotalLDGIHome">
                            <div className="labelDTLDGIhome">مجموع</div>
                            <div className="amountDTLDGIhome">
                                {loadingCement ? <Skeleton height={30} count={1} /> : totalCement.toLocaleString()
                                }
                            </div>
                            <div className="unitDTLDGIhome">کیلو گرم</div>
                        </div>
                    </Link>

                    <Link to="addCementStore" className="linksDGIHome --styleLessLink ">
                        <div className="titleLinksDGIHome">
                            موجودی شن‌وماسه
                        </div>
                        <div className="divILinksDGIHome">
                            <i className="icofont-database iLinkDGIHome sandILDGIHome    " />
                        </div>
                        <div className="divStoreLDGIHome">
                            {loadingSand ? <Skeleton height={30} count={1} /> : returnCreatedSandSiloRecords()}
                        </div>
                        <div className="divTotalLDGIHome">
                            <div className="labelDTLDGIhome">مجموع</div>
                            <div className="amountDTLDGIhome">
                                {loadingSand ? <Skeleton height={30} count={1} /> : totalSand.toLocaleString()}
                            </div>
                            <div className="unitDTLDGIhome">کیلو گرم</div>
                        </div>
                    </Link>

                    <Link to="addCementStore" className="linksDGIHome --styleLessLink ">
                        <div className="titleLinksDGIHome">
                            موجودی آب
                        </div>
                        <div className="divILinksDGIHome">
                            <i className="icofont-database  iLinkDGIHome waterILDGIHome  " />
                        </div>
                        <div className="divStoreLDGIHome">
                        {loadingWater ? <Skeleton height={30} count={1} /> : returnCreatedWaterReservoirRecords()}
                        </div>
                        <div className="divTotalLDGIHome">
                            <div className="labelDTLDGIhome">مجموع</div>
                            <div className="amountDTLDGIhome">
                            {loadingWater ? <Skeleton height={30} count={1} /> : totalWater.toLocaleString()}
                            </div>
                            <div className="unitDTLDGIhome">کیلو گرم</div>
                        </div>
                    </Link>

                </section>

                <section className="categoryLinksHome">
                    <Link to="addCementStore" className="linksHome --styleLessLink ">
                        <div className="divIcofontLinksHome divIcofontAddCustomer">
                            <i className="icofont-database-add  iLinksHome iCementStoreHome  " />
                        </div>
                        <span>تعریف انبار سیمان</span>
                    </Link>

                    <Link to="addSandStore" className="linksHome --styleLessLink ">
                        <div className="divIcofontLinksHome divIcofontAddCustomer">
                            <i className="icofont-database-add  iLinksHome iSandStoreHome  " />
                        </div>
                        <span>تعریف انبار شن‌وماسه</span>
                    </Link>

                    <Link to="addWaterStore" className="linksHome --styleLessLink ">
                        <div className="divIcofontLinksHome divIcofontAddCustomer">
                            <i className="icofont-database-add  iLinksHome iWaterSrtorHome  " />
                        </div>
                        <span>تعریف انبار آب</span>
                    </Link>
                </section>

                <div className="borderDivHome"></div>

                <section className="categoryLinksHome secondCategoryLinksHome">

                    <Link to="addCustomer" className="linksHome --styleLessLink ">
                        <div className="divIcofontLinksHome divIcofontAddCustomer">
                            <i className="icofont-business-man iLinksHome iMan  " />
                            <i className="icofont-plus Iplus" />
                        </div>
                        <span>تعریف مشتری</span>
                    </Link>

                    {/* <Link to="addCustomerType" className="linksHome --styleLessLink ">
                    <div className="divIcofontLinksHome">
                        <i className="icofont-id-card  iLinksHome iTruck " />
                        <i className="icofont-plus Iplus" />
                    </div>
                    <span>تعریف نوع مشتری</span>
                </Link> */}

                    <Link to="addTruck" className="linksHome --styleLessLink ">
                        <div className="divIcofontLinksHome">
                            <i className="icofont-truck iLinksHome iTruck " />
                            <i className="icofont-plus Iplus" />
                        </div>
                        <span>تعریف کامیون</span>
                    </Link>

                    <Link to="addDriver" className="linksHome --styleLessLink ">
                        <div className="divIcofontLinksHome">
                            <i className="icofont-hotel-boy-alt  iLinksHome iTruck " />
                            <i className="icofont-plus Iplus" />
                        </div>
                        <span>تعریف راننده</span>
                    </Link>

                    <Link to="addPumpOperator" className="linksHome --styleLessLink ">
                        <div className="divIcofontLinksHome">
                            <i className="icofont-engineer  iLinksHome iTruck " />
                            <i className="icofont-plus Iplus" />
                        </div>
                        <span>تعریف اپراتور دکل</span>
                    </Link>

                    <Link to="addConcrete" className="linksHome --styleLessLink ">
                        <div className="divIcofontLinksHome">
                            <i className="icofont-cement-mixer  iLinksHome iTruck " />
                            <i className="icofont-plus Iplus" />
                        </div>
                        <span>تعریف نوع بتن</span>
                    </Link>

                    <Link to="addPersonnelSlip" className="linksHome --styleLessLink ">
                        <div className="divIcofontLinksHome">
                            <i className="icofont-id    iLinksHome iTruck " />
                            <i className="icofont-plus Iplus" />
                        </div>
                        <span>ایجاد و ثبت فیش حقوقی پرسنل</span>
                    </Link>

                    <Link to="customerContract" className="linksHome --styleLessLink ">
                        <div className="divIcofontLinksHome">
                            <i className="icofont-law-document   iLinksHome iTruck " />
                            <i className="icofont-plus Iplus" />
                        </div>
                        <span>ثبت قرارداد</span>
                    </Link>
                </section>

                <div className="borderDivHome"></div>

                <section className="categoryLinksHome">
                    <Link to="customerContract" className="linksHome --styleLessLink ">
                        <div className="divIcofontLinksHome">
                            <i className="icofont-ui-alarm    iLinksHome factureLinkIHome " />
                            <i className="icofont-plus Iplus" />
                        </div>
                        <span>ثبت اضافه‌کاری پرسنل</span>
                    </Link>
                    <Link to="customerContract" className="linksHome --styleLessLink ">
                        <div className="divIcofontLinksHome">
                            <i className="icofont-heart-eyes   green  iLinksHome factureLinkIHome " />
                            <i className="icofont-plus Iplus" />
                        </div>
                        <span>ثبت پاداش پرسنل</span>
                    </Link>
                    <Link to="customerContract" className="linksHome --styleLessLink ">
                        <div className="divIcofontLinksHome">
                            <i className="icofont-ui-calendar iLinksHome factureLinkIHome " />
                            <i className="icofont-plus Iplus" />
                        </div>
                        <span>ثبت مرخصی پرسنل</span>
                    </Link>

                    <Link to="customerContract" className="linksHome --styleLessLink ">
                        <div className="divIcofontLinksHome">
                            <i className="icofont-sad orange   iLinksHome factureLinkIHome " />
                            <i className="icofont-plus Iplus" />
                        </div>
                        <span>ثبت غیبت پرسنل</span>
                    </Link>

                </section>

            </main>
        </div>
    );
};

export default Home;
