import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import SearchTable from '../../Commons/SearchTable'
import Table from '../../Commons/Table/Table'
import { formatedDataTicket } from '../../Helpers/formats'


const Tickets = props => {

    const initialState = {
        headers: {
            ticketnumber: "Numero de ticket",
            observacion: "Observación",
            registerdate: "Fecha de creción",
            state: "Estado ticket",
            createdby: "Creado por",
            asigned: "Asignado a",
            update: "Fecha de actualización",
            actions: 'Acciones'
        },
        filtros: {
            name: '',
        },
    }
    const [state, setState] = useState(initialState)

    //onchange correspondiente para hacer la busqueda 
    const handleSearch = data => {
        setState(prev => ({
            ...prev,
            filtros: {
                ...prev.filtros,
                name: data,
            },
            currentPage: 1,
        }))
    }

    const getData = [
        {
            "ticketnumber": 52,
            "observacion": "Mantenimiento, Maquina: 5545dd",
            "registerdate": "2022-05-27T19:27:43.161Z",
            "state": 1,
            "createdby": "Adán",
            "update": "2022-05-27T19:27:43.161Z",
            "asigned": "Vera",
        },
        {
            "ticketnumber": 53,
            "observacion": "Mantenimiento, Maquina: 5545dd",
            "registerdate": "2022-05-27T19:27:43.161Z",
            "state": 1,
            "createdby": "Adán",
            "update": "2022-05-27T19:27:43.161Z",
            "asigned": "Vera",
        }
    ]


    const dataList = formatedDataTicket(getData)

    return (
        <div className="main-content">
            <Container fluid={true} className="">
                <Row className=" is-3 text-al-ini titlemodule"><h5 className="title-details ml-5 pt-3">Tickets</h5></Row>
                <Row>
                    <Col md={6} >
                        <SearchTable
                            placeholder='Buscar ticket...'
                            handleChange={handleSearch}
                        />
                    </Col>
                </Row>
                <Table link='/tickets/' headers={state?.headers} data={dataList} />
            </Container>
        </div>
    )
}

export default Tickets