import React, { Fragment, useContext, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap';
import { CREATE_CLIENT } from '../../Helpers/helper';
import { DataContext } from '../../Commons/Context/DataContext';

const ClienteForm = (props) => {

  /**delcaramos nuestras variables a utilizar */
  const { modalstatus, setModalStatus } = useContext(DataContext)
  const [dataValidate, setDataVerify] = useState(false)
  const initialState = {
    name: '',
    last_name: '',
    document: '',
    address: '',
    phone: '',
    status: 1,
  }

  /**inicializamos la variable initialstate */
  const [state, setState] = useState(initialState)

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

  /**enviamos al recurso de creacion de clientes */
  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    /**nos aseguramos de que los campos no esten vacios */
    if ([state?.name, state?.last_name, state?.address, state?.document, state?.phone].includes("")) {
      return
    }

    /**guardamos nuestros valores en  clientToCreate
     * para pasar al recurso de creacion de cliente
     */
    const clientToCreate = state
    const token = localStorage.getItem("token") ? localStorage.getItem("token") : ''

    /**metodo para setear y enviar a 
     * recurso de creación del cliente
     */
    let option = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'token': token
      },
      body: JSON.stringify(clientToCreate)
    };
    try {
      const res = await fetch(CREATE_CLIENT, option),
        json = await res.json();
      setDataVerify(true)
      if (!res.ok) {
        console.log(json);
      }
    } catch (error) { console.log(error); }

  }

  /**vista form correspondiente si el tipo de modal es añadir cliente */
  if (props.modalType === 'Add') {
    return (

      <Fragment>
        {
          dataValidate === true ?
            <div className='dataIsOk'>
              <Row className='dataIsOkContent'>
                <ion-icon name="checkmark-circle-outline"></ion-icon>
                <span>Cliente creado exitosamente</span>
              </Row>
              <Row id='close'>
                <Button className='btn closeBtn' onClick={() => setModalStatus(false)}>Cerrar</Button>
              </Row>
            </div>
            :
            <Form onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="validationname">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Nombre"
                    name='name'
                    onChange={(e) => handleChange(e)}
                  />
                  <Form.Control.Feedback>Bien!</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">Escribir nombre</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="validationlastname">
                  <Form.Label>Apellido</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Apellido"
                    name='last_name'
                    onChange={(e) => handleChange(e)}
                  />
                  <Form.Control.Feedback>Bien!</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">Escribir apellido</Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="validationdocument">
                  <Form.Label>Número de cédula</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Número de cédula"
                    required
                    name='document'
                    onChange={(e) => handleChange(e)} />
                  <Form.Control.Feedback type="invalid">Escribir número de cédula</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="validationphone">
                  <Form.Label>Número de celular</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Número de celular"
                    required
                    name='phone'
                    onChange={(e) => handleChange(e)} />
                  <Form.Control.Feedback type="invalid">Escribir número de celular</Form.Control.Feedback>
                </Form.Group>
              </Row>
              {/* <Row className="mb-3" >
                <Form.Group as={Col} md="12" controlId="validationmail">
                  <Form.Label>Correo electrónico</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Correo electrónico"
                    required
                    name='email'
                    onChange={(e) => handleChange(e)} />
                  <Form.Control.Feedback type="invalid">Escribir correo electrónico válido</Form.Control.Feedback>
                </Form.Group>
              </Row> */}
              <Row className="mb-3" >
                <Form.Group as={Col} md="12" controlId="validationmail">
                  <Form.Label>Dirección</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Escribir Dirección"
                    required
                    name='address'
                    onChange={(e) => handleChange(e)} />
                  <Form.Control.Feedback type="invalid">Escribir una dirección</Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row className='addusr' >
                <Col id='create'>
                  <Button type="submit">Crear cliente</Button>
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

export default ClienteForm