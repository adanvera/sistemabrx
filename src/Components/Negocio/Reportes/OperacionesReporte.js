import React, { useEffect } from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { DataContext } from '../../Commons/Context/DataContext'
import ModalContainer from '../../Commons/ModalContainer'
import SearchTable from '../../Commons/SearchTable'
import FiltroFechaReportes from './FiltroFechaReportes'

function OperacionesReporte() {
    const initialState = {
        "totalAmountCompra": 0,
        "totalAmountVenta": 0,
        "totalAmountBTCVenta": 0,
        "totalAmountBTCCompra": 0,
        "totalAmountUSDTVenta": 0,
        "totalAmountUSDTCompra": 0,
        "totalOperations": 0
    }
    const { sidebarStatus, setSidebarStatus } = useContext(DataContext)
    const [fechaDesde,setFechaDesde] = useState("2022-12-01")
    const [fechaHasta,setFechaHasta] = useState("2022-12-31")
    const [data, setData] = useState(initialState);
    

    useEffect(()=>{
        const getOperations = async ()=>{
            const token = localStorage.getItem("token") ? localStorage.getItem("token") : ''

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
        const request  =await fetch("http://localhost:4000/api/operation/extractByDate",options),
        response = await request.json()
        console.log(request);
        console.log(response);
        setData(response)


        }
        getOperations()
    },[])





    return (
        <div className={sidebarStatus === 'open' ? 'main-content' : 'main-content extend'} >
             <Row className='mt-3'>
                    <h1 className='text-center'>Operaciones</h1>
                </Row>
            <Row >
                        <FiltroFechaReportes 
                        fechaDesde={fechaDesde}
                        fechaHasta={fechaHasta}
                        setFechaDesde={setFechaDesde}
                        setFechaHasta={setFechaHasta}/>          
            </Row>
            <Row className=' p-5'>
                <Col>
                    <Card
                        bg='white'

                        text='dark'
                        style={{ width: '18rem' }}
                        className="mb-2"
                    >
                        <Card.Body>
                            <Card.Title> Total operaciones  </Card.Title>
                            <Card.Text>
                            {data.totalOperations}
                            </Card.Text>
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
                            <Card.Title> Total compra  </Card.Title>
                            <Card.Text>
                            {data.totalAmountCompra +' USD'} <br></br>
                            {data.totalAmountBTCCompra+' BTC'}<br></br>
                            {data.totalAmountUSDTCompra+' USDT'}
                            </Card.Text>
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
                            <Card.Title> Total venta  </Card.Title>
                            <Card.Text>
                            {data.totalAmountVenta +' USD'} <br></br>
                            {data.totalAmountBTCVenta+' BTC'}<br></br>
                            {data.totalAmountUSDTVenta+' USDT'}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default OperacionesReporte

