import { Fragment, useContext, useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import urlLogo from '../assets/images/logologin.png'
import { DataContext } from "./Commons/Context/DataContext";
import { URL_AUTH_USER } from "./Helpers/helper";
import { Col, FloatingLabel } from "react-bootstrap";

const Login = () => {

    /**declaramos los valores iniciales a sers
     * utilizadas en el sistema en la pagina correspondiente
     */
    const initialState = {
        email: '',
        password: '',
    }

    /**accedemos y declaramos varialbes a ser utilizadas */
    const { setUser } = useContext(DataContext)
    let navigate = useNavigate()
    const [state, setState] = useState(initialState)
    let timeToWait
    const [dataToVerify, setDataToVerify] = useState(5)
    const [messageLog, setMessageLog] = useState('')

    /**funcion para asignar un tiempo de espera para cargar los
     * datos suministrados
     * en donde llamamos a la funcion para redirigir la pagina
     * correspondiente y hacer un reload de la misma para que se seten
     * correctamente los datos sin la perdida de la misma
     */
    function redirectPage() {
        timeToWait = setTimeout(pageAndAction, 500);
    }

    /**funcion correspondiente para redirigir la pagina
     * a otro path 
     */
    function pageAndAction() {
        navigate('/dashboard')
        window.location.reload();
    }

    /**funcion correspondiente para onclick de envio de datos al
     * recurso de inicio de sesión
     */
    const submittrigger = async (e) => {
        e.preventDefault()

        /**guardamos el valor del correo y contaseña cargada */
        const userToLog = state

        /**metodo correspondiente para el request del login */
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userToLog)
        }

        /**consumimos api para logueo y mandamos 
         * los parametros requeridos */
        try {
            const res = await fetch(URL_AUTH_USER, options),
                json = await res.json()
            if (!res.ok) {
                setMessageLog(json.msg)
                return (console.log(json.msg))
            }
            setDataToVerify(json?.user?.status)
            /**recurrimos al localstorage para guardar los
            * datos del usuario
            */
            window.localStorage.setItem("id", json.user.id_user)
            window.localStorage.setItem("token", (json.token))
            window.localStorage.setItem("rol", "ADMINISTRADOR")
            window.localStorage.setItem("status", json.user.status)
            //llamamos a la funcion de seteo de usuario para setear los
            //datos correspondientes
            setUser()
            // /**redireccionamos al dasboard/pagina principal del sistema
            //  * en caso de que conincida los datos del usuario logueado
            //  */
            if (json.user.status == 1) {
                redirectPage()
            }
        } catch (error) {
            return (console.log('Ocurrio un error ' + error))
        }
    }

    console.log(dataToVerify);

    /**funcion onchange para setear el correo ingresado */
    const handleChangeCorreo = (e) => {
        setState(state => {
            const updatedValues = {
                ...state,
                email: e.target.value,
            }
            return { ...updatedValues };
        });
    }

    /**funcion onchange para setear la contraseña ingresada */
    const handleChange = (e) => {
        setState(state => {
            const updatedValues = {
                ...state,
                password: e.target.value,
            }
            return { ...updatedValues };
        });
    }

    // Initialize a boolean state
    const [passwordShow, setPasswordShow] = useState(false);

    const togglePassword = () => {
        // When the handler is invoked
        // inverse the boolean state of passwordShown
        setPasswordShow(!passwordShow);
    }

    /**el retorno de los datos correspondiente 
     * a la vista del componente */
    return (
        <Fragment>
            <div className="main-login">
                <Col md={6} id='loginbox'>
                </Col>
                <section className="col-md-6 sidetoside login-content">
                    <form className="mt-3" onSubmit={submittrigger} >
                        <div className="headlogo">
                            <img src={urlLogo} />
                        </div>
                        <div className="mb-5">
                            <h1 >BIENVENIDO A BRX</h1>
                            <h4 >INICIAR SESIÓN</h4>
                        </div>
                        <FloatingLabel
                            controlId="correo"
                            label="Ingrese su correo"
                            className="mb-3"
                            name="correo"
                            aria-required={true}
                            onChange={(e) => handleChangeCorreo(e)}
                        >
                            <Form.Control type="email" placeholder="name@example.com" />
                        </FloatingLabel>
                        <FloatingLabel className="psw"
                            controlId="password"
                            label="Ingrese su contraseña"
                            name="password"
                            aria-required={true}
                            onChange={(e) => handleChange(e)}>
                            <Form.Control placeholder="Password" type={passwordShow ? "text" : "password"} />
                            <span className="tgl-login" onClick={togglePassword}>
                                {
                                    passwordShow ? <ion-icon name="eye-off-outline"></ion-icon> : <ion-icon name="eye-outline"></ion-icon>
                                }
                            </span>
                        </FloatingLabel>
                        {
                            dataToVerify === 0 ?
                                <div className="red">Usuario bloqueado, comuniquese con su administrador</div>
                                :
                                ''
                        }
                        {
                            messageLog ?
                                <div className="red">
                                    {messageLog}
                                </div> : ''
                        }
                        <div className="a-center mt-2">
                            <Button className="mt-3 btn-log" variant="primary" type="submit">
                                INICIAR SESION
                            </Button>
                        </div>
                    </form>
                </section>
            </div>

        </Fragment>
    )
}

export default Login;
