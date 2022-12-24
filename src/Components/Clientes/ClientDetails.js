import { PDFDownloadLink } from '@react-pdf/renderer';
import React, { useContext, useEffect, useState } from 'react'
import { Fragment } from 'react';
import { Button, Col, Container, Form, Nav, Row } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { DataContext } from '../Commons/Context/DataContext';
import ModalContainer from '../Commons/ModalContainer';
import Table from '../Commons/Table/Table';
import { CLIENT, MINING_SUMMARY, OPERATION_PROD } from '../Helpers/helper';
import OperationsData from '../Operaciones/OperationsData';
import ClientInfo from './ClientInfo';
import CheckBox from './Forms/CheckBox';
import ClienteForm from './Forms/ClienteForm';

function ClientDetails() {
    const { id } = useParams();
    const [loadingFirst, setLoadingFirst] = useState(true);
    const [fechaDesde, setFechaDesde] = useState('2022-12-01')
    const [fechaHasta, setFechaHasta] = useState('2022-12-31')
    const [numeroOperacion, setNumeroOperacion] = useState('')
    const [operationTemporal, setOperationTemporal] = useState('')
    const [typesOperations, setTypesOperations] = useState('1')
    
    const { modalstatus, setModalStatus } = useContext(DataContext)

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
        },
        form: 'Cliente',
        title: 'CLIENTE',
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
    const { modalType, setModalType } = useContext(DataContext)
    const modal = modalstatus

    //checbox
    const [checkedCompra, setCheckedCompra] = useState(true);
    const [checkedVenta, setcheckedVenta] = useState(false);
    
   
    const getOperations = async (typeChecked = '') => {
        console.log('typeChecked'+typeChecked);
        let type = typeChecked === ''?typesOperations:typeChecked

        const optionsData = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'content-type':'application/json'
                
            },
            body:JSON.stringify({fechaDesde,fechaHasta,typeOperation:type})
        }   
        try {
            const res = await fetch(OPERATION_PROD + 'extractByDate/' + id, optionsData),
                json = await res.json()
                console.log(res);
                console.log(json);
                
            setDataOperations(handleDataOperationToShow(json));
            if(loadingFirst){

                setOperationTemporal(handleDataOperationToShow(json))
            }
            
        } catch (error) {
            //setError(error);
            console.log("Esto es el error" + error);
        }
    }


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
    useEffect(()=>{
      getOperations()      
    },[typesOperations])
    const handleDataOperationToShow = ( operation ) => {
        
        let listToShow = []
        operation.forEach( op => {
            const formatOperation = {
                fecha:'',
                operacion:'',
                montoRecibidoEnviado:'',
                comision:'',
                tipoMoneda:'',
                monto:'',
                tipoOperacion:''
            }
            formatOperation.comision = op.comision
            formatOperation.fecha = op.fecha
            formatOperation.operacion = op.operation
            formatOperation.tipoMoneda = op.btc !== '0'? 'BTC':'USDT'
            formatOperation.monto = op.btc !== '0'? op.btc:op.usdt
            formatOperation.tipoOperacion = typesOperations === '0'? 'Venta':'Compra'
            
            if(typesOperations === '1'){
                formatOperation.montoRecibidoEnviado = op.compra
            }else if(typesOperations === '0'){
                formatOperation.montoRecibidoEnviado = op.venta
            }
            listToShow.push(formatOperation)
        })
        return listToShow
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
        fecha: 'Fecha',
        id: 'Operacion',    
        type:(typesOperations ==='1'?'Enviado al cliente':'Recibido por el cliente'),
        comision: 'Comision',
        tipoMoneda:'Tipo de moneda',
        monto:(typesOperations ==='1'?'Monto recibido':'Monto enviado'),
        tipoOperacion:'Tipo de operacion'
        
        

    }
    
    const handleFilterDateOperations = async () => {
        console.log('Enviare estas fechas');
        if (fechaDesde === '' || fechaHasta === '') return alert('La fecha no puede ser vacia')
        if (fechaDesde > fechaHasta) return alert('La fecha desde no puede ser mayor a la fecha hasta')

        const token = localStorage.getItem("token") ? localStorage.getItem("token") : ''
        const fecha = {}
        const optionsToOperationsByDate = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'token': token,
                'content-type': 'application/json'
            },
            body: JSON.stringify({ fechaDesde, fechaHasta })
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
    const handlePDF = () => {
        var url = `${CLIENT}extractPDF/${id}?fechaDesde=${fechaDesde}&fechaHasta=${fechaHasta}&typeOperation=${typesOperations}`;
        console.log(url);
        var oReq = new XMLHttpRequest();
        oReq.open("GET", url, true);
        oReq.responseType = "arraybuffer";

        oReq.onload = function (oEvent) {
            console.log(oReq.response);
            var blob = new Blob([oReq.response], { type: "application/pdf" });
            var win = window.open('', '_blank');
            var URL = window.URL || window.webkitURL;
            var dataUrl = URL.createObjectURL(blob);
            win.location = dataUrl;
        };
        oReq.send();
    }


    const handleFilterOperationNumber = (e) => {
        console.log(numeroOperacion);
        console.log(dataOperations);
        const newData = dataOperations.filter(op => op.operacion === Number(numeroOperacion))
        console.log(newData);
        if (newData !== '') {
            setDataOperations(newData)

        }

    }
    const handleCleanOperations = () => {
        setDataOperations(operationTemporal)
        setNumeroOperacion('')
        setFechaDesde('2022-12-01')
        setFechaHasta('2022-12-31')
        setTypesOperations('1')
        setCheckedCompra(true)
        setcheckedVenta(false)
    }

    const copyToClipBoard = async copyMe => {
        try {
            await navigator.clipboard.writeText(copyMe);
        } catch (err) {
            return
        }
    };

    const handleUserDelete = (e, btn) => {
        e.preventDefault()
        setModalStatus(true)


        if (btn === '_btnDelete') {
            setModalType('Delete')
            // setDataIdRow(dataIDc)
        }
    }


    /**funcion para setear form clickeado */
    const pickForm = () => {
        switch (state?.form) {
            case 'Cliente':
                return <ClienteForm modalType={modalType} id_client={clientData?.id_client} />
        }
    }

    return (
        <div className={sidebarStatus === 'open' ? 'main-content-tkt' : 'main-content-tkt extend'} >
            {modal && (
                <ModalContainer
                    title={state?.title}
                    form={pickForm()}
                    modalStatus={modal}
                    modalType={modalType}
                />
            )}
            
            <Row className=''>
                <Col md={9} className="tiktop ml-1 pb-3">
                    <Container fluid={true} className="">
                        <Row className='d-grid pt-3 headerdetails'>
                            <Col><div className='colorlink ticketsdetails'> <Link to="/clientes">{"< Clientes"}</Link> </div></Col>
                            <Col className='headtiket imp d-flex'>
                                <div>
                                    <h4>{clientData?.name + clientData.last_name}  </h4>
                                </div>
                                <div className='text-end clipboard' onClick={() => copyToClipBoard(clientData?.name + clientData.last_name)} >
                                    <span className='txttd'><ion-icon name="copy-outline"></ion-icon></span>
                                </div>
                            </Col>
                        </Row>
                        <Row className='w-100' >
                            <ClientInfo data={clientData} />
                        </Row>
                    </Container>
                </Col>
                <Col md={3}>
                    <div className='tiktop'>
                        <Col className='headtiket d-flex'>
                            <div>
                                <h6>Acciones</h6>
                            </div>
                        </Col>
                        <div className="actionstwo d-grid mt-3">
                            <div className="delete-btn tkt d-flex" id='_btnDeletetkt' onClick={(e) => handleUserDelete(e, '_btnDelete')} >
                                <span>Eliminar cliente </span>
                                <div>
                                    <ion-icon name="trash-outline"></ion-icon>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row className='mt-3'>
                <Col md={9}>
                    <Fragment>
                        <div className='tiktop'>
                            <Row className=""><h4 className='resumen details derd'>Actividades del cliente</h4></Row>
                            <Row className='d-flex'>
                                <Col md={10}>
                                    <Nav variant="tabs" defaultActiveKey="operations">
                                        <Nav.Item >
                                            <Nav.Link id='operations' onClick={e => onHandleClick(e)} eventKey="operations">Operaciones</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item >
                                            <Nav.Link id='mineria' onClick={e => onHandleClick(e)} eventKey="mineria">Mineria</Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                </Col>
                                <Col md={2}>
                                    {
                                        state?.tab?.operations &&
                                        <input className='form-control col-4' type={"button"} value={"descargar extracto"} onClick={handlePDF} id="downloadextract" />
                                    }
                                </Col>
                            </Row>
                            <Row className='dividefilters'></Row>
                            {
                                state?.tab?.operations &&
                                <>
                                    <Row className='mt-2'>
                                        <CheckBox 
                                        setTypesOperations={setTypesOperations} 
                                        checkedCompra={checkedCompra} 
                                        setCheckedCompra={setCheckedCompra}
                                        checkedVenta={checkedVenta}
                                        setcheckedVenta={setcheckedVenta}/>
                                    </Row>
                                    <Row className='dividefilters'></Row>
                                </>
                            }
                            {
                                state?.tab?.operations
                                    ? (
                                        <>
                                            <Row className='mt-3'>
                                                <Col className='d-flex'>
                                                    <Form.Group controlId="duedate"   >
                                                        <Form.Control
                                                            type="text"
                                                            name="nroOperacion"
                                                            placeholder="Buscar n° operación"
                                                            value={numeroOperacion}
                                                            className="input is-normal searchinput"
                                                            onChange={(e) => setNumeroOperacion(e.target.value)}
                                                        />
                                                    </Form.Group>
                                                    <div className=''>
                                                        <button className="  button btn-buscar ml-2 btn-cli" value='Buscar' onClick={() => handleFilterOperationNumber()} >Buscar</button>
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row className="mt-3 mb-3">
                                                <Col >
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
                                                </Col>
                                                <Col >
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
                                                </Col>
                                                <Col className="column align">
                                                    <div className="item-column">
                                                        <button className=" button btn-cli" value='Filtrar' onClick={() => getOperations()} >Filtrar</button>
                                                    </div>
                                                </Col>
                                                <Col className="column align">
                                                    <div className="item-column">
                                                        <button className=" button btn-cli" value='Limpiar' onClick={() => handleCleanOperations()}>Limpiar</button>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </>
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
                            </section>
                        </div>
                    </Fragment>
                </Col>
            </Row>
        </div>
    )
}

export default ClientDetails