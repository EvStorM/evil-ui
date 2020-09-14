import * as React from 'react'
import {View, Image} from "remax/ali";
import style from './select.less'
import img from './unfold.png'
import yes from './yes.png'

export class Selects extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            visible: false
        }
    }

    static defaultProps = {
        className: '',
        title: '',
        custom: false,
        options: [],//
        defaultValue: null, //初始的默认值
        size: 'medium', //选择器尺寸
        placeholder: '请选择..',
        state: '',// 可选值: 'error', 'loading'
        value: null,
        disabledValue: null,
        disabled: false,  //Boolean  是否禁用选择器
        followTrigger: true, //Boolean 是否跟随滚动
        mode: 'single', //选择器模式 可选值: 'single', 'multiple', 'tag'
        autoWidth: true, //Boolean 下拉菜单是否与选择器对齐，如果需要下拉区域自动撑开，需要配置为false
        dataSource: [{label: 'option1', value: 'option1'}, {label: 'option2', value: 'option2'}, {
            label: 'disabled',
            value: 'disabled',
            disabled: true
        }],//传入的数据源，const dataSource = [ {label:'option1', value:'option1'}, {label:'option2', value:'option2'}, {label:'disabled', disabled:true}];
        onChange: null, //Select发生改变时触发的回调  event.detail.value:选中的值
        onFocus: null,
        onRef: null
    }

    componentDidMount() {
        if (this.props.defaultValue != null) {
            this.setState({
                value: this.props.defaultValue,
            })
            return
        }
        this.setState({
            value: null,
        })
        this.props.onRef && this.props.onRef(this)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps !== this.props) {

        }
    }

    // 选择器显示
    visibleFunc = () => {
        let visible = this.state.visible
        this.setState({
            visible: !visible
        })
    }
    // 值更改
    onChange = (e) => {
        console.log(e);
        this.setState({
            value: e.value,
            visible: false
        })
        this.props.onChange && this.props.onChange(e)
    }

    render() {
        let {value, visible} = this.state
        let props = this.props
        return (
            <View className={props.className ? props.className : style.selectBox}>
                <View onTap={props.disabled ? null : this.visibleFunc.bind(this)} className={style.Box}>
                    <View className={style.select}>
                        {value ? <View>{value}</View> : <View className={style.placeholder}>{props.placeholder}</View>}
                    </View>
                    <Image className={style.icon} mode={'aspectFit'} src={img}/>
                </View>
                {visible &&
                <View className={style.dataSource}>
                    {props.dataSource && props.dataSource.map((v, i) => {
                        return (
                            <View onTap={v.disabled ? null : this.onChange.bind(this, v)} key={i} className={style.frs}>
                                {value && value === v.value ?
                                    <Image className={style.icon} mode={'aspectFit'} src={yes}/> :
                                    <Image className={style.icon} mode={'aspectFit'}/>
                                }
                                <View
                                    className={v.disabled ? style.SourceDis : style.Source}>{v.label}</View>
                            </View>
                        )
                    })
                    }
                </View>
                }
            </View>

        )
    }
}
