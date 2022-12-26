import React, { useEffect } from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { DataContext } from '../../Commons/Context/DataContext'
import ModalContainer from '../../Commons/ModalContainer'
import SearchTable from '../../Commons/SearchTable'
import DumpTable from '../../Commons/Table/DumpTable'
import Table from '../../Commons/Table/Table'
import { filteredDataGastos, gastosFormated } from '../../Helpers/formats'
import { GASTOS } from '../../Helpers/helper'
import FilterGastos from './FilterGastos'
import GastoForm from './Forms/GastoForm'

function Gastos() {

  const initialState = {
    headers: {
      description: "Descripción",
      amount: "Monto",
      type: "Tipo",
      created_at: "Fecha de creación",
      updated_at: "Fecha de actualización",
      actions: "Acciones"
    },
    filtros: {
      description: '',
      desde: '',
      hasta: '',
    },
    form: 'Gasto',
    title: 'GASTO',
  }


  const [state, setState] = useState(initialState)

  const { sidebarStatus, setSidebarStatus } = useContext(DataContext)
  const [amountList, setAmount] = useState()
  const [weekAmount, setWeekAmount] = useState()
  const [monthAmount, setMontAmount] = useState('DF')
  const [yearAmount, setYearAmount] = useState()
  const [isLoaded, setIsLoaded] = useState(false);
  const { modalstatus, setModalStatus } = useContext(DataContext)
  const formatedList = gastosFormated(amountList)
  const modal = modalstatus
  const { modalType, setModalType } = useContext(DataContext)
  const { subPermissons, setSubPermissons } = useContext(DataContext)

  useEffect(() => {

    const token = localStorage.getItem('token')

    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        token: token
      }
    }

    const getAmounts = async () => {
      try {
        const res = await fetch(GASTOS, options),
          json = await res.json()

        setAmount(json)
      } catch (error) {
        console.log(error);
      }
    }

    getAmounts()

    const getWeekAmount = async () => {
      try {
        const res = await fetch(GASTOS + "get/week", options)
        const data = await res.json()
        setWeekAmount(data[0]?.week_amount)
      } catch (error) {
        console.log(error);
      }
    }

    getWeekAmount()

    const getMonthAmount = async () => {
      try {
        const res = await fetch(GASTOS + "get/month", options)
        const data = await res.json()
        setMontAmount(data[0]?.month_amount)
      } catch (error) {
        console.log(error);
      }
    }

    getMonthAmount()

    const getYearAmount = async () => {
      try {
        const res = await fetch(GASTOS + "get/year", options)
        const data = await res.json()
        setYearAmount(data[0]?.year_amount)
      } catch (error) {
        console.log(error);
      }
    }

    getYearAmount()

  }, [])


  /**funcion para poner puntos de miles e interpretar decimales */
  const formatNumber = (number) => {
    return new Intl.NumberFormat("de-DE").format(number) + ' PYG'
  }

  //onchange correspondiente para hacer la busqueda 
  const handleSearch = data => {
    setState(prev => ({
      ...prev,
      filtros: {
        ...prev.filtros,
        description: data,
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

  const pickForm = () => {
    switch (state.form) {
      case 'Gasto':
        return <GastoForm modalType={modalType} />
    }
  }



  //funcion para limpiar los valores de las variables a utilizar
  const onCleanFilter = (data) => {
    setState((prevState) => {
      return {
        ...prevState,
        filtros: {
          ...data,
        }
      }
    })
  }


  //funcion para setear y pasar que filtro se selecciono
  const handleFilter = (data) => {

    setState((prevState) => {
      return {
        ...prevState,
        filtros: {
          ...prevState.filtros,
          [data.key]: data.value
        }
      }
    })
  }


  const verifySubpermissons = (sub) => {
    if (sub === 1) {
      return (
        <Col md={6} className="endmain">
          <div className='limittic'><div onClick={() => handleModalForm('Gasto')} className="btnadd" id='Add'>Agregar gasto</div></div>
        </Col>
      )
    } else {
      return (
        <Col md={6} className="endmain">
          <div className='limittic notallowed'><div className="btnadd-not-allowed" id='Add'>Agregar gasto</div></div>
        </Col>
      )
    }
  }

  return (
    <div className={sidebarStatus === 'open' ? 'main-content' : 'main-content extend'} >
      {modal && (
        <ModalContainer
          title={state?.title}
          form={pickForm()}
          modalStatus={modal}
        />
      )}
      <div className="container-fluid">
        <Row className='mt-3' >
          <Col md={6} >
            <SearchTable
              placeholder='Buscar gasto...'
              handleChange={handleSearch}
            />
          </Col>
          {
            verifySubpermissons(subPermissons)
          }
        </Row>

        <Row className='mt-3'>
          <Col>
            <Card
              bg='white'

              text='dark'
              style={{ width: '18rem' }}
              className="mb-2"
            >
              <Card.Body>
                <Card.Title> Gasto de la semana </Card.Title>
                <Card.Text>
                  {formatNumber(weekAmount)}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card
              bg='white'

              text='dark'
              style={{ width: '18rem' }}
              className="mb-2"
            >
              <Card.Body>
                <Card.Title>Gasto de los ultimos 30 dias</Card.Title>
                <Card.Text>
                  {formatNumber(monthAmount)}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card
              bg='white'

              text='dark'
              style={{ width: '18rem' }}
              className="mb-2"
            >
              <Card.Body>
                <Card.Title>Gastos totales del año</Card.Title>
                <Card.Text>
                  {formatNumber(yearAmount)}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <FilterGastos onCleanFilter={onCleanFilter} getFilter={handleFilter} />
        {
          isLoaded ?
            <DumpTable headers={state?.headers} data={formatedList} />
            :
            <Table headers={state?.headers} data={filteredDataGastos(formatedList, state?.filtros)} exportdata={true} title="gastos" />
        }
      </div>
    </div>
  )
}

export default Gastos
