import React, { useContext, useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { DataContext } from '../Commons/Context/DataContext'
import ModalContainer from '../Commons/ModalContainer'
import SearchTable from '../Commons/SearchTable'
import DumpTable from '../Commons/Table/DumpTable'
import Table from '../Commons/Table/Table'
import { formatedDataUsers } from '../Helpers/formats'
import { USER } from '../Helpers/helper'
import UsersForm from './Forms/UsersForm'

const Usuarios = props => {

    /**declaramos e inicializamos variables a utilizar */
    const initialState = {
        form: 'Usuarios',
        title: 'USUARIO',
        headers: {
            name: 'Nombre y apellido',
            document: 'Nro de documento',
            correo: "Correo",
            register: 'Fecha de registro',
            rol: 'Rol',
            estado: "Estado de cuenta",
            update_data: 'Fecha de modificación',
            actions: 'Acciones'
        },
    }

    /**acciones que son utilizadas al cargar datos de
     * las consultas
     */
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [state, setState] = useState(initialState)
    const { modalstatus, setModalStatus } = useContext(DataContext)
    const { modalType, setModalType } = useContext(DataContext)
    const [dataList, setDataList] = useState('')
    const modal = modalstatus
    let navigate = useNavigate()
    const { sidebarStatus, setSidebarStatus } = useContext(DataContext)


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

        const getUsers = async () => {
            try {
                const res = await fetch(USER, options),
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

        getUsers()

    }, []);

    /**funcion para setear form clickeado */
    const pickForm = () => {
        switch (state?.form) {
            case 'Usuarios':
                return <UsersForm />
        }
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

    const formatedList = formatedDataUsers(dataList)

    console.log(dataList);

    return (
        <div className={sidebarStatus === 'open' ? 'main-content' : 'main-content extend'} >
            {modal && (
                <ModalContainer
                    title={state?.title}
                    form={pickForm()}
                // modalStatus={modal}
                // modalType={usermodal}
                />
            )}
            <Container fluid={true} className="">
                <Row className=" is-3 text-al-ini titlemodule"><h5 className="title-details ml-5 pt-3">Nómina de usuarios</h5></Row>
                <Row>
                    <Col md={6} >
                        <SearchTable
                            placeholder='Buscar un usuario...'
                            handleChange={handleSearch}
                        />
                    </Col>
                    <Col md={6} className="endmain">
                        <div className='limittic'><div onClick={() => handleModalForm('Usuarios')} className="btnadd" id='ticketmain'> Crear usuario</div></div>
                    </Col>
                </Row>
                {
                    isLoaded === false ?
                        <DumpTable headers={state?.headers} data={formatedList} />
                        :
                        <Table headers={state?.headers} data={formatedList} />
                }
            </Container>
        </div>
    )
}

export default Usuarios