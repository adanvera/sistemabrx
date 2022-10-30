import { useContext } from "react"
import { useState } from "react"
import { Col, Container, Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { DataContext } from "../Commons/Context/DataContext"
import ModalContainer from "../Commons/ModalContainer"
import SearchTable from "../Commons/SearchTable"
import RoleForms from "./Forms/RoleForms"

const Seguridad = props => {

    /**declaramos e inicializamos variables a utilizar */
    const initialState = {
        form: 'Roles',
        title: 'ROL',
        filtros: {
            description: '',
        },
    }
    const [state, setState] = useState(initialState)
    const { sidebarStatus, setSidebarStatus } = useContext(DataContext)
    const { modalstatus, setModalStatus } = useContext(DataContext)
    const { modalType, setModalType } = useContext(DataContext)
    const modal = modalstatus
    let navigate = useNavigate()

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
                return <RoleForms />
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
                    <Col md={6} className="endmain">
                        <div className='limittic'><div onClick={() => handleModalForm('Roles')} className="btnadd" id='ticketmain'> Crear rol</div></div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Seguridad