import { forwardRef, useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
// import UserContext from "../../../contexts/UserContext";

// import VerticalSubmenu from "./verticalSubmenu/VerticalSubmenu";
import "../../../css/verticalMenu.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const VerticalMenu = ({ handleBodyScrollShow, handleCloseVerticalMenu }) => {
  // const navigate = useNavigate();

  // const { user, setUser } = useContext(UserContext);

  const MySwal = withReactContent(Swal);

  const SubMenuPros = useRef(null);
  const iDownPros = useRef(null);
  const iUpPros = useRef(null);

  const handleShowSubMenu = (iDown, iUp, subMenu) => {
    iDown.current.classList.toggle("--displayNone");
    iUp.current.classList.toggle("--displayNone");
    subMenu.current.classList.toggle("--displayNone");
  };

  const logout = () => {
    // هنگام توسعه سرور تکمیل شود

    MySwal.fire({
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "خیر",
      confirmButtonText: "بله",

      html: (
        <div>
          <div className="--mySwalWarningDiv">
            <i className="icofont-exclamation --mySwalWarningIcon" />
          </div>
          <div className="--mySwalDivTitle">
            <h3 className="--mySwalTitle">
              {" "}
              آیا می‌خواهید از حساب کاربری خارج شوید؟{" "}
            </h3>
          </div>
        </div>
      ),

      customClass: {
        popup: "--mySwalPopup",
        htmlContainer: "--mySwalHtml",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        sessionStorage.removeItem("userData");

        // setUser((prev) => ({ ...prev, login: false, name: "", email: "" }));

        handleCloseVerticalMenu();

        // sign_THe.current.classList.remove('bgColorSign_THe');
        // showProfileLink_THe.current.classList.add('--displayNone');
      }
    });
  };

  return (
    <div className="cotainerItems_VMe">
      <div className="divItems_VMe ">
        <button
          className="--styleLessBtn btnItem_VMe"
          onClick={() => handleShowSubMenu(iDownPros, iUpPros, SubMenuPros)}
        >
          <i className="icofont-users-alt-2  " />
          <span> خریداران </span>
          
        </button>

        <button
          className="--styleLessBtn btnItem_VMe"
          onClick={() => handleShowSubMenu(iDownPros, iUpPros, SubMenuPros)}
        >
          <i className="icofont-business-man-alt-2 " />
          <span> خریداران بتن </span>
          
        </button>

       
      </div>

      <div className="divItems_VMe ">
        <button
          className="--styleLessBtn btnItem_VMe"
          onClick={() => handleShowSubMenu(iDownPros, iUpPros, SubMenuPros)}
        >
          <i className="icofont-users-alt-6 " />
          <span> فروشندگان </span>
          
        </button>

        <button
          className="--styleLessBtn btnItem_VMe"
          onClick={() => handleShowSubMenu(iDownPros, iUpPros, SubMenuPros)}
        >
          <i className="icofont-waiter  " />
          <span> فروشنده سیمان </span>
          
        </button>

        <button
          className="--styleLessBtn btnItem_VMe"
          onClick={() => handleShowSubMenu(iDownPros, iUpPros, SubMenuPros)}
        >
          <i className="icofont-man-in-glasses  " />
          <span> فروشنده ماسه و شن </span>
          
        </button>

       
      </div>

      <div className="divItems_VMe ">

      <button
          className="--styleLessBtn btnItem_VMe"
          onClick={() => handleShowSubMenu(iDownPros, iUpPros, SubMenuPros)}
        >
          <i className="icofont-concrete-mixer  " />
          <span> کامیون میکسر </span>
          
        </button>

        <button
          className="--styleLessBtn btnItem_VMe"
          onClick={() => handleShowSubMenu(iDownPros, iUpPros, SubMenuPros)}
        >
          <i className="icofont-articulated-truck  " />
          <span> کامیون کمپریسی </span>
          
        </button>

        <button
          className="--styleLessBtn btnItem_VMe"
          onClick={() => handleShowSubMenu(iDownPros, iUpPros, SubMenuPros)}
        >
          <i className="icofont-oil-truck  " />
          <span> کامیون تانکر آب </span>
          
        </button>

        <button
          className="--styleLessBtn btnItem_VMe"
          onClick={() => handleShowSubMenu(iDownPros, iUpPros, SubMenuPros)}
        >
          <i className="icofont-fire-truck-alt    " />
          <span> کامیون پمپ دکل </span>
          
        </button>

        <button
          className="--styleLessBtn btnItem_VMe"
          onClick={() => handleShowSubMenu(iDownPros, iUpPros, SubMenuPros)}
        >
          <i className="icofont-truck-loaded    " />
          <span> کامیون پمپ زمینی </span>
          
        </button>

        <button
          className="--styleLessBtn btnItem_VMe"
          onClick={() => handleShowSubMenu(iDownPros, iUpPros, SubMenuPros)}
        >
          <i className="icofont-truck   " />
          <span> تریلر بونکر سیمان </span>
          
        </button>

        <button
          className="--styleLessBtn btnItem_VMe"
          onClick={() => handleShowSubMenu(iDownPros, iUpPros, SubMenuPros)}
        >
          <i className="icofont-vehicle-dozer    " />
          <span> لودر </span>
          
        </button>

      </div>

      <div className="divItems_VMe ">
        <button
          className="--styleLessBtn btnItem_VMe"
          onClick={() => handleShowSubMenu(iDownPros, iUpPros, SubMenuPros)}
        >
          <i className="icofont-hotel-boy  " />
          <span> پرسنل </span>
          
        </button>

        <button
          className="--styleLessBtn btnItem_VMe"
          onClick={() => handleShowSubMenu(iDownPros, iUpPros, SubMenuPros)}
        >
          <i className="icofont-hotel-boy-alt  " />
          <span> رانندگان </span>
          
        </button>

       
      </div>

      <div className="divItems_VMe ">
        <button className="--styleLessBtn btnItem_VMe">
          <i className="icofont-ebook " />
          <span>راهنمای ثبت سفارش</span>
        </button>
      </div>

      <div className="divItems_VMe ">
        
      </div>

      <div className="divItems_VMe ">
        
      </div>
    </div>
  );
};
export default VerticalMenu;

// const VerticalMenu = forwardRef(({ refBtn }, ref) => {

//     const handleClose = () => {

//         handleBodyScrollShow();
//         // handleShowBtn();
//         handleHideContainer();
//         handleCloseSubMenu();

//     }

//     const handleBodyScrollShow = () => {

//         const body = document.getElementsByTagName('body');
//         body[0].classList.remove('--scrollHidden');

//     }

//     const handleShowBtn = () => {

//         refBtn.current.classList.remove('--displayNone');

//     }

//     const handleHideContainer = () => {

//         ref.verticalMenu.current.classList.remove('--width100');

//         ref.verticalMenu_VMe.current.classList.remove('--width100');

//         setTimeout(function () {

//             ref.verticalMenu.current.classList.add('--displayNone');

//         }, 500);

//     }

//     const handleCloseSubMenu = () => {
//         handleShowIDown();
//         handleHideIUp();
//         handleHideSubMenu();
//     }

//     const handleShowIDown = () => {

//         const elements = Array.from(document.getElementsByClassName('down_VMe'));

//         elements.forEach((element) => {

//             element.classList.remove('--displayNone');

//         });

//     }

//     const handleHideIUp = () => {

//         const elements = Array.from(document.getElementsByClassName('up_VMe'));

//         elements.forEach((element) => {

//             element.classList.add('--displayNone');

//         });

//     }

//     const handleHideSubMenu = () => {

//         const elements = Array.from(document.getElementsByClassName('divShowSubMenu_VMe'));

//         elements.forEach((element) => {

//             element.classList.add('--displayNone');

//         });

//     }

//     return (

//         <div ref={ref.verticalMenu} className='containerMain_VMe --displayNone ' >

//             {/**
//                 * The bottom layer has opacity
//             */}
//             <div className="divOpacity_VMe" onClick={handleClose}></div>

//             <div className='verticalMenu_VMe' ref={ref.verticalMenu_VMe}>

//             </div>

//         </div>

//     );

// });

// export default VerticalMenu;
