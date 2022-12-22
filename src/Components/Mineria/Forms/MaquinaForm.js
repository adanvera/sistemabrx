import React, { useContext, useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { DataContext } from '../../Commons/Context/DataContext'
import { MACHINES, MACHINES_API } from '../../Helpers/helper'

function MaquinaForm() {

    const [externalData, setExternalData] = useState([])
    const { modalstatus, setModalStatus } = useContext(DataContext)


    const initialState = {
        id: "",
        name: "",
        url: "",
        type: "",
        brand: "",
        algorithms: "",
        specs: ""
    }

    const [state, setState] = useState(initialState)


    console.log();

    useEffect(() => {
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

    }, [])


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

    const handleSubmit = (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token')
        const dataToAdd = externalData.filter((item) => item.id === state.id)

        const AddMachine = {
            id: state.id,
            name: dataToAdd ? dataToAdd[0].name : state.name,
            url: dataToAdd ? dataToAdd[0].url : state.url,
            type: dataToAdd ? dataToAdd[0].type : state.type,
            brand: dataToAdd ? dataToAdd[0].brand : state.brand,
            algorithms: dataToAdd ? JSON.stringify(dataToAdd[0].algorithms) : state.algorithms,
            specs: dataToAdd ? JSON.stringify(dataToAdd[0].specs) : state.specs,
        }

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                token: token
            },
            body: JSON.stringify(AddMachine)
        }

        const AddMachineToDB = async () => {
            try {
                if (state.id) {
                    const res = await fetch(MACHINES, options),
                        json = await res.json()
                    console.log(json);
                }
            } catch (error) {
                console.log(error);
            }
        }
        AddMachineToDB()

    }

    return (
        <>
            <Container>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Form.Group as={Col} md="12" controlId="id">
                            <Form.Label>Seleccionar maquina:</Form.Label>
                            <Form.Select value={state.id} name="id" onChange={handleChange} >
                                <option selected disabled>Seleccionar maquina</option>
                                {
                                    Object.keys(externalData).map((item) => {
                                        return <option value={externalData[item]?.id} >{externalData[item].name + " " + externalData[item].brand} </option>
                                    })
                                }
                            </Form.Select>
                        </Form.Group>
                    </Row>
                    <Row className='addusr' >
                        <Col id='create'>
                            <Button type="submit">Agregar maquina</Button>
                        </Col>
                        <Col id='closeone' className='closee'>
                            <Button onClick={() => setModalStatus(false)}>Cerrar</Button>
                        </Col>
                    </Row>
                </Form>
            </Container>
        </>
    )
}

export default MaquinaForm
