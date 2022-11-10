import React, { Fragment, useContext, useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap';
import { CLIENT } from '../../Helpers/helper';
import { DataContext } from '../../Commons/Context/DataContext';

const ClienteForm = (props) => {
  //datos para las peticiones al API
  const token = localStorage.getItem("token") ? localStorage.getItem("token") : '';
  const headers = {
    "Content-Type": "application/json",
    'token': token
  }

  const modalType = props.modalType
  const id_client = props.id_client


  /**delcaramos nuestras variables a utilizar */
  const { modalstatus, setModalStatus } = useContext(DataContext)
  const [dataValidate, setDataVerify] = useState(false)
  const [isDelete, setIsDelete] = useState(false)
  const [currentClient, setCurrentClient] = useState(false)
  
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

  function refreshPage() {
    setModalStatus(false)
    setTimeout(()=>{},600)
    window.location.reload(false);
  }

  /** Obtenemos los valores que guardamos en el token para poder utilizarlos
   * en la siguiente consulta
  */
  useEffect(() => {
    /**mandamos el header de nuestra consulta */
    const options = {
      method: 'GET',
      headers: headers
    }

    const getClient = async () => {
      try {
        const res = await fetch(CLIENT + id_client, options),
          json = await res.json()
        /*seteamos loading */
        
        console.log(json)
        setState(json)
        setCurrentClient(true)
        
      } catch (error) {
        
        console.log("Esto es el error" + error);
      }
    }
    if(modalType === 'Edit'){

      getClient()
    }

  

  }, []);


  //Aca eliminamos el cliente 
  const handleDelete = async (e) => {
    e.preventDefault()
    console.log('Eliminando');
    console.log(e);
    //const token = localStorage.getItem("token") ? localStorage.getItem("token") : ''

    let option = {
      method: "DELETE",
      headers: headers
    }
    try {
      const req = await fetch(CLIENT + id_client, option),
        res = await req.json()
      if (!req.ok) return

      setDataVerify(true)
      //refreshPage()
    } catch (e) {
      console.log(e);
    }





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

    /**metodo para setear y enviar a 
     * recurso de creación del cliente
     */
    let option = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(clientToCreate)
    };
    try {
      const res = await fetch(CLIENT, option),
        json = await res.json();
      if (!res.ok) {
        console.log(json);
        return
      }
      setDataVerify(true)
      //refreshPage()


    } catch (error) { console.log(error); }

  }


  /**enviamos al recurso de actualizar de clientes */
  const handleUpdate = async (e) => {
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

    console.log(state);

    /**guardamos nuestros valores en  clientToCreate
     * para pasar al recurso de creacion de cliente
     */
    const clientToUpdate = state

    /**metodo para setear y enviar a 
     * recurso de creación del cliente
     */
    let option = {
      method: "PUT",
      headers: headers,
      body: JSON.stringify(clientToUpdate)
    };
    try {
      const res = await fetch(CLIENT + id_client, option),
        json = await res.json();
      if (!res.ok) {
        console.log(json);
        return
      }
      setDataVerify(true)
      //refreshPage()


    } catch (error) { console.log(error); }

  }


  /**vista form correspondiente si el tipo de modal es añadir cliente */
  //para agregar clientes
  if (modalType === 'Add') return (

    <Fragment>
      {
        dataValidate === true ?
          <div className='dataIsOk'>
            <Row className='dataIsOkContent'>
              <ion-icon name="checkmark-circle-outline"></ion-icon>
              <span>Cliente creado exitosamente</span>
            </Row>
            <Row id='close'>
              <Button className='btn closeBtn' onClick={() => refreshPage() }>Cerrar</Button>
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
    </Fragment>
  )


  //para eliminar cliente
  if (modalType === 'Delete') return (

    <Fragment>
      {
        dataValidate === true ?
          <div className='dataIsOk'>
            <Row className='dataIsOkContent'>
              <ion-icon name="checkmark-circle-outline"></ion-icon>
              <span>Cliente eliminado exitosamente</span>
            </Row>
            <Row id='close'>
              <Button className='btn closeBtn' onClick={() => refreshPage()}>Cerrar</Button>
            </Row>
          </div>
          :
          <Form onSubmit={handleDelete}>
            <div className='dataIsOk'>
              <Row className='dataIsOkContent warning'>
                <ion-icon name="alert-circle-outline"></ion-icon>
                <div className='mt-3'>
                  {
                    <span>¿Estas seguro de eliminar este cliente?</span>
                  }
                </div>
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
    </Fragment>
  )
  //modificar cliente
  if (modalType === 'Edit' && currentClient === true) return (

    <Fragment>
      {
        dataValidate === true ?
          <div className='dataIsOk'>
            <Row className='dataIsOkContent'>
              <ion-icon name="checkmark-circle-outline"></ion-icon>
              <span>Cliente modificado exitosamente</span>
            </Row>
            <Row id='close'>
              <Button className='btn closeBtn' onClick={() => refreshPage()}>Cerrar</Button>
            </Row>
          </div>
          :
          <Form onSubmit={handleUpdate}>
            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="validationname">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Nombre"
                  name='name'
                  value={state.name}
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
                  value={state.last_name}
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
                  value={state.document}
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
                  value={state.phone}
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
                  value={state.address}
                  onChange={(e) => handleChange(e)} />
                <Form.Control.Feedback type="invalid">Escribir una dirección</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className='addusr' >
              <Col id='create'>
                <Button type="submit">Modificar</Button>
              </Col>
              <Col id='closeone' className='closee'>
                <Button onClick={() => setModalStatus(false)}>Cerrar</Button>
              </Col>
            </Row>
          </Form>
      }
    </Fragment>
  )
}


export default ClienteForm