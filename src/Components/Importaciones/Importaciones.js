import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { DataContext } from '../Commons/Context/DataContext'
import ModalContainer from '../Commons/ModalContainer'
import SearchTable from '../Commons/SearchTable'
import DumpTable from '../Commons/Table/DumpTable'
import Table from '../Commons/Table/Table'
import { filteredDataUsers, formatedDataImportaciones, formatedDataUsers } from '../Helpers/formats'
import { IMPORTACIONES } from '../Helpers/helper'
import ImpForms from './Forms/ImpForms'


function Importaciones() {

  /**declaramos e inicializamos variables a utilizar */
  const initialState = {
    form: 'Importaciones',
    title: 'IMPORTACIONES',
    headers: {
      id_importacion: "ID",
      id_cliente: "ID CLIENTE",
      id_proveedor: "ID PROVEEDOR",
      machinedata: "MACHINEDATA",
      empresa_envio: "EMPRESA ENVIO",
      tracking_number: "TRACKING NUMBER",
      valor_envio: "VALOR ENVIO",
      fecha_envio: "FECHA ENVIO",
      fecha_arribo: "FECHA ARRIBO",
      comentario_importacion: "COMENTARIO IMPORTACION",
      articulos: "ARTICULOS",
    },
    filtros: {
      name: '',
      estado: '',
      rol: '',
      desde: '',
      hasta: '',
    },
  }

  /**acciones que son utilizadas al cargar datos de
   * las consultas
   */

  const { sidebarStatus, setSidebarStatus } = useContext(DataContext)
  /**acciones que son utilizadas al cargar datos de
   * las consultas
   */
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [state, setState] = useState(initialState)
  const { modalstatus, setModalStatus } = useContext(DataContext)
  const { modalType, setModalType } = useContext(DataContext)
  const [dataList, setDataList] = useState('')
  const modal = modalstatus
  const { subPermissons, setSubPermissons } = useContext(DataContext)
  let navigate = useNavigate()
  const { dataidrow } = useContext(DataContext)
  const modaal = modalstatus
  const usermodal = modalType

  useEffect(() => {
    const getImportaciones = async () => {
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
        const res = await fetch(IMPORTACIONES, options),
          json = await res.json()
        /**seteamos loading */
        setIsLoaded(true);
        /**seteamos el listado de tickets */
        setDataList(json.content);

      } catch (error) {
        console.log(error);
      }

    }

    getImportaciones()
  }, [])


  console.log(dataList);

  const formatedList = formatedDataImportaciones(dataList)

  /**guardamos id de usuario clikeado en la tabla
* seteado mediante el use context
*/
  const id_user = dataidrow

  /**funcion para setear form clickeado */
  const pickForm = () => {
    switch (state?.form) {
      case 'Importaciones':
        return <ImpForms modalType={modalType} id_user={id_user} />
    }
  }

  //onchange correspondiente para hacer la busqueda 
  const handleSearch = data => {
    setState(prev => ({
      ...prev,
      filtros: {
        ...prev.filtros,
        name: data,
      },
      currentPage: 1,
    }))
  }

  const verifyRoleSub = (data) => {
    if (data === 1) {
      return (
        <Col md={6} className="endmain">
          <div className='limittic'>
            <div onClick={(e) => handleOnClick(e, '_AddImport', state?.form)} className="btnadd" id='ticketmain'>
              Crear importación
            </div>
          </div>
        </Col>
      )
    } else {
      return (
        <Col md={6} className="endmainnn notallowed">
          <div className='limittic'>
            <div className="btnadd-not-allowed" id='ticketmain'>
              Crear importación
            </div>
          </div>
        </Col>
      )
    }
  }

  const handleOnClick = (e, btn, form) => {
    e.preventDefault()
    setModalStatus(true)

    if (btn === '_AddImport') {
      setModalType('Add')
      setState(prev => {
        return {
          ...prev,
          form: form,
          title: form
        }
      })
    }
  }


  return (
    <div className={sidebarStatus === 'open' ? 'main-content' : 'main-content extend'} >
      {modal && (
        <ModalContainer
          title={state?.title}
          form={pickForm()}
          modalStatus={modal}
          modalType={usermodal}
        />
      )}
      <Container fluid={true} className="">
        <Row className=" is-3 text-al-ini titlemodule"><h5 className="title-details ml-5 pt-3">Nómina de importaciones</h5></Row>
        <Row>
          <Col md={6} >
            <SearchTable
              placeholder='Buscar una importación...'
              handleChange={handleSearch}
            />
          </Col>
          {verifyRoleSub(subPermissons)}
        </Row>
        
        {
          isLoaded === false ?
            <DumpTable headers={state?.headers} data={formatedList} />
            :
            <Table headers={state?.headers} data={filteredDataUsers(formatedList, state?.filtros)} exportdata={true} title="Importaciones" />
        }
      </Container>
    </div>
  )
}

export default Importaciones