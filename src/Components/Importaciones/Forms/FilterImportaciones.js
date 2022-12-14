import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import DatePicker from 'react-date-picker'
import Select from '../../Commons/Select'

const FilterImportaciones = (props) => {

    //declaramos variables a utilizar
    const initialState = {
        desde: '',
        hasta: '',
        tipoEmpresa: 'TODAS'
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


    // Select para estado del ticket
    const selectedEnvio = {
        slice: 'empresa_envio',
        label: 'Empresa de envio',
        default: '',
        disabled: 'Seleccionar empresa de envio',
        options: {
            TODAS: 'TODAS',
            DHL: 'DHL',
            FEDEX: 'FEDEX',
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
                    <Select defaultValue={state.tipoEmpresa} optionList={selectedEnvio} setSelected={setSelectedValue} />
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

export default FilterImportaciones