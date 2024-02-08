import { useNavigate } from "react-router-dom";

import "../../../css/title.css";

const Title = ({ title }) => {
    const navigate = useNavigate();

    return (
        <div className="divTitleHome">
            <div className="leftTitle">
                <div className="brandHome">
                    <i className="icofont-concrete-mixer " />
                    <h2>betonBana</h2>
                </div>

                <button
                    className="replyBtn"
                    onClick={() => {
                        navigate(-1);
                    }}
                >
                    <i className="icofont-reply " />
                </button>
            </div>

            <h3 className="titleBeton">{title}</h3>
        </div>
    );
};

export default Title;
