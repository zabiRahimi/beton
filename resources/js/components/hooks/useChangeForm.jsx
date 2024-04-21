import { useState, useEffect, useRef } from 'react';
function useChangeForm(refs) {
  const { formCurrent, resetForm } = refs
  // ایجاد state برای آرگومان‌ها
  //   const [args, setArgs] = useState(initialArgs);

  // ایجاد متدها
  const [flexDirection, setFlexDirection] = useState('columnGe');
  const [hideGetCustomer, setHideGetCustomer] = useState(true);
  const containerShowGeRef = useRef(null);

  /** ست کردن موارد لازم هنگامی که کاربر ویرایش یک رکورد را انتخاب می‌کند */
  const [editMode, setEditMode] = useState(false);

  const showAddCustomerForm = () => {
    formCurrent && formCurrent.reset();
    // formCurrent.classList.toggle('--displayNone')
    // انجام کار با args...
  };

  const showCreatedCustomers = () => {
    // انجام کار با args...
    resetForm()
  };

  //    const resetForm = (apply=true) => {

  //     // setInput({
  //     //     name: '',
  //     //     lastName: '',
  //     //     father: '',
  //     //     nationalCode: '',
  //     //     dateOfBirth: '',
  //     //     mobile: '',
  //     //     telephone: '',
  //     //     email: '',
  //     //     postalCode: '',
  //     //     address: '',
  //     //     types: [],
  //     //     bankInfo: [
  //     //         {
  //     //             bank: '',
  //     //             account: '',
  //     //             card: '',
  //     //             shaba: ''
  //     //         }
  //     //     ]
  //     // });

  //     // customerTypeSelected.map((types) => {
  //     //     let ref = refs[types['id']]
  //     //     ref.current.classList.toggle('IcheckedItemCustomerTypeFB');
  //     // })
  //     // setCustomerTypeSelected([]);
  //     // lableCustomerType.current.textContent = 'انتخاب';
  //     // setDay('');
  //     // setMonth('');
  //     // setYear('');

  //     // sectionBank2.current.classList.add('--displayNone');
  //     // sectionBank3.current.classList.add('--displayNone');
  //     // sectionBank4.current.classList.add('--displayNone');
  //     // sectionBank5.current.classList.add('--displayNone');
  //     // moreBank1.current.classList.remove('--displayNone');
  //     // moreBank2.current.classList.remove('--displayNone');
  //     // moreBank3.current.classList.remove('--displayNone');
  //     // moreBank4.current.classList.remove('--displayNone');

  //     // var elements = document.getElementsByClassName('element');
  //     // for (var i = 0; i < elements.length; i++) {
  //     //     elements[i].classList.remove('borderRedFB');
  //     // }


  //     // var elements = document.getElementsByClassName('elementError');
  //     // for (var i = 0; i < elements.length; i++) {
  //     //     elements[i].innerHTML = '';
  //     // }

  //     // // در برخی مواقع لازم نیست کدهای داخل شرط استفاده شود
  //     // if (apply) {
  //     //     const element = form.current;
  //     //     let scrollPosition = window.scrollY || window.pageYOffset;
  //     //     const top = element.getBoundingClientRect().top + scrollPosition - 50;
  //     //     window.scrollTo({
  //     //         top: top,
  //     //         behavior: 'smooth'
  //     //     });
  //     // }


  // }

  // استفاده از useEffect برای بروزرسانی آرگومان‌ها
  //   useEffect(() => {
  //     // بروزرسانی args...
  //   }, [args]);

  // برگرداندن متدها و تابع بروزرسانی
  return { showAddCustomerForm, showCreatedCustomers, flexDirection, editMode, hideGetCustomer, containerShowGeRef };
}

export default useChangeForm;