import React, { useEffect, useState } from 'react'
import { Button, Col, FloatingLabel, Form, Row } from 'react-bootstrap'
import { CLIENT } from '../Helpers/helper'

const InfoImportación = (props) => {

    const { data } = props
    const [changed, setChanged] = useState(false)
    const [clients, setClients] = useState([])

    const initialState = {
        id_client: data?.id_cliente,
    }

    const [state, setState] = useState(initialState)


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

    }, [state])

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

    console.log();

    return (
        <div >
            {data &&
                <Form onSubmit={handleSubmitEdit} id="editImport">
                    <Row>
                        <Col md={6} className="mt-3">
                            <FloatingLabel className="tkt"
                                controlId="floatingSelectGrid"
                                label="Cliente"
                            >
                                <Form.Select aria-label="id_client" name="id_client" value={(data?.id_cliente)} onChange={handleChange} id="clientimp">
                                    {
                                        Object.keys(clients).map((key, index) => {
                                            return (
                                                <option key={index} value={clients[key].id_client}>{clients[key].name + " " + clients[key].last_name}</option>
                                            )
                                        })
                                    }
                                </Form.Select>
                            </FloatingLabel>
                        </Col>
                        <Col md={6} className="mt-3">

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