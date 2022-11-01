import React, { Fragment, useContext, useEffect, useReducer, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { DataContext } from '../Commons/Context/DataContext';
import ModalContainer from '../Commons/ModalContainer';
import SearchTable from '../Commons/SearchTable';
import DumpTable from '../Commons/Table/DumpTable';
import Table from '../Commons/Table/Table';
import { filterDataList, formatDataClientes, formatedDataClient, formatedDataTicket, takeDataSearch } from '../Helpers/formats';
import { GET_CLIENTS } from '../Helpers/helper';
import ClienteForm from './Forms/ClienteForm';




const Clientes = props => {
    /**declaramos variables a utlizar */
    const initialState = {
        modalShow: false,
        headers: {
            id: 'Codigo ',
            document: "Nro de documento",
            name: 'Nombre y apellido',
            address: 'Dirección',
            phone: 'Nro de telefono',
            actions: 'Acciones'
        },
        title: 'Agregar Cliente',
        filtros: {
            name: '',
        },
    }
    const [state, setState] = useState(initialState)
    const [dataList, setDataList] = useState('')
    const { modalstatus, setModalStatus } = useContext(DataContext)
    const { sidebarStatus, setSidebarStatus } = useContext(DataContext)
    const { modalType, setModalType } = useContext(DataContext)

    /**acciones que son utilizadas al cargar datos de
    * las consultas
    */
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const formatedList = formatedDataClient(dataList)

    const modal = modalstatus

    /**funcion para setear form clickeado */
    const pickForm = () => {
        switch (state?.form) {
            case 'Cliente':
                return <ClienteForm />
        }
    }


    const handleModalForm = (form) => {
        setModalStatus(true)
        setModalType('Add')
        setState(prev => {
            return {
                ...prev,
                form: form,
                title: form
            }
        })
    }

    /*Aca obtenemos los clientes*/
    useEffect(() => {

        /** Obtenemos los valores que guardamos en el token para poder utilizarlos
         * en la siguiente consulta
        */
        const token = localStorage.getItem("token") ? localStorage.getItem("token") : ''

        /**mandamos el header de nuestra consulta */
        const options = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'token': token
            },
        }

        const getClient = async () => {
            try {
                const res = await fetch(GET_CLIENTS, options),
                    json = await res.json()
                /**seteamos loading */
                console.log(json);
                setIsLoaded(true);
                /**seteamos el listado de tickets */
                setDataList(json);
            } catch (error) {
                setIsLoaded(true);
                setError(error);
                console.log("Esto es el error" + error);
            }
        }

        getClient()

    }, []);


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

    const usermodal = modalType

    return (
        <div className={sidebarStatus === 'open' ? 'main-content' : 'main-content extend'} >
            <Container fluid={true} className="">
                {modal && (
                    <ModalContainer
                        title={state?.title}
                        form={pickForm()}
                        modalStatus={modal}
                        modalType={usermodal}
                    />
                )}
                <Row className=" is-3 text-al-ini titlemodule"><h5 className="title-details ml-5 pt-3">Clientes</h5></Row>
                <Row>
                    <Col md={6} >
                        <SearchTable
                            placeholder='Buscar cliente...'
                            handleChange={handleSearch}
                        />
                    </Col>
                    <Col md={6} className="endmain">
                        <div className='limittic'><div onClick={() => handleModalForm('Cliente')} className="btnadd" id='clientemain'> Crear cliente</div></div>
                    </Col>
                </Row>
                {
                    isLoaded === false ?
                        <DumpTable link='/clientes/' headers={state?.headers} data={formatedList} />
                        :
                        <Table link='/clientes/' headers={state?.headers} data={formatedList} />
                }
            </Container>
        </div>
    )
}

export default (Clientes)