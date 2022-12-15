import React, { useEffect, useState } from 'react'
import { Button, Col, FloatingLabel, Form, Row } from 'react-bootstrap'
import { CLIENT, IMPORTACIONES, PROVEEDORES } from '../Helpers/helper'

const InfoImportación = (props) => {

    const [changed, setChanged] = useState(false)
    const [clients, setClients] = useState([])
    const [dataImp, setDataImp] = useState([])
    const idImp = props.idData

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
                    fecha_envio: json[0].fecha_envio,
                    comentario_importacion: json[0].comentario_importacion,
                    articulos: json[0].articulos,
                    cantidad: json[0].cantidad,
                    fecha_arribo: json[0].fecha_arribo,
                    created_at: json[0].created_at,
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

    }, [])

    const handleSubmitEdit = (e) => {
        e.preventDefault()
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
        return JSON.stringify(data).replace(/"/g, " ").replace(/{/g, "\n").replace(/}/g, "").replace(/:/g, " ")
    }

    const handleChangeValue = (e) => {
        e.preventDefault();
        setState(prevState => {
            const updatedValues = {
                ...prevState,
                [e.target.name]: e.target.value,
            }
            return { ...updatedValues };
        });
    }

    console.log(state);

    return (
        <div >
            {dataImp != null &&
                <Form onSubmit={handleSubmitEdit} id="editImport">
                    <Row>
                        <Col md={6} className="mt-3">
                            {
                                <>

                                    <Col className='Box-article pb-3'>
                                        <Row>
                                            {
                                                Object.keys(datede).map((key, index) => {
                                                    return (
                                                        <>
                                                            <Row className='mt-3' ><h6>Detalles </h6></Row>
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
                                        </Row>
                                    </Col>
                                </>
                            }
                        </Col>


                        <Col md={6} className="mt-3">

                            <Row className=''>
                                <FloatingLabel className="tkt" controlId="floatingInputGrid" label="Tracking number">
                                    <Form.Control type="text" name="tracking_number" placeholder="tracking_number" value={state.tracking_number} onChange={handleChange} />
                                </FloatingLabel>
                            </Row>
                            <Row className=" mt-3 mb-3" id='box-cant-value'>
                                <Col >
                                    <Form.Group controlId="cantidad">
                                        <Form.Label>Cantidad</Form.Label>
                                        <Form.Control
                                            type="number" min={0} name="cantidad" placeholder="cantidad" value={state.cantidad} onChange={handleChange} />
                                        <Form.Control.Feedback type="invalid">Escribir cantidad de articulo</Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row className="mb-3" id='box-cant-value'>
                                <Col>
                                    <Form.Group controlId="valor_envio">
                                        <Form.Label>Valor envio (USD)</Form.Label>
                                        <Form.Control
                                            type="number" min={0} name="valor_envio" placeholder="valor_envio" value={state.valor_envio} onChange={handleChange} />
                                        <Form.Control.Feedback type="invalid">Escribir valor envio</Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row className='mt-3'>
                                <FloatingLabel className="tkt"
                                    controlId="floatingSelectGrid"
                                    label="Cliente"
                                >
                                    <Form.Select aria-label="id_client" name="id_cliente" value={state.id_cliente} onChange={handleChange} id="id_cliente">
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

                        </Col>
                    </Row>
                    <Row>
                        <Col md={6} className="mt-3">
                            <Row className=''>
                                <FloatingLabel className="tkt"
                                    controlId="floatingSelectGrid"
                                    label="Empresa envio"
                                >
                                    <Form.Select onChange={handleChange} value={state.empresa_envio} name="empresa_envio" >
                                        <option selected disabled>Seleccionar empresa</option>
                                        <option selected value="DHL"> DHL </option>
                                        <option selected value="FEDEX"> FEDEX </option>
                                    </Form.Select>
                                </FloatingLabel>
                            </Row>
                        </Col>

                    </Row>
                    <Row className="mt-3">
                        <Col md={6}>
                            <Row className=''>
                                <FloatingLabel className="tkt"
                                    controlId="floatingSelectGrid"
                                    label="Proveedor"
                                >
                                    <Form.Select onChange={handleChangeValue} value={state.id_proveedor} name="id_proveedor" >
                                        <option selected disabled>Seleccionar proveedor</option>
                                        {
                                            Object.keys(proveedores).map((item) => {
                                                return <option value={proveedores[item]?.id_proveedor} >{proveedores[item]?.description}</option>
                                            })
                                        }
                                    </Form.Select>

                                </FloatingLabel>
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