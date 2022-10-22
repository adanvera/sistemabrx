import { Fragment } from "react";
import TableHeader from "./TableHeader.js";
import TableRow from "./TableRow.js";


export default function Table(props) {
    const { headers, data } = props

    /**formateamos el listado que nos llega */
    const listData = Object.keys(data).reverse().map(item => data[item])

    return (
        <Fragment>
            <table className="table-list table mt-2">
                <TableHeader headers={headers} />
                <tbody>
                    {
                        Object.keys(listData).map(item => {
                            return (
                                <TableRow link={props?.link} data={listData[item]} />
                            )
                        })
                    }
                </tbody>
            </table>

        </Fragment>
    )
}