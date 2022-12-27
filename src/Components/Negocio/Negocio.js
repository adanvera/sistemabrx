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
import {
    Chart as ChartJS,
    RadialLinearScale,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';
import { PolarArea } from 'react-chartjs-2'
import { useEffect } from 'react'
import { GASTOS } from '../Helpers/helper'
ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);


const Negocio = (props) => {

    const { sidebarStatus } = useContext(DataContext)
    /**declaramos e inicializamos variables a utilizar */
    const initialState = {
        form: 'Negocio',
        title: 'NEGOCIO',
    }
    const [state, setState] = useState(initialState)
    const { modalstatus, setModalStatus } = useContext(DataContext)
    const { modalType } = useContext(DataContext)
    const usermodal = modalType
    const modal = modalstatus
    let navigate = useNavigate()
    const [gastoSummary, setGastoSummary] = useState([])
    const [gastoAmountMonth, setGastoAmountMonth] = useState([])

    useEffect(() => {

        const token = localStorage.getItem('token') ? localStorage.getItem('token') : null

        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                token: token
            },
        }

        const getGastosByMonth = async () => {
            try {
                const res = await fetch(GASTOS + "get/summary", options)
                const data = await res.json()
                setGastoSummary(data);
            } catch (error) {
                console.log(error);
            }
        }

        getGastosByMonth()

        const amountGastoByMonth = async () => {
            try {
                const res = await fetch(GASTOS + "/get/mes", options)
                const data = await res.json()
                setGastoAmountMonth(data);
            } catch (error) {
                console.log(error);
            }
        }

        amountGastoByMonth()

    }, [])

    const pickForm = () => {
        switch (state.form) {
            case 'Negocio':
                return 'Negocio'
            default:
                return 'Negocio'
        }
    }

    console.log(gastoAmountMonth);

    const labelsMonth = gastoAmountMonth?.map(
        (item) => {
            if (item.month === 1) { return 'Enero' } if (item.month === 2) { return 'Febrero' }
            if (item.month === 3) {
                return 'Marzo'
            }
            if (item.month === 4) {
                return 'Abril'
            }
            if (item.month === 5) {
                return 'Mayo'
            }
            if (item.month === 6) {
                return 'Junio'
            }
            if (item.month === 7) {
                return 'Julio'
            }
            if (item.month === 8) {
                return 'Agosto'
            }
            if (item.month === 9) {
                return 'Septiembre'
            }
            if (item.month === 10) {
                return 'Octubre'
            }
            if (item.month === 11) {
                return 'Noviembre'
            }
            if (item.month === 12) {
                return 'Diciembre'
            }
        }
    )

    const labels = gastoSummary?.map(
        (item) => {
            if (item.month === 1) { return 'Enero' } if (item.month === 2) { return 'Febrero' }
            if (item.month === 3) {
                return 'Marzo'
            }
            if (item.month === 4) {
                return 'Abril'
            }
            if (item.month === 5) {
                return 'Mayo'
            }
            if (item.month === 6) {
                return 'Junio'
            }
            if (item.month === 7) {
                return 'Julio'
            }
            if (item.month === 8) {
                return 'Agosto'
            }
            if (item.month === 9) {
                return 'Septiembre'
            }
            if (item.month === 10) {
                return 'Octubre'
            }
            if (item.month === 11) {
                return 'Noviembre'
            }
            if (item.month === 12) {
                return 'Diciembre'
            }
        }
    )

    const dataGastos = {
        labels,
        datasets: [
            {
                label: 'Gastos',
                data: gastoSummary?.map((item) => item.cantidad),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(153, 102, 255, 0.5)',
                    'rgba(255, 159, 64, 0.5)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const amountMonth = {
        labels: labelsMonth,
        datasets: [
            {
                label: 'Gastos',
                data: gastoAmountMonth?.map((item) => item?.amount),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(153, 102, 255, 0.5)',
                    'rgba(255, 159, 64, 0.5)',
                ],
                borderWidth: 1,
            },
        ],
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
                <Row>
                    <Col md={3}>
                        <h5>Cantidad de gastos por mes</h5>
                        <PolarArea data={dataGastos} />
                    </Col>
                    <Col md={3}>
                        <h5>Monto de gastos por mes</h5>
                        <PolarArea data={amountMonth} />
                    </Col>
                </Row>

            </Container>
        </div>

    )
}

export default Negocio