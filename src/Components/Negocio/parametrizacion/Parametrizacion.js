import { useContext, useEffect, useState } from "react"
import { Col, Container, Row } from "react-bootstrap"
import { DataContext } from "../../Commons/Context/DataContext"
import ModalContainer from "../../Commons/ModalContainer"
import SearchTable from "../../Commons/SearchTable"
import DumpTable from "../../Commons/Table/DumpTable"
import Table from "../../Commons/Table/Table"
import ParametrizacionForm from "./forms/ParametrizacionForm"


const Parametrizacion = () => {
    const initialState = {
        modalShow: false,
        form: 'Parametrizacion',
        headers: {
            id: 'Codigo ',
            descripcion: "Descripcion",
            valor: 'Valor',
            actions: 'Acciones'

            
        },
        title: 'Agregar parametro',
        actions: 'Acciones',

        filtros: {
            name: '',
        },
    }
    const [state, setState] = useState(initialState)
    const { modalstatus, setModalStatus } = useContext(DataContext)
    const { sidebarStatus, setSidebarStatus } = useContext(DataContext)
    const {modalType,setModalType} = useContext(DataContext);
    const [isLoaded, setIsLoaded] = useState(false);
    const { dataidrow } = useContext(DataContext)
    const modal = modalstatus
    const [data,setData] = useState()






    const handleModalForm = (form) => {
        console.log('Han');
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
    const id_param = dataidrow
    const pickForm = () => {
        console.log('Pick');
        switch (state?.form) {
            case 'Parametrizacion':
                return <ParametrizacionForm modalType={modalType} id_param={id_param} />
        }
    }

    
    useEffect(() => {
        const getAllParams = async ()=>{
            const request = await fetch("http://localhost:4000/api/params/"),
                  response =  await request.json()
                  console.log(request);
                  console.log(response);
                  
            setData(formatParams(response.params)) 
            
            setIsLoaded(true)     


        }
        getAllParams()
    }, []);

    const formatParams = (params)=>{
        console.log(params);
        let listParams = []
        params.forEach( el => {
            let format = {
                codigo:0,
                name:'',
                value:'',
                actions:'x x'
            }
            format.codigo = el.codigo
            format.name = el.name
            format.value = el.value
            listParams.push(format)
        });
        return listParams
    }
    return (
        <div className={sidebarStatus === 'open' ? 'main-content' : 'main-content extend'} >
            <Container fluid={true} className="">
                {modal && (
                    <ModalContainer
                        title={state?.title}
                        form={pickForm()} 
                        modalStatus={modal}
                        modalType={modalType}
                    />
                )}
                <Row className=" is-3 text-al-ini titlemodule"><h5 className="title-details ml-5 pt-3">Parametrizaciones</h5></Row>
                <Row>
                <Col md={6} >
                        <SearchTable
                            placeholder='Buscar parametrizacion...'
                            /* handleChange={handleSearch} */
                        />
                    </Col>
                    <Col md={6} className="endmain">
                        <div className='limittic'><div onClick={() => handleModalForm('Parametrizacion')} className="btnadd" > Crear parametro</div></div>
                    </Col>
                </Row>
                {
                    isLoaded === true ?
                       
                        <Table link='/parametrizaciones/' headers={state?.headers} data={data} />:''
                }
            </Container>
        </div>
    )
}

export default Parametrizacion