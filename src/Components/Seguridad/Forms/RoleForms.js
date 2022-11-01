import React, { useContext } from 'react'
import { useState } from 'react'
import { Button, Col, Container, FloatingLabel, Form, Row } from 'react-bootstrap'
import { DataContext } from '../../Commons/Context/DataContext'
import { ROLES } from '../../Helpers/helper'

const RoleForms = (props) => {

  const initialState = {
    variables: {
      description: '',
      status: 1
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


  const handleSubmit = async (e) => {
    e.preventDefault()

    /** Obtenemos los valores que guardamos en el token para poder utilizarlos
         * en la siguiente consulta
        */
    const token = localStorage.getItem("token") ? localStorage.getItem("token") : ''

    // const access = (seguridad, clientes, operaciones, usuarios, mineria)

    const createRol = {
      description: state.variables.description,
      status: Number(state.variables.status),
      access: (seguridad, clientes, operaciones, usuarios, mineria)
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

  console.log(state);

  return (
    <Container>
      <Row md>
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
              onChange={(e) => setOperaciones(e.target.value)}
            />
            <Form.Check
              className='my-3'
              type='switch'
              label='CLIENTES'
              id='CLIENTES'
              name='CLIENTES'
              value='{"title":"CLIENTES"}'
              onChange={(e) => setClientes(e.target.value)}
            />
            <Form.Check
              className='my-3'
              type='switch'
              label='USUARIOS'
              id='USUARIOS'
              name='USUARIOS'
              value='{"title":"USUARIOS"}'
              onChange={(e) => setUsuarios(e.target.value)}
            />
            <Form.Check
              className='my-3'
              type='switch'
              label='MINERIA'
              id='MINERIA'
              name='MINERIA'
              value='{"title":"MINERIA"}'
              onChange={(e) => setMineria(e.target.value)}
            />
            <Form.Check
              className='my-3'
              type='switch'
              label='SEGURIDAD'
              id='SEGURIDAD'
              name='SEGURIDAD'
              value='{"title":"SEGURIDAD"}'
              onChange={(e) => setSeguridad(e.target.value)}
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
      </Row>

    </Container>
  )
}

export default RoleForms