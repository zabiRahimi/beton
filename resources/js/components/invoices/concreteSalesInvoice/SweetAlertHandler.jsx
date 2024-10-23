import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


const SweetAlertHnadler = ({ hasBuyers, hasMixers, hasDrivers, hasConcreteTypes }) => {
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();
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
      preConfirm: () => {

        navigate("/addCustomer");
        
      }
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

  if (!hasDrivers) {
    alerts.push({
      icon: "warning",
      title: "هشدار",
      text: `هنوز هیچ راننده‌ای ثبت نشده است. لازم است ابتدا راننده را ثبت کنید.`,
      confirmButtonText: "  ثبت راننده   ",
      showCancelButton: true,
      cancelButtonText: "کنسل",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      preConfirm: () => {
        navigate("/addDriver");
      }
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

  

  const showAlert = ( index = 0) => {
  console.log( alerts.length);
    if (index < alerts.length) {
      MySwal.fire(alerts[index]).then((result) => {
        if (result.isConfirmed && alerts[index].preConfirm) {
          alerts[index].preConfirm();
        } else {
          showAlert( index + 1);
        }
      });
    }
  }
  
  
  return { showAlert };
};

export default SweetAlertHnadler;
