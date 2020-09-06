import * as React from 'react'
import {View, Image} from 'remax/ali'
import style from './cardBox.css'
import {timer} from "rxjs";
import loading from './802.gif'

export class CardBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow: false
        }
    }

    static defaultProps = {
        className: null,
        color: '#FFFFFF',
        width: '100%',
        height: 'auto',
        padding: '17px',
        minHeight: '0px',
        title: '',
        margin: '',
        isShow: false,
        keepOut: false,
        preview: false,
        time: 300
    }

    componentDidMount() {
        const delayForFiveSeconds = timer(this.props.time);
        delayForFiveSeconds.subscribe(res => {
            this.setState({
                isShow: this.props.isShow
            })
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.isShow !== prevProps.isShow) {
            const delayForFiveSeconds = timer(this.props.time);
            delayForFiveSeconds.subscribe(res => {
                this.setState({
                    isShow: this.props.isShow
                })
            })
        }
    }

    render() {
        let {isShow} = this.state
        const props = this.props
        return (
            <View className={style.cardBox}
                  style={`background-color: ${props.color};
                  width: ${props.width}; 
                  height: ${props.height};
                  margin:${props.margin};
                  min-height:${props.minHeight};        
`}>
                {props.title &&
                <View className={style.titleBox}>
                    {props.title}
                </View>
                }
                <View className={props.keepOut ? style.bod : props.title ? style.body : style.bodyBox}>
                    {isShow &&
                    <View className={style.loadBox}>
                        <Image className={style.loadImg} src={loading}/>
                    </View>
                    }
                    {!isShow && !props.preview &&
                    <View style={`padding: ${props.padding};`}>
                        {props.children}
                    </View>
                    }
                    {!isShow && props.preview &&
                    <View style={`width: 100%;height:100%;`}>
                        {props.children}
                    </View>
                    }
                </View>
            </View>
        )
    }
}