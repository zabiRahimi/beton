import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import UseVerticalMenu from "../hooks/UseVerticalMenu";
import VerticalMenu from "./VerticalMenu";
import "../../../css/header.css";

const Header = () => {
    const navigate = useNavigate();

    const refVerticalMenu = useRef(null);

    /**
     * این متد، متدهای لازم برای نمایش منوی عمودی را فرخوانی میکند
     */
    const showVerticalMenu = () => {
        // positionStatic(true);

        // closeAllSubMenu();

        refVerticalMenu.current.handleShowVerticalMenu();

        // handleHideBtn();

        // handleShowVerticalSubmenu();
    };

    return (
        <div className="header">
            <div className="headerTop">
                <div className="rightHeaderTop">
                    <div className="navigationMenu">
                        <button
                            className=".--styleLessBtn"
                            onClick={showVerticalMenu}
                        >
                            <i className="icofont-navigation-menu "></i>
                        </button>
                        <UseVerticalMenu
                            Menu={VerticalMenu}
                            hasBtn={true}
                            ref={{ refVerticalMenu }}
                        />
                    </div>

                    <Link to="/" className="homeBtnHe --styleLessLink">
                        <i className="icofont-ui-home " />
                    </Link>

                    <button
                        className="homeBtnHe --styleLessBtn"
                        onClick={() => {
                            navigate(-1);
                        }}
                    >
                        <i className="icofont-reply " />
                    </button>
                </div>

                <div className="leftHeaderTop">
                    <div className="profile">
                        <div className="avatar">
                            <i className="icofont-ui-user " />
                        </div>
                        <div className="nameProfile">name</div>
                    </div>

                    <div className="brand">
                        <i className="icofont-concrete-mixer " />
                        <h2>betonBana</h2>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
