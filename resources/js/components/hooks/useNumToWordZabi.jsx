import { useState, useEffect } from 'react';

const useNumToWordZabi = (number) => {
  const [words, setWords] = useState('');

  useEffect(() => {
    const units = ['صفر', 'یک', 'دو', 'سه', 'چهار', 'پنج', 'شش', 'هفت', 'هشت', 'نه'];
    const teens = ['ده', 'یازده', 'دوازده', 'سیزده', 'چهارده', 'پانزده', 'شانزده', 'هفده', 'هجده', 'نوزده'];
    const tens = ['بیست', 'سی', 'چهل', 'پنجاه', 'شصت', 'هفتاد', 'هشتاد', 'نود'];
    const hundreds = ['صد', 'دویست', 'سیصد', 'چهارصد', 'پانصد', 'ششصد', 'هفتصد', 'هشتصد', 'نهصد'];

    const handleHundred = (part, letter = '') => {
      while (part.length < 3) {
        part = "0" + part;
      }
      let val = part.split('');
      console.log(`val = ${val}`);
      let string = '';
      if (val[0] > 0) {
        string = `${hundreds[val[0] - 1]} و`;
      }
      if (val[1] == 0) {
        if (val[2] > 0) {
          string = string + ` ${units[val[2]]}`;
        }
      } else if (val[1] == 1) {
        string = string + ` ${teens[val[2]]}`;
      } else if (val[1] > 1) {
        if (val[2] == 0) {
          string = string + ` ${tens[val[1] - 2]}`
        }
        else if (val[2] > 0) {
          string = string + ` ${tens[val[1] - 2]} و ${units[val[2]]}`
        }
      }
      string = string && (letter ? (' و ' + string + ' ') : ( string + ' '));
      console.log(`string ${string}`);
      return string;

    }
    const handleThousand = (part, letter = '') => {
      while (part.length < 3) {
        part = "0" + part;
      }
      let val = part.split('');
      let string = '';
      if (val[0] > 0) {
        string = `${hundreds[val[0] - 1]} و`;
      }
      if (val[1] == 0) {
        if (val[2] > 0) {
          string = string + ` ${units[val[2]]}`;
        }
      } else if (val[1] == 1) {
        string = string + ` ${teens[val[2]]}`;
      } else if (val[1] > 1) {
        if (val[2] == 0) {
          string = string + ` ${tens[val[1] - 2]}`
        }
        else if (val[2] > 0) {
          string = string + ` ${tens[val[1] - 2]} و ${units[val[2]]}`
        }
      }
      // string = string && string + 'هزار';
      string = string && (letter ? (' و ' + string) : ( string)) + ' هزار';
      return string;
    }
    const handleMillion = (part, letter = '') => {
      while (part.length < 3) {
        part = "0" + part;
      }
      console.log(part);
      let val = part.split('');
      let string = '';
      if (val[0] > 0) {
        string = ` ${hundreds[val[0] - 1]} و`;
      }
      if (val[1] == 0) {
        if (val[2] > 0) {
          string = string + ` ${units[val[2]]}`;
        }
      } else if (val[1] == 1) {
        string = string + ` ${teens[val[2]]}`;
      } else if (val[1] > 1) {
        if (val[2] == 0) {
          string = string + ` ${tens[val[1] - 2]}`
        }
        else if (val[2] > 0) {
          string = string + ` ${tens[val[1] - 2]} و ${units[val[2]]}`
        }
      }

      string = string && (letter ? (' و' + string) : (+ string)) + ' میلیون';
      return string;
    }
    const handleBillion = (part, letter = '') => {
      while (part.length < 3) {
        part = "0" + part;
      }
      let val = part.split('');
      let string = '';
      if (val[0] > 0) {
        string = `${hundreds[val[0] - 1]} و`;
      }
      if (val[1] == 0) {
        if (val[2] > 0) {
          string = string + ` ${units[val[2]]}`;
        }
      } else if (val[1] == 1) {
        string = string + ` ${teens[val[2]]}`;
      } else if (val[1] > 1) {
        if (val[2] == 0) {
          string = string + ` ${tens[val[1] - 2]}`
        }
        else if (val[2] > 0) {
          string = string + ` ${tens[val[1] - 2]} و ${units[val[2]]}`
        }
      }
      string = string && (letter ? (' و ' + string) : string) + ' میلیارد';
      // string = letter && ' و ' + string;
      return string;
    }
    const handleTillyard = (part) => {
      while (part.length < 3) {
        part = "0" + part;
      }
      let val = part.split('');
      let string = '';
      if (val[0] > 0) {
        string = `${hundreds[val[0] - 1]} و`;
      }
      if (val[1] == 0) {
        if (val[2] > 0) {
          string = string + ` ${units[val[2]]}`;
        }
      } else if (val[1] == 1) {
        string = string + ` ${teens[val[2]]}`;
      } else if (val[1] > 1) {
        if (val[2] == 0) {
          string = string + ` ${tens[val[1] - 2]}`
        }
        else if (val[2] > 0) {
          string = string + ` ${tens[val[1] - 2]} و ${units[val[2]]}`
        }
      }
      string = string + ' تیلیارد';
      return string;
    }

    const convertToWords = (num) => {
      let val = num.toLocaleString();
      val = val.split(',')
      let letter;
      switch (val.length) {
        case 1:
          letter = handleHundred(val[0]);
          letter = letter && letter + 'تومان';
          console.log(letter);
          break;

        case 2:
          letter =  handleThousand(val[0]);
          letter = letter + handleHundred(val[1], letter);
          letter = letter && letter + 'تومان';
          console.log(letter);
          break;

        case 3:
          letter = handleMillion(val[0]);
          letter = letter + handleThousand(val[1], letter);
          letter = letter + handleHundred(val[2], letter);
          letter = letter && letter + 'تومان';
          console.log(letter);
          break;

        case 4:

          letter = handleBillion(val[0]);
          letter = letter + handleMillion(val[1], letter);
          letter = letter + handleThousand(val[2], letter);
          letter = letter + handleHundred(val[3], letter);
          letter = letter && letter + 'تومان';
          console.log(letter);
          break;

        case 5:

          letter = handleTillyard(val[0]);
          letter = letter + handleBillion(val[1], letter);
          letter = letter + handleMillion(val[2], letter);
          letter = letter + handleThousand(val[3], letter);
          letter = letter + handleHundred(val[4], letter);
          letter = letter && letter + 'تومان';
          console.log(letter);
          break;
      }


      return num;
    };

    setWords(convertToWords(number));
  }, [number]);

  return words;
};

export default useNumToWordZabi;

// const convertToWords = (num) => {
//  // if (num < 10) return units[num];
//  // if (num < 20) return teens[num - 10];
//  // if (num < 100) return tens[Math.floor(num / 10) - 2] + (num % 10 > 0 ? ' و ' + units[num % 10] : '');
//  // if (num < 1000) return hundreds[Math.floor(num / 100) - 1] + (num % 100 > 0 ? ' و ' + convertToWords(num % 100) : '');
//  // if (num < 1000000) return convertToWords(Math.floor(num / 1000)) + ' هزار' + (num % 1000 > 0 ? ' و ' + convertToWords(num % 1000) : '');

//  return num;
// };
