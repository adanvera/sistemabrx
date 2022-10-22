import { createContext, useContext, useEffect, useState } from 'react'
import { GET_USER_BY_ID, GET_USER_ROLE } from '../../Helpers/helper'


export const DataContext = createContext()

/**valores iniciales y seteos correspondientes
 * en el caso de que ya se haya accedido mediante el localstorage 
 * se iran seteando para que tengan su valor correspondiente y esten disponible los datos
 * obtenidos en los componentes en donde sean llamados
 */
const initialState = {
    user: {
        id: localStorage.getItem("id") ? localStorage.getItem("id") : '',
        nombre: '',
        apellido: '',
        email: '',
        status: '',
        document: '',
    },
}

export const DataProvider = ({ children }) => {

    /**seteamos los valores correspondientes al usuario */
    const [user, setUser] = useState(initialState)
    const [userRol, setUserRol] = useState('')
    const [idAuthed, setIdAuthed] = useState()
    /**conusltas para setear datos del usuario logueado
     * y el rolcorrespondiente
     */
    useEffect(() => {

        /** Obtenemos los valores que guardamos en el token para poder utilizarlos
         * en la siguiente consulta
        */
        const idUser = localStorage.getItem("id") ? localStorage.getItem("id") : ''
        const token = localStorage.getItem("token") ? localStorage.getItem("token") : ''

        // setIdAuthed(idUser)

        /**consulta para obtener datos del usuario logueado */
        // const getUser = async () => {
        //     try {
        //         const res = await fetch(GET_USER_BY_ID + idUser, {
        //             method: 'GET',
        //             headers: {
        //                 'Accept': 'application/json, text/plain, */*',
        //                 'token': token
        //             },
        //         }),
        //             json = await res.json()
        //         setUser(json)
        //     } catch (error) {
        //         console.log(error);
        //     }
        // }
        // getUser()

        // /**consulta para obtener el rol del usuario logueado */
        // const getUserRole = async () => {
        //     try {
        //         const res = await fetch(GET_USER_ROLE + idUser, {
        //             method: 'GET',
        //             headers: {
        //                 'Accept': 'application/json, text/plain, */*',
        //                 'token': token
        //             },
        //         }),
        //             json = await res.json()
        //         setUserRol(json[0].description)
        //     } catch (error) {
        //         console.log(error);
        //     }
        // }
        // getUserRole()

        setUserRol('ADMINISTRADOR')

    }, []);

    return (
        <DataContext.Provider
            value={{
                user, setUser, userRol, setUserRol,
                idAuthed, setIdAuthed
            }}>
            {children}
        </DataContext.Provider>
    )
}
