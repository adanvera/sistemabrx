import React, { useContext, useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { formatCoins, formatedCoins, formatedShortOp, formatImpShort, formatNowShoertTciket } from '../Helpers/formats';
import { API_COINS, DOLLAR_API, IMPORTACIONES, OPERATION_PROD, TICKETS } from '../Helpers/helper';
import { DataContext } from './Context/DataContext';
import Table from './Table/Table';

function Dashboard() {

  /**accedemos a los datos del usuario logueado mediante el 
  * data context donde seteamos el usuario correspondiente al loguear
  */
  const { user } = useContext(DataContext)
  const userAuthed = user

  const initialState = {
    headers: {
      ticket_name: "Nombre",
      created_at: "Fecha de creación",
      priority: "Prioridad",
    },
    headerimp: {
      tracking_number: "Tracking Number",
      id_cliente: "ID Cliente",
      id_proveedor: "ID Proveedor",
      valor_envio: "Valor Envio",
    },
    headerOperation: {
      cliente: "Cliente",
      monto: 'Monto',
      comision: 'Comision',
      tipoOperaciones: 'Tipo operacion',
      tipoMoneda: 'Moneda',
    }
  }

  const [state, setState] = useState(initialState)
  const [datatest, setDatatest] = useState('')


  /**acciones que son utilizadas al cargar datos de
   * las consultas
   */
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [dataList, setDataList] = useState('')
  const [shortImportaciones, setShortImportaciones] = useState('')
  const { sidebarStatus, setSidebarStatus } = useContext(DataContext)
  const [dataOperations, setDataOperations] = useState('')
  const [dolar, setDolar] = useState('')


  /**funcion para formatear fecha */
  const formatDate = () => {
    const months = ["Enero", "Frebrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    const days = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sábado"];
    var date = new Date();
    const currenDay = days[date.getDay()]
    const month = months[date.getMonth()];
    const withPmAm = date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
    var currentDate = currenDay + " " + date.getDate() + " de " + month + " del " + date.getFullYear() + " , " + withPmAm;
    return (currentDate)
  }

  const [coins, setCoins] = useState('')
  const [btcDolar, setBtcDolar] = useState('')
  const [valueBTC, setValueBTC] = useState('')

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
    const getTickets = async () => {
      try {
        const res = await fetch(TICKETS, options),
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
    getTickets()

    const getImportaciones = async () => {
      /** Obtenemos los valores que guardamos en el token para poder utilizarlos
      * en la siguiente consulta
      */
      const token = localStorage.getItem("token") ? localStorage.getItem("token") : ''
      const options = {
        method: 'GET',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'token': token
        },
      }
      try {
        const res = await fetch(IMPORTACIONES, options),
          json = await res.json()
        /**seteamos loading */
        setIsLoaded(true);
        /**seteamos el listado de tickets */
        setShortImportaciones(json);

      } catch (error) {
        console.log(error);
      }
    }

    getImportaciones()
    const getOperations = async () => {
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
      try {
        const res = await fetch(OPERATION_PROD, options),
          json = await res.json()
        /**seteamos loading */
        setIsLoaded(true);
        setDataOperations(json);
      } catch (error) {
        console.log(error);
      }
    }
    getOperations()

    const getDollar = async () => {
      /**mandamos el header de nuestra consulta */
      const options = {
        method: 'GET',
      }
      try {
        const res = await fetch(DOLLAR_API, options),
          json = await res.json()
        /**seteamos loading */
        setIsLoaded(true);
        setDolar(json.dolarpy.maxicambios);
      } catch (error) {
        console.log(error);
      }
    }
    getDollar()

    const getCurrencies = async () => {
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

    getCurrencies()

    const btcDolarApi = async () => {
      const optionns = {
        method: 'GET',

      }
      try {

        const res = await fetch("https://api.coingecko.com/api/v3/simple/price/?ids=bitcoin&vs_currencies=usd", optionns),
          json = await res.json()
        setBtcDolar(json)

      } catch (error) {
        console.log(error);
      }

    }

    btcDolarApi()

    const getBtc = async () => {
      const optionns = {
        method: 'GET',
        // mode: 'no-cors',
        // headers: {
        //   'Access-Control-Allow-Origin': '*',
        //   'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        // }
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

  }, []);

  const priceDollar = btcDolar ? btcDolar.bitcoin.usd : ''

  /**sort by date ticketlist */
  dataList && dataList.sort((a, b) => { return new Date(b.created_at) - new Date(a.created_at) })
  /**shortlist ticket */
  const formatedDataShortTciket = dataList ? formatNowShoertTciket(dataList.slice(0, 5)) : ''
  /**sort by date importacion list */
  shortImportaciones && shortImportaciones.sort((a, b) => { return new Date(b.created_at) - new Date(a.created_at) })
  /**short list importaciones */
  const datashorimp = formatImpShort(shortImportaciones.slice(0, 5))
  /**sort by date operations */
  dataOperations && dataOperations.sort((a, b) => { return new Date(b.created) - new Date(a.created) })
  /**short list operations */
  const operations = (formatedShortOp(dataOperations.slice(0, 5)))

  const actualDate = new Date().getHours()
  const dataCoin = formatedCoins(coins)

  const coinheader = {
    logo: "",
    name: "Name",
    symbol: "Symbol",
    price: "Price",
  }

  /**filtrar por Bitcoin */
  const filterByBitcoin = coins ? coins?.filter((item) => item.name === 'Bitcoin') : ''
  // const filter = valueBTC ? valueBTC.filter((item) => item.coin === 'BTC') : ''
  const formatedData = formatCoins(filterByBitcoin, priceDollar,)
  const imgBtc = filterByBitcoin ? filterByBitcoin[0]?.logo : ''

  return (
    <>
      <div className={sidebarStatus === 'open' ? 'main-content mb-5' : 'main-content extend mb-5'} >
        <Row>
          <Col className='col-md-10 msg-wlc'>
            <div className='wlcmone'>
              <div className='iconwlc'>
                {
                  (actualDate > 5 && actualDate < 17) ?
                    <ion-icon name="sunny-outline"></ion-icon> :
                    <ion-icon name="moon-outline"></ion-icon>
                }
              </div>
              <div>
                <h4>¡Hola {userAuthed.name} , Bienvenido/a!</h4>
                <>{formatDate()}</>
              </div>
            </div>
          </Col>
          <Col className='col-md-2 d-flex dolarapi'>
            <div className='dolaricon'>
              <ion-icon name="cash-outline"></ion-icon>
            </div>
            <div className='dolar-content__icon'>
              <span className='spandollar'>DOLAR</span>

              {
                dolar ?
                  <p>Compra: <strong>{dolar.compra} Gs.</strong></p> :
                  <h4>0</h4>
              }
              {
                dolar ?
                  <p>Venta: <strong>{dolar.venta}  Gs.</strong></p> :
                  <h4>0</h4>
              }
            </div>
          </Col>
        </Row>
      </div>
      <div className={sidebarStatus === 'open' ? 'main-content mapl' : 'main-content extend mapl'} >
        <Row className='ml-2'>
          <Row >
            <h4 className='resumen'>Sumario de actividades</h4>
          </Row>
          <Row className='justify-content-between'>
            <Col className="mt-3 " >
              <h6>Últimos tickets añadidos</h6>
              <div className='shortlist'>
                <Table headers={state?.headers} data={((formatedDataShortTciket))} nopagination={true} />
              </div>
            </Col>
            <Col className="mt-3 ">
              <h6>Últimas importaciones realizadas</h6>
              <div className='shortlist'>
                <Table headers={state?.headerimp} data={((datashorimp))} nopagination={true} />
              </div>
            </Col>
            <Col className="mt-3 ">
              <h6>Últimas operaciones realizadas</h6>
              <div className='shortlist'>
                <Table headers={state?.headerOperation} data={((operations))} nopagination={true} />
                <span></span>
              </div>
            </Col>
          </Row>
          <Row className="w-100 mt-4">
            <Row >
              <h4 className='resumen'>Market</h4>
            </Row>
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
                      <div class="widget-numbers">Dificultad</div>
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
                      <div class="widget-subheading">Tasa de hash de red</div>
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
        </Row>
      </div>
    </>
  )
}

export default Dashboard