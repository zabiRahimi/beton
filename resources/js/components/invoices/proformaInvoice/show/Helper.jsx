/*
* برای خوانایی بهتر قیمت و وزن‌ها اعداد را فرمت دهی می‌کند
* به صورت دهگان،صدگان و ...
* @param {ref} ref 
*/
export const formatNub = (refCurrent) => {
    let val,
        checkDthot,
        resalt = refCurrent.value.replace(/[\s,]/g, "");
    // چک می کند که آیا آخرین کارکتر وارد شده علامت "." است؟
    if (resalt.slice(-1) == '.') {
        checkDthot = true;
    } else {
        checkDthot = false;
    }
    // چک می کند فقط رشته عددی باشد
    if (parseFloat(resalt)) {
        val = parseFloat(resalt);
        /**
         * طبق شرط بالا چنانچه آخرین کارکتر "." دوباره این
         * علامت را به آخر رشته اضافه می کند
        */
        val = checkDthot ? val.toLocaleString() + '.' : val.toLocaleString();
        refCurrent.value = val;
    }
}

export const htmlFor = (id) => {
    document.getElementById(id).focus()
}