import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import '../../../css/paginateZabi.css';



const PaginateZabi = forwardRef(({ totalPage, showCreatedRecord }, ref) => {
    const containerBtn = useRef(null);
    const midBtns = useRef(null);
    const [showEllipsis, setShowEllipsis] = useState(false);
    const [zabi, setZabi] = useState(35);
    const [btnMid, setBtnMid] = useState(null);
    useEffect(() => {
        const handleResize = () => {
            if (containerBtn.current) {
                const width = containerBtn.current.offsetWidth;
                const widthBtns = zabi * 25;
                if (widthBtns > width) {
                    setShowEllipsis(true);
                } else {
                    setShowEllipsis(false);
                }
            }
        }

        handleResize();
        window.addEventListener('resize', handleResize);

        // تمیز کردن رویداد در زمان دیسمانت شدن المنت
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [showCreatedRecord])

    useEffect(() => {
      setBtnMid(handleShowButs('mid'))
    }, [])
    useEffect(() => {
        if (btnMid) {
            
            const getElementWidth = (id) => {
                const element = document.getElementById(id);
                return element.offsetWidth;
            };

            const handleResize=()=>{
                let totalWidth=0;
                let numBtn=0;
                const widthBtnsMid= midBtns.current.offsetWidth;
                
                btnMid.some((item) => {
                    const width = getElementWidth(item.props.id);
                    totalWidth=totalWidth+width+6;
                    if (totalWidth> widthBtnsMid) {
                     
                      return true; // متوقف کردن حلقه
                    }
                    numBtn++;
                    return false; // ادامه حلقه
                  });
                 return {numBtn};
            }
            
           const{numBtn}= handleResize();
          let d=  window.addEventListener('resize',  () => {
            const { numBtn } = handleResize;
            console.log(numBtn);
          });
          console.log(numBtn);
            // تمیز کردن رویداد در زمان دیسمانت شدن المنت
            return () => {
                window.removeEventListener('resize', handleResize);
            };
            
        }
     
    })
    
    

    const handleShowButs = (side) => {
        let butsLeft = [];
        let butsMid = [];
        let butsRight = [];
        for (let index = 1; index <= zabi; index++) {
            if (index <= 3) {
                butsLeft[index] = <button
                    className='butPage_Pag'
                    key={index}
                    onClick={(e) => {
                        handleBtnActie(e, index);
                        handleBtnVisited(e);
                    }}
                >{index}</button>;
            } else if (index >= (zabi - 2)) {
                butsRight[index] = <button
                    className='butPage_Pag'
                    key={index}
                    onClick={(e) => {
                        handleBtnActie(e, index);
                        handleBtnVisited(e);
                    }}
                >{index}</button>;
            } else {
                butsMid[index] = <button
                    className='butPage_Pag'
                    id={`midBut${index}`}
                    key={index}
                    onClick={(e) => {
                        handleBtnActie(e, index);
                        handleBtnVisited(e);
                    }}
                >{index}</button>;

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


    const handleBtnActie = (e, index) => {
        const elements = document.getElementsByClassName('btnActive');
        Object.keys(elements).map((key) => (
            elements[key].classList.remove('btnActive')
        ));
        e.target.classList.add('btnActive');
    }

    const handleBtnVisited = (e) => { 
        e.target.classList.add('btnVisited');

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
                <div className={`divBtns_Pag midBtns_Pag ${showEllipsis && 'overflowHidden_Pag'}`} ref={midBtns}>
                    {handleShowButs('mid')}
                   
                </div>
                {
                    showEllipsis && <div className={`divBtns_Pag ellipsis_Pag`}>
                        ...
                    </div>
                }
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
