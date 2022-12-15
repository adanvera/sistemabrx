import React, { Fragment, useContext, useEffect, useState } from 'react'
import { Button, Col, FloatingLabel, Form, Row } from 'react-bootstrap';
import { DataContext } from '../../Commons/Context/DataContext';
import { TICKETS } from '../../Helpers/helper';
import SelectMachine from '../Forms/SelectMachine';

const InfoTicket = (props) => {

    const { user } = useContext(DataContext)
    const userAuthed = user

    const { data } = props

    const isChangeStatus = data?.status
    const actualHistorial = data?.ticket_historial

    const initialState = {
        variables: {
            id_user: userAuthed ? userAuthed.id_user : '',
            description_ticket: data ? data?.description_ticket : '',
            status: data ? data?.status : 'PENDING',
            ticket_comments: data ? data?.ticket_comments : '',
            priority: data ? data?.priority : 'NORMAL',
            ticket_name: data ? data?.ticket_name : '',
            asigned_to: data ? data?.asigned_to : '',
            id_machine: data ? data?.id_machine : '',
            id_ticket: data ? data?.id_ticket : '',
            new_historial: '',
            historial_date: new Date(),
            actualHistorial: data ? data?.ticket_historial : '',
        }
    }

    const [state, setState] = useState(initialState)

    useEffect(() => {
        setState(initialState)
    }, [data])

    const [userData, setUserData] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [edtitable, setEditable] = useState(false)
    const [changed, setChanged] = useState(false)

    const handleChange = (e) => {

        setState(prevState => {
            const updatedValues = {
                ...prevState,
                variables: {
                    ...prevState.variables,
                    [e.target.name]: e.target.value,
                }
            }
            setChanged(true)
            return { ...updatedValues };
        });
    }

    const handleSubmitEdit = (e) => {
        e.preventDefault()

        /**obtenemos el token */
        const token = localStorage.getItem("token") ? localStorage.getItem("token") : ''
        const id_ticket = props?.data?.id_ticket

        const toUpHistory = {
            historilal_id: Math.random().toString(36).slice(-8),
            historial_action: 'Se cambio a estado ' + state.variables.status,
            id_user: userAuthed?.id_user,
            userdata: userAuthed ? userAuthed.name + " " + userAuthed.last_name : '',
            historial_date: new Date(),
        }

        const historialToSend = isChangeStatus !== state.variables.status ? JSON.stringify(toUpHistory) + "," + actualHistorial : actualHistorial

        const ticketToUp = {
            id_machine: Number(state.variables.id_machine),
            id_user: state.variables.id_user,
            description_ticket: state.variables.description_ticket,
            status: state.variables.status,
            ticket_comments: null,
            priority: state.variables.priority,
            ticket_name: state.variables.ticket_name,
            asigned_to: state.variables.asigned_to ? Number(state.variables.asigned_to) : '',
            ticket_historial: historialToSend,
            ticket_comments: state.variables.ticket_comments,
        }

        const editTciket = async () => {
            const options = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    'token': token
                },
                body: JSON.stringify(ticketToUp)
            }

            try {
                const res = await fetch(TICKETS + id_ticket, options),
                    json = await res.json();
                window.location.reload()
            } catch (error) {
                console.log(error.msg);
            }
        }

        editTciket()

    }

    return (
        <div className='d-flex'>
            {data &&
                <Form onSubmit={handleSubmitEdit} id="editticket">
                    <Col className='mb-3' md={12}>
                        <Row className='mt-3'>
                            <Col>
                                <Row className='lbltkt'>Descripción</Row>
                                <Row className="mt-2" onClick={() => setEditable(true)} >
                                    <FloatingLabel className="" controlId="floatingInputGrid">
                                        <Form.Control className={edtitable === true ? 'txttt' : 'no-borders'} as="textarea" name="description_ticket" onChange={handleChange}
                                            style={{ height: '100px' }}
                                            value={state.variables.description_ticket}
                                            disabled={edtitable === true ? false : true}
                                        />
                                    </FloatingLabel>
                                </Row>
                                <Row className='mt-3 '>
                                    <FloatingLabel className="tkt" controlId="floatingInputGrid" label="Nombre del ticket">
                                        <Form.Control type="text" name="ticket_name" placeholder="Nombre" value={state.variables.ticket_name} onChange={handleChange} />
                                    </FloatingLabel>
                                </Row>
                                <Row className="mt-3">
                                    <FloatingLabel className="tkt"
                                        controlId="floatingSelectGrid"
                                        label="Maquina"
                                    >
                                        <Form.Select aria-label="Maquina" name="id_machine" onChange={handleChange} value={(state.variables.id_machine)}>
                                            <SelectMachine defaultValue={state?.id_machine} />
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
                                            <option value="DESESTIMATED">DESESTIMADA</option>
                                        </Form.Select>
                                    </FloatingLabel>
                                </Row>
                            </Col>
                            <Col>
                                <Col>
                                    <div className='datashow'>
                                        <label className='labeltk' >Asignado a</label>
                                        <input className='inputshow asgined' value={data.assigned_to} disabled />
                                    </div>
                                </Col>
                                <Col>
                                    <div className='datashow'>
                                        <label className='labeltk' >Creado el </label>
                                        <input className='inputshow' value={data.created_at} disabled />
                                    </div>
                                </Col>
                                <Col>
                                    <div className='datashow'>
                                        <label className='labeltk' >Creado por</label>
                                        <input className='inputshow' value={data.id_user} disabled />
                                    </div>
                                </Col>
                                <Col>
                                    <div className='datashow'>
                                        <label className='labeltk' >Actualizado el </label>
                                        <input className='inputshow' value={data.updated_at} disabled />
                                    </div>
                                </Col>
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

                    </Col>
                </Form>
            }
        </div>

    )
}

export default InfoTicket