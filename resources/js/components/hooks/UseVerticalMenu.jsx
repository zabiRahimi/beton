import { forwardRef, useRef } from 'react';
import '../../../css/useVerticalMenu.css';

/**
 * در پایین صحفه بطور کامل نحوه استفاده از این کامپوننت شرح داده شده است.
 */
const UseVerticalMenu = forwardRef(({ Menu, hasBtn = false }, ref) => {



    const containerVerticalMenu = useRef(null);
    const verticalMenu = useRef(null);

    ref.refVerticalMenu.current = {

        handleShowVerticalMenu: () => {

            handleBodyScrollHidden();
            handleShowVerticalSubmenu();

        },


    }


    /**
     * اقدامات لازم برای مشاهده منوی عمودی را انجام می‌دهد
     * ابتدا المنت منوی عمودی را با اضافه کردن کلاس نمایش می‌دهد
     * سپس برای ایجاد یک حرکت بصری توسط تابع ست‌‌تایم‌اوت با کمی تاخیر کلاس پهنای 100 درصد
     * را به المنت اضافه می‌کند
     * همچنین به المنت 
     */
    const handleShowVerticalSubmenu = () => {

        containerVerticalMenu.current.classList.remove('--displayNone');

        setTimeout(() => {

            verticalMenu.current.classList.add('--width100');

            containerVerticalMenu.current.classList.add('--width100');

        }, 2)

    }

    const handleCloseVerticalMenu = () => {

        handleBodyScrollShow();

        handleHideContainer();

    }


    /**
     * هنگام نمایش منوی عمودی این متد اسکرول تگ بادی را غیر فعال می‌کند
     */
    const handleBodyScrollHidden = () => {

        const body = document.getElementsByTagName('body');

        body[0].classList.add('--scrollHidden');

    }


    const handleBodyScrollShow = () => {

        const body = document.getElementsByTagName('body');
        body[0].classList.remove('--scrollHidden');

    }





    const handleHideContainer = () => {


        containerVerticalMenu.current.classList.remove('--width100');

        verticalMenu.current.classList.remove('--width100');

        setTimeout(function () {

            containerVerticalMenu.current.classList.add('--displayNone');

        }, 500);

    }


    // const handleCloseSubMenu = () => {
    //     handleShowIDown();
    //     handleHideIUp();
    //     handleHideSubMenu();
    // }


    // const handleShowIDown = () => {

    //     const elements = Array.from(document.getElementsByClassName('down_VMe'));

    //     elements.forEach((element) => {

    //         element.classList.remove('--displayNone');

    //     });

    // }


    // const handleHideIUp = () => {

    //     const elements = Array.from(document.getElementsByClassName('up_VMe'));

    //     elements.forEach((element) => {

    //         element.classList.add('--displayNone');

    //     });

    // }


    // const handleHideSubMenu = () => {

    //     const elements = Array.from(document.getElementsByClassName('divShowSubMenu_VMe'));

    //     elements.forEach((element) => {

    //         element.classList.add('--displayNone');

    //     });

    // }

    return (
        <div
            ref={containerVerticalMenu}
            className='containerVerticalMenu --displayNone '
        >
            {/**
                * The bottom layer has opacity
            */}
            <div className="divOpacityVerticalMenu" onClick={handleCloseVerticalMenu}></div>
            
            <div className='verticalMenu' ref={verticalMenu}>

                {
                    hasBtn &&
                    <div className='divBtnClose_VMe'>

                        <button onClick={handleCloseVerticalMenu} className='--styleLessBtn btnClose_VMe'>
                            <i className='icofont-close ' />
                        </button>

                    </div>
                }

                <Menu

                    handleBodyScrollShow={handleBodyScrollShow} handleCloseVerticalMenu={handleCloseVerticalMenu}

                />
                

            </div>



        </div>
    );
})
export default UseVerticalMenu;

/**
 * این کامپوننت یک منوی عمودی بازشو را ارائه می‌دهد
 * این کامپوننت دو پاراپس و یک رف دریافت می‌کند
 * پاراپس اول به اسم منو در واقع یک کامپوننت است که شامل اعضای منو و زیر منو هستند
 * پاراپس دوم چنانچه بخواهید دکمه بستن منو در بالا منو وجود داشته باشد باید با مقدار بولی
 * صحیح مقدار دهی شود
 * و در کامپوننت مورد نظر که قصد دارید از این کامپوننت استفاده کنید لازم است که یک
 * رف همنام رفی که در این کامپونن مورد استفاده می‌شود، ایجاد کرد و به این کامپوننت فرستاد،
 * این رف به نام زیر است
 * refVerticalMenu
 * از این رف برای دریافت متدهای لازم در کامپوننت خودتان استفاده می شود
 * 
 * 
 * نکته: برای نمونه کار و استفاده از این کامپوننت به کامپوننت زیر نگاه کنید
 * components/header/subHeader/NavHeader.js
 * 
 * 
 * به صورت مرحله به مرحله استفاده از این کامپوننت شرح داده می‌شود
 * ابتدا این کامپوننت را در کامپوننت خودتان ایمپورت کنید
 * سپس رف زیر را ایجاد کنید
 *  const refVerticalMenu = useRef(null);
 * همچنین کامپوننتی که شامل اعضا منو هستند را به کامپوننت خودتان اضافه کنید
 * نکته: حتما لازم است که اعضا منو در یک کامپوننت جداگانه ایجاد شوند و به 
 * کامپوننت منوی باز شو ارسال شودند
 * فرض می‌کنیم نام کامپوننت اعضای منو به صورت زیر است
 * VerticalMenu
 * حالا کامپوننت منو باز شو رو به صورت زیر در کامپوننت خودتان مقدار دهی و فراخوانی کنید
 * <UseVerticalMenu
            Menu={VerticalMenu}
            hasBtn={true} // اختیاری است
            ref={{ refVerticalMenu }}
   />
 *
 * حالا لازم است که متدی ایجاد کنید که منو باز شو را باز کنید
 * فرض می‌کنیم نام این متد به صورت زیر است
 * showVerticalMenu
 * حالا در این متد باید متدی را از کامپوننت منو باز شود که یاعث باز شده منو می‌شود فراخوانی کرد
 * به صورت زیر
 * const showVerticalMenu = () => {

        refVerticalMenu.current.handleShowVerticalMenu();

    }
*
* حالا این متد را ایونت دکمه‌ای که میخواهید منو را باز کند بدهید
* لازم به ذکر است در متد بالا می‌توانید متدهای مورد نیاز یا دستورات مورد نیاز به کامپوننت خود
* را نیز ایجاد کنید
* همینطور که در کامپوننت منوی باز شو(همین کامپوننت ) می‌بینید دو پاراپس 
‌* به کامپوننتی که حاوی اعضا منو است فرستاده شده است به صورت زیر
*  <Menu handleBodyScrollShow={handleBodyScrollShow} handleCloseVerticalMenu={handleCloseVerticalMenu} />

* این دو پاراپس در واقع دو متد می‌باشند که در صورت نیاز می‌توان از آنها در کامپوننت اعضای منو استفاده
‌* کرد. یکی از این متدها وظیفه نمایش دوباره اسکرول تگ بادی را دارد به نام زیر
* handleBodyScrollShow
* و متد دیگر وظیفه بستن منوی بازشو را دارد به نام 
* handleCloseVerticalMenu
* می‌توانید از دو متد بالا در کامپوننت اعضای منو و یا زیر منو استفاده کنید
* نمونه استفاده از این دو متد در کامپوننت زیر قابل مشاهد است
* components/header/subHeader/verticalMenu/VerticalMenu.js
* در آینده ممکن است این کامپوننت به روزرسانی شود که در این صورت مستندات آن اضافه می‌شود
 */