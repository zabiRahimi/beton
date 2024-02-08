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

                <Link to="addTruck" className="linksHome --styleLessLink ">
                    <div className="divIcofontLinksHome">
                        <i className="icofont-truck iLinksHome iTruck " />
                        <i className="icofont-plus Iplus" />
                    </div>
                    <span>تعریف کامیون</span>
                </Link>

                <Link to="addPersonnel" className="linksHome --styleLessLink ">
                    <div className="divIcofontLinksHome">
                        <i className="icofont-hotel-boy iLinksHome iTruck " />
                        <i className="icofont-plus Iplus" />
                    </div>
                    <span>تعریف پرسنل</span>
                </Link>

                <Link to="addDriver" className="linksHome --styleLessLink ">
                    <div className="divIcofontLinksHome">
                        <i className="icofont-hotel-boy-alt  iLinksHome iTruck " />
                        <i className="icofont-plus Iplus" />
                    </div>
                    <span>تعریف راننده</span>
                </Link>

                <Link to="addGoodsAndServices" className="linksHome --styleLessLink ">
                    <div className="divIcofontLinksHome">
                        <i className="icofont-ui-cart   iLinksHome iTruck " />
                        <i className="icofont-plus Iplus" />
                    </div>
                    <span>تعریف کالا و خدمات</span>
                </Link>

                <Link to="AddCurrentCosts" className="linksHome --styleLessLink ">
                    <div className="divIcofontLinksHome">
                        <i className="icofont-ui-v-card  iLinksHome iTruck " />
                        <i className="icofont-plus Iplus" />
                    </div>
                    <span>تعریف هزینه‌های جاری</span>
                </Link>


              
            </main>
        </div>
    );
};

export default Home;
