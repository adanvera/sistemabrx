import { PDFDownloadLink } from '@react-pdf/renderer';
import React, { useContext, useEffect, useState } from 'react'
import { Button, Col, Container, Form, Nav, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import { DataContext } from '../Commons/Context/DataContext';
import Table from '../Commons/Table/Table';
import { CLIENT, MINING_SUMMARY, OPERATION_PROD } from '../Helpers/helper';
import ClientInfo from './ClientInfo';
import DocuPDF from './Pdf/DocuPDF';

function ClientDetails() {
    const { id } = useParams();
    const [fechaDesde,setFechaDesde] = useState('')
    const [fechaHasta,setFechaHasta] = useState('')

    const initialState = {
        tab: {
            operations: true,
            mineria: false,
            modificaciones: false
        },
        headerMiners: {
            machine_name: "NOMBRE",
            status: "ESTADO",
            name: "CLIENTE",
            hashrate: "HASHRATE",
            tempmax: "TEMP MAX",
            maxfan: "VENTILADOR MAX",
            uptime: "UPTIME",
        }
    }

    const [state, setState] = useState(initialState)
    const [clientData, setClientData] = useState('')
    /**acciones que son utilizadas al cargar datos de
  * las consultas
  */
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [miningData, setMiningData] = useState('')
    const [dataOperations, setDataOperations] = useState('')
    const { sidebarStatus, setSidebarStatus } = useContext(DataContext)

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
        
        const getClient = async () => {
            try {
                const res = await fetch(CLIENT + id, options),
                    json = await res.json()
                /**seteamos loading */
                setIsLoaded(true);
                /**seteamos datos del ticket */
                setClientData(json)
            } catch (error) {
                setIsLoaded(true);
                setError(error);
                console.log(error);
            }
        }

        getClient()

        const getMiners = async () => {

            console.log(clientData?.document);

            try {
                const res = await fetch(MINING_SUMMARY + clientData?.document, options),
                    json = await res.json()
                /**seteamos loading */
                setIsLoaded(true);
                /**seteamos datos del ticket */
                setMiningData(json)
            } catch (error) {
                setIsLoaded(true);
                setError(error);
                console.log(error);
            }
        }
        getMiners()

        const getOperations = async () => {
            try {
                const res = await fetch(OPERATION_PROD + 'extract/' + id, options),
                    json = await res.json()
                /**seteamos loading */
                //json.map(op => delete op.created)
                /**seteamos el listado de tickets */


                setDataOperations(json);
            } catch (error) {
                //setError(error);
                console.log("Esto es el error" + error);
            }
        }

        getOperations()

    }, [state]);

    const onHandleClick = e => {
        e.preventDefault()

        setState(prev => {
            const updated = {}
            Object.keys(prev.tab).forEach(item => {
                updated[item] = false
            })
            updated[e.target.id] = true
            return {
                tab: {
                    ...updated,
                }

            }
        })
    }

    const minerHeader = {
        machine_name: "NOMBRE",
        status: "ESTADO",
        name: "CLIENTE",
        hashrate: "HASHRATE",
        tempmax: "TEMP MAX",
        maxfan: "VENTILADOR MAX",
        uptime: "UPTIME",
    }

    const dataOperationsHeader = {
        id: 'Operacion ',
        cliente: "Cliente",
        compra: 'Compra',
        venta: 'Venta',
        comision: 'Comision',
        tipoMoneda: 'Moneda',
        fecha: 'Fecha',

    }
    const handleFilterDateOperations = async()=>{
        console.log('Enviare estas fechas');
        if(fechaDesde === '' || fechaHasta === '') return alert('La fecha no puede ser vacia')
        if(fechaDesde > fechaHasta)return alert('La fecha desde no puede ser mayor a la fecha hasta')

        const token = localStorage.getItem("token") ? localStorage.getItem("token") : ''
        const fecha = {}
        const optionsToOperationsByDate = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'token': token,
                'content-type':'application/json'
            },
            body:JSON.stringify({fechaDesde,fechaHasta})
        }
        console.log('ENviamos estos datos');
        console.log(optionsToOperationsByDate);


        try {
            const res = await fetch(OPERATION_PROD + 'extractByDate/' + id, optionsToOperationsByDate),
                json = await res.json()
            /**seteamos loading */
            //json.map(op => delete op.created)
            /**seteamos el listado de tickets */


            setDataOperations(json);
        } catch (error) {
            //setError(error);
            console.log("Esto es el error" + error);
        }
        
        
    }
    const PdfExtract = () => (
   
        <PDFDownloadLink
          document={<DocuPDF operations={dataOperations} cliente = {clientData}/>}
          fileName="extracto.pdf"
        >
          <Button variant="info">Descargar PDF</Button>
        </PDFDownloadLink>
      
    );

    return (
        <div className={sidebarStatus === 'open' ? 'main-content' : 'main-content extend'} >
            <Container fluid={true} className="">
                <Row>
                    <Col className='headtiket'>
                        <h6>DETALLES DEL CLIENTE</h6>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <ClientInfo data={clientData} />
                        <Row className="mt-5"><h4 className='resumen details'>Actividades del cliente</h4></Row>
                        <section className='mt-3'>
                            <Nav variant="tabs" defaultActiveKey="operations">
                                <Nav.Item >
                                    <Nav.Link id='operations' onClick={e => onHandleClick(e)} eventKey="operations">Operaciones</Nav.Link>
                                </Nav.Item>
                                <Nav.Item >
                                    <Nav.Link id='mineria' onClick={e => onHandleClick(e)} eventKey="mineria">Mineria</Nav.Link>
                                </Nav.Item>
                                <Nav.Item >
                                    <Nav.Link id='modificaciones' onClick={e => onHandleClick(e)} eventKey="modificaciones">Modificaciones</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </section>
                        {
                            state?.tab?.operations
                                ? (
                                    <div className='row'>
                                        <div className='col-2 mt-3'>
                                            <label>Fecha desde:</label>
                                            <Form.Group controlId="duedate" >
                                                <Form.Control
                                                    type="date"
                                                    name="duedate"
                                                    placeholder="--/--/--"
                                                    value={fechaDesde}
                                                    onChange={(e) => setFechaDesde(e.target.value)}
                                                />

                                            </Form.Group>
                                            
                                        </div>

                                        <div className='col-2 mt-3'>
                                            <label>Fecha hasta:</label>
                                            <Form.Group controlId="duedate" >
                                                <Form.Control
                                                    type="date"
                                                    name="duedate"
                                                    placeholder="--/--/--"
                                                    value={fechaHasta}
                                                    onChange={(e) => setFechaHasta(e.target.value)}
                                                />
                                            </Form.Group>
                                        </div>
                                        <div className='col-2 mt-3 delete-btn tkt d-flex'>

                                            <input type = "button" value='Filtrar' onClick={()=>handleFilterDateOperations()}/>

                                        </div>
                                        {dataOperations !== ''?<PdfExtract/>:''}
                                    </div>
                                ) : ''
                        }
                        <section className='tabcontent'>
                            <div id="operations" className={state?.tab?.operations ? 'content-tab' : 'content-tab is-hidden'}>
                                {state?.tab?.operations &&
                                    <Table headers={dataOperationsHeader} data={((dataOperations))} />
                                }
                            </div>
                            <div id="mineria" className={state?.tab?.mineria ? 'content-tab' : 'content-tab is-hidden'}>
                                {state?.tab?.mineria &&
                                    <Table headers={minerHeader} data={((miningData))} />
                                }
                            </div>
                            <div id="modificaciones" className={state?.tab?.modificaciones ? 'content-tab' : 'content-tab is-hidden'}>
                                {state?.tab?.modificaciones &&
                                    <>Tabla/info referente a modificaciones del cliente</>
                                }
                            </div>
                        </section>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default ClientDetails