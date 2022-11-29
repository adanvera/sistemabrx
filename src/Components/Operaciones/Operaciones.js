import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { DataContext } from "../Commons/Context/DataContext";
import SearchTable from "../Commons/SearchTable";
import Select from "../Commons/Select";
import Table from "../Commons/Table/Table";
import { OPERATION_PROD, OPERATION_TEST } from "../Helpers/helper";
import InfoCliente from "./InfoCliente";

const Operaciones = () => {
    const { sidebarStatus, setSidebarStatus } = useContext(DataContext)
    const currency = [{ label: "USD", value: 1 }, { label: "GS", value: 0 }]
    const [isLoaded, setIsLoaded] = useState(false);


    const initialState = {
        modalShow: false,
        form: 'Operaciones',
        headers: {
            id: 'Operacion ',
            cliente: "Cliente",
            monto: 'Monto',
            comision: 'Comision',
            tipoMonedad: 'Tipo operacion',
        },

        filtros: {
            name: '',
        },
    }
    const [state, setSate] = useState(initialState)
    const [dataList, setDataList] = useState('')

    /*Aca obtenemos todas las operaciones*/
    useEffect(() => {

        /** Obtenemos los valores que guardamos en el token para poder utilizarlos
         * en la siguiente consulta
        */
        const token = localStorage.getItem("token") ? localStorage.getItem("token") : ''

        /**mandamos el header de nuestra consulta */
        const options = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'token': token
            },
        }

        const getOperations = async () => {
            try {
                const res = await fetch(OPERATION_PROD, options),
                    json = await res.json()
                /**seteamos loading */
                console.log(json);
                setIsLoaded(true);
                /**seteamos el listado de tickets */
                setDataList(json);
            } catch (error) {
                setIsLoaded(true);
                //setError(error);
                console.log("Esto es el error" + error);
            }
        }

        getOperations()

        //modificamos datalist


    }, []);


    //datos para pruebas



    return (
        <div className={sidebarStatus === 'open' ? 'main-content' : 'main-content extend'} >
            <Container fluid={true} className="row">
                {/* Aca creamos el formulario de datos del cliente y la operacion */}

                <Col md={4}>
                    <Row className="is-3 text-al-ini titlemodule">
                        <Col md={12} >
                            <h5 className="title-details ml-5 pt-3 ">Operaciones</h5>
                            <InfoCliente />
                        </Col>
                    </Row>
                    <Row className="is-3 text-al-ini titlemodule">
                        <form md={12} >
                            <h5 className="title-details ml-5 pt-3 ">Datos de operacion</h5>
                            <Col>
                                <div className='datashow'>
                                    <label className='labeltk' >Moneda</label>
                                </div>
                            </Col>
                            <select>
                                {currency.map((option) => (
                                    <option value={option.value}>{option.label}</option>
                                ))}
                            </select>
                            <Col>
                                <div className='datashow mt-3'>
                                    <label className='labeltk' >Monto transaccion</label>
                                    <input className='inputshow' value={""} />

                                </div>
                            </Col>
                            <Col>
                                <div className='datashow mt-3'>
                                    <input type="submit" className=" btnadd" value={"Realizar operacion"} />


                                </div>

                            </Col>

                        </form>
                    </Row>
                </Col>

                {/* Tabla en donde se obtiene todas las operaciones */}
                <Col md={8}>
                    <Row className={"ml-6 pt-5"}>

                    </Row>
                    <Row>
                        <Col md={12} className={"ml-5 pt-3"}>
                            <SearchTable
                                placeholder='Buscar operaciones...'

                            />
                        </Col>
                    </Row>
                    <Table link='/operaciones/' headers={state?.headers} data={dataList} />
                </Col>


            </Container>
        </div>

    )





}

export default Operaciones