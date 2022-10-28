import React, { useContext, useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { DataContext } from '../../Commons/Context/DataContext'
import ModalContainer from '../../Commons/ModalContainer'
import SearchTable from '../../Commons/SearchTable'
import DumpTable from '../../Commons/Table/DumpTable'
import Table from '../../Commons/Table/Table'
import { formatedDataTicket } from '../../Helpers/formats'
import { TICKETS } from '../../Helpers/helper'
import TicketForm from '../Forms/TicketForm'

const Tickets = props => {

    const initialState = {
        headers: {
            icon: '',
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