import React from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { RESET_USER_PASS, USER_PSW } from '../Helpers/helper'
import { DataContext } from './Context/DataContext'
import { BounceLoader, PropagateLoader } from "react-spinners";
import { override } from '../Helpers/formats'

const ChangePass = (props) => {

    /**declaramos nuestras variables para crear un usuario */
    const initialState = {
        password: "",
        newPassword: "",
        repeatpassword: "",
    }

    /**declaramos las variables a utilizar */
    const [state, setState] = useState(initialState)
    const [passwordShow, setPasswordShow] = useState(false);
    const [passwordShowR, setPasswordShowR] = useState(false);
    const [passwordShowRe, setPasswordShowRe] = useState(false);
    const { modalstatus } = useContext(DataContext)
    const [dataValidate, setDataVerify] = useState(false)
    const iduser = localStorage.getItem("id") ? localStorage.getItem("id") : ''
    const [msg, setMsg] = useState('')
    const [error, setError] = useState(false)

    const { sidebarStatus } = useContext(DataContext)
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

    const togglePassword = () => {
        // When the handler is invoked
        // inverse the boolean state of passwordShown
        setPasswordShow(!passwordShow);
    }

    const togglePasswordR = () => {
        // When the handler is invoked
        // inverse the boolean state of passwordShown
        setPasswordShowR(!passwordShowR);
    }

    const togglePasswordRe = () => {
        // When the handler is invoked
        // inverse the boolean state of passwordShown
        setPasswordShowRe(!passwordShowRe);
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        /** Obtenemos los valores que guardamos en el token para poder utilizarlos
        * en la siguiente consulta
       */
        const id_user = Number(iduser)
        const token = localStorage.getItem("token") ? localStorage.getItem("token") : ''


        let option = {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                'token': token
            },
            body: JSON.stringify({ password: state?.password, newPassword: state.newPassword })
        };
        try {
            const res = await fetch(RESET_USER_PASS + id_user, option),
                json = await res.json();
            setDataVerify(true)
            setError(false)
            if (!res.ok) {
                setMsg(json.msg)
                setError(true)
                console.log(json);
            }
        } catch (error) { console.log(error); }
    }

    const calling = () => {
        if (state.password && state.newPassword && state.repeatpassword && (state.newPassword === state.repeatpassword)) {
            return <Col id='createdd'>
                <Button type="submit">Aceptar</Button>
            </Col>
        } else if (!state.password || !state.newPassword || !state.repeatpassword) {
            return <Col id='createdd'>
                <Button disabled type="submit">Aceptar</Button>
            </Col>
        }

        if ((state.newPassword !== state.repeatpassword)) {
            return (
                <Col id='createdd d-grid'>
                    <span>Las nuevas contrase??as no coinciden</span>
                    <Button disabled type="submit">Aceptar</Button>
                </Col>
            )
        }
    }

    // React router for redirect to login
    let navigate = useNavigate();

    let identificadorTiempoDeEspera;

    function timeToRedirect() {
        identificadorTiempoDeEspera = setTimeout(funcionConRetraso, 2500);
    }

    function funcionConRetraso() {
        navigate('/')
        localStorage.clear();
    }

    const setMessageToShow = (msg, parametro) => {
        if (msg === "Contrase??a temporal no valida" && parametro === 'temp') {
            return <>Contrase??a temporal incorrecta</>
        }
    }

    return (
        <div className={sidebarStatus === 'open' ? 'main-content' : 'main-content extend'} >
            <Container fluid={true} className="">
                <Row className=" is-3 text-al-ini titlemodule"><h5 className="title-detailsd ml-5 pt-3">Cambiar contrase??a</h5></Row>
                <Row>
                    <Col md={6}>
                        {
                            dataValidate === true && error === false ?
                                <>
                                    <div className="Confirm-data mt-4">
                                        <span className="icon-mail"><ion-icon name="checkmark-circle-outline"></ion-icon></span>
                                        <p className="mt-3">Se modifico exitosamente su contrase??a</p>
                                        <div className="mt-5">
                                            <PropagateLoader className="loader" color={state.color} loading={state.loading} size={5} />
                                        </div>
                                        <div className="mt-4" id="redict">
                                            <span className="redirecting">Redirigiendo pagina...</span>
                                        </div>
                                    </div>
                                    {
                                        timeToRedirect()
                                    }
                                </>
                                :
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group md="6" controlId="validationpassword">
                                        <Form.Label>Contrase??a actual</Form.Label>
                                        <div className='d-flex'>
                                            <Form.Control
                                                type={passwordShow ? "text" : "password"}
                                                placeholder="Contrase??a"
                                                required
                                                name='password'
                                                onChange={(e) => handleChange(e)} />
                                            <Form.Control.Feedback type="invalid">Escribir una contrase??a</Form.Control.Feedback>
                                            <span className="togglepss" onClick={togglePassword}>
                                                {
                                                    passwordShow ? <ion-icon name="eye-off-outline"></ion-icon> : <ion-icon name="eye-outline"></ion-icon>
                                                }
                                            </span>
                                        </div>
                                    </Form.Group>

                                    <Form.Group md="6" controlId="" className='mt-2'>
                                        <Form.Label>Nueva Contrase??a</Form.Label>
                                        <div className='d-flex'>
                                            <Form.Control
                                                type={passwordShowR ? "text" : "password"}
                                                placeholder="Contrase??a"
                                                required
                                                name='newPassword'
                                                onChange={(e) => handleChange(e)} />
                                            <Form.Control.Feedback type="invalid">Escribir una contrase??a</Form.Control.Feedback>
                                            <span className="togglepss" onClick={togglePasswordR}>
                                                {
                                                    passwordShow ? <ion-icon name="eye-off-outline"></ion-icon> : <ion-icon name="eye-outline"></ion-icon>
                                                }
                                            </span>
                                        </div>
                                    </Form.Group>

                                    <Form.Group md="6" controlId="" className='mt-2'>
                                        <Form.Label>Repetir nueva contrase??a</Form.Label>
                                        <div className='d-flex'>
                                            <Form.Control
                                                type={passwordShowRe ? "text" : "password"}
                                                placeholder="Contrase??a"
                                                required
                                                name='repeatpassword'
                                                onChange={(e) => handleChange(e)} />
                                            <Form.Control.Feedback type="invalid">Escribir una contrase??a</Form.Control.Feedback>
                                            <span className="togglepss" onClick={togglePasswordRe}>
                                                {
                                                    passwordShow ? <ion-icon name="eye-off-outline"></ion-icon> : <ion-icon name="eye-outline"></ion-icon>
                                                }
                                            </span>
                                        </div>
                                    </Form.Group>
                                    <Row className='dfas mt-3 mb-3' >
                                        {
                                            calling()
                                        }

                                    </Row>
                                </Form>
                        }

                    </Col>
                </Row>



            </Container>




        </div>
    )
}

export default ChangePass