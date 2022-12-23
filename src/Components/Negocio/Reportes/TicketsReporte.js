import React, { useEffect } from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { DataContext } from '../../Commons/Context/DataContext'
import ModalContainer from '../../Commons/ModalContainer'
import SearchTable from '../../Commons/SearchTable'
import { OPERATION_PROD, TICKETS } from '../../Helpers/helper'
import FiltroFechaReportes from './FiltroFechaReportes'

function TicketsReporte() {

    const initialState = 
        {
            "totalTicket": 0,
            "openTicket": 0,
            "closeTicket": 0,
            "pendingTicket": 0,
            "inProgressTicket": 0,
            "onHoldTicket": 0,
            "rma":0,
            "DESESTIMATED":0
        }
    
    const { sidebarStatus, setSidebarStatus } = useContext(DataContext)
    const [fechaDesde, setFechaDesde] = useState("2022-12-01")
    const [fechaHasta, setFechaHasta] = useState("2022-12-31")
    const token = localStorage.getItem("token") ? localStorage.getItem("token") : ''
    const [data, setData] = useState(initialState);

    useEffect(()=>{
        const getTicket = async ()=>{

        /**mandamos el header de nuestra consulta */
        const dataRequest ={fechaDesde,fechaHasta}
        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'token': token,
                'content-type':'application/json'
            },
            body:JSON.stringify(dataRequest)
        }
        const request  =await fetch(TICKETS+"extractByDate",options),
        response = await request.json()
        console.log();
        setData(response.summary)


        }
        getTicket()
    },[])


    const handleFilter = async () => {


        /**mandamos el header de nuestra consulta */
        const dataRequest = { fechaDesde, fechaHasta }
        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'token': token,
                'content-type': 'application/json'
            },
            body: JSON.stringify(dataRequest)
        }
        try {
            const request = await fetch(TICKETS + "extractByDate", options),
            response = await request.json()
        console.log(request);
        console.log(response.summary);
        setData(response.summary)    
        } catch (error) {
            console.log(error);
        }
        

    }


    return (
        <div className={sidebarStatus === 'open' ? 'main-content' : 'main-content extend'} >
            <Row className='mt-3'>
                <h1 className='text-center'>Tickets</h1>
            </Row>
            <Row  >
                <FiltroFechaReportes
                    fechaDesde={fechaDesde}
                    fechaHasta={fechaHasta}
                    setFechaDesde={setFechaDesde}
                    setFechaHasta={setFechaHasta}
                    handleFilter={handleFilter} />
            </Row>

            <Row className='mt-3 p-5'>
                <Col>
                    <Card
                        bg='white'

                        text='dark'
                        style={{ width: '18rem' }}
                        className="mb-2"
                    >
                        <Card.Body>
                            <Card.Title> Total de tickets</Card.Title>
                            <Card.Text>{data.totalTicket}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card
                        bg='white'

                        text='dark'
                        style={{ width: '18rem' }}
                        className="mb-2"
                    >
                        <Card.Body>
                            <Card.Title> Total de tickets abiertos</Card.Title>
                            <Card.Text>{data.openTicket}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card
                        bg='white'

                        text='dark'
                        style={{ width: '18rem' }}
                        className="mb-2"
                    >
                        <Card.Body>
                            <Card.Title> Total de tickets cerrados</Card.Title>
                            <Card.Text>{data.closeTicket}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card
                        bg='white'

                        text='dark'
                        style={{ width: '18rem' }}
                        className="mb-2"
                    >
                        <Card.Body>
                            <Card.Title> Total de tickets pendientes</Card.Title>
                            <Card.Text>{data.pendingTicket}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card
                        bg='white'

                        text='dark'
                        style={{ width: '18rem' }}
                        className="mb-2"
                    >
                        <Card.Body>
                            <Card.Title> Total de tickets detenidos</Card.Title>
                            <Card.Text>{data.onHoldTicket}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card
                        bg='white'

                        text='dark'
                        style={{ width: '18rem' }}
                        className="mb-2"
                    >
                        <Card.Body>
                            <Card.Title> Total de tickets RMA</Card.Title>
                            <Card.Text>{data.rma}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card
                        bg='white'

                        text='dark'
                        style={{ width: '18rem' }}
                        className="mb-2"
                    >
                        <Card.Body>
                            <Card.Title> Total de tickets desestimados</Card.Title>
                            <Card.Text>{data.DESESTIMATED}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default TicketsReporte

