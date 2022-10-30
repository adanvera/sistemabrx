import React, { Component, useState, useEffect } from "react";




const Select = props => {
    const [state, setState] = useState({
        selectedValue: '',
    })

    const onHandleChange = (e) => {
        e.preventDefault()
        const value = e.target.value

        setState(state => (
            {
                selectedValue: e.target.value,
            }
        ))
        props.setSelected({ key: props.optionList.slice, value: e.target.value })
    }

    const { optionList } = props;
    useEffect(() => {
        setState(prev => ({
            ...prev,
            selectedValue: props.defaultValue,
        }))
    }, [props.defaultValue]);

    // console.log('Select check optionlist: ', optionList)
    return (
        <div>
            <label className="mb-1" htmlFor="">{optionList.label}:</label>
            <br />
            <select className="select-options pl-2 w-100" value={state.selectedValue} onChange={onHandleChange}>
                <option disabled>{optionList.disabled}</option>
                {Object.keys(optionList.options).map((item) => {
                    return (
                        <option key={item} value={item}>{optionList.options[item]}</option>
                    )
                })}
            </select>
        </div>

    )
}

export default Select;