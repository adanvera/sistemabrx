import React, { Component, useState } from "react";
import { Col, Row } from "react-bootstrap";
import DatePicker from "react-date-picker";
import Select from "../../Commons/Select";


const FilterTicket = props => {

    //declaramos variables a utilizar
    const initialState = {
        status: 'TODAS',
        priority: 'TODAS',
        desde: '',
        hasta: ''
    }

    //inicializamos las variables 
    const [state, setState] = useState(initialState)

    //seteamos el select segun lo seleccionado
    const setSelectedValue = (data) => {
        // Si hay cambios en los selects se guarda en el state del componente
        // Y se envia al componte padre para aplicar luego el filtro a la tabla
        props.getFilter(data)
        setState(prevState => (
            {
                ...prevState,
                [data.key]: data.value,
            }
        ))
    }

    //para limpiar los filtros
    const handleCleanFilter = () => {
        setState(prev => initialState)
        props.onCleanFilter(initialState)
    }

    // Select para estado del ticket
    const selectStatus = {
        slice: 'status',
        label: 'Estado de ticket',
        default: '',
        disabled: 'Seleccionar estado',
        options: {
            TODAS: 'Todas',
            INPROGRESS: 'EN CURSO',
            ONHOLD: 'BLOQUEADA',
            ONHOLD: 'DETENIDO',
            CLOSED: 'CERRADA'
        }
    }

    // Select para prioridad del ticket
    const selectPriority = {
        slice: 'priority',
        label: 'Prioridad',
        default: '',
        disabled: 'Seleccionar estado',
        options: {
            TODAS: 'Todas',
            LOW: 'BAJA',
            LOWEST: 'MUY BAJA',
            NORMAL: 'NORMAL',
            HIGH: 'ALTA',
            HIGHEST: 'MUY ALTA',

        }
    }


    /**
     *
     * **/
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
            <Col>
                <div className="item-column has-text-left">
                    <Select defaultValue={state.status} optionList={selectStatus} setSelected={setSelectedValue} />
                </div>
            </Col>
            <Col>
                <div className="item-column has-text-left">
                    <Select defaultValue={state.priority} optionList={selectPriority} setSelected={setSelectedValue} />
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

export default FilterTicket;