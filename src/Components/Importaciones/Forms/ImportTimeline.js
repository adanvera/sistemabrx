import React, { Fragment, useContext, useState } from 'react'
import { Button, Col, FloatingLabel, Form, Row } from 'react-bootstrap';
import { DataContext } from '../../Commons/Context/DataContext';
import { formatComments, formatHistorial, formatHistorialimp } from '../../Helpers/formats';
import { IMPORTACIONES } from '../../Helpers/helper';

const ImportTimeline = (props) => {

    const comments = props?.data ? formatComments(props?.data) : ''
    const dataToSend = props?.dataToSend
    const { user } = useContext(DataContext)
    const userAuthed = user
    const idImport = props?.idImp


    /**cast to parse */
    const castParse = (data) => {
        try {
            const dataParsed = JSON.parse(data)
            return dataParsed

        } catch (error) {
            console.log(error);
        }
    }

    const dasde = props?.historial

    const historial = castParse(dasde)
  

   console.log();

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

        const toUpImport = {
            id_comment: Math.random().toString(36).slice(-8),
            comment: state.variables.comment,
            id_user: userAuthed?.id_user,
            userdata: userAuthed ? userAuthed.name + " " + userAuthed.last_name : '',
            comment_at: state.variables.comment_at,
        }

        const commentToSend = dataToSend === null ? JSON.stringify(toUpImport) : JSON.stringify(toUpImport) + "," + dataToSend

        const importOptions = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                'token': token
            },
            body: JSON.stringify({ comentario_importacion: commentToSend })
        }
        try {
            const res = await fetch(IMPORTACIONES + idImport, importOptions),
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

        if (btn === '_importcomments') {
            setClicked('comments')
        } else if (btn === '_importHistorial') {
            setClicked('historial')
        }

    }

    return (
        <Fragment>
            <div className='tiktop'>
                <Row>
                    <Col className='d-flex headsummary'>
                        <div className='d-flex mr-2' onClick={(e) => handleOnClick(e, '_importcomments')} >
                            <h6 className='mr-2 tithis'>Comentarios {comments?.length} </h6> <ion-icon name="chatbubbles-outline"></ion-icon>
                        </div>
                        <div className='d-flex ml-2 ' onClick={(e) => handleOnClick(e, '_importHistorial')}>
                            <h6 className='ml-2 tithis mr-2'>Historial</h6> <ion-icon name="document-text-outline"></ion-icon>
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
                        <Row className='mt-3 mb-3' >
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
                            <div class="card-body dd">
                                <div class="d-flex flex-start">
                                    <div className='d-flex'>
                                        <div>
                                            <h6 class="fw-bold">{comments[item]?.userdata}</h6>
                                            <div class="d-flex align-items-center">
                                                <p class="mb-0 styledate">{comments[item]?.comment_at}</p>
                                                <a href="#!" class="link-muted"><i class="fas fa-pencil-alt ms-2"></i></a>
                                                <a href="#!" class="link-muted"><i class="fas fa-redo-alt ms-2"></i></a>
                                                <a href="#!" class="link-muted"><i class="fas fa-heart ms-2"></i></a>
                                            </div>
                                        </div>
                                        <p class="mb-0 pl-3 pt-3" id='commentsection'>
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

export default ImportTimeline

