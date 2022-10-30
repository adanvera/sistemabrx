import { useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { DataContext } from "./Context/DataContext";

const ProtectedRoute = ({ children }) => {

    /**accedemos a los datos del usuario logueado mediante el 
     * data context donde seteamos el usuario correspondiente al loguear
     */
    const { user } = useContext(DataContext)
    const userAuthed = user

    let navigate = useNavigate()

    console.log();

    if (userAuthed.msg === "El token es obligatorio") {
        console.log("im here");
        return <Navigate to="/" replace />;
    } else return children;
};

export default ProtectedRoute;