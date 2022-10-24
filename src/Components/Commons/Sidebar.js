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
    const userAuthed = user
    
    /**Declaramos las variables */
    const intialState = {
        dashboard: 'is-active',
        operaciones: '',
        mineria: '',
        usuarios: '',
        clientes: '',
        logOut: '',
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
            logOut: ''
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

    return (
        <aside className="sidebar">
            <ul className="menu-list pb-6 pt-6">
                <img src={logo} alt="" className='main-logo' />
            </ul>
            <ul className="menu-list">
                <ProtectedComponent allowedRoles={['ADMINISTRADOR']}>
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
                <ProtectedComponent allowedRoles={['ADMINISTRADOR']}>
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
                <ProtectedComponent allowedRoles={['ADMINISTRADOR']}>
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
                <ProtectedComponent allowedRoles={['ADMINISTRADOR']}>
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
                <ProtectedComponent allowedRoles={['ADMINISTRADOR']}>
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