import React, { Fragment, useContext, useState } from 'react'
import { useEffect } from 'react'
import { useReducer } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { DataContext } from '../../Commons/Context/DataContext'
import { USER, ROLES, ASSIGNROLE } from '../../Helpers/helper'
import { PuffLoader } from 'react-spinners';

const UsersForm = (props) => {

    /**declaramos nuestras variables para crear un usuario */
    const initialState = {
        document: "",
        email: "",
        name: "",
        status: 1,
        last_name: "",
        phone: "",
        password: "",
        id_role: ''
    }

    /**declaramos las variables a utilizar */
    const [state, setState] = useState(initialState)
    const modalType = props?.modalType
    const [dataValidate, setDataVerify] = useState(props?.dataValidate)
    const [validated, setValidated] = useState(false);
    const { modalstatus, setModalStatus } = useContext(DataContext)
    const [idRole, setIdRole] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [dataIsOk, setDataIsOk] = useState(false)
    // Initialize a boolean state
    const [passwordShow, setPasswordShow] = useState(false);
    const [userToEdit, setUserToEdit] = useState(initialState)
    const [idRoleToEdit, setRoleToEdit] = useState()
    const [isLoaded, setIsLoaded] = useState(false);
    const [changeStatusBlock, SetchangeStatusBlock] = useState()
    const [reducerValue, forecUpdate] = useReducer(x => x + 1, 0)
    const [DataRol, setDataRol] = useState('')

    const togglePassword = () => {
        // When the handler is invoked
        // inverse the boolean state of passwordShown
        setPasswordShow(!passwordShow);
    }

    const [modalShow, setModalShow] = useState(true);

    /**cerrar modal */
    const handleClose = (event) => {
        setModalShow(event)
        setState(initialState)
        setDataVerify(false)
    }

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

    useEffect(() => {

        /** Obtenemos los valores que guardamos en el token para poder utilizarlos
         * en la siguiente consulta
        */
        const idUser = props?.id_user
        const token = localStorage.getItem("token") ? localStorage.getItem("token") : ''

        /**mandamos el header de nuestra consulta */
        const options = {
            method: 'GET',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'token': token
            },
        }

        /**consulta para obtener datos del usuario logueado */
        const getUser = async () => {
            try {
                const res = await fetch(USER + idUser, options),
                    json = await res.json()
                setUserToEdit(json)
                SetchangeStatusBlock(json.status)
                setIsLoaded(true)
            } catch (error) {
                console.log(error);
            }
        }

        getUser()

        /**consulta para obtener el rol del usuario logueado */
        const getUserRole = async () => {
            try {
                const res = await fetch(ROLES + idUser, options),
                    json = await res.json()
                setRoleToEdit(json[0].id_role)
            } catch (error) {
                console.log(error);
            }
        }
        getUserRole()

        const getRoles = async () => {
            try {
                const res = await fetch(ROLES, options),
                    json = await res.json()
                /**seteamos loading */
                setIsLoaded(true);
                /**seteamos el listado de tickets */
                setDataRol(json);
            } catch (error) {
                setIsLoaded(true);
                console.log(error);
            }
        }

        getRoles()

    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault()
        const form = e.currentTarget;

        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }
        setValidated(true);
        e.preventDefault();

        if ([state?.name, state?.last_name, state?.email, state?.password, idRole].includes("")) {
            return
        }

        const usetToCreate = state
        const token = localStorage.getItem("token") ? localStorage.getItem("token") : ''

        /**metodo para setear y enviar a 
         * recurso de creación de usuario
         */
        let option = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'token': token
            },
            body: JSON.stringify(usetToCreate)
        };
        try {
            const res = await fetch(USER, option),
                json = await res.json();
            setDataVerify(true)
            if (!res.ok) {
                console.log(json);
            }
        } catch (error) { console.log(error); }

        /**variables a utilizar para hacer y mandar la consulta
         * de asignación del rol
         */
        const document = state?.document
        const id_role = Number(idRole)

        /**metodo para asignar un rol a un usuario */
        let optionRole = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'token': token
            },
            body: JSON.stringify({ document, id_role })
        };

        try {
            const res = await fetch(ASSIGNROLE, optionRole),
                json = await res.json();
            if (!res.ok) {
                console.log(json);
            }
        } catch (error) { console.log(error); }
    };

    /**funcion onchange para setear los valores ingresados */
    const handleChangeEdit = (e) => {
        e.preventDefault();
        setUserToEdit(prevState => {
            const updatedValues = {
                ...prevState,
                [e.target.name]: e.target.value,
            }
            return { ...updatedValues };
        });

    }

    const handleSubmitEdit = async (e) => {
        e.preventDefault()

        if ([userToEdit?.name, userToEdit?.last_name, userToEdit?.email, userToEdit].includes("")) {
            return
        }

        const dataToEdit = userToEdit
        const idUser = props?.id_user
        const token = localStorage.getItem("token") ? localStorage.getItem("token") : ''

        /**metodo para setear y enviar a 
         * recurso de modificacion de usuario
         */
        let option = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                'token': token
            },
            body: JSON.stringify(dataToEdit)
        };

        try {
            const res = await fetch(USER + idUser, option),
                json = await res.json();
            setDataVerify(true)
            forecUpdate()
            if (!res.ok) {
                console.log(json);
            }
        } catch (error) { console.log(error); }

        /**variables a utilizar para hacer y mandar la consulta
        * de modificación del rol
        */
        const document = userToEdit?.document
        const id_role = Number(idRoleToEdit)

        /**metodo para asignar un rol a un usuario */
        let optionRole = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                'token': token
            },
            body: JSON.stringify({ document, id_role })
        };


        try {
            const res = await fetch(ASSIGNROLE + idUser, optionRole),
                json = await res.json();
            if (!res.ok) {
                console.log(json);
            }
        } catch (error) { console.log(error); }
    }

    const handleSubmitDelete = async (e) => {
        e.preventDefault()

        const idUser = props?.id_user
        const token = localStorage.getItem("token") ? localStorage.getItem("token") : ''

        /**metodo para setear y enviar a 
         * recurso de modificacion de usuario
         */
        let option = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                'token': token
            },
            body: JSON.stringify({ status: 2 })
        };

        try {
            const res = await fetch(USER + idUser, option),
                json = await res.json();
            setDataVerify(true)
            forecUpdate()
            if (!res.ok) {
                console.log(json);
            }
        } catch (error) { console.log(error); }

    }

    const handleSubmitBlock = async (e) => {
        e.preventDefault()

        e.preventDefault()

        const idUser = props?.id_user
        const token = localStorage.getItem("token") ? localStorage.getItem("token") : ''

        /**metodo para setear y enviar a 
         * recurso de modificacion de usuario
         */
        let option = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                'token': token
            },
            body: JSON.stringify({ status: changeStatusBlock === 1 ? 0 : 1 })
        };

        try {
            const res = await fetch(USER + idUser, option),
                json = await res.json();
            setDataVerify(true)
            forecUpdate()
            if (!res.ok) {
                console.log(json);
            }
        } catch (error) { console.log(error); }
    }


    if (modalType === 'Add') {
        return (<Fragment>
            {
                dataValidate === true ?
                    <div className='dataIsOk'>
                        <Row className='dataIsOkContent'>
                            <ion-icon name="checkmark-circle-outline"></ion-icon>
                            <span>Usuario añadido exitosamente</span>
                        </Row>
                        <Row id='close'>
                            <div className='mddlebtn'>
                                <Button className='btn closeBtn' onClick={() => setModalStatus(false)}>Cerrar</Button>
                            </div>
                        </Row>
                    </div>
                    :
                    <Form onSubmit={handleSubmit}>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="6" controlId="validationname">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Nombre"
                                    name='name'
                                    onChange={(e) => handleChange(e)}
                                />
                                <Form.Control.Feedback>Bien!</Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">Escribir nombre</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="6" controlId="validationlastname">
                                <Form.Label>Apellido</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Apellido"
                                    name='last_name'
                                    onChange={(e) => handleChange(e)}
                                />
                                <Form.Control.Feedback>Bien!</Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">Escribir apellido</Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="6" controlId="validationdocument">
                                <Form.Label>Número de cédula</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Número de cédula"
                                    required
                                    name='document'
                                    onChange={(e) => handleChange(e)} />
                                <Form.Control.Feedback type="invalid">Escribir número de cédula</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="6" controlId="validationphone">
                                <Form.Label>Número de celular</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Número de celular"
                                    required
                                    name='phone'
                                    onChange={(e) => handleChange(e)} />
                                <Form.Control.Feedback type="invalid">Escribir número de celular</Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3" >
                            <Form.Group as={Col} md="12" controlId="validationmail">
                                <Form.Label>Correo electrónico</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Correo electrónico"
                                    required
                                    name='email'
                                    onChange={(e) => handleChange(e)} />
                                <Form.Control.Feedback type="invalid">Escribir correo electrónico válido</Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row className="mb-5">
                            <Form.Group as={Col} md="6" controlId="validationpassword">
                                <Form.Label>Contraseña</Form.Label>
                                <div className='d-flex'>
                                    <Form.Control
                                        type={passwordShow ? "text" : "password"}
                                        placeholder="Contraseña"
                                        required
                                        name='password'
                                        onChange={(e) => handleChange(e)} />
                                    <Form.Control.Feedback type="invalid">Escribir una contraseña</Form.Control.Feedback>
                                    <span className="togglepss" onClick={togglePassword}>
                                        {
                                            passwordShow ? <ion-icon name="eye-off-outline"></ion-icon> : <ion-icon name="eye-outline"></ion-icon>
                                        }
                                    </span>
                                </div>
                            </Form.Group>
                            <Form.Group as={Col} md="6" controlId="validationRol">
                                <Form.Label>Rol de usuario:</Form.Label>
                                <Form.Select onChange={(e) => setIdRole(e.target.value)}  >
                                    <option selected disabled>Seleccionar rol</option>
                                    {
                                        Object.keys(DataRol).map((item) => {
                                            return <option value={DataRol[item]?.id_role} >{DataRol[item]?.description}</option>
                                        })
                                    }
                                </Form.Select>
                            </Form.Group>

                        </Row>
                        <Row className='addusr' >
                            <Col id='create'>
                                <Button type="submit">Crear usuario</Button>
                            </Col>
                            <Col id='closeone' className='closee'>
                                <Button onClick={() => setModalStatus(false)}>Cerrar</Button>
                            </Col>
                        </Row>
                    </Form>
            }
        </Fragment>)
    }

    if (modalType === 'Edit') return (
        <Fragment>
            {
                isLoaded === false ?
                    <div className="main-dump">
                        <div className="ddd">
                            <PuffLoader color="#36d7b7" />
                        </div>
                        <div className="ddd">
                            <spam>Cargando...</spam>
                        </div>
                    </div>
                    :
                    (dataValidate === true ?
                        <div className='dataIsOk'>
                            <Row className='dataIsOkContent'>
                                <ion-icon name="checkmark-circle-outline"></ion-icon>
                                <span>Usuario modificado exitosamente</span>
                            </Row>
                            <Row id='close'>
                                <div className='mddlebtn'>
                                    <Button className='btn closeBtn' onClick={() => setModalStatus(false)}>Cerrar</Button>
                                </div>
                            </Row>
                        </div>
                        :
                        <Form onSubmit={handleSubmitEdit}>
                            <Row className="mb-3">
                                <Form.Group as={Col} md="6" controlId="validationname">
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Nombre"
                                        name='name'
                                        value={userToEdit?.name}
                                        onChange={(e) => handleChangeEdit(e)}
                                    />
                                    <Form.Control.Feedback>Bien!</Form.Control.Feedback>
                                    <Form.Control.Feedback type="invalid">Escribir nombre</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="6" controlId="validationlastname">
                                    <Form.Label>Apellido</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Apellido"
                                        name='last_name'
                                        value={userToEdit?.last_name}
                                        onChange={(e) => handleChangeEdit(e)}
                                    />
                                    <Form.Control.Feedback>Bien!</Form.Control.Feedback>
                                    <Form.Control.Feedback type="invalid">Escribir apellido</Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} md="6" controlId="validationdocument">
                                    <Form.Label>Número de cédula</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Número de cédula"
                                        required
                                        name='document'
                                        value={userToEdit?.document}
                                        onChange={(e) => handleChangeEdit(e)} />
                                    <Form.Control.Feedback type="invalid">Escribir número de cédula</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="6" controlId="validationphone">
                                    <Form.Label>Número de celular</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Número de celular"
                                        required
                                        value={userToEdit?.phone}
                                        name='phone'
                                        onChange={(e) => handleChangeEdit(e)} />
                                    <Form.Control.Feedback type="invalid">Escribir número de celular</Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Row className="mb-3" >
                                <Form.Group as={Col} md="12" controlId="validationmail">
                                    <Form.Label>Correo electrónico</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Correo electrónico"
                                        required
                                        name='email'
                                        value={userToEdit?.email}
                                        onChange={(e) => handleChangeEdit(e)} />
                                    <Form.Control.Feedback type="invalid">Escribir correo electrónico válido</Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Row className="mb-5">
                                <Form.Group as={Col} md="6" controlId="validationRol">
                                    <Form.Label>Rol de usuario:</Form.Label>
                                    <Form.Select value={idRoleToEdit} onChange={(e) => setRoleToEdit(e.target.value)}  >
                                        <option selected disabled>Seleccionar rol</option>
                                        {
                                            Object.keys(DataRol).map((item) => {
                                                return <option value={DataRol[item]?.id_role} >{DataRol[item]?.description}</option>
                                            })
                                        }
                                    </Form.Select>
                                </Form.Group>
                            </Row>
                            <Row className='addusr' >
                                <Col id='create'>
                                    <Button type="submit">Aceptar</Button>
                                </Col>
                                <Col id='closeone' className='closee'>
                                    <Button onClick={() => setModalStatus(false)}>Cerrar</Button>
                                </Col>
                            </Row>
                        </Form>)
            }
        </Fragment>
    )

    if (modalType === "Delete") {
        return (
            <>{dataValidate === true ?
                <div className='dataIsOk'>
                    <Row className='dataIsOkContent'>
                        <ion-icon name="checkmark-circle-outline"></ion-icon>
                        <span>Usuario eliminado exitosamente</span>
                    </Row>
                    <Row id='close'>
                        <div className='mddlebtn'>
                            <Button className='btn closeBtn' onClick={() => setModalStatus(false)}>Cerrar</Button>
                        </div>
                    </Row>
                </div> :
                <Form onSubmit={handleSubmitDelete}>
                    <div className='dataIsOk'>
                        <Row className='dataIsOkContent warning'>
                            <ion-icon name="alert-circle-outline"></ion-icon>
                            <span>¿Estas seguro de eliminar este usuario?</span>
                        </Row>
                        <Row className='addusr mt-3'>
                            <Col id='create'>
                                <Button type="submit">Aceptar</Button>
                            </Col>
                            <Col id='closeone' className='closee'>
                                <Button onClick={() => setModalStatus(false)}>Cerrar</Button>
                            </Col>
                        </Row>
                    </div>
                </Form>
            }
            </>
        )

    }

    if (modalType === "Block") {
        return (
            <>{dataValidate === true ?
                <div className='dataIsOk'>
                    <Row className='dataIsOkContent'>
                        <ion-icon name="checkmark-circle-outline"></ion-icon>
                        <div className='mt-3'>
                            {
                                changeStatusBlock === 1 ?
                                    <span>Usuario bloquado exitosamente</span>
                                    :
                                    <span>Usuario desbloqueado exitosamente</span>
                            }
                        </div>
                    </Row>
                    <Row id='close'>
                        <Button className='btn closeBtn' onClick={() => setModalStatus(false)}>Cerrar</Button>
                    </Row>
                </div> :
                <Form onSubmit={handleSubmitBlock}>
                    <div className='dataIsOk'>
                        <Row className='dataIsOkContent warning'>
                            <ion-icon name="alert-circle-outline"></ion-icon>
                            <div className='mt-3'>
                                {
                                    changeStatusBlock === 0 ?
                                        <span>¿Estas seguro de desbloquear este usuario?</span>
                                        :
                                        <span>¿Estas seguro de bloquear este usuario?</span>
                                }
                            </div>
                        </Row>
                        <Row className='addusr mt-3'>
                            <Col id='create'>
                                <Button type="submit">Aceptar</Button>
                            </Col>
                            <Col id='closeone' className='closee'>
                                <Button onClick={() => setModalStatus(false)}>Cerrar</Button>
                            </Col>
                        </Row>
                    </div>
                </Form>
            }
            </>
        )

    }
}

export default UsersForm