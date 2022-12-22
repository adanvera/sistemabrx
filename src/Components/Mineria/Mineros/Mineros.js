import React, { useContext, useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { DataContext } from '../../Commons/Context/DataContext'
import ModalContainer from '../../Commons/ModalContainer'
import SearchTable from '../../Commons/SearchTable'
import DumpTable from '../../Commons/Table/DumpTable'
import Table from '../../Commons/Table/Table'
import { filteredData, formatedDataMiners } from '../../Helpers/formats'
import { API_COINS, MINING_MACHINES } from '../../Helpers/helper'
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
      machine_name: "NOMBRE",
      status: "ESTADO",
      name: "CLIENTE",
      hashrate: "HASHRATE",
      tempmax: "TEMP MAX",
      maxfan: "VENTILADOR MAX",
      uptime: "UPTIME",
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
    setModalType("Add")
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
          <Col md={6} className="endmain">
            <div className='limittic'><div onClick={() => handleModalForm('Minero')} className="btnadd" id='ticketmain'> Agregar minero</div></div>
          </Col>
        </Row>
        <Row>
          <Col md={6} className="mt-3 mb-3">

            <div class="css-89u161">
              <div class="css-kb1ety"><dd class="css-pxccrj">454.11 TH</dd><dt class="css-6qnch9">Hashrate</dt></div>
              <div class="css-kb1ety"><dd class="css-pxccrj">99.80%</dd><dt class="css-6qnch9">Share Efficiency</dt></div>
              <div class="css-kb1ety"><dd class="css-pxccrj">0.00001696 BTC</dd><dt class="css-6qnch9">Mined Revenue</dt></div>
            </div>

          </Col>
          
        </Row>
        {
          isLoaded === false ?
            <DumpTable link='/mineros/' headers={state?.headers} data={formatedList} />
            :
            <Table link='/mineros/' headers={state?.headers} data={((formatedList))} />
        }
      </Container>
    </div >
  )
}

export default Mineros