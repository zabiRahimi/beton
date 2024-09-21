import { useState, useRef } from 'react';
function useChangeForm(args) {
  const { formCurrent, resetForm, pasteDataForEditing , resetForm2=null} = args;
  const containerShowGeRef = useRef(null);
  // ایجاد state برای آرگومان‌ها
  //   const [args, setArgs] = useState(initialArgs);

  // ایجاد متدها
  const [flexDirection, setFlexDirection] = useState('columnGe');
  const [hideCreatedRecord, setHideCreatedRecord] = useState(true);
  const [hideShowForm, setHideShowForm] = useState(false);
  const [disabledBtnShowForm, setDisabledBtnShowForm] = useState(true);
  const [disabledBtnShowRecords, setDisabledBtnShowRecords] = useState(false);

  /** ست کردن موارد لازم هنگامی که کاربر ویرایش یک رکورد را انتخاب می‌کند */
  const [editMode, setEditMode] = useState(false);


  /**
   * نمایش فرم اضافه کردن اطلاعات و ایجاد رکورد جدید
   */
  const showAddForm = (chengeResetForm) => {
    formCurrent && formCurrent.reset();
    setDisabledBtnShowRecords(false);
    setDisabledBtnShowForm(true);
    setFlexDirection('columnGe');
    setEditMode(false);
    setHideCreatedRecord(true);

    if (!chengeResetForm) {
      resetForm();
    } else {
      if (typeof resetForm2 === 'function') {
        resetForm2();
      }
    }
    setHideShowForm(false);//آزمایشی
   document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /**
   * نمایش لیست رکوردهای ثبت شده
   */
  const showCreatedRecord = (chengeResetForm) => {
    formCurrent && formCurrent.reset();
    if (!chengeResetForm) {
      resetForm();
    } else {
      if (typeof resetForm2 === 'function') {
        resetForm2();
      }
      
    }
    setDisabledBtnShowForm(false);
    setDisabledBtnShowRecords(true);
    setFlexDirection('columnReverseGe');
    setHideCreatedRecord(false);
    setHideShowForm(true);//آزمایشی
   document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /**
   * نمایش فرم ویرایش رکوردهای ثبت شده
   */
  const showEditForm = async(id) => {
    setDisabledBtnShowRecords(false);
    setDisabledBtnShowForm(false);
    setFlexDirection('columnGe');
    setEditMode(true);
    setHideCreatedRecord(true);
    setHideShowForm(false);
    await pasteDataForEditing(id);
   document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });

  }

  // برگرداندن متدها و تابع بروزرسانی
  return { showAddForm, showCreatedRecord, showEditForm, flexDirection, editMode, disabledBtnShowForm, disabledBtnShowRecords, hideCreatedRecord, containerShowGeRef, hideShowForm };
}

export default useChangeForm;