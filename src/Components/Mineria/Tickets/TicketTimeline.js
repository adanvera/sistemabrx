import React, { Fragment, useContext } from 'react'
import { useState } from 'react'
import { Button, Col, FloatingLabel, Form, Row } from 'react-bootstrap'
import { DataContext } from '../../Commons/Context/DataContext'
import { formatComments, formatHistorial } from '../../Helpers/formats'
import { TICKETS } from '../../Helpers/helper'

const TicketTimeline = (props) => {

    const comments = formatComments(props?.data)
    const dataToSend = props?.dataToSend
    const { user } = useContext(DataContext)
    const userAuthed = user
    const idTicket = props?.idTicket
    const historial = formatHistorial(props?.historial)

    console.log(historial);

    const initialState = {
        variables: {
            comment: '',
            id_user: userAuthed ? userAuthed.id_user : '',
            userdata: userAuthed ? userAuthed.name + userAuthed.last_name : '',
            comment_at: new Date(),
        }
    }

    const [state, setState] = useState(initialState)
    const [clicked, setClicked] = useState('comments')

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

    const submitComment = async (e) => {
        e.preventDefault()

        const token = localStorage.getItem("token") ? localStorage.getItem("token") : ''

        const toUpTicket = {
            id_comment: Math.random().toString(36).slice(-8),
            comment: state.variables.comment,
            id_user: userAuthed?.id_user,
            userdata: userAuthed ? userAuthed.name + " " + userAuthed.last_name : '',
            comment_at: state.variables.comment_at,
        }

        const commentToSend = dataToSend === null ? JSON.stringify(toUpTicket) : JSON.stringify(toUpTicket) + "," + dataToSend

        const ticketOptions = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                'token': token
            },
            body: JSON.stringify({ ticket_comments: commentToSend })
        }
        try {
            const res = await fetch(TICKETS + idTicket, ticketOptions),
                json = await res.json();
                setState(initialState)
                window.location.reload()
        } catch (error) {
            console.log(error.msg);
        }
        setState(initialState)

    }


    const handleOnClick = (e, btn) => {
        e.preventDefault()

        if (btn === '_ticketcomments') {
            setClicked('comments')
        } else if (btn === '_ticketHistorial') {
            setClicked('historial')
        }

    }

    return (
        <Fragment>
            <div className='tiktop'>
                <Row>
                    <Col className='d-flex'>
                        <div className='d-flex mr-2' onClick={(e) => handleOnClick(e, '_ticketcomments')} >
                            <h6 className='mr-2 tithis'>Comentarios {comments.length} </h6> <ion-icon name="chatbubbles-outline"></ion-icon>
                        </div>
                        <div className='d-flex ml-2 ' onClick={(e) => handleOnClick(e, '_ticketHistorial')}>
                            <h6 className='ml-2 tithis mr-2'>Historial de estado  </h6> <ion-icon name="document-text-outline"></ion-icon>
                        </div>
                    </Col>

                </Row>
                {
                    clicked === 'comments' &&
                    <Form onSubmit={submitComment}>
                        <Row className="mt-2">
                            <FloatingLabel className="tkt" controlId="comment" label="Agregar comentario">
                                <Form.Control as="textarea" name="comment" onChange={handleChange}
                                    placeholder="Deja un comentario"
                                    style={{ height: '70px' }} />
                            </FloatingLabel>
                        </Row>
                        <Row className='mt-3' >
                            <Col>
                                {
                                    state.variables.comment &&
                                    <Button type="submit" >Comentar</Button>
                                }
                            </Col>
                        </Row>
                    </Form>
                }

                {
                    clicked === 'comments' &&
                    Object.keys(comments).map((item => {
                        return (
                            <div class="card-body p-4 mt-2">
                                <div class="d-flex flex-start">
                                    <div>
                                        <h6 class="fw-bold mb-1">{comments[item]?.userdata}</h6>
                                        <div class="d-flex align-items-center mb-3">
                                            <p class="mb-0">{comments[item]?.comment_at}</p>
                                            <a href="#!" class="link-muted"><i class="fas fa-pencil-alt ms-2"></i></a>
                                            <a href="#!" class="link-muted"><i class="fas fa-redo-alt ms-2"></i></a>
                                            <a href="#!" class="link-muted"><i class="fas fa-heart ms-2"></i></a>
                                        </div>
                                        <p class="mb-0">
                                            {comments[item]?.comment}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )
                    }))
                }
                {
                    clicked === 'historial' &&
                    Object.keys(historial).map((item => {
                        return (
                            <div class="card-body p-4 mt-2">
                                <div class="d-flex flex-start">
                                    <div>
                                        <div class="d-flex align-items-center mb-3">
                                            <p class="mb-0">{historial[item]?.historial_date}</p>
                                            <a href="#!" class="link-muted"><i class="fas fa-pencil-alt ms-2"></i></a>
                                            <a href="#!" class="link-muted"><i class="fas fa-redo-alt ms-2"></i></a>
                                            <a href="#!" class="link-muted"><i class="fas fa-heart ms-2"></i></a>
                                        </div>
                                        <p class="mb-0">
                                            <span className='colorfont'>{historial[item]?.historial_action}</span> por <ion-icon name="arrow-forward-outline"></ion-icon> <span class="fw-bold">{historial[item]?.userdata}</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )
                    }))
                }

            </div>
        </Fragment>
    )
}

export default TicketTimeline