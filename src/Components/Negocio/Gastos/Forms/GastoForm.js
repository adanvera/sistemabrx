import React, { useContext } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Fragment } from 'react'
import { Button, Col, FloatingLabel, Form, Row } from 'react-bootstrap'
import { DataContext } from '../../../Commons/Context/DataContext'
import { GASTOS } from '../../../Helpers/helper'
import { PuffLoader } from 'react-spinners';

const GastoForm = (props) => {

    const initialState = {
        description: '',
        amount: '',
        type: '',
    }

    const [state, setState] = useState(initialState)
    const { modalstatus, setModalStatus } = useContext(DataContext)
    const modalType = props?.modalType
    const { dataidrow } = useContext(DataContext)
    const id_gasto = dataidrow ? dataidrow : ''
    const [dataValidate, setDataVerify] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        if (props.modalType === "Edit") {
            /** Obtenemos los valores que guardamos en el token para poder utilizarlos
                    * en la siguiente consulta
                   */
            const token = localStorage.getItem("token") ? localStorage.getItem("token") : ''
            const idToSend = dataidrow ? dataidrow : ''

            const options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'token': token
                }
            }

            const getGasto = async () => {
                try {
                    const res = await fetch(GASTOS + idToSend, options),
                        json = await res.json()

                    setState({
                        description: json.description,
                        amount: json.amount,
                        type: json.type,
                    })
                    setIsLoaded(true)
                } catch (error) {
                    console.log(error);
                }
            }
            getGasto()
        }
    }, [])





    const submitForm = (e) => {
        e.preventDefault()

        const token = localStorage.getItem("token") ? localStorage.getItem("token") : ''

        const create = {
            description: state.description,
            amount: parseFloat(state.amount),
            type: state.type,
        }

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': token
            },
            body: JSON.stringify({
                description: state.description,
                amount: parseFloat(state.amount),
                type: state.type
            })
        }

        const createGasto = async () => {
            try {
                const res = await fetch(GASTOS, options),
                    json = await res.json()
                console.log(json);

            } catch (error) {
                console.log(error);
            }
        }

        createGasto()
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

    const handleSubmitDelete = (e) => {
        e.preventDefault()

        const token = localStorage.getItem("token") ? localStorage.getItem("token") : ''
        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'token': token
            },
        }

        const idtodelete = Number(dataidrow)

        const deleteGasto = async () => {
            try {
                const res = await fetch(GASTOS + idtodelete, options),
                    json = await res.json()
                console.log(json);

            } catch (error) {
                console.log(error);
            }
        }

        deleteGasto()
    }

    const submitFormEdit = (e) => {
        e.preventDefault()

        const token = localStorage.getItem("token") ? localStorage.getItem("token") : ''
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'token': token
            },
            body: JSON.stringify({
                description: state.description,
                amount: parseFloat(state.amount),
                type: state.type
            })
        }

        const idToSend = dataidrow ? dataidrow : ''

        const editGasto = async () => {
            try {
                const res = await fetch(GASTOS + idToSend, options),
                    json = await res.json()
                console.log(json);

            } catch (error) {
                console.log(error);
            }
        }

        editGasto()

    }

    if (modalType === 'Add') {
        return (
            <Fragment>
                <Form onSubmit={submitForm}>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="12" controlId="comentario_importacion">
                            <FloatingLabel className="tkt" controlId="description" label="Agregar descipción">
                                <Form.Control type='text' name="description" required onChange={handleChange}
                                    placeholder="Agregar descripción" />
                            </FloatingLabel>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3" id='box-cant-value'>
                        <Col as={Col} md="5" >
                            <Form.Group controlId="amount">
                                <Form.Label>Monto de gasto</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Agregar monto"
                                    required
                                    min="0"
                                    name='amount'
                                    onChange={(e) => handleChange(e)} />
                                <Form.Control.Feedback type="invalid">Escribir monto</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col as={Col} md="7">
                            <Form.Group controlId="valor_envio">
                                <Form.Label>Tipo de gasto</Form.Label>
                                <Form.Select
                                    aria-label="Default select example"
                                    name='type'
                                    onChange={(e) => handleChange(e)}
                                >
                                    <option selected disabled>Seleccionar tipo de gasto</option>
                                    <option value="ADMINISTRATIVO">Gasto administrativo</option>
                                    <option value="FIJO">Gastos fijos</option>
                                    <option value="MANTENIMIENTO">Gasto de mantenimiento</option>
                                    <option value="PUBLICIDAD">Gasto de publicidad</option>
                                    <option value="GASTODEPERSONAL">Gasto de personal</option>
                                </Form.Select>

                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className='addusr' >
                        <Col id='create'>
                            <Button type="submit">Agregar gasto</Button>
                        </Col>
                        <Col id='closeone' className='closee'>
                            <Button onClick={() => setModalStatus(false)}>Cerrar</Button>
                        </Col>
                    </Row>
                </Form>
            </Fragment>
        )
    }

    if (modalType === 'Edit') {

        return (
            isLoaded === false ?
                <div className="main-dump">
                    <div className="ddd">
                        <PuffLoader color="#36d7b7" />
                    </div>
                    <div className="ddd">
                        <spam>Cargando...</spam>
                    </div>
                </div>
                :
                <Fragment>
                    <Form onSubmit={submitFormEdit}>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="12" controlId="comentario_importacion">
                                <FloatingLabel className="tkt" controlId="description" label="Agregar descipción">
                                    <Form.Control type='text' name="description" required onChange={handleChange}
                                        placeholder="Agregar descripción" value={state.description} />
                                </FloatingLabel>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3" id='box-cant-value'>
                            <Col as={Col} md="5" >
                                <Form.Group controlId="amount">
                                    <Form.Label>Monto de gasto</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Agregar monto"
                                        required
                                        min="0"
                                        name='amount'
                                        value={state.amount}
                                        onChange={(e) => handleChange(e)} />
                                    <Form.Control.Feedback type="invalid">Escribir monto</Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col as={Col} md="7">
                                <Form.Group controlId="valor_envio">
                                    <Form.Label>Tipo de gasto</Form.Label>
                                    <Form.Select
                                        aria-label="Default select example"
                                        name='type'
                                        value={state.type}
                                        onChange={(e) => handleChange(e)}
                                    >
                                        <option selected disabled>Seleccionar tipo de gasto</option>
                                        <option value="ADMINISTRATIVO">Gasto administrativo</option>
                                        <option value="FIJOS">Gastos fijos</option>
                                        <option value="MANTENIMIENTO">Gasto de mantenimiento</option>
                                        <option value="SUELDOS">SUELDOS</option>
                                        <option value="OTROS">OTROS</option>
                                    </Form.Select>

                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className='addusr' >
                            <Col id='create'>
                                <Button type="submit">Guardar cambios</Button>
                            </Col>
                            <Col id='closeone' className='closee'>
                                <Button onClick={() => setModalStatus(false)}>Cerrar</Button>
                            </Col>
                        </Row>
                    </Form>
                </Fragment>
        )
    }

    if (modalType === "Delete") {
        return (
            <>{dataValidate === true ?
                <div className='dataIsOk'>
                    <Row className='dataIsOkContent'>
                        <ion-icon name="checkmark-circle-outline"></ion-icon>
                        <span>Gasto eliminado exitosamente</span>
                    </Row>
                    <Row id='close'>
                        <Button className='btn closeBtn' onClick={() => setModalStatus(false)}>Cerrar</Button>
                    </Row>
                </div> :
                <Form onSubmit={handleSubmitDelete}>
                    <div className='dataIsOk'>
                        <Row className='dataIsOkContent'>
                            <ion-icon name="checkmark-circle-outline"></ion-icon>
                            <span>¿Estas seguro de eliminar este gasto?</span>
                        </Row>
                        <Row className='addusr mt-3'>
                            <Col id='create'>
                                <Button type="submit">Aceptar</Button>
                            </Col>
                            <Col id='closeone' className='closee'>
                                <Button onClick={() => setModalStatus(false)}>Cerrar</Button>
                            </Col>
                        </Row>
                    </div>
                </Form>
            }
            </>
        )
    }
}

export default GastoForm


