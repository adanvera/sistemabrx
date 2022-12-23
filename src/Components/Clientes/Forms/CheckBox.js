import { useState } from 'react';
import Form from 'react-bootstrap/Form';

function CheckBox({ setTypesOperations }) {
  const [checkedCompra, setCheckedCompra] = useState(true);
  const [checkedVenta, setcheckedVenta] = useState(false);
  const handleChecked = (e) => {
    if (e.target.value === '1') {
      setCheckedCompra(true)
      setcheckedVenta(false)
    } else {
      setCheckedCompra(false)
      setcheckedVenta(true)
    }
    setTypesOperations(e.target.value)

  }

  return (
    <Form>
      <label>Tipo de operacion</label>
      {['radio'].map((type) => (
        <div key={`default-${type}`} className="">
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