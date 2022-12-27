import { useContext, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { DataContext } from "../../Commons/Context/DataContext";
import ModalContainer from "../../Commons/ModalContainer";
import SearchTable from "../../Commons/SearchTable";
import DumpTable from "../../Commons/Table/DumpTable";
import Table from "../../Commons/Table/Table";
import { formatedParametersList } from "../../Helpers/formats";
import ParametrizacionForm from "./forms/ParametrizacionForm";

const Parametrizacion = () => {
  const qrBtc = localStorage.getItem("QR-BTC") ? localStorage.getItem("QR-BTC") : ''
  const qrUSDT = localStorage.getItem("QR-USDT") ? localStorage.getItem("QR-USDT") : ''
  const initialState = {
    modalShow: false,
    form: "Parametrizacion",
    headers: {
      id: "Codigo ",
      descripcion: "Descripcion",
      valor: "Valor",
      actions: "Acciones",
    },
    title: "parametro",
    actions: "Acciones",

    filtros: {
      name: "",
    },
  };
  const [state, setState] = useState(initialState);
  const { modalstatus, setModalStatus } = useContext(DataContext);
  const { sidebarStatus, setSidebarStatus } = useContext(DataContext);
  const { modalType, setModalType } = useContext(DataContext);
  const [isLoaded, setIsLoaded] = useState(false);
  const { dataidrow } = useContext(DataContext);
  const modal = modalstatus;
  const [data, setData] = useState();
  const [paramsSelected,setParamsSelected] = useState('')
  const verifyBitcoin = (params)=>{
    console.log('Verify token');
    params.forEach( p =>{
      if(p.name === 'QR-BTC' && p.value !== qrBtc){
        localStorage.setItem("QR-BTC",p.value)
      }else if(p.name === 'QR-USDT' && p.value !== qrUSDT){
        localStorage.setItem("QR-USDT",p.value)

      }
    })

  }

  const handleModalForm = (form) => {
    setModalStatus(true);
    setModalType("Add");
    setState((prev) => {
      return {
        ...prev,
        form: form,
        title: form,
      };
    });
  };
  const id_param = dataidrow;

  const pickForm = () => {
    console.log("Pick");
    switch (state?.form) {
      case "Parametrizacion":
        return (
          <ParametrizacionForm modalType={modalType} id_param={id_param} datas ={data}/>
        )
      default:
        return <ParametrizacionForm modalType={modalType} id_param={id_param} />
    }
  };

  useEffect(() => {
    const getAllParams = async () => {
      const request = await fetch("https://backend.brxsgo.com/api/params/"),
        response = await request.json();
      setData(response);
      setIsLoaded(true);
      verifyBitcoin(response)
    };
    getAllParams()

  }, []);

  /**covert to array data */
  const dataToArray = (data) => {
    const dataArr = Object.keys(data).map((key) => {
      return data[key];
    });
    return dataArr;
  };

  const datddsd = data ? dataToArray(data) : '';
  const formatedParameters = data ? formatedParametersList(datddsd) : ''

  return (
    <div
      className={
        sidebarStatus === "open" ? "main-content" : "main-content extend"
      }
    >
      <Container fluid={true} className="">
        {modal && (
          <ModalContainer
            title={state?.title}
            form={pickForm()}
            modalStatus={modal}
            modalType={modalType}
          />
        )}
        <Row className=" is-3 text-al-ini titlemodule">
          <h5 className="title-details ml-5 pt-3">Parametrizaciones</h5>
        </Row>
        <Row>
          <Col md={6}>
            <SearchTable
              placeholder="Buscar parametrizacion..."
            /* handleChange={handleSearch} */
            />
          </Col>
          <Col md={6} className="endmain">
            <div className="limittic">
              <div
                onClick={() => handleModalForm("Parametrizacion")}
                className="btnadd"
              >
                {" "}
                Crear parametro
              </div>
            </div>
          </Col>
        </Row>
        {isLoaded === true ? (
          <Table link="/parametrizaciones/" headers={state?.headers} data={formatedParameters} />
        ) : (
          ""
        )}
      </Container>
    </div>
  );
};

export default Parametrizacion;
