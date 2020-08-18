import * as React from 'react'
import QRCode from '../../utils/qrcode.min'


export class QrCode extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imgUrl: null
        }
    }

    getQrcode(str, [margin, color]) {
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

    upImg() {
        let imgUrl = this.getQrcode(this.props.str + '', [this.props.margin, this.props.color])
        this.setState({
            imgUrl
        })
    }

    componentDidMount() {
        this.upImg()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps !== this.props) {
            this.upImg()
        }
    }

    render() {
        return (
            <image mode="aspectFit" style={'width:100%;height: 100%'} src={this.state.imgUrl}/>
        )
    }

}