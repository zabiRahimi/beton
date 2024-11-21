
export const handleSetDate = (e, input, date, setDate, setInput, currentInput, currentSelect) => {
    let { value } = e.target,
        valDate;
    value = value.toString();
    switch (input) {
        case 'day':
            value = (value != 0 && value.length === 1) ? '0' + value : value;
            value = (value.length >= 3 && value[0] === '0') ? value.slice(1) : value;
            if (value === '' || (Number(value) >= 0 && Number(value) <= 31)) {
                setDate(prev => ({ ...prev, [input]: value }));
                currentInput.value = value;
                currentSelect.value = value;
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
                currentInput.value = value;
                currentSelect.value = value;
            } else {
                e.target.value = date.month;
            }
            valDate = `${date.year}-${value}-${date.day}`;
            break;
        case 'year':
            if (value === '' || (Number(value) >= 1 && Number(value) <= 1500)) {
                setDate(prev => ({ ...prev, [input]: value }));
                currentInput.value = value;
                currentSelect.value = value;
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

// export const handleCheckedMaskanMeli = (e, value, i, refInvoice, isChecked, setIsChecked, setCheckedMaskanMeli, checkedValue, setCheckedValue, setMaskan, maskan) => {
//     let checked;
//     if (value == `emam${i}` && isChecked && checkedValue == 'مسکن ملی شهرک امام خمینی') {
//         const copyMaskan = [...maskan];
//         copyMaskan[i] = '';
//         copyMaskan[maskan.length - 1] = '';
//         setMaskan(copyMaskan);
//         checked = false;
//         const checkbox = e.target;
//         checkbox.checked = !checkbox.checked;
//         setCheckedValue('');
//     } else if (value == `shahid${i}` && isChecked && checkedValue == 'مسکن ملی شهرک شهید رییسی') {
//         const copyMaskan = [...maskan];
//         copyMaskan[i] = '';
//         copyMaskan[maskan.length - 1] = '';
//         setMaskan(copyMaskan);
//         checked = false;
//         const checkbox = e.target;
//         checkbox.checked = !checkbox.checked;
//         setCheckedValue('');
//     }
//     else {
//         if (value == `emam${i}`) {
//             checked = refInvoice[`checkedMaskanEmam${i}`].current;
//         } else if (value == `shahid${i}`) {
//             checked = refInvoice[`checkedMaskanShahid${i}`].current;
//         }

//         if (value == `emam${i}`) {
//             refInvoice[`checkedMaskanEmam${i}`].current = !checked;
//             refInvoice[`checkedMaskanShahid${i}`].current = true;
//         } else if (value == `shahid${i}`) {
//             refInvoice[`checkedMaskanShahid${i}`].current = !checked;
//             refInvoice[`checkedMaskanEmam${i}`].current = true;
//         }
//     }

//     if (checked) {
//         setCheckedMaskanMeli(value);

//     } else {
//         setCheckedMaskanMeli('');
//     }
//     setIsChecked(false)
// }

export const handleCheckedMaskanMeli = (e, value, i, refInvoice, isChecked, setIsChecked, setCheckedMaskanMeli, checkedValue, setCheckedValue, setMaskan, maskan) => {
    let checked;
    const resetMaskan = () => {
      const copyMaskan = [...maskan];
      copyMaskan[i] = '';
      copyMaskan[maskan.length - 1] = '';
      setMaskan(copyMaskan);
      setCheckedValue('');
    };
  
    const toggleCheckbox = (ref) => {
        if (ref && ref.current) {
            ref.current.checked = !ref.current.checked;
          }
    };
  
    if (value === `emam${i}` && isChecked && checkedValue === 'مسکن ملی شهرک امام خمینی') {
      resetMaskan();
      toggleCheckbox(e.target);
    } else if (value === `shahid${i}` && isChecked && checkedValue === 'مسکن ملی شهرک شهید رییسی') {
      resetMaskan();
      toggleCheckbox(e.target);
    } else {
      checked = refInvoice[`checkedMaskan${value.charAt(0).toUpperCase() + value.slice(1, value.length - 1)}${i}`].current;
      refInvoice[`checkedMaskanEmam${i}`].current = value === `emam${i}` ? !checked : true;
      refInvoice[`checkedMaskanShahid${i}`].current = value === `shahid${i}` ? !checked : true;
    }
  
    setCheckedMaskanMeli(checked ? value : '');
    setIsChecked(false);
  };
  

export  const handleCubicMetersCalculation = (e, refInvoice, setInput, i = null) => {
    let { value } = e.target;
    value = value.replace(/,/g, '');
    let cubicMeters = value / 2300;
    cubicMeters = Number(cubicMeters);
    if (!Number.isInteger(cubicMeters)) {
        cubicMeters = cubicMeters.toFixed(2);
    }
    refInvoice[`cubicMeters${i}`].current.innerHTML = cubicMeters;
    setInput(perv => {
        let newInvoice;
        newInvoice = [...perv.invoice];
        newInvoice[i] = { ...newInvoice[i], cubicMeters };
        return { ...perv, invoice: newInvoice };
    });
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

export const handleAddNewInvoice = (e, setIndexNewInvoice, invoice, setInvoice, setIsNewInvoice, setInput, setIsChecked, sampleInvoice, date, input, setConcreteName, concretes, maskan, setMaskan, setCheckedValue, setCementStoreName, cementStores, setTime, unitPrice, fare, vahed, address, concretingPosition ) => {
    e.preventDefault();
    setIndexNewInvoice(invoice.length);
    setInvoice([...invoice, sampleInvoice]);
    setIsNewInvoice(true);
    let date0 = handleSetDateForNewInvoice(date);
    let concrete_id = handleSetConcreteForNewInvoice(input, invoice, setConcreteName, concretes);
    let maskanMeli = handleSetMaskanMeliForNewInvoice(input, invoice, maskan, setMaskan, setCheckedValue);
    let cementStore_id = handleSetCementStoreForNewInvoice(input, invoice, setCementStoreName, cementStores);
    setInput(perv => {
        let newInvoice = [...perv.invoice, { date:date0, time: '', weight: '', cubicMeters: '', concrete_id, truck_id: '', driver_id: '', cementStore_id, unitPrice, totalPrice: '', fare, maskanMeli, vahed, address, concretingPosition }];

        return { ...perv, invoice: newInvoice };
    });
    handleClearTime(setTime);
    setIsChecked(true);
}

 const handleClearTime = (setTime) => {
    setTime({
        second: '',
        minute: '',
        hour: ''
    });
}

 const handleSetDateForNewInvoice = (date) => {
    let valDate = date.year + '-' + date.month + '-' + date.day;
    return valDate;
}

 const handleSetConcreteForNewInvoice = (input, invoice, setConcreteName, concretes) => {
    let concrete_id = input.invoice[invoice.length - 1].concrete_id;
    concrete_id && (setConcreteName(concretes.filter(concrete => concrete.value == concrete_id)[0]['concreteName']));
    return concrete_id;
}

 const handleSetCementStoreForNewInvoice = (input, invoice, setCementStoreName, cementStores) => {
    let cementStore_id = input.invoice[invoice.length - 1].cementStore_id;
    cementStore_id && (setCementStoreName(cementStores.filter(cementStore => cementStore.value == cementStore_id)[0]['cementStoreName']));
    return cementStore_id;
}

 const handleSetMaskanMeliForNewInvoice = (input, invoice, maskan, setMaskan, setCheckedValue) => {
    let maskanMeli = input.invoice[invoice.length - 1].maskanMeli;
    const copyMaskan = [...maskan];
    copyMaskan[maskan.length - 1] = maskanMeli;
    setMaskan(copyMaskan);
    setCheckedValue(maskanMeli);
    return maskanMeli;
}

export const handleDelInvoice = (input, invoice, setInvoice, setInput) => {
    const updatedInputInvoice = input.invoice.slice(0, -1);
    const updatedInvoice = invoice.slice(0, -1);
    setInvoice(updatedInvoice);
    setInput({ ...input, invoice: updatedInputInvoice });
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

