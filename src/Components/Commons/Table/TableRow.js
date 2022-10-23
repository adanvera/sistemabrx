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
                                :
                                <td>{(data[col])}</td>
                        }
                    </Fragment>
                )
            })}
        </tr>
    )
}