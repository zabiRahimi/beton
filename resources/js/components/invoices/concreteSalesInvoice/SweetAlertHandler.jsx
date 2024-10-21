import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const SweetAlertHnadler = ({ hasBuyers, hasMixers, hasMixerOwners, hasDrivers, hasConcreteTypes }) => {
  const alerts = [];

  if (!hasBuyers) {
    alerts.push({
      title: 'اخطار',
      text: 'اطلاعات مربوط به خریداران بتن ثبت نشده است!',
      icon: 'warning',
      confirmButtonText: 'باشه',
      // preConfirm: () => {
      //   navigate("/addCustomer");
      // }
    });
  }
  if (!hasMixers) {
    alerts.push({
      title: 'اخطار',
      text: 'اطلاعات مربوط به میکسرها ثبت نشده است!',
      icon: 'warning',
      confirmButtonText: 'باشه',
    });
  }
  if (!hasMixerOwners) {
    alerts.push({
      title: 'اخطار',
      text: 'اطلاعات مربوط به صاحبان میکسرها ثبت نشده است!',
      icon: 'warning',
      confirmButtonText: 'باشه',
    });
  }
  if (!hasDrivers) {
    alerts.push({
      title: 'اخطار',
      text: 'اطلاعات مربوط به راننده‌ها ثبت نشده است!',
      icon: 'warning',
      confirmButtonText: 'باشه',
    });
  }
  if (!hasConcreteTypes) {
    alerts.push({
      title: 'اخطار',
      text: 'اطلاعات مربوط به انواع بتن ثبت نشده است!',
      icon: 'warning',
      confirmButtonText: 'باشه',
    });
  }

  const showAlert = (index = 0) => {
    if (index < alerts.length) {
      MySwal.fire(alerts[index]).then(() => {
        showAlert(index + 1);
      });
    }
  };

  return { showAlert };
};

export default SweetAlertHnadler;
