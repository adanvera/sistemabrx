import React from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { DataContext } from '../../Commons/Context/DataContext'
import ModalContainer from '../../Commons/ModalContainer'
import operaciones from "../../../assets/images/pago.gif"
import tktimg from "../../../assets/images/ticketimg.gif"




const Reporte = (props) => {
    const { sidebarStatus, setSidebarStatus } = useContext(DataContext)

    /**declaramos e inicializamos variables a utilizar */
    const initialState = {
        form: 'Negocio',
        title: 'NEGOCIO',
    }
    const [state, setState] = useState(initialState)
    const { modalstatus, setModalStatus } = useContext(DataContext)
    const { modalType, setModalType } = useContext(DataContext)
    const usermodal = modalType
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

    const pickForm = () => {
        switch (state.form) {
            case 'Negocio':
                return 'Negocio'
            default:
                return 'Negocio'
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
                <Row className='mt-3'>
                    <h1>Reportes</h1>
                </Row>
                <Row className='content-mineria justify-content-between mb-3' >
                    <Col md={4} onClick={() => navigate('/reportes/operaciones')} >
                        <div id="tkprev">
                            <div className='imgtkg'>
                                <img src={operaciones} />
                            </div>
                            <div className='contentticket'>
                                <h6>Operaciones </h6>
                            </div>
                        </div>
                    </Col>
                    <Col md={4} onClick={() => navigate('/reportes/tickets')}>
                        <div id="tkprev">
                            <div className='imgtkg'>
                                <img src={tktimg} />
                            </div>
                            <div className='contentticket'>
                                <h6>Tickets</h6>
                            </div>
                        </div>
                    </Col>
                    <Col md={4} >   </Col>
                </Row>
            </Container>
        </div>

    )
}

export default Reporte


