
import QRCode    from 'qrcode.react';
const QR = ({ data, size, images }) => {
  
  console.log(images);
    return (
        <QRCode
          value={data}
          title={"BTC"}
          size={size}
          bgColor="#FFFFFF"
          fgColor="#000000"
          imageSettings={{src:images ,height:70 , width:70}}
        />
      );

}
export default QR
