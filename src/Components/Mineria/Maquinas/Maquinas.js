import React, { useContext, useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { DataContext } from '../../Commons/Context/DataContext'
import ModalContainer from '../../Commons/ModalContainer'
import SearchTable from '../../Commons/SearchTable'
import DumpTable from '../../Commons/Table/DumpTable'
import Table from '../../Commons/Table/Table'
import { formatMachines } from '../../Helpers/formats'
import { MACHINES } from '../../Helpers/helper'
import MaquinaForm from '../Forms/MaquinaForm'

const Maquinas = (props) => {

    const initialState = {
        headers: {
            name: "test",
            type: "Tipo",
            brand: "Marca",
            status : "Estado"
        },
        form: 'Maquina'
    }

    const [state, setState] = useState(initialState)

    const { sidebarStatus, setSidebarStatus, modalstatus, setModalStatus } = useContext(DataContext)
    const { modalType, setModalType } = useContext(DataContext)
    const [dataList, setDataList] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)
    const modal = modalstatus


    /**funcion para setear form clickeado */
    const pickForm = () => {
        switch (state?.form) {
            case 'Maquina':
                return <MaquinaForm />
        }
    }

    //onchange correspondiente para hacer la busqueda 
    const handleSearch = data => {
        setState(prev => ({
            ...prev,
            filtros: {
                ...prev.filtros,
                ticket_name: data,
            },
            currentPage: 1,
        }))
    }


    /** funcion onchange para seteo de form */
    const handleModalForm = (form) => {
        setModalStatus(true)
        setModalType('Add')
        setState(prev => {
            return {
                ...prev,
                form: form,
                title: form
            }
        })
    }

    const usermodal = modalType

    useEffect(() => {
        const token = localStorage.getItem('token')

        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                token: token
            }
        }

        const getMachines = async () => {

            try {
                const res = await fetch(MACHINES, options),
                    json = await res.json()
                setDataList(json)
                setIsLoaded(true)
            } catch (error) {
                console.log(error);
            }
        }

        getMachines()

    }, [])

    console.log(dataList);

    const dataFormated = formatMachines(dataList)

    return (
        <div className={sidebarStatus === 'open' ? 'main-content' : 'main-content extend'} >
            <Container fluid={true} className="">
                {modal && (
                    <ModalContainer
                        title={state?.title}
                        form={pickForm()}
                        modalStatus={modal}
                        modalType={usermodal}
                    />
                )}
                <Row className=" is-3 text-al-ini titlemodule"><h5 className="title-details ml-5 pt-3">Maquinas</h5></Row>
                <Row>
                    <Col md={6} >
                        <SearchTable
                            placeholder='Buscar maquina...'
                            handleChange={handleSearch}
                        />
                    </Col>
                    <Col md={6} className="endmain">
                        <div className='limittic'><div onClick={() => handleModalForm('Maquina')} className="btnadd" id='Maquina'>Agregar maquina</div></div>
                    </Col>
                </Row>
                {/* <Row>
                    <FilterTicket onCleanFilter={onCleanFilter} getFilter={handleFilter} />
                </Row> */}
                {
                    isLoaded === false ?
                        <DumpTable link='/maquina/' headers={state?.headers} data={dataFormated} />
                        :
                        <Table link='/maquina/' headers={state?.headers} data={dataFormated} />
                }
            </Container>
        </div>


    )
}

export default Maquinas