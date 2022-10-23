import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import SearchTable from '../../Commons/SearchTable'
import Table from '../../Commons/Table/Table'
import { formatedDataTicket } from '../../Helpers/formats'
import { GET_TICKETS } from '../../Helpers/helper'
import DumpTable from './DumpTable'


const Tickets = props => {

    const initialState = {
        headers: {
            id_ticket: "Numero de ticket",
            id_machine: "Maquina",
            created_at: "Fecha de creación",
            id_user: "Creado por",
            description_ticket: "Descripcion",
            status: "Estado",
            update_at: "Fecha de actualización",
            actions: 'Acciones'
        },
        filtros: {
            name: '',
        },
    }

    const [state, setState] = useState(initialState)
    const [dataList, setDataList] = useState('')


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

    /**acciones que son utilizadas al cargar datos de
  * las consultas
  */
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);


    const formatedList = formatedDataTicket(dataList)


    useEffect(() => {

        /** Obtenemos los valores que guardamos en el token para poder utilizarlos
         * en la siguiente consulta
        */
        const token = localStorage.getItem("token") ? localStorage.getItem("token") : ''

        /**mandamos el header de nuestra consulta */
        const options = {
            method: 'GET',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'token': token
            },
        }

        const getTickets = async () => {
            try {
                const res = await fetch(GET_TICKETS, options),
                    json = await res.json()
                /**seteamos loading */
                setIsLoaded(true);
                /**seteamos el listado de usuarios */
                setDataList(json);
            } catch (error) {
                setIsLoaded(true);
                setError(error);
                console.log(error);
            }
        }

        getTickets()

    }, []);


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
                {
                    isLoaded === false ?
                        <DumpTable link='/tickets/' headers={state?.headers} data={formatedList} />
                        :
                        <Table link='/tickets/' headers={state?.headers} data={formatedList} />
                }
            </Container>
        </div>
    )
}

export default Tickets