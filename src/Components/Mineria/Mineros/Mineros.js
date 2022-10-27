import React, { useContext, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { DataContext } from '../../Commons/Context/DataContext'
import ModalContainer from '../../Commons/ModalContainer'
import SearchTable from '../../Commons/SearchTable'
import MachineForm from '../Forms/MachineForm'
import MineroForms from '../Forms/MineroForms'

function Mineros() {

  /**declaramos e inicializamos variables a utilizar */
  const initialState = {
    form: 'Minero',
    title: 'MINERO',
  }
  const [state, setState] = useState(initialState)
  const { modalstatus, setModalStatus } = useContext(DataContext)
  const { modalType, setModalType } = useContext(DataContext)
  const modal = modalstatus
  let navigate = useNavigate()

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

  return (
    <div className="main-content">
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
      </Container>
    </div >
  )
}

export default Mineros