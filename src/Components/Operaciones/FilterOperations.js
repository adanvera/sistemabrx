import React, { Component, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import DatePicker from "react-date-picker";
import Select from "../Commons/Select";
import { OPERATION_PROD } from "../Helpers/helper";

const FilterOperations = props => {

    //declaramos variables a utilizar
    const initialState = {
        desde: '',
        hasta: '',
        tipoOperaciones: 'TODAS'
    }
    const [operationsId,setOPerationsID]= useState('')
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

    // Select para estado del ticket
    const selectedOperation = {
        slice: 'tipoOperaciones',
        label: 'Tipo operación',
        default: '',
        disabled: 'Seleccionar operacion',
        options: {
            TODAS: 'TODAS',
            Compra: 'COMPRA',
            Venta: 'VENTA',
        }
    }


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
    const getOperationsById = async ()=>{

        try {
            const req= await fetch(OPERATION_PROD+'all/'+operationsId),
            res = await req.json()
            console.log(req);
            console.log(res);
            if(req.ok){
                props.setDataList([res.operation])
            }

        } catch (error) {
            console.log(error);
        }

    }
    const getAllOperation = async ()=>{
        const token = localStorage.getItem("token") ? localStorage.getItem("token") : ''

        /**mandamos el header de nuestra consulta */
        const options = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'token': token
            },
        }
        
        try {
            const res = await fetch(OPERATION_PROD, options),
                json = await res.json()
            /**seteamos loading */
            // json.map(op => delete op.created)
            /**seteamos el listado de tickets */
            setOPerationsID('')
            props.setDataList(json)


        } catch (error) {
            //setError(error);
            console.log("Esto es el error" + error);
        }
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
                    <Select defaultValue={state.tipoOperaciones} optionList={selectedOperation} setSelected={setSelectedValue} />
                </div>
            </Col>
            
            <Col className="column align">
                <div className="item-column">
                    <button className="button btn-other" onClick={() => handleCleanFilter()}>Limpiar</button>
                </div>
            </Col>
            <Row>
            <Col>
            <label className="mb-1" htmlFor="">Nro operacion:</label>

                <div className="item-column has-text-left">
                    <input className="form-control" value={operationsId} onChange={(e)=>setOPerationsID(e.target.value)} type={"text"} placeholder="Nro operacion"/>
                </div>
            </Col>
            
            <Col className="column align">
                <div className="item-column">
                    <button className="button btn-other" onClick={() => getOperationsById()}>Filtrar</button>
                </div>
            </Col>
            <Col className="column align">
                <div className="item-column">
                    <button className="button btn-other" onClick={() => getAllOperation()}>Limpiar</button>
                </div>
            </Col>
            </Row>
   
   
        </Row>
    )
}

export default FilterOperations;