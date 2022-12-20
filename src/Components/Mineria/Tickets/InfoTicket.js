import React, { Fragment, useContext, useEffect, useState } from 'react'
import { Button, Col, FloatingLabel, Form, Row } from 'react-bootstrap';
import { DataContext } from '../../Commons/Context/DataContext';
import { MINING_MACHINES, TICKETS } from '../../Helpers/helper';
import SelectMachine from '../Forms/SelectMachine';

const InfoTicket = (props) => {

    const { user } = useContext(DataContext)
    const userAuthed = user
    const { data } = props
    const id_machine_temp = props?.data?.id_machine
    const isChangeStatus = data?.status
    const actualHistorial = data?.ticket_historial
    const document = data ? data.document : ''

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
    const [dataMining, setDataMining] = useState([])
    const timesToManteniance = Number(data?.historialMantenience)

    useEffect(() => {
        setState(initialState)

        const token = localStorage.getItem("token") ? localStorage.getItem("token") : ''

        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'token': token
            }
        }

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

        const toUpHistoryMachine = {
            historilal_id: Math.random().toString(36).slice(-8),
            historial_action: 'Se cambio de minero ID: ' + id_machine_temp + ' a ID: ' + state.variables.id_machine,
            id_user: userAuthed?.id_user,
            userdata: userAuthed ? userAuthed.name + " " + userAuthed.last_name : '',
            historial_date: new Date(),
        }

        const nameUpdate = {
            historilal_id: Math.random().toString(36).slice(-8),
            historial_action: 'Se cambio el nombre del ticket a: ' + state.variables.ticket_name,
            id_user: userAuthed?.id_user,
            userdata: userAuthed ? userAuthed.name + " " + userAuthed.last_name : '',
            historial_date: new Date(),
        }

        const descriptionUpdate = {
            historilal_id: Math.random().toString(36).slice(-8),
            historial_action: 'Se cambio la descripcion del ticket',
            id_user: userAuthed?.id_user,
            userdata: userAuthed ? userAuthed.name + " " + userAuthed.last_name : '',
            historial_date: new Date(),
        }

        const verifyHistorial = () => {

            if (isChangeStatus !== state.variables.status) {
                return JSON.stringify(toUpHistory) + "," + actualHistorial
            }

            if (id_machine_temp !== state.variables.id_machine) {
                return JSON.stringify(toUpHistoryMachine) + "," + actualHistorial
            }

            if (isChangeStatus === state.variables.status && id_machine_temp === state.variables.id_machine && state.variables.ticket_name === data?.ticket_name && state.variables.description_ticket === data?.description_ticket) {
                return actualHistorial
            }

            if (state.variables.ticket_name !== data?.ticket_name) {
                return JSON.stringify(nameUpdate) + "," + actualHistorial
            }

            if (state.variables.description_ticket !== data?.description_ticket) {
                return JSON.stringify(descriptionUpdate) + "," + actualHistorial
            }

        }

        const ticketToUp = {
            id_machine: Number(state.variables.id_machine),
            id_user: state.variables.id_user,
            description_ticket: state.variables.description_ticket,
            status: state.variables.status,
            ticket_comments: null,
            priority: state.variables.priority,
            ticket_name: state.variables.ticket_name,
            asigned_to: state.variables.asigned_to ? Number(state.variables.asigned_to) : '',
            ticket_historial: verifyHistorial(),
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
                // window.location.reload()
            } catch (error) {
                console.log(error.msg);
            }
        }

        const editarMaquinaNuevo = async () => {
            const id_machine = Number(state.variables.id_machine)
            console.log(" CAMBIO DE ESTADO A MAQUINA NUEVA. + " + id_machine + " A ESTADO 3");
            console.log(id_machine);

            const options = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    'token': token
                },
                body: JSON.stringify({ status: 3 })
            }
            try {
                const res = await fetch(MINING_MACHINES + "mantenience/" + id_machine, options),
                    json = await res.json();
            } catch (error) {
                console.log(error.msg);
            }
        }

        const editarMaquinaVieja = async () => {

            const id_machine = Number(id_machine_temp)
            console.log(" CAMBIO DE ESTADO A MAQUINA VIEJA. + " + id_machine_temp + " A ESTADO 0");
            console.log(id_machine);
            const toEDit = {
                status: 0
            }
            const options = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    'token': token
                },
                body: JSON.stringify(toEDit)
            }
            try {
                const res = await fetch(MINING_MACHINES + id_machine_temp, options),
                    json = await res.json();
            } catch (error) {
                console.log(error.msg);
            }

        }

        if (id_machine_temp !== state.variables.id_machine) {
            editarMaquinaVieja()
            editarMaquinaNuevo()
        }

        editTciket()

        // window.location.reload()

    }

    /**filtra el listado de maquinas minando por el id de la maquina */
    const filterDataMining = dataMining.filter((item) => item.document.includes(document))


    /**parsear string y eliminar llaves y parentesis */
    const parseData = (data, dataId) => {
        const parseData = JSON.parse(data)
        return dataId + " - " + parseData[0]?.name
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
                                    <Form.Control className={edtitable === true ? 'txttt' : 'no-borders'} as="textarea" name="description_ticket" onChange={handleChange}
                                        style={{ "min-height": '100px', "height": "auto" }}
                                        value={state.variables.description_ticket}
                                        disabled={edtitable === true ? false : true}
                                    />
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
                                        <Form.Select aria-label="Maquina" name="id_machine" onChange={handleChange} value={(state.variables.id_machine)} >
                                            {
                                                Object.keys(filterDataMining).map((item, index) => {
                                                    return (
                                                        <option key={index} value={filterDataMining[item].id_machine}>
                                                            {parseData(filterDataMining[item].machinedata, filterDataMining[item].id_machine)}
                                                        </option>
                                                    )
                                                })
                                            }
                                        </Form.Select>
                                    </FloatingLabel>
                                </Row>
                                <Row md className="mt-2">
                                    <FloatingLabel className="tkt" controlId="floatingInputGrid" label="Estado">
                                        <Form.Select aria-label="Seleccionar estado" name="status" onChange={handleChange} value={state.variables.status}
                                            disabled={data.status === "CLOSED" || data.status === "DESESTIMATED" ? true : false}
                                            className={data?.status === "CLOSED" ? 'cerradooo' : ''}
                                        >
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
                                <Row className='mt-3'>
                                    <Col className='box-diff'>
                                        <div className='tdfe'>
                                            Maquina con "{timesToManteniance}" veces en Mantenimiento
                                        </div>
                                    </Col>
                                </Row>
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