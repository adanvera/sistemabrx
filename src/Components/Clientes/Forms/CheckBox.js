import { useState } from 'react';
import Form from 'react-bootstrap/Form';

function CheckBox({ setTypesOperations,setCheckedCompra,checkedCompra,checkedVenta,setcheckedVenta,setCheckedAll,isAll = false,checkedAll }) {
  
  
  const handleChecked = async (e) => {
    console.log('Valueeee',e.target.value);
    
      setTypesOperations(e.target.value)
    if (e.target.value === '1') {
      setCheckedCompra(true)
      setcheckedVenta(false)
      setCheckedAll(false)

      
    } else if(e.target.value === '0'){
      setcheckedVenta(true)
      setCheckedCompra(false)
      setCheckedAll(false)

    }else{
      setCheckedAll(true)
      setCheckedCompra(false)
      setcheckedVenta(false)


    }
  
  
    


  }

  return (
    <Form>
      <label>Tipo de operacion</label>
      {['radio'].map((type) => (
        <div key={`default-${type}`} className="">
           {isAll?(<Form.Check
            type={type}
            label={`Todos`}
            value={"2"}
            onClick={(e) => handleChecked(e)}
            checked={checkedAll}
            className="mt-2"
          />):''}
          <Form.Check
            type={type}
            value={"1"}
            onClick={(e) => handleChecked(e)}
            label={`Compra `}
            className="mt-2"
            checked={checkedCompra}
          />

          <Form.Check
            type={type}
            label={`Venta`}
            value={"0"}
            onClick={(e) => handleChecked(e)}
            checked={checkedVenta}
            className="mt-2"
          />
         
        </div>
      ))}
    </Form>
  );
}

export default CheckBox;