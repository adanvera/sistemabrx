import React from 'react'
import { useState } from 'react'
import { Container, FloatingLabel, Form, Row } from 'react-bootstrap'

const RoleForms = (props) => {

  const initialState = {
    variables: {
      description: '',
      access: ''
    }
  }

  const [state, setState] = useState(initialState)

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

  return (
    <Container>
      <Row md>
        <FloatingLabel className="tkt" controlId="floatingInputGrid" label="Agregar nombre al rol">
          <Form.Control type="text" name="description" placeholder="Description" onChange={handleChange} />
        </FloatingLabel>

        <div className='addper'>
          <label className='mt-3 mb-2'>Asignar permisos a rol:</label>
          <Form.Check
            type="switch"
            id="custom-switch"
            label="OPERACIONES"
          />
          <Form.Check
            type="switch"
            id="custom-switch"
            label="CLIENTES"
          />
          <Form.Check
            type="switch"
            id="custom-switch"
            label="MINERIA"
          />
          <Form.Check
            type="switch"
            id="custom-switch"
            label="USUARIOS"
          />
          <Form.Check
            type="switch"
            id="custom-switch"
            label="SEGURIDAD"
          />
        </div>
      </Row>

    </Container>
  )
}

export default RoleForms