import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { DataContext } from "./Context/DataContext"
import ProtectedComponent from "./ProtectedComponent"
import logo from "../../assets/images/logo.png";



const Sidebar = props => {

    /**accedemos a los datos del usuario logueado mediante el 
     * data context donde seteamos el usuario correspondiente al loguear
     */
    const { user } = useContext(DataContext)
    const { sidebarStatus, setSidebarStatus } = useContext(DataContext)
    const userAuthed = user

    /**Declaramos las variables */
    const intialState = {
        dashboard: 'is-active',
        operaciones: '',
        mineria: '',
        usuarios: '',
        clientes: '',
        logOut: '',
        seguridad: ''
    }

    const [modalShow, setModalShow] = useState(false)

    /**inicializamos nuestras variables con el state */
    const [state, setState] = useState(intialState);

    /**funcion para cambiar de estado en el css correspondiente
     * para asignar la clase is-active cuando la misma es seleccionada
     */
    const handleSetActive = (data) => {
        let blankState = {
            operaciones: '',
            dashboard: '',
            mineria: '',
            usuarios: '',
            clientes: '',
            logOut: '',
            seguridad: ''
        }
        setState(prevState => ({
            ...blankState,
            [data]: 'is-active'
        }))

    }

    /**para redirigir a una ventana determinada */
    let navigate = useNavigate()

    /**funcion para cerrar sesion y
     * limpiamos valores del localstorage por si se hayan quedado 
     * valores dentro de la misma
     */
    const logOut = () => {
        localStorage.clear()
        window.location.reload();
        navigate('/')
    }

    const handleOnClick = (e) => {
        e.preventDefault()

        if (sidebarStatus === 'open') {
            setSidebarStatus('closed')
        } else {
            setSidebarStatus('open')
        }
    }

    const handleOnLoad = () => { }

    return (
        <aside className={sidebarStatus === 'open' ? 'sidebar' : 'menu sidebar small'} onLoad={handleOnLoad()} >
            <ul className="menu-list pb-6 pt-6">
                <div className="classss d-flex">
                    <img src={logo} alt="" className={sidebarStatus === 'open' ? 'main-logo' : 'hide'} />
                    <div onClick={handleOnClick} className={sidebarStatus === 'open' ? 'triggerwidth' : 'triggerwidthsmall'} ><ion-icon name="menu-outline"></ion-icon></div>
                </div>
            </ul>
            <ul className="menu-list">
                <ProtectedComponent allowedRoles={['OPERACIONES', 'SEGURIDAD', 'MINERIA', 'USUARIOS', 'CLIENTES']}>
                    <li className={state?.dashboard ? "mt-4 classli is-active" : "mt-4 classli"}
                        id="dashboard"
                        onClick={(e) => handleSetActive('dashboard')}
                    >
                        <Link to="/dashboard" className="d-flex">
                            <div>
                                <ion-icon name="grid-outline"></ion-icon>
                            </div>
                            <span className="pl-3">Dashboard</span>
                        </Link>
                    </li>
                </ProtectedComponent>
                <ProtectedComponent allowedRoles={['OPERACIONES']}>
                    <li className={state?.operaciones ? "mt-4 classli is-active" : "mt-4 classli"}
                        id="operaciones"
                        onClick={(e) => handleSetActive('operaciones')}
                    >
                        <Link to="/operaciones" className="d-flex">
                            <div><ion-icon name="bookmark-outline"></ion-icon></div>
                            <span className="pl-3">Operaciones</span>
                        </Link>
                    </li>
                </ProtectedComponent>
                <ProtectedComponent allowedRoles={['MINERIA']}>
                    <li className={state?.mineria ? "mt-4 classli is-active" : "mt-4 classli"}
                        id="mineria"
                        onClick={(e) => handleSetActive('mineria')}
                    >
                        <Link to="/mineria" className="d-flex">
                            <div>
                                <ion-icon name="speedometer-outline"></ion-icon>
                            </div>
                            <span className="pl-3">Minería</span>
                        </Link>
                    </li>
                </ProtectedComponent>
                <ProtectedComponent allowedRoles={['USUARIOS']}>
                    <li className={state?.usuarios ? "mt-4 classli is-active" : "mt-4 classli"}
                        id="usuarios"
                        onClick={(e) => handleSetActive('usuarios')}
                    >
                        <Link to="/usuarios" className="d-flex">
                            <div>
                                <ion-icon name="id-card-outline"></ion-icon>
                            </div>
                            <span className="pl-3" >Usuarios</span>
                        </Link>
                    </li>
                </ProtectedComponent>
                <ProtectedComponent allowedRoles={['CLIENTES']}>
                    <li className={state?.clientes ? "mt-4 classli is-active" : "mt-4 classli"}
                        id="clientes"
                        onClick={(e) => handleSetActive('clientes')}
                    >
                        <Link to="/clientes" className="d-flex">
                            <div>
                                <ion-icon name="people-outline"></ion-icon>
                            </div>
                            <span className="pl-3">Clientes</span>
                        </Link>
                    </li>
                </ProtectedComponent>
                <ProtectedComponent allowedRoles={['SEGURIDAD']}>
                    <li className={state?.seguridad ? "mt-4 classli is-active" : "mt-4 classli"}
                        id="seguridad"
                        onClick={(e) => handleSetActive('seguridad')}
                    >
                        <Link to="/seguridad" className="d-flex">
                            <div>
                                <ion-icon name="finger-print-outline"></ion-icon>
                            </div>
                            <span className="pl-3">Seguridad</span>
                        </Link>
                    </li>
                </ProtectedComponent>
            </ul>
            <ul className="menu-list">
                <li className={state?.logOut ? "mt-4 classli log-out is-active " : "mt-4 classli log-out"}
                    id="logout"
                    onClick={(e) => logOut()}
                >
                    <Link to="/" className="d-flex" >
                        <div>
                            <ion-icon name="log-out-outline"></ion-icon>
                        </div>
                        <span className="pl-3">Cerrar sesión</span>
                    </Link>
                </li>
            </ul>
        </aside >
    )
}

export default Sidebar