
export const handleSetDate = (e, input, date, setDate, setInput) => {
    let { value } = e.target,
        valDate;
    value = value.toString();
    switch (input) {
        case 'day':
            value = (value != 0 && value.length === 1) ? '0' + value : value;
            value = (value.length >= 3 && value[0] === '0') ? value.slice(1) : value;
            if (value === '' || (Number(value) >= 0 && Number(value) <= 31)) {
                setDate(prev => ({ ...prev, [input]: value }));
               
            } else {
                e.target.value = date.day;
            }
            valDate = `${date.year}-${date.month}-${value}`;
            break;
        case 'month':
            value = (value != 0 && value.length === 1) ? '0' + value : value;
            value = (value.length >= 3 && value[0] === '0') ? value.slice(1) : value;
            if (value === '' || (Number(value) >= 0 && Number(value) <= 12)) {
                setDate(prev => ({ ...prev, [input]: value }));
                
            } else {
                e.target.value = date.month;
            }
            valDate = `${date.year}-${value}-${date.day}`;
            break;
        case 'year':
            if (value === '' || (Number(value) >= 1 && Number(value) <= 1500)) {
                setDate(prev => ({ ...prev, [input]: value }));
                
            } else {
                e.target.value = date.year;
            }
            valDate = `${value}-${date.month}-${date.day}`;
            break;
        default:
            return;
    }
    setInput(prev => ({ ...prev, date: valDate }));
}

export const handleSetTime = (e, input, time, setTime, setInput) => {
    let { value } = e.target,
        valTime;
    value = value.toString();
    switch (input) {
        case 'second':
            value = (value != 0 && value.length === 1) ? '0' + value : value;
            value = (value.length >= 3 && value[0] === '0') ? value.slice(1) : value;
            if (value === '' || (Number(value) >= 0 && Number(value) <= 60)) {
                setTime(prev => ({ ...prev, [input]: value }));
            } else {
                e.target.value = time.second;
            }
            valTime = `${time.hour}:${time.minute}:${value}`;
            break;
        case 'minute':
            value = (value != 0 && value.length === 1) ? '0' + value : value;
            value = (value.length >= 3 && value[0] === '0') ? value.slice(1) : value;
            if (value === '' || (Number(value) >= 0 && Number(value) <= 60)) {
                setTime(prev => ({ ...prev, [input]: value }));
            } else {
                e.target.value = time.minute;
            }
            valTime = `${time.hour}:${value}:${time.second}`;
            break;
        case 'hour':
            value = (value != 0 && value.length === 1) ? '0' + value : value;
            value = (value.length >= 3 && value[0] === '0') ? value.slice(1) : value;
            if (value === '' || (Number(value) >= 0 && Number(value) <= 24)) {
                setTime(prev => ({ ...prev, [input]: value }));
            } else {
                e.target.value = time.hour;
            }
            valTime = `${value}:${time.minute}:${time.second}`;
            break;
        default:
            return;
    }
    setInput(prev => ({ ...prev, time: valTime }));
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

export  const resetForm = (setInput, setDate, setFactory, factoryCurrent, apply = true) => {
    setInput({
        buyerName: '',
        buyerLastName: '',
        buyerFather: '',
        remittanceNumber: '',
        date: '',
        price: '',
        remainingPrice:'',
        factory: '',
        description: ''
    });
    setDate({
        day: '',
        month: '',
        year: ''
    });
    setFactory('');
    handleRemoveAllError();
    factoryCurrent.updateData('انتخاب');
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

export  const handleTotalPriceCalculation = (e, i, element, input, setInput, refInvoice) => {
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
        let unitPrice = input.invoice[i].unitPrice;
        if (Number.isInteger(Number(unitPrice))) {
            totalPrice = unitPrice * cubicMeters;
            setInput(perv => {
                let newInvoice;
                newInvoice = [...perv.invoice];
                newInvoice[i] = { ...newInvoice[i], totalPrice };
                return { ...perv, invoice: newInvoice };
            });
            refInvoice[`totalPrice${i}`].current.innerHTML = totalPrice.toLocaleString();
        }

    } else if (element == 'unitPrice') {
        let weight = input.invoice[i].weight;
        if (weight && Number(weight)) {
            cubicMeters = weight / 2300;
            if (!Number.isInteger(cubicMeters)) {
                cubicMeters = cubicMeters.toFixed(2);
            }
            totalPrice = value * cubicMeters;
            setInput(perv => {
                let newInvoice;
                newInvoice = [...perv.invoice];
                newInvoice[i] = { ...newInvoice[i], totalPrice };
                return { ...perv, invoice: newInvoice };
            });
            refInvoice[`totalPrice${i}`].current.innerHTML = totalPrice.toLocaleString();
        }
    }
}

