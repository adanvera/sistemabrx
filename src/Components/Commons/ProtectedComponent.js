import { useContext } from "react"
import { DataContext } from "./Context/DataContext"

const ProtectedComponent = ({ allowedRoles, children }) => {

    /**accedemos a los datos del usuario logueado mediante el 
     * data context donde seteamos el usuario correspondiente al loguear
     */
    const { user } = useContext(DataContext)
    const userAuthed = user

    /**llamamos al rol de usuario declarado en el datacontext */
    const { userRol } = useContext(DataContext)
    const role = userRol

    /**verificamos si el usuario esta logueado */
    if (userAuthed) {

        if (allowedRoles.includes(role)) {
            return children
        } else {
            return null
        }

    } else {
        return null
    }
}

export default ProtectedComponent;