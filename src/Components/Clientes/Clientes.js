import React, { Fragment, useContext, useEffect, useReducer, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { DataContext } from '../Commons/Context/DataContext';
import ModalContainer from '../Commons/ModalContainer';
import SearchTable from '../Commons/SearchTable';
import Table from '../Commons/Table/Table';
import { filterDataList, formatDataClientes, takeDataSearch } from '../Helpers/formats';
import DumpTable from './DumpTable';
import ClienteForm from './Forms/ClienteForm';
import ClientForm from './Forms/ClienteForm';



const Clientes = props => {
    /**declaramos variables a utlizar */
    const initialState = {
        modalShow: false,
        headers: {
            name: 'Nombre y apellido',
            document: "Nro de documento",
            address: 'Dirección',
            phone: 'Nro de telefono',
        },
        title: 'Agregar Cliente',
        filtros: {
            name: '',
        },
    }
    const [state, setState] = useState(initialState)
    const [dataList, setDataList] = useState('')
    const { modalstatus, setModalStatus } = useContext(DataContext)

    /**acciones que son utilizadas al cargar datos de
    * las consultas
    */
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    //const formatedList = formatedDataTicket(dataList)
    const modal = modalstatus

    /**funcion para setear form clickeado */
    const pickForm = () => {
        switch (state?.form) {
            case 'Ticket':
                return <ClienteForm />
        }
    }


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

    return (
        <div className="main-content">
            <Container fluid={true} className="">
                {modal && (
                    <ModalContainer
                        title={state?.title}
                        form={pickForm()}
                    // modalStatus={modal}
                    // modalType={usermodal}
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
                        <DumpTable link='/clientes/' headers={state?.headers}  />
                        :
                        <Table link='/clientes/' headers={state?.headers}  />
                }
            </Container>
        </div>
    )
}

export default (Clientes)