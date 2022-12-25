import React, { useEffect } from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import CheckBox from '../../Clientes/Forms/CheckBox'
import { DataContext } from '../../Commons/Context/DataContext'
import Table from '../../Commons/Table/Table'
import { OPERATION_PROD } from '../../Helpers/helper'
import FiltroFechaReportes from './FiltroFechaReportes'
const initialState = {
    "totalAmountCompra": 0,
    "totalAmountVenta": 0,
    "totalAmountBTCVenta": 0,
    "totalAmountBTCCompra": 0,
    "totalAmountUSDTVenta": 0,
    "totalAmountUSDTCompra": 0,
    "totalOperations": 0
}

function OperacionesReporte() {
    const { sidebarStatus, setSidebarStatus } = useContext(DataContext)
    const [fechaDesde, setFechaDesde] = useState("2022-12-01")
    const [fechaHasta, setFechaHasta] = useState("2022-12-31")
    const [data, setData] = useState(initialState);
    const { isLoading, setIsLoading } = useState(true)
    const [operations, setOperations] = useState('');
    const [typesOperations, setTypesOperations] = useState('2');

    const [checkedCompra, setCheckedCompra] = useState(false);
    const [checkedAll, setCheckedAll] = useState(true);
    const [checkedVenta, setcheckedVenta] = useState(false);

    const header = {
        fecha: 'Fecha',
        cliente: 'Nro cliente',
        id: 'Operacion',
        type: (typesOperations === '1' ? 'Enviado al cliente' : (typesOperations === '0' ? 'Recibido por el cliente' : 'Recibido o enviado ')),
        comision: 'Comision',
        tipoMoneda: 'Tipo de moneda',
        monto: (typesOperations === '1' ? 'Monto recibido' : (typesOperations === '0' ? 'Monto enviado' : 'Recibido o enviado ')),
        tipoOperacion: 'Tipo de operacion'



    }


    const token = localStorage.getItem("token") ? localStorage.getItem("token") : ''
    const getAllOperations = async () => {
        const options = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'token': token,
                'content-type': 'application/json'
            },
        }
        const request = await fetch(OPERATION_PROD, options),
            response = await request.json()
        console.log(request);
        console.log(response);
        setOperations(handleDataOperationToShow(response))
        setIsLoading(false)


    }
    useEffect(() => {
        const getOperations = async () => {

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
            const request = await fetch(OPERATION_PROD + "extractByDate", options),
                response = await request.json()
            console.log(request);
            console.log(response);
            setData(response)


        }
        getOperations()
        getAllOperations()
    }, [])




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
        const request = await fetch(OPERATION_PROD + "extractByDate", options),
            response = await request.json()
        console.log(request);
        console.log(response);
        setData(response)

    }
    const handleDataOperationToShow = (operation) => {

        let listToShow = []
        operation.forEach(op => {

            const formatOperation = {
                fecha: '',
                cliente: '',
                operacion: '',
                montoRecibidoEnviado: '',
                comision: '',
                tipoMoneda: '',
                monto: '',
                tipoOperacion: ''
            }
            formatOperation.cliente = op.id_client
            formatOperation.comision = op.commission
            formatOperation.fecha = op.created
            formatOperation.fecha = (formatOperation.fecha).replace(/T/, ' ').      // replace T with a space
                replace(/\..+/, '')      // replace T with a space

            formatOperation.operacion = op.id_operations
            formatOperation.tipoMoneda = op.btc !== '0' ? 'BTC' : 'USDT'
            formatOperation.monto = op.btc !== '0' ? op.btc : op.amount
            formatOperation.tipoOperacion = typesOperations === '0' ? 'Venta' : (typesOperations === '1' ? 'Compra' : op.type)
            if (typesOperations === '1') {
                formatOperation.montoRecibidoEnviado = op.amount
            } else if (typesOperations === '0') {
                formatOperation.montoRecibidoEnviado = op.amount
            }
            if (op.type === 'Venta' && typesOperations === '0') {

                listToShow.push(formatOperation)
            } else if (op.type === 'Compra' && typesOperations === '1') {
                listToShow.push(formatOperation)

            } else if (typesOperations === '2') {
                formatOperation.montoRecibidoEnviado = op.amount + ' USD'

                listToShow.push(formatOperation)

            }





        })
        return listToShow
    }
    useEffect(() => {
        getAllOperations()
    }, typesOperations)

    return (
        <div className={sidebarStatus === 'open' ? 'main-content' : 'main-content extend'} >
            <Container fluid={true}>
                <Row className='mt-3'>
                    <h4 className=''>Operaciones</h4>
                </Row>
                <Row className='dividefilters mb-3'></Row>
                <Row >
                    <FiltroFechaReportes
                        fechaDesde={fechaDesde}
                        fechaHasta={fechaHasta}
                        setFechaDesde={setFechaDesde}
                        setFechaHasta={setFechaHasta}
                        handleFilter={handleFilter} />
                </Row>
                <Row className='dividefilters mt-3 mb-3'></Row>
                <Row>
                </Row>
                <Row className=''>
                    <Col>
                        <Card
                            bg='white'
                            text='dark'
                            style={{ width: '18rem' }}
                            className="mb-2"
                        >
                            <Card.Body>
                                <Card.Title> Cantidad de operaciones  </Card.Title>
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
                                    {data.totalAmountCompra + ' USD'} <br></br>
                                    {data.totalAmountBTCCompra + ' BTC'}<br></br>
                                    {data.totalAmountCompra + ' USDT'}
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
                                    {data.totalAmountVenta + ' USD'} <br></br>
                                    {data.totalAmountBTCVenta + ' BTC'}<br></br>
                                    {data.totalAmountUSDTVenta + ' USDT'}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row className='mt-2'>
                    <CheckBox
                        setTypesOperations={setTypesOperations}
                        checkedCompra={checkedCompra}
                        setCheckedCompra={setCheckedCompra}
                        checkedVenta={checkedVenta}
                        setcheckedVenta={setcheckedVenta}
                        checkedAll={checkedAll}
                        setCheckedAll={setCheckedAll}
                        isAll={true} />
                </Row>
                {isLoading ? '' : (
                    <Table link='/operaciones/' headers={header} data={operations} exportdata={true} title="Operaciones" />

                )


                }
            </Container>
        </div>
    )
}

export default OperacionesReporte

