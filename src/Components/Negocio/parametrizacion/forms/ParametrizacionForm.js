import { useContext, useState } from "react"
import { Button, Col, Form, Row } from "react-bootstrap"
import { DataContext } from "../../../Commons/Context/DataContext"
import { PARAMETRIZACIONES } from "../../../Helpers/helper"

const ParametrizacionForm = (props) => {

    console.log("props", props);

    const initialState = {
        name: '',
        value: ''
    }

    const [state, setState] = useState(initialState);
    const { modalstatus, setModalStatus } = useContext(DataContext)
    const [dataValidate, setDataVerify] = useState(false)
    const modalType = props?.modalType

    const handledAdd = async () => {
        try {
            const request = await fetch(PARAMETRIZACIONES, {
                headers: {
                    'content-type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(state)
            }),
                response = await request.json()
            console.log(request);
            console.log(response);

            setDataVerify(true)

        } catch (error) {
            console.log(error);
        }
    }


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


    const handleSubmitDelete = () => {
        console.log('eliminare');
    }

    if (modalType === 'Add') {
        return (

            <>
                {((dataValidate === true)) ?
                    <div className='dataIsOk'>
                        <Row className='dataIsOkContent'>
                            <ion-icon name="checkmark-circle-outline"></ion-icon>
                            <span>Parametro añadido exitosamente</span>
                        </Row>
                        <Row id='close'>
                            <div className='mddlebtn'>
                                <Button className='btn closeBtn' onClick={() => setModalStatus(false)}>Cerrar</Button>
                            </div>
                        </Row>
                    </div>
                    :
                    <Form onSubmit={handledAdd}>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="6" controlId="validationname">
                                <Form.Label>Nombre del parametro</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    name='name'
                                    onChange={(e) => handleChange(e)}
                                />
                                <Form.Control.Feedback>Bien!</Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">Escribir nombre del parametro</Form.Control.Feedback>
                            </Form.Group>

                        </Row>
                        <Row>
                            <Form.Group as={Col} md="6" controlId="validationlastname">
                                <Form.Label>Escribir valor del parametro</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    name='value'
                                    onChange={(e) => handleChange(e)}
                                />
                                <Form.Control.Feedback>Bien!</Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">Escribir valor del parametro</Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row className='addusr mt-3' >
                            <Col id='create'>
                                <Button type="submit">Crear parametro</Button>
                            </Col>
                            <Col id='closeone' className='closee'>
                                <Button onClick={() => setModalStatus(false)}>Cerrar</Button>
                            </Col>
                        </Row>
                    </Form>
                }
            </>
        )


    }

    if (modalType === 'Delete') {
        return (

            <>
                {dataValidate === true ?
                    <div className='dataIsOk'>
                        <Row className='dataIsOkContent'>
                            <ion-icon name="checkmark-circle-outline"></ion-icon>
                            <span>Pametro eliminado exitosamente</span>
                        </Row>
                        <Row id='close'>
                            <div className='mddlebtn'>
                                <Button className='btn closeBtn' onClick={() => setModalStatus(false)}>Cerrar</Button>
                            </div>
                        </Row>
                    </div> :
                    <Form onSubmit={handleSubmitDelete}>
                        <div className='dataIsOk'>
                            <Row className='dataIsOkContent warning'>
                                <ion-icon name="alert-circle-outline"></ion-icon>
                                <span>¿Estas seguro de eliminar este parametro?</span>
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

    if (modalType === 'Edit') {
        return (
            
                <>
                {dataValidate === true ?
                <div className='dataIsOk'>
                    <Row className='dataIsOkContent'>
                        <ion-icon name="checkmark-circle-outline"></ion-icon>
                        <span>Pametro eliminado exitosamente</span>
                    </Row>
                    <Row id='close'>
                        <div className='mddlebtn'>
                            <Button className='btn closeBtn' onClick={() => setModalStatus(false)}>Cerrar</Button>
                        </div>
                    </Row>
                </div> :
                <Form onSubmit={handleSubmitDelete}>
                    <div className='dataIsOk'>
                        <Row className='dataIsOkContent warning'>
                            <ion-icon name="alert-circle-outline"></ion-icon>
                            <span>¿Estas seguro de eliminar este parametro?</span>
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





export default ParametrizacionForm