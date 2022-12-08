import React, { Fragment, useContext, useState } from 'react'
import { useEffect } from 'react'
import { useReducer } from 'react'
import { Button, Col, FloatingLabel, Form, Row } from 'react-bootstrap'
import { DataContext } from '../../Commons/Context/DataContext'
import { USER, ROLES, ASSIGNROLE, USER_PSW, CLIENT, IMPORTACIONES, MACHINES_API } from '../../Helpers/helper'
import { PuffLoader } from 'react-spinners';
import DatePicker from 'react-date-picker'
import Select from 'react-select';


const ImpForms = (props) => {

    /**declaramos nuestras variables para crear un usuario */
    const initialState = {
        id_cliente: '',
        id_proveedor: '',
        empresa_envio: '',
        tracking_number: '',
        valor_envio: '',
        fecha_envio: '',
        fecha_arribo: '',
        comentario_importacion: '',
        articulos: '',
        cantidad: ''
    }

    /**declaramos las variables a utilizar */
    const [state, setState] = useState(initialState)
    const modalType = props?.modalType
    const [dataValidate, setDataVerify] = useState(props?.dataValidate)
    const { modalstatus, setModalStatus } = useContext(DataContext)
    const [idRole, setIdRole] = useState('')
    // Initialize a boolean state
    const [passwordShow, setPasswordShow] = useState(false);
    const [userToEdit, setUserToEdit] = useState(initialState)
    const [error, setError] = useState(false)
    const [msgErr, setMsgErr] = useState('')
    const [dataList, setDataList] = useState('')
    const [externalData, setExternalData] = useState('')


    const togglePassword = () => {
        // When the handler is invoked
        // inverse the boolean state of passwordShown
        setPasswordShow(!passwordShow);
    }

    const [modalShow, setModalShow] = useState(true);

    /**cerrar modal */
    const handleClose = (event) => {
        setModalShow(event)
        setState(initialState)
        setDataVerify(false)
    }

    /**funcion onchange para setear los valores ingresados */
    const handleChange = (e) => {
        e.preventDefault();
        setState(prevState => {
            const updatedValues = {
                ...prevState,
                [e.target.name]: e.target.value,
            }
            return { ...updatedValues };
        });

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
                'Accept': 'application/json',
                'token': token
            },
        }

        const getClient = async () => {
            try {
                const res = await fetch(CLIENT, options),
                    json = await res.json()
                /**seteamos loading */
                console.log(json);
                /**seteamos el listado de tickets */
                setDataList(json);
            } catch (error) {
                console.log("Esto es el error" + error);
            }
        }

        getClient()

        const apiOptions = {
            method: 'POST',

        }
        
        const gettingAllMachines = async () => {
            try {
                const res = await fetch(MACHINES_API, apiOptions),
                    json = await res.json()
                setExternalData(json)
            } catch (error) {
                console.log(error);
            }
        }

        gettingAllMachines()

    }, []);

    console.log(state)

    const handleSubmit = async (e) => {

        e.preventDefault()

        const createImportacion = {
            id_cliente: Number(state.id_cliente),
            id_proveedor: Number(state.id_proveedor),
            empresa_envio: state.empresa_envio,
            tracking_number: state.tracking_number,
            valor_envio: Number(state.valor_envio),
            fecha_envio: state.fecha_envio,
            fecha_arribo: state.fecha_arribo,
            comentario_importacion: state.comentario_importacion,
            cantidad: Number(state.cantidad),
            articulos: JSON.stringify(externalData.filter((item) => item.id === state.ariculos)),
        }

        const pushImportación = async () => {
            const token = localStorage.getItem("token") ? localStorage.getItem("token") : ''
            const options = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'token': token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(createImportacion)
            }

            try {
                const res = await fetch(IMPORTACIONES, options),
                    json = await res.json()
                console.log(json);

                console.log("se creo la importacion");
            } catch (error) {
                console.log(error);
            }
        }

        pushImportación()

    }


    const handleFechaEnvio = (data) => {

        const Fecha = new Date(data)
        setState(prevState => (
            {
                ...prevState,
                fecha_envio: new Date(Fecha),
            }
        ))
    }

    const fechaArribo = (data) => {
        const Fecha = new Date(data)
        setState(prevState => (
            {
                ...prevState,
                fecha_arribo: new Date(Fecha),
            }
        ))
    }

    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
    ]

    const articleOptions = [
        Object.keys(externalData)?.map((item) => {
            return { value: externalData[item]?.id, label: externalData[item].name + " " + externalData[item].brand }
        })
    ]

    if (modalType === 'Add') {
        return (<Fragment>
            {
                ((dataValidate === true) && error === false) ?
                    <div className='dataIsOk'>
                        <Row className='dataIsOkContent'>
                            <ion-icon name="checkmark-circle-outline"></ion-icon>
                            <span>Importación agregada exitosamente</span>
                        </Row>
                        <Row id='close'>
                            <div className='mddlebtn'>
                                <Button className='btn closeBtn' onClick={() => setModalStatus(false)}>Cerrar</Button>
                            </div>
                        </Row>
                    </div>
                    :
                    <Form onSubmit={handleSubmit}>

                        <Row>
                            <Form.Group as={Col} md="12" controlId="cliente">
                                <Form.Label>Seleccionar articulo:</Form.Label>
                                <Form.Select value={state.ariculos} name="ariculos" onChange={handleChange} >
                                    <option selected disabled>Seleccionar articulo</option>
                                    {
                                        Object.keys(externalData).map((item) => {
                                            return <option value={externalData[item]?.id} >{externalData[item].name + " " + externalData[item].brand} </option>
                                        })
                                    }
                                </Form.Select>
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group as={Col} md="12" controlId="cantidad">
                                <Form.Label>Cantidad de articulo</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Cantidad de articulo"
                                    required
                                    name='cantidad'
                                    onChange={(e) => handleChange(e)} />
                                <Form.Control.Feedback type="invalid">Escribir cantidad de articulo</Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="12" controlId="cliente">
                                <Form.Label>Cliente:</Form.Label>
                                <Form.Select value={state.id_cliente} name="id_cliente" onChange={handleChange} >
                                    <option selected disabled>Seleccionar cliente</option>
                                    {
                                        Object.keys(dataList).map((item) => {
                                            return <option value={dataList[item]?.id_client} >{dataList[item]?.name + " " + dataList[item]?.last_name}</option>
                                        })
                                    }
                                </Form.Select>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Row className="mb-3">
                                <Form.Group as={Col} md="12" controlId="id_proveedor">
                                    <Form.Label>Proveedor:</Form.Label>
                                    <Form.Select onChange={handleChange} value={state.id_proveedor} name="id_proveedor" >
                                        <option selected disabled>Seleccionar Proveedor</option>
                                        <option selected value={1}>Proveedor 1 </option>
                                        <option selected value={2}>Proveedor 2 </option>
                                        <option selected value={3}>Proveedor 3 </option>
                                        <option selected value={4}>Proveedor 4 </option>
                                    </Form.Select>
                                </Form.Group>
                            </Row>
                        </Row>
                        <Row className="mb-3" >
                            <Row className="mb-3">
                                <Form.Group as={Col} md="12" controlId="empresa_envio">
                                    <Form.Label>Empresa envio:</Form.Label>
                                    <Form.Select onChange={handleChange} value={state.empresa_envio} name="empresa_envio" >
                                        <option selected disabled>Seleccionar empresa</option>
                                        <option selected value="DHL">DHL</option>
                                        <option selected value="OTHER">opcion 2 </option>
                                    </Form.Select>
                                </Form.Group>
                            </Row>
                        </Row>
                        <Row>
                            <Form.Group as={Col} md="12" controlId="tracking_number">
                                <Form.Label>Tracking Number</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Tracking Number"
                                    required
                                    name='tracking_number'
                                    onChange={(e) => handleChange(e)} />
                                <Form.Control.Feedback type="invalid">Escribir tracking number</Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group as={Col} md="12" controlId="valor_envio">
                                <Form.Label>Valor envio</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Valor envio"
                                    required
                                    name='valor_envio'
                                    onChange={(e) => handleChange(e)} />
                                <Form.Control.Feedback type="invalid">Escribir valor envio</Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row>
                            <Col>
                                <div className="item-column">
                                    <label className="mb-1" htmlFor="">Fecha envio:</label>
                                    <DatePicker
                                        clearIcon={null}
                                        onChange={handleFechaEnvio}
                                        name="fecha_envio"
                                        value={state.fecha_envio}
                                        className='date-input' />
                                </div>
                            </Col>
                            <Col>
                                <div className="item-column">
                                    <label className="mb-1" htmlFor="">Fecha arribo:</label>
                                    <DatePicker
                                        clearIcon={null}
                                        onChange={fechaArribo}
                                        name="fecha_arribo"
                                        value={state.fecha_arribo}
                                        className='date-input' />
                                </div>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="12" controlId="comentario_importacion">
                                <label className="mb-1" htmlFor="">Comentario:</label>
                                <FloatingLabel className="tkt" controlId="comentario_importacion" label="Comentar">
                                    <Form.Control as="textarea" name="comentario_importacion" onChange={handleChange}
                                        placeholder="Deja una comentario"
                                        style={{ height: '80px' }} />
                                </FloatingLabel>
                            </Form.Group>
                        </Row>
                        <Row className='addusr' >
                            <Col id='create'>
                                <Button type="submit">Crear importación</Button>
                            </Col>
                            <Col id='closeone' className='closee'>
                                <Button onClick={() => setModalStatus(false)}>Cerrar</Button>
                            </Col>
                        </Row>
                    </Form>
            }
        </Fragment>)
    }
}

export default ImpForms
