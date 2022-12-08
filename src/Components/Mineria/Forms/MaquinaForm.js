import React, { useContext, useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { toast, Toaster } from 'react-hot-toast'
import { DataContext } from '../../Commons/Context/DataContext'
import { MACHINES, MACHINES_API } from '../../Helpers/helper'

const MaquinaForm = (props) => {

    const [externalData, setExternalData] = useState([])
    const { modalstatus, setModalStatus, modalType, dataidrow } = useContext(DataContext)

    const initialState = {
        id: "",
        name: "",
        url: "",
        type: "",
        brand: "",
        algorithms: "",
        specs: ""
    }
    const [loadEnd, setLoadEnd] = useState(false)

    const [state, setState] = useState(initialState)

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
                    toast.success('Maquina agregada exitosamente')
                    setLoadEnd(true)
                }
            } catch (error) {
                toast.error('Error al agregar la maquina')
                console.log(error);
            }
        }
        AddMachineToDB()

    }


    const handleDelete = (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token')
        const id = dataidrow

        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                token: token
            },
        }

        const deteleMachine = async () => {
            try {
                const res = await fetch(MACHINES + id, options),
                    json = await res.json()
                console.log(json);
                toast.success('Maquina eliminada exitosamente')
                setLoadEnd(true)
            } catch (error) {
                toast.error('Error al eliminar la maquina')
                console.log(error);
            }
        }
        deteleMachine()

    }


    function refreshPage() {
        setModalStatus(false)
        setTimeout(() => { }, 600)
        window.location.reload(false);
    }

    if (modalType === "Delete") {
        return (
            <Container>
                <Toaster
                    position="top-right"
                    reverseOrder={false}
                />
                <Form onSubmit={handleDelete}>
                    <Row className='justify-content-center'>
                        <Col className="a-center">
                            {
                                loadEnd === false &&
                                <p>¿Estas seguro de eliminar esta maquina?</p>
                            }
                            {
                                loadEnd === true &&
                                <Row className='dataIsOkContent'>
                                    <ion-icon name="checkmark-circle-outline"></ion-icon>
                                    <span>Maquina eliminada exitosamente</span>
                                </Row>
                            }
                        </Col>
                    </Row>
                    {
                        loadEnd === false &&

                        <Row className='addusr' >
                            <Col id='create'>
                                <Button type="submit">Eliminar maquina</Button>
                            </Col>
                            <Col id='closeone' className='closee'>
                                <Button onClick={() => setModalStatus(false)}>Cancelar</Button>
                            </Col>
                        </Row>
                    }
                    {
                        loadEnd === true &&
                        <Row id='close'>
                            <Button className='btn closeBtn' onClick={() => refreshPage()}>Cerrar</Button>
                        </Row>
                    }

                </Form>
            </Container>
        )
    } else if (modalType !== "Delete") return (
        <>
            <Container>
                <Toaster
                    position="top-right"
                    reverseOrder={false}
                />
                {
                    loadEnd === false &&
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
                }
                {
                    loadEnd === true &&
                    <Row>
                        <div className='dataIsOk'>
                            <Row className='dataIsOkContent'>
                                <ion-icon name="checkmark-circle-outline"></ion-icon>
                                <span>Maquina agregada exitosamente</span>
                            </Row>
                            <Row id='close'>
                                <Button className='btn closeBtn' onClick={() => refreshPage()}>Cerrar</Button>
                            </Row>
                        </div>
                    </Row>
                }
            </Container>
        </>
    )
}

export default MaquinaForm
