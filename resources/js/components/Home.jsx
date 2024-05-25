import { Link, useLocation } from "react-router-dom";
import "../../css/home.css";
import Title from "./hooks/Title";
import { useEffect } from "react";
const Home = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        if ('scrollRestoration' in history) {
            // Back off, browser, I got this...
            history.scrollRestoration = 'manual';
        }

        window.scrollTo(0, 0);
    }, []);
    return (
        <div className="containerHome">
            <Title title="داشبورد" />
            <main className="mainHome">
                <section className="categoryLinksHome firstCategoryLinksHome">
                    <Link to="customerContract" className="linksHome --styleLessLink ">
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
                        <div className="divStoreLDGIHome"></div>
                        <div className="divTotalLDGIHome">
                            <div className="labelDTLDGIhome">مجموع</div>
                            <div className="amountDTLDGIhome">150000</div>
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
                        <div className="divStoreLDGIHome"></div>
                        <div className="divTotalLDGIHome">
                            <div className="labelDTLDGIhome">مجموع</div>
                            <div className="amountDTLDGIhome">600000</div>
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
                        <div className="divStoreLDGIHome"></div>
                        <div className="divTotalLDGIHome">
                            <div className="labelDTLDGIhome">مجموع</div>
                            <div className="amountDTLDGIhome">20000</div>
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
