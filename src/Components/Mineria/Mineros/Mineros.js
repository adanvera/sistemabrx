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
      id_machine_tex: '',
      machine_name: "NOMBRE",
      status: "ESTADO",
      name: "CLIENTE",
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
  const [valueBTC, setValueBTC] = useState('')
  const [coins, setCoins] = useState('')

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
    setModalStatus(false)
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

    const getBtc = async () => {
      const optionns = {
        method: 'GET',
      }
      try {
        const res = await fetch("https://api.minerstat.com/v2/coins?list=BTC", optionns),
          json = await res.json()
        setValueBTC(json)
      } catch (error) {
        console.log(error);
      }
    }

    getBtc()
    const getCurrenc = async () => {
      const optionns = {
        method: 'GET',

      }
      try {
        const res = await fetch("https://es.beincrypto.com/wp-json/ceranking/v2/filter-data?val=&filter=coinid-with-fiat", optionns),
          json = await res.json()
        setCoins(json)
      } catch (error) {
        console.log(error);
      }
    }
    getCurrenc()
  }, []);

  const formatedList = formatedDataMiners(dataList)
  /**filtrar por Bitcoin */
  const filterByBitcoin = coins ? coins?.filter((item) => item.name === 'Bitcoin') : ''
  const imgBtc = filterByBitcoin ? filterByBitcoin[0]?.logo : ''

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
          <Col md={12} className="mt-3 mb-3">
            <div class="mb-3 card">
              <div class="card-header-tab card-header">
                <div class="card-header-title font-size-lg text-capitalize font-weight-normal">
                  <i class="header-icon lnr-charts icon-gradient bg-happy-green"> </i>
                  <img className='pr-1' src={imgBtc} alt="btc" height={30} width={30} /> <span className='ml-1'  >Bitcoin</span>
                </div>
              </div>
              <div class="no-gutters row mb-3 mt-3">
                <div class="col-sm-6 col-md-4 col-xl-4">
                  <div class="card no-shadow rm-border bg-transparent widget-chart text-left">
                    <div class="icon-wrapper rounded-circle">
                      <div class="">
                        <ion-icon name="pulse-outline"></ion-icon>
                      </div>
                    </div>
                    <div class="widget-chart-content">
                      <div class="widget-numbers">Difficulty</div>
                      <div class="widget-numbers">{valueBTC[0]?.difficulty}</div>
                    </div>
                  </div>
                  <div class="divider m-0 d-md-none d-sm-block"></div>
                </div>
                <div class="col-sm-6 col-md-4 col-xl-4">
                  <div class="card no-shadow rm-border bg-transparent widget-chart text-left">
                    <div class="icon-wrapper rounded-circle">
                      <div class="">
                        <ion-icon name="podium-outline"></ion-icon>
                      </div>
                    </div>
                    <div class="widget-chart-content">
                      <div class="widget-subheading">Network hashrate</div>
                      <div class="widget-numbers"><span>{valueBTC[0]?.network_hashrate}</span></div>
                    </div>
                  </div>
                  <div class="divider m-0 d-md-none d-sm-block"></div>
                </div>
                <div class="col-sm-12 col-md-4 col-xl-4">
                  <div class="card no-shadow rm-border bg-transparent widget-chart text-left">
                    <div class="icon-wrapper rounded-circle">
                      <div class="">
                        <ion-icon name="flash-outline"></ion-icon>
                      </div>
                    </div>
                    <div class="widget-chart-content">
                      <div class="widget-subheading">Precio</div>
                      <div class="widget-numbers text-success"><span>{valueBTC[0]?.price}</span></div>
                    </div>
                  </div>
                </div>
              </div>

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