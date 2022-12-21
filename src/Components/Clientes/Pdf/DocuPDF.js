import React from "react";
import { Document, Page, Text, View, Image, StyleSheet } from "@react-pdf/renderer";
import TableHeader from "../../Commons/Table/TableHeader";
import logo from "../../../assets/images/logo.png";


const DocuPDF = ({ operations, cliente }) => {
  const dataOperationsHeader = {
    id: 'Operacion ',
    cliente: "Cliente",
    compra: 'Compra',
    venta: 'Venta',
    comision: 'Comision',
    tipoMoneda: 'Moneda',
    fecha: 'Fecha',

  }
  

  let sumatoriaVenta = 0
  let sumatoriaCompra = 0
  //Calculamos el total de venta y compra
  operations.forEach( op => {
    sumatoriaVenta += Number(op.venta);  
    sumatoriaCompra += Number(op.compra);  
  });

  return (
    <Document>
      <Page
        size="A4"
        style={{
          flexDirection: "column",
          marginTop:"20px",
          backgroundColor: "white",
        }}
      >
        {/**Cabecera del extracto */}
        <View style={{
          
          marginLeft: "20px",
          marginTop:"3px",
          borderColor: "black",
          fontSize: "12px",
          borderBottomWidth:1, 


        }}>
          <Text style={{ fontWeight: 'bold' }}>{`Denominacion:`}</Text>
          <Text style={{ width: "40%" }}>{`${cliente.name} ${cliente.last_name}`}</Text>
          <Text style={{ fontWeight: 'bold' }}>{`Documento:`}</Text>
          <Text>{`${cliente.document}`}</Text>
          <Text style={{ fontWeight: 'bold' }}>{`Direccion:`}</Text>
          <Text>{`${cliente.address} `}</Text>
          {/* <Image style={{ width: "20%",height:"20%", right:"10px" }}  src={logo}/> */}
        </View>

        {/**ENCABEZADO DE LA TABLA */}
        <View
          style={{
            border: "2px black;",
            marginLeft: "20px",
            borderColor: "black",
            fontSize: "12px",
            marginTop:"3px",
            borderBottomColor: '#bff0fd'
          }}
        >
          <Text>{`${dataOperationsHeader.id}           ${dataOperationsHeader.compra}       ${dataOperationsHeader.venta}                ${dataOperationsHeader.fecha} `}</Text>

        </View>

        {/**Aca se carga los datos  TABLA */}
        <View style={{
          fontSize: "12px",
          /* flexDirection: 'row',
          justifyContent:'space-between', */
          marginLeft: "20px",
          marginTop:"3px",
          borderTopWidth:1,
          /* alignItems: 'center', */
          fontStyle: 'bold',

        }}>
          {operations.map(op => {
            return (
              <View >
                {/* <Text style={{ width: "10%" }}>{ op.operation }</Text>
                <Text style={{ width: "30%" }}>{ op.compra }</Text>
                <Text style={{ width: "30%" }}>{ op.venta }</Text>
                <Text style={{ width: "20%" }}>{ op.fecha }</Text> */}
                {<Text >{ op.operation+'                  '+op.compra+'                  '+op.venta+'                  '+'                  '+op.fecha }</Text> }
              </View>

            )


          })}
        </View>

        {/**Aca se carga los datos el total */}
        <View style={{
          fontSize: "12px",
          flexDirection: 'row',
          marginLeft: "20px",
          borderTopWidth:1, 
          alignItems: 'center',
          fontStyle: 'bold',

        }}>
          <Text>
            {`Total                  ${sumatoriaCompra}                         ${sumatoriaVenta}`}
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default DocuPDF;
