import React, { Component, useState } from "react";
import { Col, Row } from "react-bootstrap";
import DatePicker from "react-date-picker";
import Select from "../../Commons/Select";


const UserFilter = props => {

    //declaramos variables a utilizar
    const initialState = {
        estado: 'TODAS',
        rol: 'TODAS',
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
        slice: 'estado',
        label: 'Estado',
        default: '',
        disabled: 'Seleccionar estado',
        options: {
            TODAS: 'Todas',
            ACTIVA: 'ACTIVA',
            BLOQUEADA: 'BLOQUEADA',
        }
    }

    // Select para prioridad del ticket
    const selectPriority = {
        slice: 'rol',
        label: 'Rol',
        default: '',
        disabled: 'Seleccionar rol',
        options: {
            TODAS: 'Todas',
            ADMINISTRADOR: 'ADMINISTRADOR',
            SEGURIDAD: 'SEGURIDAD',
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
                    <Select defaultValue={state.estado} optionList={selectStatus} setSelected={setSelectedValue} />
                </div>
            </Col>
            <Col>
                <div className="item-column has-text-left">
                    <Select defaultValue={state.rol} optionList={selectPriority} setSelected={setSelectedValue} />
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

export default UserFilter;