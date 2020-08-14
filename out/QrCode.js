import * as React from 'react'
import {useNativeEffect} from "remax";
import QRCode from '../utils/qrcode.min'

function getQrcode(str, [margin, color]) {
    let qrcode = ''
    const opts = {
        errorCorrectionLevel: 'M',
        type: 'svg',
        quality: 0.3,
        margin: margin ? margin : 0,
        maskPattern: 4,
        // version: 10,
        color: color ? color : {
            dark: "#333333",
            light: "#FFFFFF"
        }
    }
    QRCode.toString(str, opts, function (err, url) {
        if (err) throw err
        qrcode = 'data:image/svg+xml;base64,' + Buffer(url ? url : '').toString('base64');

    })
    return qrcode
}


const QrCode = (props) => {
    const [imgUrl, setImgUrl] = React.useState(null)
    useNativeEffect(() => {
        let str = getQrcode(props.str + '', [props.margin, props.color])
        setImgUrl(str)
    }, [imgUrl])
    return (
        <image mode="aspectFit" style={'width:100%;height: 100%'} src={imgUrl}></image>
    )
}
export default QrCode