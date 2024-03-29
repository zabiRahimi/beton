import { Outlet, Link } from "react-router-dom";
import "../../css/index.css";
import RightSide from "./RightSide";
import Header from "./header/Header";
import { Suspense } from 'react';

const Index = () => {
    return (
        <div className="containerIndex">
            <div className="divLeftSide">
                <Header />




                <Suspense fallback={<div>در حال بارگذاری...</div>}>
                    <Outlet />
                </Suspense>


            </div>

            {/* It is displayed only when the screen is more than 768 pixels */}
            <div className="divRightSide">
                <RightSide />
            </div>
        </div>
    );
};

export default Index;

