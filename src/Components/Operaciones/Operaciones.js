import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { DataContext } from "../Commons/Context/DataContext";
import ModalContainer from "../Commons/ModalContainer";
import SearchTable from "../Commons/SearchTable";
import Select from "../Commons/Select";
import Table from "../Commons/Table/Table";
import { OPERATION_PROD, OPERATION_TEST } from "../Helpers/helper";
import InfoCliente from "./InfoCliente";
import OperationsData from "./OperationsData";


const Operaciones = () => {
    const { sidebarStatus, setSidebarStatus, typeCurrency, setTypeCurrency } = useContext(DataContext)
    const [typesOperations, setTypesOperations] = useState([{ label: "Compra", value: 1 }, { label: "Venta", value: 0 }])
    const currency = [{ label: "BTC", value: 1 }, { label: "USDT", value: 0 }]
    const [isLoaded, setIsLoaded] = useState(false);
    const { modalstatus, setModalStatus } = useContext(DataContext)
    const { isBuying, setIsBuying } = useContext(DataContext)
    const modal = modalstatus

    const initialState = {
        modalShow: false,
        form: 'Operaciones',
        headers: {
            id: 'Operacion ',
            cliente: "Cliente",
            monto: 'Monto',
            comision: 'Comision',
            tipoOperaciones: 'Tipo operacion',
            tipoMoneda: 'Moneda',
            actions:'Acciones'
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
                json.map(op => delete op.created)
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

    return (
        <div className={sidebarStatus === 'open' ? 'main-content' : 'main-content extend'} >
            <Container fluid={true} className="row">
                <Row className="justify-content-between">
                    {/* Aca creamos el formulario de datos del cliente y la operacion */}
                    <Col md={4} className="operationbox">
                        <div className="box-container-data">
                            <Row className="is-3 text-al-ini titlemodule">
                                <Col md={12} >
                                    <h5 className="title-details ml-5 pt-3 ">Operaciones</h5>
                                    <InfoCliente />
                                </Col>
                            </Row>
                            <Row className="is-3 text-al-ini titlemodule">
                                <OperationsData />
                            </Row>
                        </div>
                    </Col>
                    {/* Tabla en donde se obtiene todas las operaciones */}
                    <Col md={8} className="operations">
                        <Row className={"ml-6 pt-5"}>
                        </Row>
                        <Row>
                            <Col md={12} className={"ml-5 pt-3"}>
                                <SearchTable
                                    placeholder='Buscar operaciones...'
                                />
                            </Col>
                        </Row>
                        <Table link='/operaciones/' headers={state?.headers} data={dataList} exportdata={true} title="Operaciones" />
                    </Col>
                </Row>
                {modal && (
                    <ModalContainer
                        //form={pickForm()}
                        modalStatus={modal}
                        typeCurrency={typeCurrency}
                        isBuying={isBuying}
                    />
                )}

            </Container>
        </div>

    )





}

export default Operaciones