import { useState } from 'react';

// توجه این کد تست نشده است
function usePersianToEnglishNumber() {
    const [value, setValue] = useState('');

    const handleChange = (event) => {
        const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
        const englishNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

        let englishInput = event.target.value;
        for (let i = 0; i < 10; i++) {
            englishInput = englishInput.replace(new RegExp(persianNumbers[i], 'g'), englishNumbers[i]);
        }

        if (englishInput[0] !== '0') {
            englishInput = '0' + englishInput;
        }

        setValue(englishInput);
    };

    return [value, handleChange];
}


