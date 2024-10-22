import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const SweetAlertHnadler = ({ hasBuyers, hasMixers, hasMixerOwners, hasDrivers, hasConcreteTypes }) => {
  const alerts = [];
  console.log(`hasBuyers: ${hasBuyers}`);
  if (!hasBuyers) {
    alerts.push({
      icon: "warning",
      title: "هشدار",
      text: `هنوز هیچ مشتری‌ای به عنوان خریدار بتن ثبت نشده است. لازم است ابتدا خریداران بتن را به عنوان مشتری ثبت کنید.`,
      confirmButtonText: "  ثبت مشتری   ",
      showCancelButton: true,
      cancelButtonText: "کنسل",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
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
  showAlert();
  // return { showAlert };
};

export default SweetAlertHnadler;
