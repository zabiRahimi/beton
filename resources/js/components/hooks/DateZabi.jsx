const DateZabi = () => {
    let years = [];
    

    
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

    const days=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];

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

    let optionDays = days.map((day)=>{
         return <option value={day}>{day}</option>
    })

    let optionMonth = months.map((month)=>{
        return <option value={month}>{month}</option>
   })

   let optionYears = years.map((year)=>{
    return <option value={year}>{year}</option>
})

    return { years,  months, days, nameDays,optionDays,optionMonth,optionYears };
};
export default DateZabi;
