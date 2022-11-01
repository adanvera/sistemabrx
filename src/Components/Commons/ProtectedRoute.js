import { useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { DataContext } from "./Context/DataContext";

const ProtectedRoute = ({ children }) => {

    /**accedemos a los datos del usuario logueado mediante el 
     * data context donde seteamos el usuario correspondiente al loguear
     */
    const { user } = useContext(DataContext)
    const userAuthed = user

    if (userAuthed.msg === "El token es obligatorio") {
        return <Navigate to="/" replace />;
    } else return children

}

export default ProtectedRoute;