import { useEffect } from "react"
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
    let role = userRol

    try {
        const access = role?.access ? role?.access : ''
        const accessTo = JSON.parse(access)

        /**filtramos y guardamos los accesos de los roles */
        const clientes = accessTo.filter((item) => { return item?.title.includes("CLIENTES") })
        const seguridad = accessTo.filter((item) => { return item?.title.includes("SEGURIDAD") })
        const usuarios = accessTo.filter((item) => { return item?.title.includes("USUARIOS") })
        const mineria = accessTo.filter((item) => { return item?.title.includes("MINERIA") })
        const operaciones = accessTo.filter((item) => { return item?.title.includes("OPERACIONES") })

        /**verificamos si el usuario esta logueado y verificamos el acceso a los modulos */
        if (userAuthed) {
            if ((allowedRoles.includes(seguridad[0].title)) || (allowedRoles.includes(usuarios[0].title)) || (allowedRoles.includes(clientes[0].title))
                || (allowedRoles.includes(mineria[0].title)) || (allowedRoles.includes(operaciones[0].title))
            ) {
                return children
            } else {
                return null
            }

        } else {
            return null
        }

    } catch (err) {
        // 👇️ SyntaxError: Unexpected end of JSON input
        console.log('error', err);
    }

}

export default ProtectedComponent;