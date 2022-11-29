import { useContext, useState } from "react"
import { Col } from "react-bootstrap"

const OperationsData = ()=>{

    const [typesOperations,setTypesOperations] = useState([{ label: "Compra", value: 1 }, { label: "Venta", value: 0 }])
    const currency = [{ label: "BTC", value: 1 }, { label: "USDT", value: 0 }]
    const [comision,setComision ] = useState(0)
    const [isLoaded, setIsLoaded] = useState(false);

    const handleTypeChange = (e)=>{
     console.log(e.target.value);   

    }
    const handleCurreyncyChange = (e)=>{
        console.log(e.target.value);   
   
    }
    
    return (
        <form md={12} >
                            <h5 className="title-details ml-5 pt-3 ">Datos de operacion</h5>
                            <Col>
                                <div className='datashow mt-3'>
                                    <label className='labeltk' >Tipo de operacion</label>
                                    <select onChange={(e) => handleTypeChange(e)} >

                                        {typesOperations.map((option) => (

                                            <option value={option.value} >{option.label}</option>

                                        ))}

                                    </select>

                                </div>

                            </Col>
                            <Col>
                                <div className='datashow mt-3'>
                                    <label className='labeltk' >Tipo de moneda</label>
                                    <select onChange={(e)=>handleCurreyncyChange(e)}>

                                        {currency.map((option) => (

                                            <option value={option.value}>{option.label}</option>

                                        ))}

                                    </select>

                                </div>

                            </Col>
                            <Col>
                                <div className='datashow mt-3'>
                                    <label className='labeltk' >Comision</label>
                                    <input className='inputshow' value={comision} onChange={(e)=>setComision(e.target.value)} />

                                </div>
                            </Col>
                            
                            <Col
                            >
                                <div className='datashow mt-3'>
                                    <label className='labeltk' >Monto transaccion</label>
                                    <input className='inputshow' value={""} />

                                </div>
                            </Col>
                            <Col>
                                <div className='datashow mt-3'>
                                    <input type="submit" className=" btnadd" value={"Realizar operacion"} />


                                </div>

                            </Col>

                        </form>
    )



}

 export default OperationsData