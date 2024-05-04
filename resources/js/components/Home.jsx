import { Link } from "react-router-dom";
import "../../css/home.css";
import Title from "./hooks/Title";
const Home = () => {
    return (
        <div className="containerHome">
            <Title title="داشبورد" />
            <main className="mainHome">
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

                

                <Link to="customerContract" className="linksHome --styleLessLink ">
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

                <Link to="customerContract" className="linksHome --styleLessLink ">
                    <div className="divIcofontLinksHome">
                        <i className="icofont-law-document   iLinksHome iTruck " />
                        <i className="icofont-plus Iplus" />
                    </div>
                    <span>ثبت درآمدهای متفرقه</span>
                </Link>

                <Link to="customerContract" className="linksHome --styleLessLink ">
                    <div className="divIcofontLinksHome">
                        <i className="icofont-law-document   iLinksHome iTruck " />
                        <i className="icofont-plus Iplus" />
                    </div>
                    <span>ثبت هزینه‌های جاری</span>
                </Link>

                <Link to="customerContract" className="linksHome --styleLessLink ">
                    <div className="divIcofontLinksHome">
                        <i className="icofont-law-document   iLinksHome iTruck " />
                        <i className="icofont-plus Iplus" />
                    </div>
                    <span>ثبت فاکتور</span>
                </Link>

                <Link to="customerContract" className="linksHome --styleLessLink ">
                    <div className="divIcofontLinksHome">
                        <i className="icofont-law-document   iLinksHome iTruck " />
                        <i className="icofont-plus Iplus" />
                    </div>
                    <span>آمار</span>
                </Link>


              
            </main>
        </div>
    );
};

export default Home;
