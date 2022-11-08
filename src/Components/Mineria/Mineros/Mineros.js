import React, { useContext, useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { DataContext } from '../../Commons/Context/DataContext'
import ModalContainer from '../../Commons/ModalContainer'
import SearchTable from '../../Commons/SearchTable'
import DumpTable from '../../Commons/Table/DumpTable'
import Table from '../../Commons/Table/Table'
import { filteredData, formatedDataMiners } from '../../Helpers/formats'
import { MINING_MACHINES } from '../../Helpers/helper'
import { ALL_MINERS_DETAILS, API_KEY } from '../../Utils/Queries/Queries'
import MachineForm from '../Forms/MachineForm'
import MineroForms from '../Forms/MineroForms'

function Mineros() {

  /**declaramos e inicializamos variables a utilizar */
  const initialState = {
    form: 'Minero',
    title: 'MINERO',
    variables: {

    },
    headers: {
      id_machine: "Id Machine",
      client: "Cliente",
      description_model: "Descripción modelo",
      status: "Estado",
      actions: 'Acciones',
    }
  }
  const [state, setState] = useState(initialState)
  const { modalstatus, setModalStatus } = useContext(DataContext)
  const { modalType, setModalType } = useContext(DataContext)
  const modal = modalstatus
  const [dataList, setDataList] = useState('')
  let navigate = useNavigate()
  /**acciones que son utilizadas al cargar datos de
   * las consultas
   */
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const { sidebarStatus, setSidebarStatus } = useContext(DataContext)


  /**funcion para setear form clickeado */
  const pickForm = () => {
    switch (state?.form) {
      case 'Minero':
        return <MineroForms />
      case 'Machine':
        return <MachineForm />
    }
  }

  const handleModalForm = (form) => {
    setModalStatus(true)
    setState(prev => {
      return {
        ...prev,
        form: form,
        title: form
      }
    })
  }

  useEffect(() => {
    /** Obtenemos los valores que guardamos en el token para poder utilizarlos
     * en la siguiente consulta
    */
    const token = localStorage.getItem("token") ? localStorage.getItem("token") : ''

    /**mandamos el header de nuestra consulta */
    const options = {
      method: 'GET',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'token': token
      },
    }

    const getMiningMachines = async () => {
      try {
        const res = await fetch(MINING_MACHINES, options),
          json = await res.json()
        /**seteamos loading */
        setIsLoaded(true);
        /**seteamos el listado de tickets */
        setDataList(json);
      } catch (error) {
        setIsLoaded(true);
        setError(error);
        console.log(error);
      }
    }

    getMiningMachines()

  }, []);

  const formatedList = formatedDataMiners(dataList)

  console.log(dataList);

  return (
    <div className={sidebarStatus === 'open' ? 'main-content' : 'main-content extend'} >
      {modal && (
        <ModalContainer
          title={state?.title}
          form={pickForm()}
        // modalStatus={modal}
        // modalType={usermodal}
        />
      )}
      <Container fluid={true} className="">
        <Row className=" is-3 text-al-ini titlemodule"><h5 className="title-details ml-5 pt-3">Mineros</h5></Row>
        <Row>
          <Col md={6} >
            <SearchTable
              placeholder='Buscar minero...'
            // handleChange={handleSearch}
            />
          </Col>
          <Col md={3} className="endmain">
            <div className='limittic'><div onClick={() => handleModalForm('Minero')} className="btnadd" id='ticketmain'> Agregar minero</div></div>
          </Col>
          <Col md={3} className="endmain">
            <div className='limittic'><div onClick={() => handleModalForm('Machine')} className="btnadd" id='ticketmain'> Registrar maquina</div></div>
          </Col>
        </Row>
        {
          isLoaded === false ?
            <DumpTable link='/tickets/' headers={state?.headers} data={formatedList} />
            :
            <Table link='/tickets/' headers={state?.headers} data={((formatedList))} />
        }
      </Container>
    </div >
  )
}

export default Mineros