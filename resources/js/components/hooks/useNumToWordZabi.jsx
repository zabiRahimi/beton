import { useState, useEffect } from 'react';

const useNumToWordZabi = (number) => {
  const [words, setWords] = useState('');

  useEffect(() => {
    const units = ['صفر', 'یک', 'دو', 'سه', 'چهار', 'پنج', 'شش', 'هفت', 'هشت', 'نه'];
    const teens = ['ده', 'یازده', 'دوازده', 'سیزده', 'چهارده', 'پانزده', 'شانزده', 'هفده', 'هجده', 'نوزده'];
    const tens = ['بیست', 'سی', 'چهل', 'پنجاه', 'شصت', 'هفتاد', 'هشتاد', 'نود'];
    const hundreds = ['صد', 'دویست', 'سیصد', 'چهارصد', 'پانصد', 'ششصد', 'هفتصد', 'هشتصد', 'نهصد'];

    const handleHundred = (part) => {
      while (part.length < 3) {
        part = "0" + part;}
        
        let val = part.split('');
      let string;
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
      return string;

    }
    const handleThousand = (part) => {
      while (part.length < 3) {
        part = "0" + part;}
      let val = part.split('');
      let string;
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
      string = string + 'هزار';
      return string;
    }
    const handleMillion = (part) => {
      while (part.length < 3) {
        part = "0" + part;}
      let val = part.split('');
      let string;
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
      string = string + 'میلیون';
      return string;
     }
    const handleBillion = (part) => {
      while (part.length < 3) {
        part = "0" + part;}
      let val = part.split('');
      let string;
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
      string = string + 'میلیارد';
      return string;
     }
    const handleTillyard = (part) => { 
      while (part.length < 3) {
        part = "0" + part;}
      let val = part.split('');
      let string;
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
      string = string + 'تیلیارد';
      return string;
    }

    const convertToWords = (num) => {
      let val = num.toLocaleString();
      val = val.split(',')
      console.log(val.length);
      switch (val.length) {
        case 1:

          break;

        case 2:

          break;

        case 3:

          break;

        case 4:

          break;

        case 5:
          let letter;
          letter= handleTillyard('2');
          letter=letter+handleBillion('987');
          letter= letter+handleMillion('654');
          letter=letter+handleThousand('568');
          letter=letter+handleHundred('249');
          console.log(letter);
          break;

        case 6:

          break;

        default:
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
