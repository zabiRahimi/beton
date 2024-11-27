import { forwardRef, useImperativeHandle } from "react";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const DateZabi = () => {
    const MySwal = withReactContent(Swal);
    let years = [],
        shortYears = [];

    const months = [
        "فروردین",
        "اردیبهشت",
        "خرداد",
        "تیر",
        "مرداد",
        "شهریور",
        "مهر",
        "آبان",
        "آذر",
        "دی",
        "بهمن",
        "اسفند"
    ];
    const nameDays = [
        "شنبه",
        "یکشنبه",
        "دوشنبه",
        "سه‌شنبه",
        "چهارشنبه",
        "پنج‌شنبه",
        "جمعه",
    ];

    const days = ['01', '02', '03', '04', '05', '06', '07', '08', '09', 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];

    const hours = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];

    const minutes = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59];

    const seconds = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59];


    const cabises = [
        1300, 1304, 1309, 1313, 1317, 1321, 1325, 1329, 1333, 1337, 1342, 1346,
        1350, 1354, 1358, 1362, 1366, 1370, 1375, 1379, 1383, 1387, 1391, 1395,
        1399, 1403, 1408, 1412, 1416, 1420, 1424, 1428, 1432, 1436, 1441, 1445,
        1449, 1453, 1457, 1461, 1465, 1469, 1474, 1478, 1482, 1486, 1490, 1494,
        1498,
    ];

    for (let index = 1300; index < 1501; index++) {
        years.push(index);
    }

    for (let index = 1400; index < 1460; index++) {
        shortYears.push(index);
    }

    let optionDays = days.map((day, i) => {
        return <option key={i} value={day}>{day}</option>
    });

    let optionMonth = months.map((month, i) => {
        return <option key={i} value={(i + 1) < 10 ? '0' + (i + 1) : (i + 1)}>{month}</option>
    });

    let optionYears = years.map((year, i) => {
        return <option key={i} value={year}>{year}</option>
    });

    let optionShortYears = shortYears.map((year, i) => {
        return <option key={i} value={year}>{year}</option>
    });

    let optionHours = hours.map((hour, i) => {
        return <option key={i} value={hour}>{hour}</option>
    });

    let optionMinutes = minutes.map((minute, i) => {
        return <option key={i} value={minute}>{minute}</option>
    });

    let optionSeconds = seconds.map((second, i) => {
        return <option key={i} value={second}>{second}</option>
    });

    // useImperativeHandle(ref, () => ({
    //     checkDate(date) {
    //       alert(date);
    //     }
    //   }));
    const checkDate = (date, message) => {
        let parts;
        let dateLength = date.length
        if (dateLength > 10 || dateLength < 10) {
            // alert('فرمت تاریخ درست نمی باشد')
            handelSentError(message, 'فرمت تاریخ درست نمی باشد و تاریخ بطور کامل وارد نشده است');
            return false;
        }
        const separator1 = '/';
        const separator2 = '-';
        const index1 = date.indexOf(separator1);
        const index2 = date.indexOf(separator2);
        if (index1 !== -1) {
            parts = date.split(separator1);
        } else if (index2 !== -1) {
            parts = date.split(separator2);
        } else {
            handelSentError(message, 'فرمت تاریخ درست نمی‌باشد');
            return false;
        }
       const resutl= validDate(message, parts[0], parts[1], parts[2]);
       return resutl;
    }

    const validDate = (message, year, month, day) => {
       
        if (month=='01' || month=='02' || month=='03' || month=='04' || month=='05'|| month=='06') {
            if (Number(day) <1 || Number(day) > 31) {
                handelSentError(message, ` برج ${month} ، 31 روزه است نه بیشتر `);
                return false;
            } 
        } else if (month=='07' || month=='08' || month=='09' || month=='10' || month=='11') {
            if (Number(day) <1 || Number(day) > 30) {
                handelSentError(message, ` برج ${month} ، 30 روزه است نه بیشتر `);
                return false;
            } 
        }else if (month=='12') {
           let checkCabise= cabises.some(cabise => cabise === Number(year));
            if(!checkCabise){
                if (Number(day) >29) {
                    handelSentError(message, ` در سال ${year} برج 12 نمی تواند 30 روزه باشد، چون این سال کبیسه نیست.`);
                    return false;
                }
            }else{
                if (Number(day) >30) {
                    handelSentError(message, ` برج ${month} هرگز نمی‌تواند 31 روزه باشد.`);
                    return false;
                } 
            }  
        } else{
            handelSentError(message, `برج را صحیح وارد نکرده‌اید`);
                    return false;
        }
        
        if (Number(year) < 1300 || Number(year) > 1600) {
            handelSentError(message, `سال صحیح وارد نشده است، لطفا بازه سال مابین 1300 تا 1500 باشد، در غیر این صورت برنامه خطا صادر می‌کند`);
                    return false;
        }

        return true;
    }

    const handelSentError = (message, error) => {
        MySwal.fire({
            icon: "warning",
            title: "هشدار",
            html: `<div><div style="color: red;">${message}</div><div style="color: red;"> زیرا ${error}</div></div>`,
            confirmButtonText: "متوجه شدم!",
            confirmButtonColor: "#d33",
        });
    }

    return { years, months, days, nameDays, hours, minutes, seconds, optionDays, optionMonth, optionYears, optionShortYears, optionHours, optionMinutes, optionSeconds, checkDate };
};
export default DateZabi;
