
export const handleSetDate = (e, date, setDate, date_check, setDate_check, setInput) => {
    // چون در کامپوننت پدر دو نوع تاریخ داریم این متد به صورت پویا کار می کند
    let { value, name } = e.target,
        valDate;
    value = value.toString();
    switch (name) {
        case 'day':
            value = (value != 0 && value.length === 1) ? '0' + value : value;
            value = (value.length >= 3 && value[0] === '0') ? value.slice(1) : value;
            if (value === '' || (Number(value) >= 0 && Number(value) <= 31)) {
                date ?
                    setDate(prev => ({ ...prev, day: value }))
                    :
                    setDate_check(prev => ({ ...prev, day: value }))

            } else {
                e.target.value = date ? date.day : date_check.day;
            }
            valDate = `${date ? date.year : date_check.year}-${date ? date.month : date_check.month}-${value}`;
            break;
        case 'month':
            value = (value != 0 && value.length === 1) ? '0' + value : value;
            value = (value.length >= 3 && value[0] === '0') ? value.slice(1) : value;
            if (value === '' || (Number(value) >= 0 && Number(value) <= 12)) {

                date ?
                    setDate(prev => ({ ...prev, month: value }))
                    :
                    setDate_check(prev => ({ ...prev, month: value }))

            } else {
                e.target.value = date ? date.month : date_check.month;
            }
            valDate = `${date ? date.year : date_check.year}-${value}-${date ? date.day : date_check.day}`;
            break;
        case 'year':
            if (value === '' || (Number(value) >= 1 && Number(value) <= 1500)) {
                date ?
                    setDate(prev => ({ ...prev, year: value }))
                    :
                    setDate_check(prev => ({ ...prev, year: value }))

            } else {
                e.target.value = date ? date.year : date_check.year;
            }
            valDate = `${value}-${date ? date.month : date_check.month}-${date ? date.day : date_check.day}`;
            break;
        default:
            return;
    }
    date ?
        setInput(prev => ({ ...prev, date: valDate }))
        :
        setInput(prev => ({ ...prev, date_check: valDate }))
}



/**
* برای پاک کردن پیام خطا و برداشتن رنگ قرمز دور کادر
* @param {*} e 
* @param {رف مربوط به تگ نمایش خطا} refErr 
*/
export const clearInputError = (e, refErr, refInvoice, dateAndTime = false, idDivDateAndTime = '', i = null) => {
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
export const htmlFor = (id) => {
    document.getElementById(id).focus()
}

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

export const resetForm = (
    setInput,
    setDate,
    setSandRemittance_id,
    sandRemittance_idCurrent,
    setSandTypeSelected,
    sandTypeCurrent,
    totalPriceCurrent,
    setDumpTruckId,
    setDumpTruckOwnerId,
    dumpTruckCurrent,
    setDrvierId,
    driverCurrent,
    totalFareCurrent,
    setSandStoreId,
    sandStoreCurrent,
    apply = true) => {
    setInput({
        billNumber: '',
        sandRemittance_id: '',
        time: '',
        date: '',
        sandType: '',
        weight: '',
        unitPrice: '',
        totalPrice: '',
        truck_id: '',
        dumpTruckOwner_id: '',
        driver_id: '',
        unitFare: '',
        totalFare: '',
        sandStore_id: '',
        description: ''
    });
    setDate({
        day: '',
        month: '',
        year: ''
    });
    setTime({
        second: '',
        minute: '',
        hour: ''
    });
    setSandRemittance_id('');
    setSandTypeSelected('');
    setDumpTruckId('');
    setDumpTruckOwnerId('');
    setDrvierId('');
    setSandStoreId('');

    handleRemoveAllError();
    sandRemittance_idCurrent.updateData('انتخاب');
    sandTypeCurrent.updateData('انتخاب');
    totalPriceCurrent.innerHTML = 0;
    dumpTruckCurrent.updateData('انتخاب');
    driverCurrent.updateData('انتخاب');
    totalFareCurrent.innerHTML = 0;
    sandStoreCurrent.updateData('انتخاب');
    // در برخی مواقع لازم نیست کدهای داخل شرط استفاده شود
    if (apply) {
        window.scrollTo({ top: 0 });
    }

}


export const handleRemoveAllError = () => {
    var elements = document.getElementsByClassName('element');
    for (var i = 0; i < elements.length; i++) {
        elements[i].classList.remove('borderRedFB');
    }

    var elements = document.getElementsByClassName('elementError');
    for (var i = 0; i < elements.length; i++) {
        elements[i].innerHTML = '';
    }

}




