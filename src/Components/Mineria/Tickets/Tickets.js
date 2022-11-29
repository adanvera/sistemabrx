import React, { useContext, useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { DataContext } from '../../Commons/Context/DataContext'
import ModalContainer from '../../Commons/ModalContainer'
import SearchTable from '../../Commons/SearchTable'
import DumpTable from '../../Commons/Table/DumpTable'
import Table from '../../Commons/Table/Table'
import { filteredData, formatedDataTicket, takeDataSearch } from '../../Helpers/formats'
import { TICKETS } from '../../Helpers/helper'
import TicketForm from '../Forms/TicketForm'
import FilterTicket from './FilterTicket'

const Tickets = props => {

    const initialState = {
        headers: {
            icon: '',
            id_ticket: "N°",
            ticket_name: "Nombre",
            id_machine: "Maquina",
            created_at: "Fecha de creación",
            id_user: "Creado por",
            status: "Estado",
            priority: "Prioridad",
            assigned_to: "Asignado a",
            update_at: "Fecha de actualización",
        },
        filtros: {
            ticket_name: '',
            status: '',
            priority: '',
            desde: '',
            hasta: '',
        },
        form: 'Machine',
        title: 'MAQUINA',
    }

    const [state, setState] = useState(initialState)
    const [dataList, setDataList] = useState('')
    const { modalstatus, setModalStatus } = useContext(DataContext)
    const { sidebarStatus, setSidebarStatus } = useContext(DataContext)

    //onchange correspondiente para hacer la busqueda 
    const handleSearch = data => {
        setState(prev => ({
            ...prev,
            filtros: {
                ...prev.filtros,
                ticket_name: data,
            },
            currentPage: 1,
        }))
    }

    /**acciones que son utilizadas al cargar datos de
     * las consultas
     */
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const modal = modalstatus


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
                const res = await fetch(TICKETS, options),
                    json = await res.json()
                /**seteamos loading */
                setIsLoaded(true);
                /**seteamos el listado de tickets */
                setDataList(json);
            } catch (error) {
                setIsLoaded(true);
                setError(error);
                console.log(error);
            }
        }

        getTickets()

    }, []);

    const formatedList = formatedDataTicket(dataList)

    /** funcion onchange para seteo de form */
    const handleModalForm = (form) => {
        setModalStatus(true)
        setState(prev => {
            return {
                ...prev,
                form: form,
                title: form
            }
        })
    }

    /**funcion para setear form clickeado */
    const pickForm = () => {
        switch (state?.form) {
            case 'Ticket':
                return <TicketForm />
        }
    }

    //funcion para limpiar los valores de las variables a utilizar
    const onCleanFilter = (data) => {

        setState((prevState) => {
            return {
                ...prevState,
                filtros: {
                    ...data,
                }
            }
        })
    }

    //funcion para setear y pasar que filtro se selecciono
    const handleFilter = (data) => {

        setState((prevState) => {
            return {
                ...prevState,
                filtros: {
                    ...prevState.filtros,
                    [data.key]: data.value
                }
            }
        })
    }


    return (
        <div className={sidebarStatus === 'open' ? 'main-content' : 'main-content extend'} >
            <Container fluid={true} className="">
                {modal && (
                    <ModalContainer
                        title={state?.title}
                        form={pickForm()}
                    // modalStatus={modal}
                    // modalType={usermodal}
                    />
                )}
                <Row className=" is-3 text-al-ini titlemodule"><h5 className="title-details ml-5 pt-3">Tickets</h5></Row>
                <Row>
                    <Col md={6} >
                        <SearchTable
                            placeholder='Buscar ticket...'
                            handleChange={handleSearch}
                        />
                    </Col>
                    <Col md={6} className="endmain">
                        <div className='limittic'><div onClick={() => handleModalForm('Ticket')} className="btnadd" id='ticketmain'> Crear ticket</div></div>
                    </Col>
                </Row>
                <Row>
                    <FilterTicket onCleanFilter={onCleanFilter} getFilter={handleFilter} />
                </Row>
                {
                    isLoaded === false ?
                        <DumpTable link='/tickets/' headers={state?.headers} data={formatedList} />
                        :
                        <Table link='/tickets/' headers={state?.headers} data={takeDataSearch(filteredData(formatedList, state.filtros), state.currentPage)} exportdata={true} title="tickets" />
                }
            </Container>
        </div>
    )
}

export default Tickets