import { Fragment } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ClientActions from "../../Clientes/Actions/ClientActions";
import MaquinasActions from "../../Mineria/Actions/MaquinasActions";
import GastosActions from "../../Negocio/Gastos/Forms/GastosActions";
import OperationsActions from "../../Operaciones/OperationsActions";
import RoleActions from "../../Seguridad/Actions/RoleActions";
import UserActions from "../../Usuarios/Actions/UserActions";

export default function TableRow(props) {

    const { data, dataID } = props
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const clickedItem = (e) => {
        e.preventDefault()
        if ((props?.link) && (pathname === '/tickets')) {
            navigate(`${props?.link}${data?.id_ticket}`)
        }
        if ((props?.link) && (pathname === '/clientes')) {
            navigate(`${props?.link}${data?.id_cliente}`)
        }
        if ((props?.link) && (pathname === '/mineros')) {
            navigate(`${props?.link}${data?.id_machine}`)
        }
        if ((props?.link) && (pathname === '/importaciones')) {
            navigate(`${props?.link}${data?.id_importacion}`)
        }
    }

    const veifyData = (data, col) => {
        if (col === 'icon') {
            return (<div className="ticketicon" ><ion-icon name={data}></ion-icon></div>)
        } else return data
    }

    return (
        <tr key={data?.id_ticket ? data?.id_ticket : data?.id_cliente ?
            data?.id_operaion : data?.id_ticket} className={data?.id_ticket ? "rowtable clickeable" : "rowtable"} onClick={e => clickedItem(e)} >
            {Object.keys(data).filter((col => col !== 'created_at_filter' && col !== 'id_importacion'
                && col !== 'articulos' && col !== 'created' && col !== 'id_role' && col !== 'created_at_user'
                && col !== 'id' && col !== 'id_user' && col !== "id_machine" && col !== 'id_gasto'
                && col !== 'creatted_at_temp')).map(col => {
                    return (

                        <Fragment key={col}>
                            {
                                col === 'actions' ?
                                    <td>
                                        {pathname === '/operaciones' && <OperationsActions dataID={data?.id_operacion} />}
                                        {pathname === '/usuarios' && <UserActions dataID={data?.id_user} />}
                                        {pathname === '/seguridad' && <RoleActions dataID={data?.id_role} />}
                                        {pathname === '/maquinas' && <MaquinasActions dataID={data?.id} />}
                                        {pathname === '/gastos' && <GastosActions dataID={data?.id_gasto} />}
                                    </td>
                                    : col === "icon" ?
                                        <td className="icontk">{veifyData(data[col], col)}</td>
                                        :
                                        col === "compra" ?
                                            <td className="compra"><strong>{(data[col])} USD</strong></td> :
                                            col === "venta" ?
                                                <td className="venta"><strong>{(data[col])} USD</strong></td> : <td>{(data[col])}</td>
                            }
                        </Fragment>
                    )
                })}
        </tr>
    )
}