import React, { useContext, useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { DataContext } from '../Commons/Context/DataContext'
import ModalContainer from '../Commons/ModalContainer'
import MachineForm from './Forms/MachineForm'
import TicketForm from './Forms/TicketForm'
import tktimg from "../../assets/images/ticketimg.png"
import mchimg from "../../assets/images/machine.png"

const Mineria = props => {

    /**declaramos e inicializamos variables a utilizar */
    const initialState = {
        form: 'Machine',
        title: 'MAQUINA',
    }
    const [state, setState] = useState(initialState)
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
            case 'Machine':
                return <MachineForm />
            case 'Ticket':
                return <TicketForm />
        }
    }

    return (
        <div className="main-content">
            {modal && (
                <ModalContainer
                    title={state?.title}
                    form={pickForm()}
                // modalStatus={modal}
                // modalType={usermodal}
                />
            )}
            <Container fluid={true} className="">
                <Row className='mt-3'>
                    <Col md={8}> </Col>
                    <Col md={2} className="a-end"> <div onClick={() => handleModalForm('Ticket')} className="btnadd"> Crear ticket</div></Col>
                    <Col md={2} className="a-end">  <div onClick={() => handleModalForm('Machine')} className="btnadd" > Registrar equipo</div></Col>
                </Row>

                <Row className='content-mineria justify-content-between' >
                    <Col md={4}>
                        <div id="tkprev">
                            <div className='imgtkg'>
                                <img src={tktimg} />
                            </div>
                            <div className='contentticket'>
                                <h5>Administracion de tickets</h5>
                            </div>
                        </div>
                    </Col>
                    <Col md={4} onClick={() => navigate('/tickets')} >
                        <div id="tkprev">
                            <div className='imgtkg'>
                                <img src={tktimg} />
                            </div>
                            <div className='contentticket'>
                                <h6>Administracion</h6>
                                <h6>de tickets</h6>
                            </div>
                        </div>
                    </Col>
                    <Col md={4} onClick={() => navigate('/maquinas')} >
                        <div id="tkprev">
                            <div className='imgtkg'>
                                <img src={mchimg} />
                            </div>
                            <div className='contentticket'>
                                <h6>Administracion</h6>
                                <h6>de maquinas</h6>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Mineria