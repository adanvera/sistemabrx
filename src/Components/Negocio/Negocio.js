import React from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { DataContext } from '../Commons/Context/DataContext'
import ModalContainer from '../Commons/ModalContainer'
import gastoimg from "../../assets/images/bolsa-de-dinero.gif"
import param from "../../assets/images/conexion.gif"
import reports from "../../assets/images/grafico-de-linea.gif"

const Negocio = (props) => {
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
                    {/* <Col md={8}> </Col>
                    <Col md={2} className="a-end"> <div onClick={() => handleModalForm('Ticket')} className="btnadd"> Crear ticket</div></Col>
                    <Col md={2} className="a-end">  <div onClick={() => handleModalForm('Minero')} className="btnadd" > Agregar minero</div></Col> */}
                    <h1>Modulo de negocio</h1>
                </Row>

                <Row className='content-mineria justify-content-between mb-3' >

                    <Col md={4} onClick={() => navigate('/gastos')} >
                        <div id="tkprev">
                            <div className='imgtkg'>
                                <img src={gastoimg} />
                            </div>
                            <div className='contentticket'>
                                <h6>Administracion</h6>
                                <h6>de gastos</h6>
                            </div>
                        </div>
                    </Col>

                    <Col md={4} onClick={() => navigate('/reportes')} >
                        <div id="tkprev">
                            <div className='imgtkg'>
                                <img src={reports} />
                            </div>
                            <div className='contentticket'>
                                <h6>Reportes</h6>
                                <h6>del sistema</h6>
                            </div>
                        </div>
                    </Col>

                    <Col md={4} onClick={() => navigate('/parametrizaciones')} >
                        <div id="tkprev">
                            <div className='imgtkg'>
                                <img src={param} />
                            </div>
                            <div className='contentticket'>
                                <h6>Administracion</h6>
                                <h6>de parametrizaciones</h6>
                            </div>
                        </div>
                    </Col>
                </Row>

            </Container>
        </div>

    )
}

export default Negocio