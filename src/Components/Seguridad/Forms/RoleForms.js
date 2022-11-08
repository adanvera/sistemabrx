import React, { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Button, Col, Container, FloatingLabel, Form, Row } from 'react-bootstrap'
import { DataContext } from '../../Commons/Context/DataContext'
import { ROLEID, ROLES } from '../../Helpers/helper'
import { PuffLoader } from 'react-spinners';

const RoleForms = (props) => {

  /**declaraciones de variables e inicializaciones de instancias */
  const initialState = {
    variables: {
      description: '',
      status: 1,
      access: ''
    }
  }
  const [state, setState] = useState(initialState)
  const { modalstatus, setModalStatus } = useContext(DataContext)
  const [seguridad, setSeguridad] = useState('')
  const [clientes, setClientes] = useState('')
  const [operaciones, setOperaciones] = useState('')
  const [usuarios, setUsuarios] = useState('')
  const [mineria, setMineria] = useState('')
  const [dataValidate, setDataVerify] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false);
  const { dataidrow } = useContext(DataContext)
  /**onchange correspondiente para validar por su estado */
  const handleClickSeguridad = (data, checked) => { checked === true ? setSeguridad(data) : setSeguridad('') }
  const handleClickMineria = (data, checked) => { checked === true ? setMineria(data) : setMineria('') }
  const handleClickUsuarios = (data, checked) => { checked === true ? setUsuarios(data) : setUsuarios('') }
  const handleClickClientes = (data, checked) => { checked === true ? setClientes(data) : setClientes('') }
  const handleClickOperaciones = (data, checked) => { checked === true ? setOperaciones(data) : setOperaciones('') }
  const [NewDesc, setNewDesc] = useState('')
  const [accessToModify, setAccessToModify] = useState('')

  /**onchange para setear descipcion */
  const handleChange = (e) => {

    setState(prevState => {
      const updatedValues = {
        ...prevState,
        variables: {
          ...prevState.variables,
          [e.target.name]: e.target.value,
        }
      }
      return { ...updatedValues };
    });
  }

  const handleChangeEdit = (e) => {
    setNewDesc(e.target.value)
  }

  useEffect(() => {
    if (props.modalType === "Edit") {
      /** Obtenemos los valores que guardamos en el token para poder utilizarlos
              * en la siguiente consulta
             */
      const token = localStorage.getItem("token") ? localStorage.getItem("token") : ''
      const id_role = dataidrow ? dataidrow : ''

      const getDataRole = async () => {
        const rolesOptions = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            'token': token
          },
        }
        try {
          const res = await fetch(ROLEID + id_role, rolesOptions),
            json = await res.json();
          setIsLoaded(true)
          setNewDesc(json[0]?.description)
          setAccessToModify(json[0]?.access)

        } catch (error) {
          console.log(error.msg);
        }
      }
      getDataRole()
    }

  }, [])


  console.log(accessToModify);

  const accessTo = accessToModify ? JSON.parse("[" + accessToModify + "]") : ''

  console.log(accessTo);

  /**filtramos y guardamos los accesos de los roles */
  const newClientes = accessTo ? accessTo?.filter((item) => { return item?.title?.includes("CLIENTES") }) : ''
  const newSeguridad = accessTo ? accessTo?.filter((item) => { return item?.title?.includes("SEGURIDAD") }) : ''
  const newUsuarios = accessTo ? accessTo?.filter((item) => { return item?.title?.includes("USUARIOS") }) : ''
  const newMineria = accessTo ? accessTo?.filter((item) => { return item?.title?.includes("MINERIA") }) : ''
  const newOperaciones = accessTo ? accessTo?.filter((item) => { return item?.title?.includes("OPERACIONES") }) : ''

  /**envio correspondiente a recurso para insertar  */
  const handleSubmit = async (e) => {
    e.preventDefault()

    /** Obtenemos los valores que guardamos en el token para poder utilizarlos
         * en la siguiente consulta
        */
    const token = localStorage.getItem("token") ? localStorage.getItem("token") : ''

    if (props.modalType === "Add") {
      const createRol = {
        description: state.variables.description,
        status: Number(state.variables.status),
        access: `${seguridad ? seguridad + "," : ''} ${clientes ? clientes + "," : ''} ${operaciones ? operaciones + "," : ''} ${usuarios ? usuarios + "," : ''} ${mineria ? mineria : ''}`
      }

      const rolesOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'token': token
        },
        body: JSON.stringify(createRol)
      }

      try {
        const res = await fetch(ROLES, rolesOptions),
          json = await res.json();
        setDataVerify(true)
      } catch (error) {
        console.log(error.msg);
      }
    }

    if (props.modalType === "Edit") {

      const id_role = dataidrow ? dataidrow : ''

      const toUp = {
        description: NewDesc
      }

      const rolesOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          'token': token
        },
        body: JSON.stringify(toUp)
      }

      try {
        const res = await fetch(ROLES + id_role, rolesOptions),
          json = await res.json();
        setDataVerify(true)
      } catch (error) {
        console.log(error.msg);
      }
    }

  }

  /**consulta correspondiente a eliminacion de rol */
  const handleSubmitDelete = async (e) => {
    e.preventDefault()

    /** Obtenemos los valores que guardamos en el token para poder utilizarlos
        * en la siguiente consulta
       */
    const token = localStorage.getItem("token") ? localStorage.getItem("token") : ''
    const toUp = {
      status: 0
    }
    const id_role = dataidrow ? dataidrow : ''

    const rolesOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        'token': token
      },
      body: JSON.stringify(toUp)
    }

    try {
      const res = await fetch(ROLES + id_role, rolesOptions),
        json = await res.json();
      setDataVerify(true)
    } catch (error) {
      console.log(error.msg);
    }
  }

  const editMode = async (e) => {

  }

  if (props.modalType === "Add") {
    return (
      <Container>
        <Row md>
          {dataValidate === true ?
            <div className='dataIsOk'>
              <Row className='dataIsOkContent'>
                <ion-icon name="checkmark-circle-outline"></ion-icon>
                <span>Rol creado exitosamente</span>
              </Row>
              <Row id='close'>
                <Button className='btn closeBtn' onClick={() => setModalStatus(false)}>Cerrar</Button>
              </Row>
            </div>
            :
            <Form onSubmit={handleSubmit}>
              <FloatingLabel className="tkt" controlId="floatingInputGrid" label="Agregar nombre al rol">
                <Form.Control type="text" name="description" placeholder="description" onChange={handleChange} />
              </FloatingLabel>
              <div className='addper'>
                <label className='mt-3 mb-2'>Asignar permisos a rol:</label>
                <Form.Check
                  className='my-3'
                  type='switch'
                  label='OPERACIONES'
                  id='OPERACIONES'
                  name='OPERACIONES'
                  value='{"title":"OPERACIONES"}'
                  defaultChecked={false}
                  onClick={(e) => { handleClickOperaciones(e.target.value, e.target.checked) }}
                />
                <Form.Check
                  className='my-3'
                  type='switch'
                  label='CLIENTES'
                  id='CLIENTES'
                  name='CLIENTES'
                  value='{"title":"CLIENTES"}'
                  defaultChecked={false}
                  onClick={(e) => { handleClickClientes(e.target.value, e.target.checked) }}
                />
                <Form.Check
                  className='my-3'
                  type='switch'
                  label='USUARIOS'
                  id='USUARIOS'
                  name='USUARIOS'
                  value='{"title":"USUARIOS"}'
                  defaultChecked={false}
                  onClick={(e) => { handleClickUsuarios(e.target.value, e.target.checked) }}
                />
                <Form.Check
                  className='my-3'
                  type='switch'
                  label='MINERIA'
                  id='MINERIA'
                  name='MINERIA'
                  defaultChecked={false}
                  value='{"title":"MINERIA"}'
                  onClick={(e) => { handleClickMineria(e.target.value, e.target.checked) }}
                />
                <Form.Check
                  className='my-3'
                  type='switch'
                  label='SEGURIDAD'
                  id='SEGURIDAD'
                  name='SEGURIDAD'
                  value='{"title":"SEGURIDAD"}'
                  defaultChecked={false}
                  onClick={(e) => { handleClickSeguridad(e.target.value, e.target.checked) }}
                />
              </div>
              <Row className='addusr mt-3'>
                <Col id='create'>
                  <Button type="submit">Crear rol</Button>
                </Col>
                <Col id='closeone' className='closee'>
                  <Button onClick={() => setModalStatus(false)}>Cerrar</Button>
                </Col>
              </Row>
            </Form>
          }
        </Row>

      </Container>
    )
  }

  if (props.modalType === "Edit") {
    return (
      <Container>
        <Row md>
          {dataValidate === true ?
            <div className='dataIsOk'>
              <Row className='dataIsOkContent'>
                <ion-icon name="checkmark-circle-outline"></ion-icon>
                <span>Rol modificado exitosamente</span>
              </Row>
              <Row id='close'>
                <Button className='btn closeBtn' onClick={() => setModalStatus(false)}>Cerrar</Button>
              </Row>
            </div>
            :
            <Form onSubmit={handleSubmit}>
              {
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
                  <>

                    <FloatingLabel className="tkt" controlId="floatingInputGrid" label="Agregar nombre al rol">
                      <Form.Control type="text" name="description" value={NewDesc} placeholder="description" onChange={handleChangeEdit} />
                    </FloatingLabel>
                    <div className='addper'>
                      <label className='mt-3 mb-2'>Modificar permisos a rol:</label>
                      <Form.Check
                        className='my-3'
                        type='switch'
                        label='OPERACIONES'
                        id='OPERACIONES'
                        name='OPERACIONES'
                        value='{"title":"OPERACIONES"}'
                        defaultChecked={false}
                        onClick={(e) => { handleClickOperaciones(e.target.value, e.target.checked) }}
                      />
                      <Form.Check
                        className='my-3'
                        type='switch'
                        label='CLIENTES'
                        id='CLIENTES'
                        name='CLIENTES'
                        value='{"title":"CLIENTES"}'
                        defaultChecked={false}
                        onClick={(e) => { handleClickClientes(e.target.value, e.target.checked) }}
                      />
                      <Form.Check
                        className='my-3'
                        type='switch'
                        label='USUARIOS'
                        id='USUARIOS'
                        name='USUARIOS'
                        value='{"title":"USUARIOS"}'
                        defaultChecked={false}
                        onClick={(e) => { handleClickUsuarios(e.target.value, e.target.checked) }}
                      />
                      <Form.Check
                        className='my-3'
                        type='switch'
                        label='MINERIA'
                        id='MINERIA'
                        name='MINERIA'
                        defaultChecked={false}
                        value='{"title":"MINERIA"}'
                        onClick={(e) => { handleClickMineria(e.target.value, e.target.checked) }}
                      />
                      <Form.Check
                        className='my-3'
                        type='switch'
                        label='SEGURIDAD'
                        id='SEGURIDAD'
                        name='SEGURIDAD'
                        value='{"title":"SEGURIDAD"}'
                        defaultChecked={false}
                        onClick={(e) => { handleClickSeguridad(e.target.value, e.target.checked) }}
                      />
                    </div>
                    <Row className='addusr mt-3'>
                      <Col id='create'>
                        <Button type="submit">Crear rol</Button>
                      </Col>
                      <Col id='closeone' className='closee'>
                        <Button onClick={() => setModalStatus(false)}>Cerrar</Button>
                      </Col>
                    </Row>
                  </>
              }

            </Form>
          }
        </Row>

      </Container>
    )
  }

  if (props.modalType === "Delete") {
    return (
      <>{dataValidate === true ?
        <div className='dataIsOk'>
          <Row className='dataIsOkContent'>
            <ion-icon name="checkmark-circle-outline"></ion-icon>
            <span>Rol eliminado exitosamente</span>
          </Row>
          <Row id='close'>
            <Button className='btn closeBtn' onClick={() => setModalStatus(false)}>Cerrar</Button>
          </Row>
        </div> :
        <Form onSubmit={handleSubmitDelete}>
          <div className='dataIsOk'>
            <Row className='dataIsOkContent'>
              <ion-icon name="checkmark-circle-outline"></ion-icon>
              <span>¿Estas seguro de eliminar este rol?</span>
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

export default RoleForms