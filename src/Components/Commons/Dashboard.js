import React, { useContext, useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { formatedCoins, formatedShortOp, formatImpShort, formatNowShoertTciket } from '../Helpers/formats';
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

    const shortTcicketList = dataList?.slice(0, 5)
    const ticketListByDatae = shortTcicketList ? (shortTcicketList).sort((a, b) => { return new Date(b?.created_at) - new Date(a?.created_at) }) : ''
    setDatatest(ticketListByDatae)

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


  }, []);

  const formatedDataShortTciket = formatNowShoertTciket(datatest)
  const datashorimp = formatImpShort(shortImportaciones.slice(0, 5))
  const operations = (formatedShortOp(dataOperations.slice(0, 5)))

  const actualDate = new Date().getHours()

  const dataCoin = formatedCoins(coins)

  const coinheader = {
    icon: '',
    name: "name",
    coin: "coin",
    reward: "reward",
    reward_block: "reward_block",
    price: "price",
    volume: "volume",
    updated: "Updated"
  }



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

        <Row>
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
          <h6>Crypto currencies</h6>

          <Col md={12}>
            <div className='shortlist item'>
              <Table headers={coinheader} data={((dataCoin))} nopagination={true} />
              <span></span>
            </div>
          </Col>
        </Row>

      </div>
    </>
  )
}

export default Dashboard