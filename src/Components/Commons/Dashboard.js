import React, { useContext, useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { formatNowShoertTciket } from '../Helpers/formats';
import { TICKETS } from '../Helpers/helper';
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

  }, [datatest,dataList]);




  const formatedDataShortTciket = formatNowShoertTciket(datatest)



  return (
    <>
      <div className="main-content-head">
        <Row>
          <Col className='col-md-10 msg-wlc'>
            <div className='wlcmone'>
              <div className='iconwlc'>
                <ion-icon name="happy-outline"></ion-icon>
              </div>
              <div>
                <h4>¡Hola, Bienvenido!</h4>
                <>{formatDate()}</>
              </div>
            </div>
          </Col>
          <Col>
            <div className='userdash'>
              {userAuthed.name}
            </div>
          </Col>
        </Row>
      </div>
      <div className="main-content" id='dash'>
        <Container fluid={true} className="">
          <Row>
            <Col md={4} className="mt-3">
              <h6>Últimos tickets añadidos</h6>
              <Table headers={state?.headers} data={((formatedDataShortTciket))} nopagination={true}/>
            </Col>
          </Row>
        </Container>

      </div>
    </>
  )
}

export default Dashboard