import { Fragment, useContext, useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import urlLogo from '../assets/images/logologin.png'
import { DataContext } from "./Commons/Context/DataContext";
import { URL_AUTH_USER } from "./Helpers/helper";
import { Col, FloatingLabel } from "react-bootstrap";
import packageInfo from '../../package.json';
import ModalContainer from "./Commons/ModalContainer";
import PuffLoader from "react-spinners/PuffLoader";


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
    const { modalstatus, setModalStatus } = useContext(DataContext)
    const modal = modalstatus
    const { modalType, setModalType } = useContext(DataContext)
    const usermodal = modalType
    const [error, setError] = useState('')
    const [redirectPass, setRedirectPass] = useState(false)
    const [allowed, setAllowed] = useState(false)

    /**funcion para asignar un tiempo de espera para cargar los
     * datos suministrados
     * en donde llamamos a la funcion para redirigir la pagina
     * correspondiente y hacer un reload de la misma para que se seten
     * correctamente los datos sin la perdida de la misma
     */
    function redirectPage() {
        timeToWait = setTimeout(pageAndAction, 1000);
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
        setModalStatus(true)
        setModalType('Login')


        if(state.email === '' || !state.password === '' ){
            setAllowed(false)
        }else{
            setAllowed(true)
        }

        /**guardamos el valor del correo y contaseña cargada */
        const userToLog = state

        /**metodo correspondiente para el request del login */
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                cors: 'no-cors',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
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
                setRedirectPass(true)
                setError(json.msg)
                setModalStatus(false)
                return (console.log(json.msg))
            }
            setDataToVerify(json?.user?.status)
            setRedirectPass(false)
            /**recurrimos al localstorage para guardar los
            * datos del usuario
            */
            window.localStorage.setItem("id", json.user.id_user)
            window.localStorage.setItem("token", (json.token))
            window.localStorage.setItem("rol", json.user.id_role)
            window.localStorage.setItem("status", json.user.status)
            //llamamos a la funcion de seteo de usuario para setear los
            //datos correspondientes
            setUser()
            // /**redireccionamos al dasboard/pagina principal del sistema
            //  * en caso de que conincida los datos del usuario logueado

            //  */

            console.log();

            if (json.user.status === 1 && json.user.temp_active === 0) {
                redirectPage()
            } else if (json.user.temp_active === 1) {
                redirectToResetPassword()
            }

        } catch (error) {

            setError(error)


            return (console.log('Ocurrio un error ' + error))
        }
    }

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

    const brxversion = packageInfo?.version

    function redirectToResetPassword() {
        timeToWait = setTimeout(pageToRedirect, 1000);
    }

    /**funcion correspondiente para redirigir la pagina
     * a otro path 
     */
    function pageToRedirect() {
        navigate('/reset')
        window.location.reload();
    }

    const loadForm = () => {

        return (
            <div className="main-dump">
                <div className="ddd">
                    <PuffLoader color="#36d7b7" />
                </div>
                <div className="ddd">
                    {
                        ((messageLog === 'Reseteo de contraseña requerida') && (redirectPass === true)) ?
                            redirectToResetPassword() : ''
                    }
                    <spam>Iniciando...</spam>
                </div>
            </div>
        )
    }

    /**el retorno de los datos correspondiente 
     * a la vista del componente */
    return (
        <Fragment>
            <div className="main-login">
                {
                    modal && (
                        <ModalContainer
                            title={state?.title}
                            form={loadForm()}
                            modalStatus={modal}
                            modalType='Login'
                        />
                    )
                }
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
                            <Form.Control type="email" placeholder="name@example.com" required />
                        </FloatingLabel>
                        <FloatingLabel className="psw"
                            controlId="password"
                            label="Ingrese su contraseña"
                            name="password"
                            aria-required={true}
                            onChange={(e) => handleChange(e)}>
                            <Form.Control placeholder="Password" type={passwordShow ? "text" : "password"} required/>
                            <span className="tgl-login" onClick={togglePassword}>
                                {
                                    passwordShow ? <ion-icon name="eye-off-outline"></ion-icon> : <ion-icon name="eye-outline"></ion-icon>
                                }
                            </span>
                        </FloatingLabel>
                        {
                            messageLog ?
                                <div className="red mt-3" >
                                    {messageLog} <ion-icon name="alert-circle-outline"></ion-icon>
                                </div> : ''
                        }
                        <div className="a-center mt-2">
                            <Button className="mt-3 btn-log" variant="primary" type="submit">
                                INICIAR SESION
                            </Button>
                        </div>
                        <div className='mt-5' id='nicknameversion'>Brx {brxversion}</div>
                    </form>
                </section>
            </div>

        </Fragment>
    )
}

export default Login;
