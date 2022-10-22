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
            navigate(`${props?.link}${data?.ticketnumber}`)
        }
    }

    return (

        <tr key={data?.ticketnumber ? data?.ticketnumber : data?.ticketnumber} className={data?.ticketnumber ? "rowtable clickeable" : "rowtable"} onClick={e => clickedItem(e)} >
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