import { Fragment, useState } from "react";
import { Pagination } from "react-bootstrap";
import PuffLoader from "react-spinners/PuffLoader";
import TableHeader from "../Commons/Table/TableHeader";
import { perPage } from "../Helpers/formats";
//import { perPage } from "../Helpers/formats";


export default function DumpTable(props) {
    const { headers, data } = props
    const [state, setState] = useState({ sort: {}, currentPage: 1 })
    //const listData = perPage(Object.keys(data).reverse().map(item => data[item]), state.currentPage)
    let items = [];
    
    return (
        <Fragment>
            <table className="table-list table">
                <TableHeader headers={headers} />
            </table>
            <div className="main-dump">
                <div className="ddd">
                    <PuffLoader color="#36d7b7" />
                </div>
                <div className="ddd">
                    <spam>Cargando...</spam>
                </div>
            </div>
            {/* {<Pagination data={listData} activeLabel={state.currentPage}> {items} </ Pagination> } */}
        </Fragment>
    )
}