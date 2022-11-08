import { Fragment } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ClientActions from "../../Clientes/Actions/ClientActions";
import TicketActions from "../../Mineria/Actions/TicketActions";
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
        /* if ((props?.link) && (pathname === '/clientes')) {
            console.log("me voyo a otro lado");
            navigate(`${props?.link}${data?.id_cliente}`)
        }  */
    }

    const veifyData = (data, col) => {
        if (col === 'icon') {
            return (<div className="ticketicon" ><ion-icon name={data}></ion-icon></div>)
        } else return data
    }

    return (

        <tr key={data?.id_ticket ? data?.id_ticket : data?.id_cliente} className={data?.id_ticket ? "rowtable clickeable" : "rowtable"} onClick={e => clickedItem(e)} >
            {Object.keys(data).filter((col => col !== 'created_at_filter' && col !== 'id_role' && col !== 'created_at_user' && col !== 'id_user')).map(col => {
                return (
                    <Fragment key={col}>
                        {
                            col === 'actions' ?
                                <td>
                                    {
                                        pathname === '/tickets' && <TicketActions />
                                    }
                                    {
                                        pathname === '/clientes' && <ClientActions dataID={data?.id_cliente}/>
                                    }
                                    {
                                        pathname === '/usuarios' && <UserActions dataID={data?.id_user} />
                                    }
                                    {
                                        pathname === '/seguridad' && <RoleActions dataID={data?.id_role} />
                                    }
                                </td>
                                : col === "icon" ?
                                    <td className="icontk">{veifyData(data[col], col)}</td>
                                    :
                                    <td>{(data[col])}</td>
                        }
                    </Fragment>
                )
            })}
        </tr>
    )
}