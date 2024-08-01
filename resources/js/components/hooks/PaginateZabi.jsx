import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import '../../../css/paginateZabi.css';

const handleShowButs = () => {
    const zabi = 30;
    let buts = [];
    for (let index = 1; index <= zabi; index++) {
        buts[index] = <button className='butPage_Pag' key={index}>12{index}</button>;

    }
    return buts;
}

const PaginateZabi = forwardRef(({ totalPage }, ref) => {
    return (
        <div className='containerPaginate'>
            <div className="goRightPage_Pag">
                <i className="icofont-curved-double-right "></i>
            </div>
            <div className="containerBtn_Pag">
                {handleShowButs()}
            </div>
            <div className="goLeftPage_Pag">
            <i className="icofont-curved-double-left "></i>

            </div>

        </div>
    )
});

export default PaginateZabi;
