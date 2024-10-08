import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import '../../../css/selectZabi.css';
const SelectZabi2 = forwardRef(({ options, input, optionsSearched, warning, elementWarning, clearSearch, primaryLabel, saveOption, saveOption2, saveOption3 }, ref) => {
    const mainSZ = useRef(null);
    const labelRef = useRef(null);
    const mainOptionRef = useRef(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredOptions, setFilteredOptions] = useState(options);
    const [currentElement, setCurrentElement] = useState(primaryLabel);
    const [hasFocused, setHasFocused] = useState(false);
    useImperativeHandle(ref, () => ({
        updateData(value) {
            setCurrentElement(value);
        }
    }));
    // useEffect(() => {
    //     // warning=false;
    //     // console.log(warning);
    // }, [hasFocused])
    
    const handleFocus = () => {
        setHasFocused(true);
        
        
    };

    const returnInputSearch = () => {
        let vals;
        vals = input.map((val, i) => (
            <div
                className='containerSearchSZ'
                key={i}
            >
                {val.html}
            </div>


        ));
        return vals;
    }
    const returnOptionsSearched = () => {
        let vals;
        vals = optionsSearched.map((val, i) => (
            <div
                className='containerSearchOptionSZ'
                key={i}
                onClick={() => {
                    setCurrentElement(val.html);
                    changeHandle(val.value, val.value2 ? val.value2 : null, val.value3 ? val.value3 : null)
                }}>
                {val.html}
            </div>
        ));
        return vals;
    }

    const returnOptions = () => {
        let vals;
        vals = options.map((val, i) => {
            return <div
                className='containerOptionSZ'
                key={i}
                onClick={() => {
                    setCurrentElement(val.html);
                    changeHandle(val.value, val.value2 ? val.value2 : null, val.value3 ? val.value3 : null)
                }}>
                {val.html}
            </div>
        })
        return vals;
    }

    const returnSearchWarning = () => {
        let vals = <div
            className='containerWarnSZ'
        >
            {elementWarning}
        </div>

        return vals;
    }

    const optionDisplayHandle = (apply = true) => {
        if (apply) {
            mainOptionRef.current.classList.add('--hidden');
        } else {
            mainOptionRef.current.classList.toggle('--hidden');
        }
    }

    const changeHandle = (val, val2, val3) => {
        saveOption(val);

        if (val2 && typeof saveOption2 === 'function') {
            saveOption2(val2);
        }

        if (val3 && typeof saveOption3 === 'function') {
            saveOption3(val3);
        }
        optionDisplayHandle();
    }

   

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (mainSZ.current && !mainSZ.current.contains(event.target)) {
                if (hasFocused) {
                    optionDisplayHandle();
                    setHasFocused(false);
                }
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('touchstart', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        };
    }, [optionDisplayHandle]);


    return (
        <div
            className='mainSZ'
            ref={mainSZ}
            onClick={handleFocus}
        >
            <div
                className='titleSZ'
                onClick={() => { optionDisplayHandle(false);clearSearch() }}

            >
                <span className="labelSZ" ref={labelRef}> {currentElement}</span>
                <i className="icofont-caret-down iSZ" />
            </div>
            <div className='mainOptionSZ --hidden ' ref={mainOptionRef} >

                <div className="divContainerInputSZ">
                    {input && input.length > 0
                        && returnInputSearch()}
                </div>

                <div className="divContainerWarnSearchSZ">
                    {warning && returnSearchWarning()}
                </div>
                
                <div className="divContainerOptionSearchSZ">
                    {optionsSearched && optionsSearched.length > 0
                        && returnOptionsSearched()}
                </div>

                

                <div className="divContainerOptionsSZ">
                    {options.length > 0 ? returnOptions() : <Skeleton height={32} count={6} />}
                </div>


            </div>
        </div>
    );
})

export default SelectZabi2;
























































;