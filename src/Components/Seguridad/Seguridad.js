import { useContext } from "react"
import { useEffect } from "react"
import { useState } from "react"
import { Col, Container, Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { DataContext } from "../Commons/Context/DataContext"
import ModalContainer from "../Commons/ModalContainer"
import SearchTable from "../Commons/SearchTable"
import DumpTable from "../Commons/Table/DumpTable"
import Table from "../Commons/Table/Table"
import { filteredDataRole, formatedDataRoles } from "../Helpers/formats"
import { ROLES } from "../Helpers/helper"
import RoleForms from "./Forms/RoleForms"

const Seguridad = props => {

    /**declaramos e inicializamos variables a utilizar */
    const initialState = {
        form: 'Roles',
        title: 'ROL',
        filtros: {
            description: '',
        },
        headers: {
            description: "Descripción",
            access: "Permisos",
            subpermissons: "Subpermisos",
            status: "Estado",
            actions: "Acciones"
        }
    }
    const [state, setState] = useState(initialState)
    const { sidebarStatus, setSidebarStatus } = useContext(DataContext)
    const { subPermissons, setSubPermissons } = useContext(DataContext)
    const { modalstatus, setModalStatus } = useContext(DataContext)
    const { modalType, setModalType } = useContext(DataContext)
    const modal = modalstatus
    let navigate = useNavigate()
    const [dataList, setDataList] = useState()
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

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
            case 'Roles':
                return <RoleForms modalType={modalType} />
        }
    }


    //onchange correspondiente para hacer la busqueda 
    const handleSearch = data => {
        setState(prev => ({
            ...prev,
            filtros: {
                ...prev.filtros,
                description: data,
            },
            currentPage: 1,
        }))
    }


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

        const getRoles = async () => {
            try {
                const res = await fetch(ROLES, options),
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

        getRoles()


    }, [])

    const formatedList = formatedDataRoles(dataList)

    /**seteamos tipo de modal al dar click
   * en boton de añadir rol
   */
    const handleOnClick = (e, btn) => {
        e.preventDefault()
        setModalStatus(true)

        if (btn === '_AddRole') {
            setModalType('Add')
        }
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
                    <div className='limittic'><div onClick={(e) => handleOnClick(e, '_AddRole')} className="btnadd" id='ticketmain'> Crear rol</div></div>
                </Col>
            )
        } else {
            return (
                <Col md={6} className="endmainnn notallowed">
                    <div className='limittic'><div className="btnadd-not-allowed" id='ticketmain'> Crear rol</div></div>
                </Col>
            )
        }
    }

    return (
        <div className={sidebarStatus === 'open' ? 'main-content' : 'main-content extend'} >
            <Container fluid={true} className="mb-3">
                {modal && (
                    <ModalContainer
                        title={state?.title}
                        form={pickForm()}
                        modalStatus={modal}
                        modalType={modalType}
                    />
                )}
                <Row className=" is-3 text-al-ini titlemodule"><h5 className="title-details ml-5 pt-3">Roles y permisos</h5></Row>
                <Row>
                    <Col md={6} >
                        <SearchTable
                            placeholder='Buscar rol...'
                            handleChange={handleSearch}
                        />
                    </Col>
                    {verifyRoleSub(subPermissons)}
                </Row>
                {
                    isLoaded === false ?
                        <DumpTable headers={state?.headers} data={formatedList} />
                        :
                        <Table headers={state?.headers} data={filteredDataRole(formatedList, state?.filtros)} />
                }
            </Container>
        </div>
    )
}

export default Seguridad