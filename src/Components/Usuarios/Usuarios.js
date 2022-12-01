import React, { useContext, useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { DataContext } from '../Commons/Context/DataContext'
import ModalContainer from '../Commons/ModalContainer'
import ProtectedComponent from '../Commons/ProtectedComponent'
import SearchTable from '../Commons/SearchTable'
import DumpTable from '../Commons/Table/DumpTable'
import Table from '../Commons/Table/Table'
import { filteredDataUsers, formatedDataUsers } from '../Helpers/formats'
import { ROLES, USER } from '../Helpers/helper'
import UserFilter from './Forms/UserFilter'
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
        filtros: {
            name: '',
            estado: '',
            rol: '',
            desde: '',
            hasta: '',
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
    const { subPermissons, setSubPermissons } = useContext(DataContext)
    let navigate = useNavigate()
    const { sidebarStatus, setSidebarStatus } = useContext(DataContext)
    const { dataidrow } = useContext(DataContext)
    const modaal = modalstatus
    const usermodal = modalType

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

    /**guardamos id de usuario clikeado en la tabla
  * seteado mediante el use context
 */
    const id_user = dataidrow

    /**funcion para setear form clickeado */
    const pickForm = () => {
        switch (state?.form) {
            case 'Usuarios':
                return <UsersForm modalType={modalType} id_user={id_user} />
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

    const formatedList = formatedDataUsers(dataList)

    /**seteamos tipo de modal al dar click
   * en boton de añadir usuario
   */
    const handleOnClick = (e, btn, form) => {
        e.preventDefault()
        setModalStatus(true)

        if (btn === '_AddUser') {
            setModalType('Add')
            setState(prev => {
                return {
                    ...prev,
                    form: form,
                    title: form
                }
            })
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

    const verifyRoleSub = (data) => {
        if (data === 1) {
            return (
                <Col md={6} className="endmain">
                    <div className='limittic'>
                        <div onClick={(e) => handleOnClick(e, '_AddUser', state?.form)} className="btnadd" id='ticketmain'>
                            Crear usuario
                        </div>
                    </div>
                </Col>
            )
        } else {
            return (
                <Col md={6} className="endmainnn notallowed">
                    <div className='limittic'>
                        <div className="btnadd-not-allowed" id='ticketmain'>
                            Crear usuario
                        </div>
                    </div>
                </Col>
            )
        }
    }

    return (
        <div className={sidebarStatus === 'open' ? 'main-content' : 'main-content extend'} >
            {modal && (
                <ModalContainer
                    title={state?.title}
                    form={pickForm()}
                    modalStatus={modal}
                    modalType={usermodal}
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
                    {verifyRoleSub(subPermissons)}
                </Row>
                <Row>
                    <UserFilter onCleanFilter={onCleanFilter} getFilter={handleFilter} />
                </Row>
                <Row>
                    <Col className='col-xl d-flex ' id='datainfo'>
                        <div className='icon-info'>
                            <ion-icon name="shield-checkmark-outline"></ion-icon>
                        </div>
                        <div className='w-100 datashow'>
                            <h6 className='datatitle'>no data</h6>
                            <span className='spantitle block-text-gray'>USUARIOS ACTIVOS</span>
                        </div>
                    </Col>
                    <Col className='col-xl d-flex ' id='datainfo'>
                        <div className='icon-info-three'>
                            <ion-icon name="warning-outline"></ion-icon>
                        </div>
                        <div className='w-100 datashow'>
                            <h6 className='datatitle'>no data</h6>
                            <span className='spantitle block-text-gray'>USUARIOS BLOQUEADOS</span>
                        </div>
                    </Col>
                    <Col className='col-xl d-flex ' id='datainfo'>
                        <div className='icon-info-four'>
                            <ion-icon name="accessibility-outline"></ion-icon>
                        </div>
                        <div className='w-100 datashow'>
                            <h6 className='datatitle'>no data</h6>
                            <span className='spantitle block-text-gray'>USUARIOS TOTALES</span>
                        </div>
                    </Col>
                </Row>
                {
                    isLoaded === false ?
                        <DumpTable headers={state?.headers} data={formatedList} />
                        :
                        <Table headers={state?.headers} data={filteredDataUsers(formatedList, state?.filtros)} exportdata={true} title="Usuarios" />
                }
            </Container>
        </div>
    )
}

export default Usuarios