import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { Button, Col, FloatingLabel, Form, Row } from 'react-bootstrap'
import DatePicker from 'react-date-picker'
import { toast, Toaster } from 'react-hot-toast'
import { DataContext } from '../Commons/Context/DataContext'
import { formatoDate } from '../Helpers/formats'
import { CLIENT, IMPORTACIONES, MACHINES, MACHINES_API, PROVEEDORES } from '../Helpers/helper'

const InfoImportación = (props) => {

    /**declaramos variables e inicializamos las mismas */
    const { user } = useContext(DataContext)
    const userAuthed = user
    const [changed, setChanged] = useState(false)
    const [clients, setClients] = useState([])
    const [dataImp, setDataImp] = useState([])
    const idImp = props.idData
    const { data } = props
    const actualHistorial = data?.historial
    const cliente = data?.id_cliente
    const proveedor = data?.id_proveedor
    const fecha_arribo = data?.fecha_arribo
    const fecha_envio = data?.fecha_envio
    const valor_envio = data?.valor_envio
    const tracking_number = data?.tracking_number
    const empresa_envio = data?.empresa_envio
    const cantidad = data?.cantidad
    const articulo = data?.articulos

    /**format date dd/mm/yyy whitout hour */
    const formateDate = (date) => {
        const dateFormated = new Date(date)
        const day = dateFormated.getDate()
        const month = dateFormated.getMonth() + 1
        const year = dateFormated.getFullYear()
        const dateFormatedFinal = `${day}/${month}/${year}`
        return dateFormatedFinal
    }

    const fecha_arribo_temp = formateDate(fecha_arribo)
    const fecha_envio_temp = formateDate(fecha_envio)
    
    const initialState = {
        id_importacion: "",
        id_cliente: dataImp ? dataImp.id_client : "",
        client: "",
        id_proveedor: "",
        empresa_envio: "",
        tracking_number: "",
        valor_envio: "",
        fecha_envio: "",
        comentario_importacion: "",
        articulos: "",
        cantidad: "",
        fecha_arribo: "",
        created_at: "",
        updated_at: ""
    }

    const [state, setState] = useState(initialState)
    const [proveedores, setProveedores] = useState('')
    const [validateChangeArticle, setValidateChangeArticle] = useState(false)
    const [externalData, setExternalData] = useState('')


    useEffect(() => {

        const token = localStorage.getItem('token')
        const options = {
            method: 'GET',
            headers: {
                'token': token
            },
        }

        const getClients = async () => {
            try {
                const res = await fetch(CLIENT, options),
                    json = await res.json()
                setClients(json)
            }
            catch (error) {
                console.log(error)
            }
        }

        getClients()


        const optionsImp = {
            method: 'GET',
            headers: {

                'token': token
            },
        }

        const id_importacion = Number(props.idData)

        const getImportacion = async () => {
            try {
                const res = await fetch(IMPORTACIONES + id_importacion, optionsImp),
                    json = await res.json()
                setDataImp(json[0])
                setState({
                    id_importacion: json[0].id_importacion,
                    id_cliente: json[0].id_cliente,
                    client: json[0].client,
                    id_proveedor: json[0].id_proveedor,
                    empresa_envio: json[0].empresa_envio,
                    tracking_number: json[0].tracking_number,
                    valor_envio: json[0].valor_envio,
                    fecha_envio: new Date(json[0].fecha_envio),
                    comentario_importacion: json[0].comentario_importacion,
                    articulos: json[0].articulos,
                    cantidad: json[0].cantidad,
                    fecha_arribo: new Date(json[0].fecha_arribo),
                    created_at: new Date(json[0].created_at),
                    updated_at: json[0].updated_at
                })
            }
            catch (error) {
                console.log(error)
            }
        }

        getImportacion()


        const provedorOptions = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'token': token
            }
        }

        const getProveedores = async () => {
            try {
                const res = await fetch(PROVEEDORES, provedorOptions),
                    json = await res.json()
                setProveedores(json)
            } catch (error) {
                console.log(error);
            }
        }

        getProveedores()


        const getMachines = async () => {
            try {
                const res = await fetch(MACHINES, options),
                    json = await res.json()
                /**seteamos loading */
                setExternalData(json)
            } catch (error) {
                console.log(error);
            }
        }

        getMachines()


    }, [])

    const handleSubmitEdit = (e) => {
        e.preventDefault()

        /**obtenemos el token */
        const token = localStorage.getItem("token") ? localStorage.getItem("token") : ''
        const id_importacion = props?.data?.id_importacion

        const empresaSendUpdate = {
            historilal_id: Math.random().toString(36).slice(-8),
            historial_action: 'Se cambio la empresa de envio de la importacion ' + empresa_envio + ' a ' + state.empresa_envio,
            id_user: userAuthed?.id_user,
            userdata: userAuthed ? userAuthed.name + " " + userAuthed.last_name : '',
            historial_date: new Date(),
        }

        const trackingNumberUpdate = {
            historilal_id: Math.random().toString(36).slice(-8),
            historial_action: 'Se cambio el tracking number de la importacion ' + tracking_number + ' a ' + state.tracking_number,
            id_user: userAuthed?.id_user,
            userdata: userAuthed ? userAuthed.name + " " + userAuthed.last_name : '',
            historial_date: new Date(),
        }

        const valorEnvioUpdate = {
            historilal_id: Math.random().toString(36).slice(-8),
            historial_action: 'Se cambio el valor de envio de la importacion ' + valor_envio + ' a ' + state.valor_envio,
            id_user: userAuthed?.id_user,
            userdata: userAuthed ? userAuthed.name + " " + userAuthed.last_name : '',
            historial_date: new Date(),
        }

        const fechaEnvioUpdate = {
            historilal_id: Math.random().toString(36).slice(-8),
            historial_action: 'Se cambio la fecha de envio de la importacion ' + fecha_envio + ' a ' + state.fecha_envio,
            id_user: userAuthed?.id_user,
            userdata: userAuthed ? userAuthed.name + " " + userAuthed.last_name : '',
            historial_date: new Date(),
        }

        const fechaArriboUpdate = {
            historilal_id: Math.random().toString(36).slice(-8),
            historial_action: 'Se cambio la fecha de arribo de la importacion ' + fecha_arribo + ' a ' + state.fecha_arribo,
            id_user: userAuthed?.id_user,
            userdata: userAuthed ? userAuthed.name + " " + userAuthed.last_name : '',
            historial_date: new Date(),
        }

        const clienteUpdate = {
            historilal_id: Math.random().toString(36).slice(-8),
            historial_action: 'Se cambio el cliente de la importacion ' + cliente + ' a ' + state.client,
            id_user: userAuthed?.id_user,
            userdata: userAuthed ? userAuthed.name + " " + userAuthed.last_name : '',
            historial_date: new Date(),
        }

        const proveedorUpdate = {
            historilal_id: Math.random().toString(36).slice(-8),
            historial_action: 'Se cambio el proveedor de la importacion ' + proveedor + ' a ' + state.id_proveedor,
            id_user: userAuthed?.id_user,
            userdata: userAuthed ? userAuthed.name + " " + userAuthed.last_name : '',
            historial_date: new Date(),
        }

        const articulosUpdate = {
            historilal_id: Math.random().toString(36).slice(-8),
            historial_action: 'Se cambio el articulo de la importacion ',
            id_user: userAuthed?.id_user,
            userdata: userAuthed ? userAuthed.name + " " + userAuthed.last_name : '',
            historial_date: new Date(),
        }

        const cantidadUpdate = {
            historilal_id: Math.random().toString(36).slice(-8),
            historial_action: 'Se cambio la cantidad de la importacion ' + cantidad + ' a ' + state.cantidad,
            id_user: userAuthed?.id_user,
            userdata: userAuthed ? userAuthed.name + " " + userAuthed.last_name : '',
            historial_date: new Date(),
        }

        const verifyHistorial = () => {

            if (cliente !== state.id_cliente) {
                return JSON.stringify(clienteUpdate) + "," + actualHistorial
            }
            if (proveedor !== state.id_proveedor) {
                return JSON.stringify(proveedorUpdate) + "," + actualHistorial
            }
            if (articulo !== state.articulos) {
                return JSON.stringify(articulosUpdate) + "," + actualHistorial
            }
            if (cantidad !== state.cantidad) {
                return JSON.stringify(cantidadUpdate) + "," + actualHistorial
            }
            if (empresa_envio !== state.empresa_envio) {
                return JSON.stringify(empresaSendUpdate) + "," + actualHistorial
            }
            if (tracking_number !== state.tracking_number) {
                return JSON.stringify(trackingNumberUpdate) + "," + actualHistorial
            }
            if (valor_envio !== state.valor_envio) {
                return JSON.stringify(valorEnvioUpdate) + "," + actualHistorial
            }
            if (fecha_envio_temp !== formateDate(state.fecha_envio)) {
                return JSON.stringify(fechaEnvioUpdate) + "," + actualHistorial
            }
            if (fecha_arribo_temp !== formateDate(state.fecha_arribo)) {
                return JSON.stringify(fechaArriboUpdate) + "," + actualHistorial
            }
        }

        if (validateChangeArticle === true) {
            const ImpToUp = {
                id_cliente: Number(state.id_cliente),
                id_proveedor: Number(state.id_proveedor),
                empresa_envio: state.empresa_envio,
                tracking_number: state.tracking_number,
                valor_envio: Number(state.valor_envio),
                fecha_envio: state.fecha_envio,
                comentario_importacion: state.comentario_importacion,
                articulos: JSON.stringify(externalData.filter((item) => item.id === state.articulos)),
                cantidad: Number(state.cantidad),
                fecha_arribo: state.fecha_arribo,
                historial: verifyHistorial()
            }

            const editImport = async () => {
                const options = {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        'token': token
                    },
                    body: JSON.stringify(ImpToUp)
                }

                try {
                    const res = await fetch(IMPORTACIONES + idImp, options),
                        json = await res.json();
                    window.location.reload()
                } catch (error) {
                    console.log(error.msg);
                }
            }
            editImport()
        } else if (validateChangeArticle === false) {

            const ImpToUp = {
                id_cliente: Number(state.id_cliente),
                id_proveedor: Number(state.id_proveedor),
                empresa_envio: state.empresa_envio,
                tracking_number: state.tracking_number,
                valor_envio: Number(state.valor_envio),
                fecha_envio: state.fecha_envio,
                comentario_importacion: state.comentario_importacion,
                cantidad: Number(state.cantidad),
                fecha_arribo: state.fecha_arribo,
                historial: verifyHistorial()
            }

            const editImport = async () => {
                const options = {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        'token': token
                    },
                    body: JSON.stringify(ImpToUp)
                }

                try {
                    const res = await fetch(IMPORTACIONES + idImp, options),
                        json = await res.json();
                    window.location.reload()
                } catch (error) {
                    console.log(error.msg);
                }
            }

            editImport()
        }

    }

    const handleChange = (e) => {

        setState(prevState => {
            const updatedValues = {
                ...prevState,
                [e.target.name]: e.target.value,
            }
            setChanged(true)
            return { ...updatedValues };
        });
    }

    const dataUse = dataImp ? dataImp.articulos : ""
    const datede = dataUse ? JSON.parse(dataUse) : ""

    /**funcion para reemplazar "" y {} y : en un string*/
    const replaceData = (data) => {
        return JSON.stringify(data).replace(/"/g, " ").replace(/{/g, "\n").replace(/}/g, "").replace(/:/g, " ").replace(/\\/g, " ");
    }

    const handleChangeValue = (e) => {
        e.preventDefault();
        setState(prevState => {
            const updatedValues = {
                ...prevState,
                [e.target.name]: e.target.value,
            }
            setChanged(true)
            return { ...updatedValues };
        });
    }

    const handleFechaEnvio = (data) => {
        const Fecha = new Date(data)
        setState(prevState => (
            {
                ...prevState,
                fecha_envio: new Date(Fecha),
            }
        ))
        setChanged(true)
    }

    const handleFechaArribo = (data) => {
        const Fecha = new Date(data)
        setState(prevState => (
            {
                ...prevState,
                fecha_arribo: new Date(Fecha),
            }
        ))
        setChanged(true)
    }

    const dateToCompare = dataImp ? new Date(dataImp.fecha_arribo) : ""
    const actualDate = new Date()
    /**diff on days between actualDate and dateToCompare*/
    const diffDays = Math.ceil((dateToCompare - actualDate) / (1000 * 60 * 60 * 24));

    const showDaysToArrive = (data, dateToCompare) => {

        /**format dateToCompare to dd/mm/yyy  */
        const dateToCompareFormated = dateToCompare ? dateToCompare.toLocaleDateString() : ""

        if (diffDays > 0) {
            return (
                <p className="">Faltan {diffDays} días para que llegue</p>
            )
        } else if (diffDays === 0) {
            return (
                <p className="">Importación llegó hoy</p>
            )
        } else if (diffDays < 0) {
            return (
                <p className="">Llegó hace {Math.abs(diffDays)} día(s)</p>
            )
        }

    }

    return (
        <div >
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
            {dataImp != null &&
                <Form onSubmit={handleSubmitEdit} id="editImport">
                    <Row>
                        <Col md={6} className="mt-3">
                            {
                                <>
                                    {
                                        validateChangeArticle === false &&
                                        <Row className='pl-3'>
                                            <Col className='Box-article pb-3'>
                                                {
                                                    Object.keys(datede).map((key, index) => {
                                                        return (
                                                            <>
                                                                <Row className='mt-3' >
                                                                    <Col>
                                                                        <h6>Detalles </h6>
                                                                    </Col>
                                                                    {
                                                                        diffDays > 0 &&
                                                                        <Col className='aend' onClick={(e) => setValidateChangeArticle(true)}>
                                                                            <div>
                                                                                <p>Cambiar articulo</p>
                                                                            </div>
                                                                        </Col>
                                                                    }

                                                                </Row>
                                                                <Row>
                                                                    <span>Articulo :  <strong>{datede[key].name}</strong> </span>
                                                                    <span>Marca :  <strong>{datede[key].brand}</strong> </span>
                                                                    <span>type :  <strong>{datede[key].type}</strong> </span>
                                                                </Row>
                                                                <Row className='mt-3'><h6>Algorithms </h6></Row>
                                                                <Row>
                                                                    <span>
                                                                        <strong>
                                                                            {replaceData(datede[key].algorithms)}
                                                                        </strong>
                                                                    </span>
                                                                </Row>
                                                                <Row className='mt-3'><h6>specs </h6></Row>
                                                                <Row>
                                                                    <span><strong>{replaceData(datede[key].specs)}</strong> </span>
                                                                </Row>
                                                            </>
                                                        )
                                                    })
                                                }
                                            </Col>
                                        </Row>
                                    }
                                    {
                                        validateChangeArticle &&
                                        <Row className="mb-3"  >
                                            <Form.Group as={Col} md="12" controlId="cliente">
                                                <Form.Label>Seleccionar articulo:</Form.Label>
                                                <Form.Select value={state.articulos} name="articulos" onChange={handleChange} required id='changearticle' >
                                                    <option selected disabled>Seleccionar articulo</option>
                                                    {
                                                        Object.keys(externalData).map((item) => {
                                                            return <option value={externalData[item]?.id} >{externalData[item].name + " " + externalData[item].brand} </option>
                                                        })
                                                    }
                                                </Form.Select>
                                            </Form.Group>
                                        </Row>
                                    }

                                    <Row className='mt-3'>
                                        <FloatingLabel className="tkt"
                                            controlId="floatingSelectGrid"
                                            label="Empresa envio"
                                        >
                                            <Form.Select onChange={handleChange} value={state.empresa_envio} name="empresa_envio" disabled={diffDays <= 0 ? true : false} >
                                                <option selected disabled>Seleccionar empresa</option>
                                                <option selected value="DHL"> DHL </option>
                                                <option selected value="FEDEX"> FEDEX </option>
                                            </Form.Select>
                                        </FloatingLabel>
                                    </Row>

                                    <Row className='mt-3'>
                                        <FloatingLabel className="tkt"
                                            controlId="floatingSelectGrid"
                                            label="Proveedor"
                                        >
                                            <Form.Select
                                                onChange={handleChangeValue}
                                                value={state.id_proveedor}
                                                name="id_proveedor"
                                                disabled={diffDays <= 0 ? true : false} >
                                                <option selected disabled>Seleccionar proveedor</option>
                                                {
                                                    Object.keys(proveedores).map((item) => {
                                                        return <option value={proveedores[item]?.id_proveedor} >{proveedores[item]?.description}</option>
                                                    })
                                                }
                                            </Form.Select>
                                        </FloatingLabel>
                                    </Row>
                                    <Row className='mt-3'>
                                        <FloatingLabel className="tkt" controlId="floatingInputGrid" label="Tracking number">
                                            <Form.Control
                                                type="text"
                                                name="tracking_number"
                                                placeholder="tracking_number"
                                                value={state.tracking_number}
                                                onChange={handleChange}
                                                disabled={diffDays <= 0 ? true : false} />
                                        </FloatingLabel>
                                    </Row>

                                    <Row className='mt-3'>
                                        <FloatingLabel className="tkt"
                                            controlId="floatingSelectGrid"
                                            label="Cliente"
                                        >
                                            <Form.Select
                                                aria-label="id_client"
                                                name="id_cliente"
                                                value={state.id_cliente}
                                                onChange={handleChange}
                                                id="id_cliente"
                                                disabled={diffDays <= 0 ? true : false} >
                                                {
                                                    Object.keys(clients).map((key, index) => {
                                                        return (
                                                            <option key={index} value={clients[key].id_client}>{clients[key].name + " " + clients[key].last_name}</option>
                                                        )
                                                    })
                                                }
                                            </Form.Select>
                                        </FloatingLabel>
                                    </Row>
                                </>
                            }
                        </Col>
                        <Col md={6} className="">

                            <Row className=" mt-3 mb-3" id='box-cant-value'>
                                <Col >
                                    <Form.Group controlId="cantidad">
                                        <Form.Label>Cantidad</Form.Label>
                                        <Form.Control
                                            type="number"
                                            min={0}
                                            name="cantidad"
                                            placeholder="cantidad"
                                            value={state.cantidad}
                                            onChange={handleChange}
                                            disabled={diffDays <= 0 ? true : false}
                                        />
                                        <Form.Control.Feedback type="invalid">Escribir cantidad de articulo</Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className="mb-3" id='box-cant-value'>
                                <Col>
                                    <Form.Group controlId="valor_envio">
                                        <Form.Label>Valor envio (USD)</Form.Label>
                                        <Form.Control
                                            type="number"
                                            min={0}
                                            name="valor_envio"
                                            placeholder="valor_envio"
                                            value={state.valor_envio}
                                            onChange={handleChange}
                                            disabled={diffDays <= 0 ? true : false}
                                        />
                                        <Form.Control.Feedback type="invalid">Escribir valor envio</Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className="">
                                <Col>
                                    <div className="item-column">
                                        <label className="mb-1" htmlFor="">Fecha envio:</label>
                                        <DatePicker
                                            clearIcon={null}
                                            onChange={handleFechaEnvio}
                                            value={state.fecha_envio}
                                            className='date-input'
                                            disabled={diffDays <= 0 ? true : false}
                                        />
                                    </div>
                                </Col>
                                <Col>
                                    <div className="item-column">
                                        <label className="mb-1" htmlFor="">Fecha arribo:</label>
                                        <DatePicker
                                            clearIcon={null}
                                            onChange={handleFechaArribo}
                                            value={state.fecha_arribo}
                                            className='date-input'
                                            disabled={diffDays <= 0 ? true : false}
                                        />
                                    </div>
                                </Col>
                            </Row>
                            <Row className="mt-3" id=''>
                                <Col>
                                    <Form.Group controlId="created_at">
                                        <Form.Label>Creado el:</Form.Label>
                                        <Form.Control
                                            type="text" min={0} name="created_at" placeholder="created_at" value={formatoDate(state.created_at)} disabled />
                                        <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className='mt-3'>
                                <Col className='box-diff'>
                                    <div className='tdfe'>
                                        {
                                            showDaysToArrive(diffDays, dateToCompare)
                                        }
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>

                    {
                        changed === true &&
                        <Row className='dfasfd mt-3'>
                            <Col id='creatdfe'>
                                <Button type="submit">Guardar cambios</Button>
                            </Col>
                        </Row>
                    }

                </Form>

            }
        </div>
    )
}

export default InfoImportación