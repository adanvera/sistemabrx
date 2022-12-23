import React, { Component, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import DatePicker from "react-date-picker";

const FilterGastos = props => {

    //declaramos variables a utilizar
    const initialState = {
        desde: '',
        hasta: '',
        tipoOperaciones: 'TODAS'
    }

    //inicializamos las variables 
    const [state, setState] = useState(initialState)
    const [selectOperation, setOperation] = useState('')


    //para limpiar los filtros
    const handleCleanFilter = () => {
        setState(prev => initialState)
        props.onCleanFilter(initialState)
    }

    //para setear el valor de la fecha desde
    const handleDateDesdeChange = (data) => {

        const Fecha = new Date(data)
        props.getFilter({
            key: 'desde',
            value: Fecha
        })
        setState(prevState => (
            {
                ...prevState,
                desde: new Date(Fecha),
            }
        ))
    }

    const handleDateHastaChange = (data) => {

        const Fecha = new Date(data)
        props.getFilter({
            key: 'hasta',
            value: Fecha
        })
        setState(prevState => (
            {
                ...prevState,
                hasta: new Date(Fecha),
            }
        ))
    }

    return (
        <Row className="mt-3 mb-3">
            <Col>
                <div className="item-column">
                    <label className="mb-1" htmlFor="">Fecha desde:</label>
                    <DatePicker
                        clearIcon={null}
                        onChange={handleDateDesdeChange}
                        value={state.desde}
                        className='date-input' />
                </div>
            </Col>
            <Col className="">
                <div className="item-column">
                    <label className="mb-1" htmlFor="">Fecha hasta:</label>
                    <DatePicker
                        clearIcon={null}
                        onChange={handleDateHastaChange}
                        value={state.hasta}
                        className='date-input' />
                </div>
            </Col>

            <Col className="column align">
                <div className="item-column">
                    <button className="button btn-other" onClick={() => handleCleanFilter()}>Limpiar</button>
                </div>
            </Col>
        </Row>
    )
}
export default FilterGastos