import { useContext, useEffect, useState } from "react"
import { Button, Col, Container, FloatingLabel, Form, Row } from "react-bootstrap"
import { DataContext } from "../../Commons/Context/DataContext"
import { GET_MACHINES, TICKETS } from "../../Helpers/helper"
import SelectMachine from "./SelectMachine"

const TicketForm = (props) => {

    const { modalstatus, setModalStatus } = useContext(DataContext)
    const { user } = useContext(DataContext)
    const userAuthed = user
    const [dataValidate, setDataVerify] = useState(false)


    const initialState = {
        variables: {
            id_machine: '',
            id_user: userAuthed ? userAuthed.id_user : '',
            description_ticket: '',
            status: '',
            ticket_comments: '',
            priority: 'NORMAL',
            ticket_name: '',
        },
    }

    const [state, setState] = useState(initialState)


    const handleSubmit = async (e) => {
        e.preventDefault()

        /** Obtenemos los valores que guardamos en el token para poder utilizarlos
         * en la siguiente consulta
        */
        const token = localStorage.getItem("token") ? localStorage.getItem("token") : ''

        const createTicket = {
            id_machine: Number(state.variables.id_machine) ? Number(state.variables.id_machine) : '',
            id_user: userAuthed ? userAuthed.id_user : '',
            description_ticket: state.variables.description_ticket,
            status: state.variables.status,
            ticket_comments: state.variables.ticket_comments,
            priority: state.variables.priority,
            ticket_name: state.variables.ticket_name,
        }

        /**mandamos el header de nuestra consulta */
        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'token': token
            }, body: JSON.stringify(createTicket)
        }

        try {
            const res = await fetch(TICKETS, options),
                json = await res.json()
            setDataVerify(true)
        } catch (error) { console.log(error); }

        console.log(state.variables);
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

    return (
        <Container>
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
                <Row className="mt-2">
                    <FloatingLabel className="tkt"
                        controlId="floatingSelectGrid"
                        label="Seleccionar maquina"
                    >
                        <Form.Select aria-label="Seleccionar maquina" name="id_machine" onChange={handleChange} value={Number(state.variables.id_machine)}>
                            <SelectMachine defaultValue={state?.id_machine} />
                        </Form.Select>
                    </FloatingLabel>
                </Row>
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
                    <FloatingLabel className="tkt" controlId="floatingInputGrid" label="Estado">
                        <Form.Select aria-label="Seleccionar estado" name="status" onChange={handleChange} value={state.variables.status} >
                            <option value="PENDING">PENDIENTE</option>
                            <option value="INPROGRESS">EN PROGRESO</option>
                            <option value="ONHOLD">DETENIDO</option>
                            <option value="RMA">RMA</option>
                            <option value="CLOSED">CERRADA</option>
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
        </Container>
    )
}

export default TicketForm