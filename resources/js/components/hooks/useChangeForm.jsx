import { useState, useEffect, useRef } from 'react';
function useChangeForm(args) {
  const { formCurrent, resetForm } = args
  const containerShowGeRef = useRef(null);
  // ایجاد state برای آرگومان‌ها
  //   const [args, setArgs] = useState(initialArgs);

  // ایجاد متدها
  const [flexDirection, setFlexDirection] = useState('columnGe');
  const [hideCreatedRecord, setHideCreatedRecord] = useState(true);
  const [disabledBtnAddGe, setDisabledBtnAddGe] = useState(true);
    const [disabledBtnGetGe, setDisabledBtnGetGe] = useState(false);

  /** ست کردن موارد لازم هنگامی که کاربر ویرایش یک رکورد را انتخاب می‌کند */
  const [editMode, setEditMode] = useState(false);

  /**
   * نمایش فرم اضافه کردن اطلاعات و ایجاد رکورد جدید
   */
  const showAddForm = () => {
    formCurrent && formCurrent.reset();
    setDisabledBtnGetGe(false);
    setDisabledBtnAddGe(true);
    setFlexDirection('columnGe');
    setEditMode(false)
    resetForm();
  };

  const showCreatedRecord = () => {
    formCurrent && formCurrent.reset();
    resetForm();
    setDisabledBtnAddGe(false);
    setDisabledBtnGetGe(true);
    setFlexDirection('columnReverseGe');
    setHideCreatedRecord(false);
    
  };

  // استفاده از useEffect برای بروزرسانی آرگومان‌ها
  //   useEffect(() => {
  //     // بروزرسانی args...
  //   }, [args]);

  // برگرداندن متدها و تابع بروزرسانی
  return { showAddForm, showCreatedRecord, flexDirection, editMode, disabledBtnAddGe, disabledBtnGetGe, hideCreatedRecord, containerShowGeRef };
}

export default useChangeForm;