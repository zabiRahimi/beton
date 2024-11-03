import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const SweetAlertHnadler = ({ hasBuyers, hasConcretes, hasCementStores, hasSandStores, hasWaterStores, hasMixers, hasDrivers }) => {
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();
  const alerts = [];
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
  if (!hasConcretes) {
    alerts.push({
      icon: "warning",
      title: "هشدار",
      text: `هنوز هیچ عیار بتنی ثبت نشده است. لازم است ابتدا عیار بتن را ثبت کنید.`,
      confirmButtonText: "  ثبت بتن   ",
      showCancelButton: true,
      cancelButtonText: "کنسل",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      preConfirm: () => {
        navigate("/addConcrete");
      }
    });
  }
  if (!hasCementStores) {
    alerts.push({
      icon: "warning",
      title: "هشدار",
      text: `هنوز هیچ سیلوی سیمانی ثبت نشده است. لازم است ابتدا سیلو را ثبت کنید.`,
      confirmButtonText: "  ثبت سیلو   ",
      showCancelButton: true,
      cancelButtonText: "کنسل",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      preConfirm: () => {
        navigate("/addCementStore");
      }
    });
  }
  if (!hasSandStores) {
    alerts.push({
      icon: "warning",
      title: "هشدار",
      text: `هنوز هیچ سیلوی شن‌وماسه‌ای ثبت نشده است. لازم است ابتدا سیلو را ثبت کنید. دقت کنید یک سیلو برای ماسه شسته و یک سیلو برای شن بادامی ثبت کنید.`,
      confirmButtonText: "  ثبت سیلو   ",
      showCancelButton: true,
      cancelButtonText: "کنسل",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      preConfirm: () => {
        navigate("/addSandStore");
      }
    });
  }
  if (!hasWaterStores) {
    alerts.push({
      icon: "warning",
      title: "هشدار",
      text: `هنوز هیچ مخزن آبی ثبت نشده است. لازم است ابتدا مخزن را ثبت کنید.`,
      confirmButtonText: "  ثبت مخزن   ",
      showCancelButton: true,
      cancelButtonText: "کنسل",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      preConfirm: () => {
        navigate("/addWaterStore");
      }
    });
  }
  if (!hasMixers) {
    alerts.push({
      icon: "warning",
      title: "هشدار",
      text: `هنوز هیچ کامیونی به عنوان میکسر ثبت نشده است. لازم است ابتدا کامیونی به عنوان میکسر ثبت کنید.`,
      confirmButtonText: "  ثبت میکسر   ",
      showCancelButton: true,
      cancelButtonText: "کنسل",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      preConfirm: () => {
        navigate("/addTruck");
      }
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


  const showAlert = (index = 0) => {
    if (index < alerts.length) {
      MySwal.fire(alerts[index]).then((result) => {
        if (result.isConfirmed && alerts[index].preConfirm) {
          alerts[index].preConfirm();
        } else {
          showAlert(index + 1);
        }
      });
    }
  }

  return { showAlert };
};

export default SweetAlertHnadler;
