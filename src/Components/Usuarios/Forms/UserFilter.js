import React, { Component, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import DatePicker from "react-date-picker";
import Select from "../../Commons/Select";
import { formmrmr } from "../../Helpers/formats";
import { ROLES } from "../../Helpers/helper";


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
    const [DataRol, setDataRol] = useState('')
    const [dselectPriority, seettselectPriority] = useState('')

    useEffect(() => {
        /** Obtenemos los valores que guardamos en el token para poder utilizarlos
         * en la siguiente consulta
        */
        const idUser = props?.id_user
        const token = localStorage.getItem("token") ? localStorage.getItem("token") : ''

        /**mandamos el header de nuestra consulta */
        const options = {
            method: 'GET',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'token': token
            },
        }

        const getRoles = async () => {
            try {
                const res = await fetch(ROLES, options),
                    json = await res.json()

                /**seteamos el listado de tickets */
                setDataRol(json);
            } catch (error) {
                console.log(error);
            }
        }
        getRoles()
    }, [])

    const derrdser = formmrmr(DataRol)
    console.log(derrdser);


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
            TODAS: 'TODAS',
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
            TODAS: 'TODAS',
            ADMINISTRADOR: 'ADMINISTRADOR',
            SEGURIDAD: 'SEGURIDAD',
            OPERADOR: 'OPERADOR'
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
            {/* <Col>
                <div className="item-column has-text-left">
                    <Select defaultValue={state.estado} optionList={selectStatus} setSelected={setSelectedValue} />
                </div>
            </Col> */}
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