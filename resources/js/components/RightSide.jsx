import { Link } from "react-router-dom";
import "../../css/rightSide.css";
const RightSide = () => {
    return (
        <div className="rightSide">
            <div className="profileRS">
                <div className="divAvatarRS">
                    <i className="icofont-user-alt-7" />
                </div>
                <h4>name</h4>
            </div>

            <div className="sectionRS">
                <Link to="/" className="linkRs --styleLessLink">
                    <i className="icofont-ui-home "/>
                    <span>داشبورد</span>
                </Link>
            </div>

            <div className="sectionRS">
                <Link to='/customer' className="linkRs --styleLessLink">
                    <i className="icofont-users-alt-3 "/>
                    <span>فروشندگان</span>
                </Link>

                <Link to='/customer/1' className="linkRs --styleLessLink">
                    <i className="icofont-waiter  "/>
                    <span>فروشندگان شن و ماسه</span>
                </Link>

                <Link to='/' className="linkRs --styleLessLink">
                    <i className="icofont-waiter  "/>
                    <span>فروشندگان سیمان</span>
                </Link>
            </div>

            <div className="sectionRS">
                <Link to='/' className="linkRs --styleLessLink">
                    <i className="icofont-users  "/>
                    <span>خریداران</span>
                </Link>

                <Link to='/' className="linkRs --styleLessLink">
                    <i className="icofont-waiter  "/>
                    <span>خریداران بتن</span>
                </Link>
                
            </div>

            <div className="sectionRS">
                <Link to='/' className="linkRs --styleLessLink">
                    <i className="icofont-concrete-mixer  "/>
                    <span>کامیون میکسر</span>
                </Link>

                <Link to='/' className="linkRs --styleLessLink">
                    <i className="icofont-fire-truck-alt   "/>
                    <span>کامیون پمپ دکل</span>
                </Link>

                <Link to='/' className="linkRs --styleLessLink">
                    <i className="icofont-truck-loaded   "/>
                    <span>کامیون پمپ زمینی</span>
                </Link>

                <Link to='/' className="linkRs --styleLessLink">
                    <i className="icofont-articulated-truck   "/>
                    <span>کامیون کمپرسی</span>
                </Link>

                <Link to='/' className="linkRs --styleLessLink">
                    <i className="icofont-oil-truck   "/>
                    <span>کامیون تانکر آب</span>
                </Link>

                <Link to='/' className="linkRs --styleLessLink">
                    <i className="icofont-vehicle-dozer   "/>
                    <span>لودر</span>
                </Link>
                
            </div>

            <div className="sectionRS">
                <Link to='/' className="linkRs --styleLessLink">
                    <i className="icofont-man-in-glasses   "/>
                    <span>پرسنل</span>
                </Link>

                <Link to='/' className="linkRs --styleLessLink">
                    <i className="icofont-hotel-boy-alt   "/>
                    <span>رانندگان</span>
                </Link>
                
            </div>
        </div>
    );
};

export default RightSide;
