import { ScaleLoader } from 'react-spinners';
import Title from '../../hooks/Title'
import { useEffect, useRef, useState } from 'react';
const headPage = ({loading}) => {
    const container = useRef(null);
     /**
     * دریافت و ذخیره پهنای کامپوننت برای نمایش بهتر لودر
     */
     const [widthComponent, setWidthComponent] = useState(0);
     useEffect(() => {
         let widths = container.current.offsetWidth;
         setWidthComponent(widths)
     }, []);
    return (
        <div ref={container}>
            <ScaleLoader color="#fff" height={90} width={8} radius={16} loading={loading} cssOverride={{
                backgroundColor: '#6d6b6b',
                position: 'fixed',
                top: 0,
                width: widthComponent + 'px',
                height: '100vh',
                zIndex: 100,
                opacity: 0.2,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }} />
            <Title title='sand' />
        </div>
    )
}
export default headPage;