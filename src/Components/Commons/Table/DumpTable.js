import { Fragment, useState } from "react";
import { Pagination } from "react-bootstrap";
import PuffLoader from "react-spinners/PuffLoader";
import TableHeader from "./TableHeader";
import { perPage } from "../../Helpers/formats";
//import { perPage } from "../Helpers/formats";


export default function DumpTable(props) {
    console.log(props);

    const { headers, data } = props
    const [state, setState] = useState({ sort: {}, currentPage: 1 })
    const listData = perPage(Object.keys(data).reverse().map(item => data[item]), state.currentPage)
    // guardamos el total de los registros que tenemos y calulamos para el total
    //  de paginas para la paginación de nuestra tabla
    const total = Object.keys(data).length / 10 % 1 === 0 ? Math.floor(Object.keys(data).length / 10) : Math.floor(Object.keys(data).length / 10) + 1
    let items = [];
    const [active, setActive] = useState(1)

    /**push de la paginación en donde seteamos la pagina activa
     * y la data correspondiente a ver
     */
     for (let number = 1; number <= total; number++) {
        items.push(
            <Pagination.Item key={number} active={number === active} onClick={(event) => paginationClicked(event)} >{number}</Pagination.Item>,
        );
    }

    /**funcion para setear pagina clickeada */
    const paginationClicked = (event) => {
        event.preventDefault()

        setState(prev => ({
            ...prev,
            currentPage: event.target.text
        }))

        const toNumber = Number(event.target.text)
        setActive(toNumber)
    }

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
            {<Pagination data={listData} activeLabel={state.currentPage}> {items} </ Pagination> } 
        </Fragment>
    )
}