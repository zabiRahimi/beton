
const Helper = () => {
  /**
 * برای پاک کردن پیام خطا و برداشتن رنگ قرمز دور کادر
 * @param {*} e 
 * @param {رف مربوط به تگ نمایش خطا} refErr 
 */
  const clearInputError = (e, refErr, dateAndTime = false, idDivDateAndTime = '', i = null) => {
    if (i !== null && Number(i) >= 0) {
        const addressElemnt = document.getElementById(`invoice.${i}.address`);
        const vahedElemnt = document.getElementById(`invoice.${i}.vahed`);

        addressElemnt.classList.remove('borderRedFB');
        refInvoice[`addressError${i}`].current.innerHTML = '';

        vahedElemnt.classList.remove('borderRedFB');
        refInvoice[`vahedError${i}`].current.innerHTML = '';
    } else {
        if (!dateAndTime) {
            e.target.classList.remove('borderRedFB');
            /**
                     * دو خط کد زیر برای زمانی است‌ که کلاس مورد
                     *  نظر بر روی پدر تگهااعمال شده‌است
                     * ابتدا پدری که حاوی کلاس است را پیدا می‌کند
                     *  و سپس کلاس را از تگ پدر حذف 
                     * می‌‌کند، این کدها معمولا برای کامپوننتی
                     *  که سلکت سفارشی را ارائه می‌دهد کاربرد دارد
                    */
            const parentWithClass = e.target.closest('.borderRedFB');
            parentWithClass && parentWithClass.classList.remove('borderRedFB');
        } else {
            const element = document.getElementById(idDivDateAndTime);
            element.classList.remove('borderRedFB');
        }
        refErr.current && (refErr.current.innerHTML = '')
    }
}

 /**
* اگر دقت شود در این‌پوت‌های دریافت وزن‌ها و قیمت بتن، واحدها به صورت
* کیلوگرم و تومان اضافه شدن که درواقع جزیی از این پوت نیستن برای اینکه
* اگر احتمالا کاربر برروی این واحدها کلید کرد فوکوس در این‌پوت مربوطه
* ایجاد شود از این متد استفاده می‌شود، برای تجربه کاربری بهتر
* @param {number} id 
*/
const htmlFor = (id) => {
    document.getElementById(id).focus()
}

return {clearInputError, htmlFor}
}
export default Helper;