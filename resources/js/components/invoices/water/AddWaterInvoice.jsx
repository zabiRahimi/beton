import { useRef } from 'react';
import Title from '../../hooks/Title'
const AddWaterInvoice = () => {
    const container = useRef(null);
return(
<div ref={container}>
 <Title title='ایجاد فاکتور خرید آب'/>
</div>
)
}
export default AddWaterInvoice;