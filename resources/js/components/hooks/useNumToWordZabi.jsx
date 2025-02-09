import { useState, useEffect } from 'react';

const useNumToWordZabi = (number) => {
  const [words, setWords] = useState('');

  useEffect(() => {
    const units = ['صفر', 'یک', 'دو', 'سه', 'چهار', 'پنج', 'شش', 'هفت', 'هشت', 'نه'];
    const teens = ['ده', 'یازده', 'دوازده', 'سیزده', 'چهارده', 'پانزده', 'شانزده', 'هفده', 'هجده', 'نوزده'];
    const tens = ['بیست', 'سی', 'چهل', 'پنجاه', 'شصت', 'هفتاد', 'هشتاد', 'نود'];
    const hundreds = ['صد', 'دویست', 'سیصد', 'چهارصد', 'پانصد', 'ششصد', 'هفتصد', 'هشتصد', 'نهصد'];

    const handlePart = (part, suffix, index) => {
      const val = part.padStart(3, '0').split('');
      let string = '';
      if (val[0] > 0) string = `${hundreds[val[0] - 1]}`;
      if (val[1] == 1) {
        string = string ? (string + ' و ' + teens[val[2]]) : teens[val[2]];
      } else {
        if (val[1] > 1) string = string ? `${string} و ${tens[val[1] - 2]}` : `${tens[val[1] - 2]}`;
        if (val[2] > 0) string = string ? `${string} و ${units[val[2]]}` : units[val[2]];
      }
      if (index > 0 && (val[0] > 0 || val[1] > 0 || val[2] > 0)) string = `و ${string}`;
      return string.trim() + ((suffix && (val[0] > 0 || val[1] > 0 || val[2] > 0)) ? ` ${suffix}` : '');
    };

    const convertToWords = (num) => {
      num = Number(num);//تبدیل رشته عددی به عدد
      const parts = num.toLocaleString('en-US').split(',');
      let result = '';
      const suffixes = ['', 'هزار', 'میلیون', 'میلیارد', 'تیلیارد'];

      parts.forEach((part, index) => {
        const suffixIndex = parts.length - index - 1;
        result += `${handlePart(part, suffixes[suffixIndex], index)} `;
      });

      return result.trim() + ' تومان';
    };
    if (!isNaN(number) && String(number).length <= 15) {
      setWords(convertToWords(number));
    } else {
      setWords('عدد ورودی معتبر نیست');
    }
  }, [number]);

  return words;
};

export default useNumToWordZabi;



// import { useState, useEffect } from 'react';

// const useNumToWordZabi = (number) => {
//   const [words, setWords] = useState('');

//   useEffect(() => {
//     const units = ['صفر', 'یک', 'دو', 'سه', 'چهار', 'پنج', 'شش', 'هفت', 'هشت', 'نه'];
//     const teens = ['ده', 'یازده', 'دوازده', 'سیزده', 'چهارده', 'پانزده', 'شانزده', 'هفده', 'هجده', 'نوزده'];
//     const tens = ['بیست', 'سی', 'چهل', 'پنجاه', 'شصت', 'هفتاد', 'هشتاد', 'نود'];
//     const hundreds = ['صد', 'دویست', 'سیصد', 'چهارصد', 'پانصد', 'ششصد', 'هفتصد', 'هشتصد', 'نهصد'];

//     const handleHundred = (part, letter = '') => {
//       while (part.length < 3) {
//         part = "0" + part;
//       }
//       let val = part.split('');
//       let string = '';
//       if (val[0] > 0) {
//         string = `${hundreds[val[0] - 1]} و`;
//       }
//       if (val[1] == 0) {
//         if (val[2] > 0) {
//           string = string + ` ${units[val[2]]}`;
//         }
//       } else if (val[1] == 1) {
//         string = string + ` ${teens[val[2]]}`;
//       } else if (val[1] > 1) {
//         if (val[2] == 0) {
//           string = string + ` ${tens[val[1] - 2]}`
//         }
//         else if (val[2] > 0) {
//           string = string + ` ${tens[val[1] - 2]} و ${units[val[2]]}`
//         }
//       }
//       string = string && (letter ? (' و ' + string + ' ') : (string + ' '));
//       return string;

//     }
//     const handleThousand = (part, letter = '') => {
//       while (part.length < 3) {
//         part = "0" + part;
//       }
//       let val = part.split('');
//       let string = '';
//       if (val[0] > 0) {
//         string = `${hundreds[val[0] - 1]} و`;
//       }
//       if (val[1] == 0) {
//         if (val[2] > 0) {
//           string = string + ` ${units[val[2]]}`;
//         }
//       } else if (val[1] == 1) {
//         string = string + ` ${teens[val[2]]}`;
//       } else if (val[1] > 1) {
//         if (val[2] == 0) {
//           string = string + ` ${tens[val[1] - 2]}`
//         }
//         else if (val[2] > 0) {
//           string = string + ` ${tens[val[1] - 2]} و ${units[val[2]]}`
//         }
//       }
//       string = string && (letter ? (' و ' + string) : (string)) + ' هزار';
//       return string;
//     }

//     const handleMillion = (part, letter = '') => {
//       while (part.length < 3) {
//         part = "0" + part;
//       }
//       let val = part.split('');
//       let string = '';
//       if (val[0] > 0) {
//         string = ` ${hundreds[val[0] - 1]} و`;
//       }
//       if (val[1] == 0) {
//         if (val[2] > 0) {
//           string = string + ` ${units[val[2]]}`;
//         }
//       } else if (val[1] == 1) {
//         string = string + ` ${teens[val[2]]}`;
//       } else if (val[1] > 1) {
//         if (val[2] == 0) {
//           string = string + ` ${tens[val[1] - 2]}`
//         }
//         else if (val[2] > 0) {
//           string = string + ` ${tens[val[1] - 2]} و ${units[val[2]]}`
//         }
//       }

//       string = string && (letter ? (' و' + string) : ( string)) + ' میلیون';
//       return string;
//     }


//     const handleBillion = (part, letter = '') => {
//       while (part.length < 3) {
//         part = "0" + part;
//       }
//       let val = part.split('');
//       let string = '';
//       if (val[0] > 0) {
//         string = `${hundreds[val[0] - 1]} و`;
//       }
//       if (val[1] == 0) {
//         if (val[2] > 0) {
//           string = string + ` ${units[val[2]]}`;
//         }
//       } else if (val[1] == 1) {
//         string = string + ` ${teens[val[2]]}`;
//       } else if (val[1] > 1) {
//         if (val[2] == 0) {
//           string = string + ` ${tens[val[1] - 2]}`
//         }
//         else if (val[2] > 0) {
//           string = string + ` ${tens[val[1] - 2]} و ${units[val[2]]}`
//         }
//       }
//       string = string && (letter ? (' و ' + string) : string) + ' میلیارد';
//       return string;
//     }
//     const handleTillyard = (part) => {
//       while (part.length < 3) {
//         part = "0" + part;
//       }
//       let val = part.split('');
//       let string = '';
//       if (val[0] > 0) {
//         string = `${hundreds[val[0] - 1]} و`;
//       }
//       if (val[1] == 0) {
//         if (val[2] > 0) {
//           string = string + ` ${units[val[2]]}`;
//         }
//       } else if (val[1] == 1) {
//         string = string + ` ${teens[val[2]]}`;
//       } else if (val[1] > 1) {
//         if (val[2] == 0) {
//           string = string + ` ${tens[val[1] - 2]}`
//         }
//         else if (val[2] > 0) {
//           string = string + ` ${tens[val[1] - 2]} و ${units[val[2]]}`
//         }
//       }
//       string = string + ' تیلیارد';
//       return string;
//     }

//     const convertToWords = (num) => {
//       let val = num.toLocaleString();
//       val = val.split(',')
//       let letter;
//       switch (val.length) {
//         case 1:
//           letter = handleHundred(val[0]);
//           letter = letter && letter + 'تومان';
//           break;

//         case 2:
//           letter = handleThousand(val[0]);
//           letter = letter + handleHundred(val[1], letter);
//           letter = letter && letter + 'تومان';
//           break;

//         case 3:
//           letter = handleMillion(val[0]);
//           letter = letter + handleThousand(val[1], letter);
//           letter = letter + handleHundred(val[2], letter);
//           letter = letter && letter + 'تومان';
//           break;

//         case 4:

//           letter = handleBillion(val[0]);
//           letter = letter + handleMillion(val[1], letter);
//           letter = letter + handleThousand(val[2], letter);
//           letter = letter + handleHundred(val[3], letter);
//           letter = letter && letter + 'تومان';
//           break;

//         case 5:

//           letter = handleTillyard(val[0]);
//           letter = letter + handleBillion(val[1], letter);
//           letter = letter + handleMillion(val[2], letter);
//           letter = letter + handleThousand(val[3], letter);
//           letter = letter + handleHundred(val[4], letter);
//           letter = letter && letter + 'تومان';
//           break;
//       }

//       return letter;
//     };

//     setWords(convertToWords(number));
//   }, [number]);

//   return words;
// };

// export default useNumToWordZabi;
