import { useContext, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { DataContext } from "../../Commons/Context/DataContext";
import ModalContainer from "../../Commons/ModalContainer";
import SearchTable from "../../Commons/SearchTable";
import DumpTable from "../../Commons/Table/DumpTable";
import Table from "../../Commons/Table/Table";
import { formatedEnerdffdsafdgy, formatedParametersList } from "../../Helpers/formats";
import { ENERGIA, PARAMS_API } from "../../Helpers/helper";
import EnergyComponent from "./EnergyComponent";
import ParametrizacionForm from "./forms/ParametrizacionForm";

const Parametrizacion = () => {
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
    headersEnergy: {
      id____: "Codigo ",
      precio: "Precio (USD)",
      created_at: "Fecha de creacion",
      updated_at: "Fecha de actualizacion",
      actions: "Acciones"
    }
  }


  const [state, setState] = useState(initialState);
  const { modalstatus, setModalStatus } = useContext(DataContext);
  const { sidebarStatus } = useContext(DataContext);
  const { modalType, setModalType } = useContext(DataContext);
  const [isLoaded, setIsLoaded] = useState(false);
  const { dataidrow } = useContext(DataContext);
  const modal = modalstatus;
  const [data, setData] = useState();

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
    switch (state?.form) {
      case "Parametrizacion":
        return (
          <ParametrizacionForm modalType={modalType} id_param={id_param} datas={data} />
        )
      default:
        return <ParametrizacionForm modalType={modalType} id_param={id_param} />
    }
  };

  useEffect(() => {

    const getAllParams = async () => {
      try {
        const request = await fetch(PARAMS_API),
          response = await request.json();
        setData(response);
        setIsLoaded(true);
      } catch (error) {
        console.log(error);
      }
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
        <Row className="mt-3">
          <h4 className="">Parametrizaciones</h4>
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
      <Container fluid={true} className="">
        <EnergyComponent />
      </Container>
    </div>
  );
};

export default Parametrizacion;
