import { Outlet, Link } from "react-router-dom";
import "../../css/index.css";
import RightSide from "./RightSide";
import Header from "./header/Header";

const Index = () => {
    return (
        <div className="containerIndex">
            <div className="divLeftSide">
                <Header />
               

                <Outlet />

               
            </div>

            {/* It is displayed only when the screen is more than 768 pixels */}
            <div className="divRightSide">
                <RightSide />
            </div>
        </div>
    );
};

export default Index;

