import { useContext, useEffect, useState } from "react"
import { Button, Col, Container, FloatingLabel, Form, Row } from "react-bootstrap"
import { DataContext } from "../../Commons/Context/DataContext"
import { CLIENT, MINING_MACHINES, TICKETS, USER } from "../../Helpers/helper"
import SelectMachine from "../Forms/SelectMachine"

const TicketForm = (props) => {

    const { modalstatus, setModalStatus } = useContext(DataContext)
    const { user } = useContext(DataContext)
    const userAuthed = user
    const [dataValidate, setDataVerify] = useState(false)
    const [dataList, setDataList] = useState('')

    const initialState = {
        variables: {
            id_machine: '',
            id_user: userAuthed ? userAuthed.id_user : '',
            description_ticket: '',
            status: 'PENDING',
            ticket_comments: '',
            priority: 'NORMAL',
            ticket_name: '',
            assigned_to: '',
            historilal_id: Math.random().toString(36).slice(-8),
            historial_action: '',
            historial_date: new Date(),
            userdata: userAuthed ? userAuthed.name + " " + userAuthed.last_name : '',
        }
    }

    const [state, setState] = useState(initialState)
    const [dataMining, setDataMining] = useState([])
    const [dataClient, setDataClient] = useState([])
    const [documento, setDocumento] = useState('')

    useEffect(() => {
        /** Obtenemos los valores que guardamos en el token para poder utilizarlos
         * en la siguiente consulta
        */
        const token = localStorage.getItem("token") ? localStorage.getItem("token") : ''

        /**mandamos el header de nuestra consulta */
        const options = {
            method: 'GET',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'token': token
            },
        }

        const getUsers = async () => {
            try {
                const res = await fetch(USER, options),
                    json = await res.json()
                setDataList(json);
            } catch (error) {
                console.log(error);
            }
        }

        getUsers()


        const getClient = async () => {
            const options = {
                method: 'GET',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'token': token
                },
            }

            try {
                const res = await fetch(CLIENT, options),
                    json = await res.json()
                /**seteamos loading */
                console.log(json);
                /**seteamos el listado de tickets */
                setDataClient(json);
            } catch (error) {
                console.log("Esto es el error" + error);
            }
        }

        getClient()

        const getMiningMachines = async () => {

            const options = {
                method: 'GET',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'token': token
                },
            }

            try {
                const res = await fetch(MINING_MACHINES, options),
                    json = await res.json()
                /**seteamos el listado de tickets */
                setDataMining(json);
            } catch (error) {
                console.log(error);
            }
        }

        getMiningMachines()

    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        /**obtenemos el token */
        const token = localStorage.getItem("token") ? localStorage.getItem("token") : ''

        const historial = JSON.stringify({
            historilal_id: Math.random().toString(36).slice(-8),
            historial_action: 'Ticket creado',
            historial_date: new Date(),
            userdata: userAuthed ? userAuthed.name + " " + userAuthed.last_name : '',
            id_user: state.variables.id_user,
        })

        const createTicket = {
            id_machine: Number(state.variables.id_machine),
            id_user: state.variables.id_user,
            description_ticket: state.variables.description_ticket,
            status: state.variables.status,
            ticket_comments: null,
            priority: state.variables.priority,
            ticket_name: state.variables.ticket_name,
            assigned_to: Number(state.variables.assigned_to),
            ticket_historial: historial,
        }

        const ticketOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'token': token
            },
            body: JSON.stringify(createTicket)
        }

        try {
            const res = await fetch(TICKETS, ticketOptions),
                json = await res.json();
            setDataVerify(true)
        } catch (error) {
            console.log(error.msg);
        }

    }

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

    /**guardamos nombre del cliente para posteriormente usar */
    const handleChangeDocumento = (e) => {
        setDocumento(e.target.value)
    }

    /**filtra el listado de maquinas minando por el nombre del cliente */
    const filterDataMining = dataMining.filter((item) => item.name.includes(documento))

    return (
        <Container>
            {dataValidate === true ?
                <div className='dataIsOk'>
                    <Row className='dataIsOkContent'>
                        <ion-icon name="checkmark-circle-outline"></ion-icon>
                        <span>Ticket creado exitosamente</span>
                    </Row>
                    <Row id='close'>
                        <Button className='btn closeBtn' onClick={() => setModalStatus(false)}>Cerrar</Button>
                    </Row>
                </div>
                :
                <Form onSubmit={handleSubmit}>
                    <Row md>
                        <FloatingLabel className="tkt" controlId="floatingInputGrid" label="Agregar nombre para el ticket ">
                            <Form.Control type="text" name="ticket_name" placeholder="Nombre" onChange={handleChange} />
                        </FloatingLabel>
                    </Row>
                    <Row className="mt-2">
                        <FloatingLabel className="tkt" controlId="floatingInputGrid" label="Descripción breve">
                            <Form.Control as="textarea" name="description_ticket" onChange={handleChange}
                                placeholder="Deja una breve descripcion"
                                style={{ height: '100px' }} />
                        </FloatingLabel>
                    </Row>
                    <Row md className="mt-2">
                        <FloatingLabel className="tkt" controlId="documento" label="Seleccionar cliente">
                            <Form.Select aria-label="Seleccionar cliente" name="documento" onChange={handleChangeDocumento} value={documento} >
                                <option value="" selected disabled>Seleccionar cliente</option>
                                {
                                    Object.keys(dataClient).map((item => {
                                        return <option value={dataClient[item]?.name + " " + dataClient[item]?.last_name}>{dataClient[item]?.name + " " + dataClient[item]?.last_name}</option>
                                    }))
                                }
                            </Form.Select>
                        </FloatingLabel>
                    </Row>
                    {
                        documento &&
                        <Row className="mt-2">
                            <FloatingLabel className="tkt"
                                controlId="floatingSelectGrid"
                                label="Seleccionar maquina"
                            >
                                <Form.Select aria-label="Seleccionar maquina" name="id_machine" onChange={handleChange} value={(state.variables.id_machine)}>
                                    <option selected disabled>Seleccionar</option>

                                    {
                                        Object.keys(filterDataMining).map((key, index) => {
                                            return (
                                                <option key={index} value={filterDataMining[key].id_machine}>{filterDataMining[key].machine_name}</option>
                                            )
                                        })
                                    }
                                </Form.Select>
                            </FloatingLabel>
                        </Row>
                    }
                    {
                        documento === '' &&
                        <Row className="mt-2">
                            <FloatingLabel className="tkt"
                                controlId="floatingSelectGrid"
                                label="Seleccionar maquina"
                            >
                                <Form.Select aria-label="Seleccionar maquina" name="id_machine" disabled onChange={handleChange} value={(state.variables.id_machine)}>
                                    {
                                        Object.keys(dataMining).map((key, index) => {
                                            return (
                                                <option selected disabled>Seleccionar</option>
                                            )
                                        })
                                    }
                                </Form.Select>
                            </FloatingLabel>
                        </Row>
                    }
                    <Row md className="mt-2">
                        <FloatingLabel className="tkt" controlId="floatingInputGrid" label="Prioridad">
                            <Form.Select aria-label="Seleccionar prioridad" name="priority" onChange={handleChange} value={state.variables.priority} >
                                <option value="HIGHEST">MUY ALTA</option>
                                <option value="HIGH">ALTA</option>
                                <option value="NORMAL">NORMAL</option>
                                <option value="LOW">BAJA</option>
                                <option value="LOWEST">MUY BAJA</option>
                            </Form.Select>
                        </FloatingLabel>
                    </Row>

                    <Row md className="mt-2">
                        <FloatingLabel className="tkt" controlId="assigned_to" label="Asginar a">
                            <Form.Select aria-label="Asignar ticket" name="assigned_to" onChange={handleChange} value={state.variables.assigned_to} >
                                <option value="" selected disabled>Seleccionar</option>
                                {
                                    Object.keys(dataList).map((item => {
                                        return <option value={dataList[item]?.id_user}>{dataList[item]?.name + " " + dataList[item]?.last_name}</option>
                                    }))
                                }
                            </Form.Select>
                        </FloatingLabel>
                    </Row>
                    <Row className='addusr mt-3' >
                        <Col id='create'>
                            <Button type="submit">Crear ticket</Button>
                        </Col>
                        <Col id='closeone' className='closee'>
                            <Button onClick={() => setModalStatus(false)} >Cerrar</Button>
                        </Col>
                    </Row>

                </Form>
            }
        </Container>
    )
}

export default TicketForm