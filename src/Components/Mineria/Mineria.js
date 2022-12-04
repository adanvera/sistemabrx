import React, { useContext, useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { DataContext } from '../Commons/Context/DataContext'
import ModalContainer from '../Commons/ModalContainer'
import MachineForm from './Forms/MachineForm'
import TicketForm from './Forms/TicketForm'
import tktimg from "../../assets/images/ticketimg.png"
import mchimg from "../../assets/images/machine.png"
import MineroForms from './Forms/MineroForms'
import { Link } from 'react-router-dom';
import { Doughnut, Line } from 'react-chartjs-2'
import { faker } from '@faker-js/faker';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import {  MINING_SUMMARY, TICKETS, TICKET_SUMMARY } from '../Helpers/helper'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);


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
    const { sidebarStatus, setSidebarStatus } = useContext(DataContext)
    const [dataList, setDataList] = useState([])
    const [coins, setCoins] = useState([])
    const [chartTicket, setChartTicket] = useState([])

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

        const getTickets = async () => {
            try {
                const res = await fetch(TICKET_SUMMARY, options),
                    json = await res.json()
                /**seteamos el listado de tickets */
                console.log(json);
                setChartTicket(json);
            } catch (error) {

                console.log(error);
            }
        }

        getTickets()

        const miningSummary = async () => {
            try {
                const res = await fetch(MINING_SUMMARY, options),
                    json = await res.json()
                /**seteamos el listado de tickets */
                setDataList(json);
            } catch (error) {
                console.log(error);
            }
        }
        miningSummary()

        const optionsCoins = {
            method: 'POST',
        }
        // const getCoins = async () => {
        //     try {
        //         const response = await fetch(API_COINS, optionsCoins)
        //         const data = await response.json();
        //         setCoins(data);
        //         console.log(data);

        //     } catch (error) {
        //         console.log(error);
        //     }

        // }
        // getCoins()

    }, [])


    console.log(coins);

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
            case 'Minero':
                return <MineroForms />
            case 'Ticket':
                return <TicketForm />
        }
    }
    const usermodal = modalType

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top'
            },

        },
    };

    const labels = chartTicket?.map(
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

    const LabelsMiners = dataList?.map(
        (item) => {
            if (item.monthdate === 1) { return 'Enero' } if (item.monthdate === 2) { return 'Febrero' }
            if (item.monthdate === 3) {
                return 'Marzo'
            }
            if (item.monthdate === 4) {
                return 'Abril'
            }
            if (item.monthdate === 5) {
                return 'Mayo'
            }
            if (item.monthdate === 6) {
                return 'Junio'
            }
            if (item.monthdate === 7) {
                return 'Julio'
            }
            if (item.monthdate === 8) {
                return 'Agosto'
            }
            if (item.monthdate === 9) {
                return 'Septiembre'
            }
            if (item.monthdate === 10) {
                return 'Octubre'
            }
            if (item.monthdate === 11) {
                return 'Noviembre'
            }
            if (item.monthdate === 12) {
                return 'Diciembre'
            }
        }
    )

    const data = {
        labels,
        datasets: [
            {
                label: 'Tickets',
                data: chartTicket?.map((item) => item.cantidad),
                borderColor: 'rgb(25, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    }


    const dataMiners = {
        labels: LabelsMiners,
        datasets: [
            {
                label: 'Mineros',
                data: dataList?.map((item) => item.cantidad),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ]
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
                    <Col md={8}> </Col>
                    <Col md={2} className="a-end"> <div onClick={() => handleModalForm('Ticket')} className="btnadd"> Crear ticket</div></Col>
                    <Col md={2} className="a-end">  <div onClick={() => handleModalForm('Minero')} className="btnadd" > Agregar minero</div></Col>
                </Row>

                <Row className='content-mineria justify-content-between mb-3' >

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
                    <Col md={4} onClick={() => navigate('/mineros')} >
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
                    <Col md={4}>

                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <div className='ticketchart'>
                            <div className="col-xl w-100" id='datapie'>
                                <Row className='labeldata'>Ticket timeline</Row>
                                <Line options={options} data={data} />
                            </div>
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className='ticketchart'>
                            <div className="col-xl w-100" id='datapie'>
                                <Row className='labeldata'>Miners timeline</Row>
                                <Line options={options} data={dataMiners} />
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Mineria