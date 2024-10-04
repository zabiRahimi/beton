import { useRef } from 'react';
import Title from '../../hooks/Title';
const AddCementInvoice = () => {
    const container = useRef(null);
return(
<div ref={container}>
 <Title title='ایجاد فاکتور خرید سیمان'/>
</div>
)
}
export default AddCementInvoice;