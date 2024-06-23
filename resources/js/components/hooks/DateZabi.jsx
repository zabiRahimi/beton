const DateZabi = () => {
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

    const hours = ['01', '02', '03', '04', '05', '06', '07', '08', '09', 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];

    const minutes = ['01', '02', '03', '04', '05', '06', '07', '08', '09', 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60];

    const seconds = ['01', '02', '03', '04', '05', '06', '07', '08', '09', 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60];


    const cabise = [
        1300, 1304, 1309, 1313, 1317, 1321, 1325, 1329, 1333, 1337, 1342, 1346,
        1350, 1354, 1358, 1362, 1366, 1370, 1375, 1379, 1383, 1387, 1391, 1395,
        1399, 1403, 1408, 1412, 1416, 1420, 1424, 1428, 1432, 1436, 1441, 1445,
        1449, 1453, 1457, 1461, 1465, 1469, 1474, 1478, 1482, 1486, 1490, 1494,
        1498,
    ];

    for (let index = 1300; index < 1501; index++) {
        years.push(index);
    }

    for (let index = 1403; index < 1411; index++) {
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

    return { years, months, days, nameDays, hours, minutes, seconds, optionDays, optionMonth, optionYears, optionShortYears, optionHours, optionMinutes, optionSeconds };
};
export default DateZabi;
