import { useRouteError, Link, useNavigate } from "react-router-dom";

// import {  useNavigate } from 'react-router';

import "./notFound.css";
// import { SimpleHeader } from "../simpleHeader/SimpleHeader";

const NotFound = () => {
  const error = useRouteError();
  const navigate = useNavigate();
  return (
    <>
      {/* <SimpleHeader /> */}

      <div className="continerNotFound">
        <div className="rounded-circle notFoundDiv1">
          <h1>خطای 404</h1>
          <i className="icofont-worried "></i>
          <h3 className="notFoundEn">404 - page not found</h3>
        </div>
        <h3 className="textNotFound">
          این صفحه وجود ندارد ، یا اینکه ممکن است برای مدتی در دسترس نباشد
        </h3>
        <div className="divBtnNotFoun">
          <Link to="/" className="--styleLessLink notFoundBtn1">
            صفحه نخست
          </Link>

          <button
            className=" notFoundBtn2"
            onClick={() => {
              navigate(-1);
            }}
          >
            بازگشت
          </button>
        </div>

        <div className="errorNotFound">
          {error.status} , {error.statusText}
        </div>
      </div>
    </>
  );
};
export default NotFound;
