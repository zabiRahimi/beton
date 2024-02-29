import { useNavigate } from "react-router-dom";

import "../../../css/title.css";
import { useEffect, useRef, useState } from "react";

const Title = ({ title }) => {
    const navigate = useNavigate();

    const myElementRef = useRef(null);
    const [scroll, setScroll] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScroll(window.scrollY > 50);
            
            if (window.scrollY > 350) {
                console.log('scroll');
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className={scroll?"divTitleHome divTitleHomeScroll":'divTitleHome'}>
            <div className="leftTitle">
                <div className={!scroll?"brandHome":'hideBrandHome'}>
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

            <h3 className={`titleBeton ${scroll?'titleBetonScroll':''}`}>{title}</h3>

        </div>
    );
};

export default Title;
