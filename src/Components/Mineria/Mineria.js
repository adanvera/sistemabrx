import React, { useContext, useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { DataContext } from '../Commons/Context/DataContext'
import ModalContainer from '../Commons/ModalContainer'
import MachineForm from './Forms/MachineForm'
import TicketForm from './Forms/TicketForm'

const Mineria = props => {

    /**declaramos e inicializamos variables a utilizar */
    const initialState = {
        form: 'Machine',
        title: 'MAQUINA'
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
                <Row>
                    <Col md={8}> </Col>
                    <Col md={2} className="a-end"> <div onClick={() => handleModalForm('Ticket')} className="btnadd"> Crear ticket</div></Col>
                    <Col md={2} className="a-end">  <div onClick={() => handleModalForm('Machine')} className="btnadd" > Registrar equipo</div></Col>
                </Row>
                <Row>
                    <Col onClick={() => navigate('/tickets')} >Ver tickets</Col >
                </Row>
            </Container>
        </div>
    )
}

export default Mineria