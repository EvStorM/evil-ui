import * as React from 'react'
import {View, Image} from 'remax/ali'
import style from './loading.less'
import {from, interval, timer} from "rxjs";

export default class EvLoading extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow: false
        }
    }

    static defaultProps = {
        isShow: false,
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
        const {isShow} = this.state
        return (
            <View className={style.box}>
                {isShow &&
                <View className={style.loadBox}>
                    <Image className={style.loadImg} src={'./loading.gif'}/>
                </View>
                }{!isShow &&
            this.props.children
            }
            </View>
        )
    }
}