import { Fragment } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TicketActions from "../../Mineria/Actions/TicketActions";

export default function TableRow(props) {

    const { data, dataID } = props
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const clickedItem = (e) => {
        e.preventDefault()
        if ((props?.link) && (pathname === '/tickets')) {
            navigate(`${props?.link}${data?.id_ticket}`)
        }
    }

    const veifyData = (data, col) => {
        if (col === 'icon') {
            return (<div className="ticketicon" ><ion-icon  name={data}></ion-icon></div>)
        } else return data
    }

    return (

        <tr key={data?.id_ticket ? data?.id_ticket : data?.id_ticket} className={data?.id_ticket ? "rowtable clickeable" : "rowtable"} onClick={e => clickedItem(e)} >
            {Object.keys(data).map(col => {
                return (
                    <Fragment key={col}>
                        {
                            col === 'actions' ?
                                <td>
                                    {
                                        pathname === '/tickets' && <TicketActions />
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