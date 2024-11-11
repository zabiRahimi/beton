export const handleSetDate = (e, input, date, setDate, setInput) => {
    let { value } = e.target,
        valDate;
    value = value.toString();
    if (input == 'day') {
        (value != 0 && value.length == 1) && (value = '0' + value);
        (value.length >= 3 && value[0] === '0') && (value = value.slice(1));
        if (value == '' || (Number(value) >= 0 && Number(value) <= 31)) {
            setDate(prev => ({ ...prev, [input]: value }));
        } else {
            e.target.value = date.day;
        }
        valDate = date.year + '-' + date.month + '-' + value;
        setInput(perv => ({ ...perv, date: valDate }));
    } else if (input == 'month') {
        (value != 0 && value.length == 1) && (value = '0' + value);
        (value.length >= 3 && value[0] === '0') && (value = value.slice(1));
        if (value == '' || (Number(value) >= 0 && Number(value) <= 12)) {
            setDate(prev => ({ ...prev, [input]: value }));
        }
        else {
            e.target.value = date.month;
        }
        valDate = date.year + '-' + value + '-' + date.day;
        setInput(perv => ({ ...perv, date: valDate }));
    } else if (input = 'year') {
        if (value == '' || (Number(value) >= 1 && Number(value) <= 1500)) {
            setDate(prev => ({ ...prev, [input]: value }));
        } else {
            e.target.value = date.year;
        }
        valDate = value + '-' + date.month + '-' + date.day;
        setInput(perv => ({ ...perv, date: valDate }));
    }
}

export  const handleSetTime = (e, input, time, setTime, setInput) => {
    let { value } = e.target,
        valTime;
    value = value.toString();
    if (input == 'second') {
        (value != 0 && value.length == 1) && (value = '0' + value);
        (value.length >= 3 && value[0] === '0') && (value = value.slice(1));
        if (value == '' || (Number(value) >= 0 && Number(value) <= 60)) {
            setTime(prev => ({ ...prev, [input]: value }));
        } else {
            e.target.value = time.second;
        }
        valTime = time.hour + ':' + time.minute + ':' + value;
        setInput(perv => ({ ...perv, time: valTime }));
    } else if (input == 'minute') {
        (value != 0 && value.length == 1) && (value = '0' + value);
        (value.length >= 3 && value[0] === '0') && (value = value.slice(1));
        if (value == '' || (Number(value) >= 0 && Number(value) <= 60)) {
            setTime(prev => ({ ...prev, [input]: value }));
        } else {
            e.target.value = time.minute;
        }
        valTime = time.hour + ':' + value + ':' + time.second;
        setInput(perv => ({ ...perv, time: valTime }));
    } else if (input = 'hour') {
        (value != 0 && value.length == 1) && (value = '0' + value);
        (value.length >= 3 && value[0] === '0') && (value = value.slice(1));
        if (value == '' || (Number(value) >= 0 && Number(value) <= 24)) {
            setTime(prev => ({ ...prev, [input]: value }));
        } else {
            e.target.value = time.hour;
        }
        valTime = value + ':' + time.minute + ':' + time.second;
        setInput(perv => ({ ...perv, time: valTime }));
    }
}

/**
* برای پاک کردن پیام خطا و برداشتن رنگ قرمز دور کادر
* @param {*} e 
* @param {رف مربوط به تگ نمایش خطا} refErr 
*/
export const clearInputError = (e, refErr, dateAndTime = false, idDivDateAndTime = '', maskan=false, refCurentVahed='', refCurentAddress='' ) => {

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
        if (maskan) {
        const vahedElemnt = document.getElementById(`vahed`);
        vahedElemnt.classList.remove('borderRedFB');
        refCurentAddress.innerHTML = '';

        const addressElemnt = document.getElementById(`address`);
        addressElemnt.classList.remove('borderRedFB');
        refCurentVahed.innerHTML = '';
        }
    } else {
        const element = document.getElementById(idDivDateAndTime);
        element.classList.remove('borderRedFB');
    }
    refErr.current && (refErr.current.innerHTML = '')

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

export const handleCubicMetersCalculation = (e, refCubicMeters, setInput) => {
    let { value } = e.target;
    value = value.replace(/,/g, '');
    let cubicMeters = value / 2300;
    cubicMeters = Number(cubicMeters);
    if (!Number.isInteger(cubicMeters)) {
        cubicMeters = cubicMeters.toFixed(2);
    }


    refCubicMeters.current.innerHTML = cubicMeters;
    setInput(prev => ({ ...prev, cubicMeters }));

}

export  const handleCheckedMaskanMeli = (value, checkedMaskanMeli, setCheckedMaskanMeli, setInput) => {
    let maskanMeli;
    if (value == 'emam') {
        checkedMaskanMeli == "emam" ? (setCheckedMaskanMeli(''), maskanMeli = '') : (setCheckedMaskanMeli('emam'), maskanMeli = 'مسکن ملی شهرک امام خمینی');
    } else {
        checkedMaskanMeli == "shahid" ? (setCheckedMaskanMeli(''), maskanMeli = '') : (setCheckedMaskanMeli('shahid'), maskanMeli = 'مسکن ملی شهرک شهید رییسی');
    }

    setInput(pre => ({ ...pre, maskanMeli }));
}

export const handleTotalPriceCalculation = (e, element, input, setInput, refTotalPrice) => {
    let cubicMeters,
        totalPrice,
        { value } = e.target;
    value = value.replace(/,/g, '');
    value = Number(value);

    if (element == 'weight') {
        cubicMeters = value / 2300;
        if (!Number.isInteger(cubicMeters)) {
            cubicMeters = cubicMeters.toFixed(2);
        }
        let unitPrice = input.unitPrice;
        if (Number.isInteger(Number(unitPrice))) {
            totalPrice = unitPrice * cubicMeters;
            setInput(perv => ({ ...perv, totalPrice }));
            refTotalPrice.current.innerHTML = totalPrice.toLocaleString();
        }

    } else if (element == 'unitPrice') {
        let weight = input.weight;
        if (weight && Number(weight)) {
            cubicMeters = weight / 2300;
            if (!Number.isInteger(cubicMeters)) {
                cubicMeters = cubicMeters.toFixed(2);
            }
            totalPrice = value * cubicMeters;
            setInput(perv => ({ ...perv, totalPrice }));
            refTotalPrice.current.innerHTML = totalPrice.toLocaleString();
        }
    }
}


