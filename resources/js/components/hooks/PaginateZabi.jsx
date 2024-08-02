import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import '../../../css/paginateZabi.css';



const PaginateZabi = forwardRef(({ totalPage, showCreatedRecord }, ref) => {
    const containerBtn = useRef(null);
    const midBtns = useRef(null);
    const [showEllipsis, setShowEllipsis] = useState(false);
    useEffect(() => {
        const handleResize = () => {
        if (containerBtn.current) {
            const width = containerBtn.current.offsetWidth;
            const widthMidBtns = midBtns.current.offsetWidth;
            console.log(`عرض المنت: ${width}px`);
            console.log(`width midBtns: ${widthMidBtns}px`);
            if (widthMidBtns > width) {
                setShowEllipsis(true);

            } else {
                setShowEllipsis(false);

            }
            console.log(showEllipsis);
        }}
        if (containerBtn.current) {
            const width = containerBtn.current.offsetWidth;
            const widthMidBtns = midBtns.current.offsetWidth;
            console.log(`عرض المنت: ${width}px`);
            console.log(`width midBtns: ${widthMidBtns}px`);
            if (widthMidBtns > width) {
                setShowEllipsis(true);

            } else {
                setShowEllipsis(false);

            }
            console.log(showEllipsis);
        }
        window.addEventListener('resize', handleResize);

        // تمیز کردن رویداد در زمان دیسمانت شدن المنت
        return () => {
          window.removeEventListener('resize', handleResize);
        };
    },[showCreatedRecord])

    const handleShowButs = (side) => {
        const zabi = 15;
        let butsLeft = [];
        let butsMid = [];
        let butsRight = [];
        for (let index = 1; index <= zabi; index++) {
            if (index <= 3) {

                butsLeft[index] = <button className='butPage_Pag' key={index}>{index}</button>;
            } else if (index >= (zabi - 2)) {
                butsRight[index] = <button className='butPage_Pag' key={index}>{index}</button>;
            } else {
                butsMid[index] = <button className='butPage_Pag' key={index}>{index}</button>;

            }

        }
        if (side == 'left') {
            return butsLeft;

        } else if (side == 'mid') {
            return butsMid;

        } else {
            return butsRight;

        }
    }
    return (
        <div className='containerPaginate'>
            <div className="goRightPage_Pag">
                <i className="icofont-curved-double-right "></i>
            </div>
            <div className="containerBtn_Pag" ref={containerBtn}>

                <div className="divBtns_Pag leftBtns_Pag">
                    {handleShowButs('left')}
                </div>
                <div className={`divBtns_Pag midBtns_Pag ${!showEllipsis && 'overflowHidden_Pag'}`} ref={midBtns}>
                    {handleShowButs('mid')}
                </div>

                {
                    !showEllipsis&&<div className={`divBtns_Pag ellipsis_Pag`}>
                        ...
                    </div>
                }
                {/* <div className={`divBtns_Pag ellipsis_Pag ${!showEllipsis&&'displayNone_Pag'}`}>
                    ...
                </div> */}
                <div className="divBtns_Pag ritghBtns_Pag">
                    {handleShowButs('right')}
                </div>
            </div>
            <div className="goLeftPage_Pag">
                <i className="icofont-curved-double-left "></i>

            </div>

        </div>
    )
});

export default PaginateZabi;
