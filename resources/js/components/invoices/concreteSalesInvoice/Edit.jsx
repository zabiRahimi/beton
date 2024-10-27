import { useState } from "react";

const Edit = () => {
    const [customerId, setCustomerId] = useState('');
    const [concreteId, setConcreteId] = useState('');
    const [truckId, setTruckId] = useState('');
    const [ownerId, setOwnerId] = useState('');
    const [driverId, setDriverId] = useState('');
    const [cementStoreId, setCementStoreId] = useState('');
  /**
     * id to edit the model
    */
  const [id, setId] = useState(null);
    const [input, setInput] = useState({
        customer_id: '',
        date: '',
        time: '',
        weight: '',
        cubicMeters: "",
        concrete_id: '',
        truck_id: '',
        ownerId: '',
        driver_id: '',
        cementStore_id: '',
        unitPrice: '',
        totalPrice: '',
        fare: '',
        maskanMeli: '',
        vahed: '',
        address: '',
        concretingPosition: ''
    });

    useEffect(() => {
        if (customerId) {
            setInput(prev => ({ ...prev, customer_id: customerId }));
        }
    }, [customerId]);

    useEffect(() => {
        if (concreteId) {
            setInput(prev => ({ ...prev, concrete_id: concreteId }));
        }
    }, [concreteId]);

    useEffect(() => {
        if (truckId) {
            setInput(prev => ({ ...prev, truck_id: truckId, ownerId }));
        }
    }, [truckId]);

    useEffect(() => {
        if (driverId) {
            setInput(prev => ({ ...prev, driver_id: driverId }));
        }
    }, [driverId, invoiceIndexForDriver]);

    useEffect(() => {
        if (cementStoreId) {
            setInput(prev => ({ ...prev, cementStore_id: cementStoreId }));
        }
    }, [cementStoreId]);


    const handleSetDate = (e, input) => {
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

    const handleSetTime = (e, i, input) => {
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

    
//     /**
//      * هنگامی که کاربر مبادرت به دیدن و یا ویرایش کردن یک رکورد میکند
//      * این متد اطلاعات هر فیلد را برای نمایش تنظیم می کند
//      * @param {آدی رکورد} id0 
//      */
//     const pasteDataForEditing = (id0) => {
//         let concreteSalesInvoice = concreteSalesInvoices.find(concreteSalesInvoice => concreteSalesInvoice.id === id0);
//         concreteSalesInvoice && setId(id0);
//         let numberplate = concreteSalesInvoice.truck.numberplate.split("-");
//         const { id, created_at, updated_at, ...rest } = concreteSalesInvoice;//نادیده گرفتن کلید های مشخص شده

//         // کپی از شی برای انجام تغییرات
//         let datas = { ...rest };
//         setInputEdit({
//             customer_id: datas.customer_id,
//             date: datas.date,
//             time: datas.time,
//             weight: datas.weight,
//             cubicMeters: datas.cubicMeters,
//             concrete_id: datas.concrete_id,
//             truck_id: datas.truck_id,
//             ownerId: datas.truck.customer.id,
//             driver_id: datas.driver_id,
//             cementStore_id: datas.cementStore_id,
//             unitPrice: datas.unitPrice,
//             totalPrice: datas.totalPrice,
//             fare: datas.fare,
//             maskanMeli: datas.maskanMeli,
//             vahed: datas.vahed,
//             address: datas.address,
//             concretingPosition: datas.concretingPosition
//         });
//         refCustomer_id.current && refCustomer_id.current.updateData(datas.customer.name + ' ' + datas.customer.lastName);
//         refConcrete_idEdit.current && refConcrete_idEdit.current.updateData(<div className="concreteAptionSelectFB">
//             <span className="concreteLabelSelectFB">بتن
//             </span>
//             <span className="concreteSelectFB">
//                 {datas.concrete.concreteName}
//             </span>
//         </div>);

//         refCementStore_idEdit.current && refCementStore_idEdit.current.updateData(datas.cement_store.silo);
//         refTruck_idEdit.current && refTruck_idEdit.current.updateData(<div className="mixerAptionSelectFB">
//             <span className="mixerNamberpalteSelectFB">
//                 <div className="numberplateDiv">
//                     <span className="numberplateDivS1">{numberplate[0]}</span>
//                     <span className="numberplateDivS2">{numberplate[3] == 'ا' ? 'الف' : numberplate[3]}</span>
//                     <span className="numberplateDivS3">{numberplate[1]}</span>
//                     <span className="numberplateDivS4">{numberplate[2]}</span>
//                 </div>
//             </span>

//             <span className="mixerOwnerSelectFB">
//                 {datas.truck.customer.name}
//                 {' '}
//                 {datas.truck.customer.lastName}
//             </span>

//         </div>);
//         refDriver_idEdit.current && refDriver_idEdit.current.updateData(<div className="personnelAption_addPerS">
//             <span className="name_addPers">{datas.driver.name}
//                 {' '}
//                 {datas.driver.lastName}</span>

//             <span className="fther_addPers">
//                 {datas.driver.father || ''}
//             </span>

//         </div>);

//         if (rest.date) {
//             let parts = rest.date.split("-");
//             setDate({
//                 day: parts[2],
//                 month: parts[1],
//                 year: parts[0]
//             });

//         }

//         if (rest.time) {
//             let parts = rest.time.split(":");
//             setTime({
//                 second: parts[2],
//                 minute: parts[1],
//                 hour: parts[0]
//             })
//         }

//         if (datas.maskanMeli == 'مسکن ملی شهرک امام خمینی') {
//             setCheckedMaskanMeliEdit('emam');
//         }
//         else if (datas.maskanMeli == 'مسکن ملی شهرک شهید رییسی') {
//             setCheckedMaskanMeliEdit('shahid');

//         }
//         else {
//             setCheckedMaskanMeliEdit('');

//         }
//     }


const resetForm2 = () => {
    setInvoice([sampleInvoice]);
    setInput({
        customer_id: '',
        invoice: [{
            date: '',
            time: '',
            weight: '',
            cubicMeters: "",
            concrete_id: '',
            truck_id: '',
            ownerId: '',
            driver_id: '',
            cementStore_id: '',
            unitPrice: '',
            totalPrice: '',
            fare: '',
            maskanMeli: '',
            vahed: '',
            address: '',
            concretingPosition: ''
        }],
    });

    setCustomerId('');
    setConcreteId('');
    setTruckId('');
    setOwnerId('');
    setDriverId('');
    setCementStoreId('');
    setCheckedMaskanMeli();

    setTime({
        second: '',
        minute: '',
        hour: ''
    });

    setDate({
        day: '',
        month: '',
        year: ''
    });

    setUnitPrice('');
    setFare('');

    setCheckedValue('');
    setMaskan(['']);

    setVahed('');
    setAddress('');
    setConcretingPosition('');

    refCustomer_id.current.updateData('انتخاب');
}

    return (
        <div className=''>
            edit
        </div>
    )
}
export default Edit;