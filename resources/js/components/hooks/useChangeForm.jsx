import { useState, useEffect, useRef } from 'react';
function useChangeForm(args) {
  const { formCurrent, resetForm } = args
  const containerShowGeRef = useRef(null);
  // ایجاد state برای آرگومان‌ها
  //   const [args, setArgs] = useState(initialArgs);

  // ایجاد متدها
  const [flexDirection, setFlexDirection] = useState('columnGe');
  const [hideCreatedRecord, setHideCreatedRecord] = useState(true);
  const [disabledBtnShowForm, setDisabledBtnShowForm] = useState(true);
    const [disabledBtnShowRecords, setDisabledBtnShowRecords] = useState(false);

  /** ست کردن موارد لازم هنگامی که کاربر ویرایش یک رکورد را انتخاب می‌کند */
  const [editMode, setEditMode] = useState(false);

  /**
   * نمایش فرم اضافه کردن اطلاعات و ایجاد رکورد جدید
   */
  const showAddForm = () => {
    formCurrent && formCurrent.reset();
    setDisabledBtnShowRecords(false);
    setDisabledBtnShowForm(true);
    setFlexDirection('columnGe');
    setEditMode(false)
    resetForm();
  };

  const showCreatedRecord = () => {
    formCurrent && formCurrent.reset();
    resetForm();
    setDisabledBtnShowForm(false);
    setDisabledBtnShowRecords(true);
    setFlexDirection('columnReverseGe');
    setHideCreatedRecord(false);
    
  };

  // استفاده از useEffect برای بروزرسانی آرگومان‌ها
  //   useEffect(() => {
  //     // بروزرسانی args...
  //   }, [args]);

  // برگرداندن متدها و تابع بروزرسانی
  return { showAddForm, showCreatedRecord, flexDirection, editMode, disabledBtnShowForm, disabledBtnShowRecords, hideCreatedRecord, containerShowGeRef };
}

export default useChangeForm;