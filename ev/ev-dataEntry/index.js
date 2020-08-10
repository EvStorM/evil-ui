import * as React from 'react'
import {View} from "remax/ali";
import EvSelect from "../ev-select";
import EvInput from "../ev-input";
import RadioGroup from "../ev-radioGroup";
import CheckGroup from "../ev-checkGroup";
import EvRadio from "../ev-radio";
import EvCheck from "../ev-check";
import FromItem from "../ev-fromItem";
import EvTextarea from '../ev-textarea'

export default class DataEntry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: false,
            inputValue: false,
            customValue: false
        }
        this.empty = null
    }

    static defaultProps = {
        disableData: null,
        className: null,
        width: '100%',
        height: 'auto',
        padding: '0',
        disabledValue: null,
        disabled: false,
        onChange: null,
        dataSource: null,
        defaultValue: null,
        type: null,
        emptyData: false
    }

    debounce(fn, delay) {
        let timer = null
        //闭包
        return function () {
            if (timer) {
                clearTimeout(timer)
            }
            timer = setTimeout(fn, delay)
        }
    }

    onRef(ref) {
        this.empty = ref
    }

    onChange(e) {
        console.log('e.detail.value', e);
        this.setState({
            value: e
        })
        this.props.onChange && this.props.onChange(e)
    }

    onChangeCheck(e) {
        console.log('e.detail.value', e);
        this.setState({
            value: e
        })
        this.props.onChange && this.props.onChange(e)
    }


    onChangeInput(e) {
        console.log('e.detail.value', e);
        this.setState({
            inputValue: e
        })
        this.props.onChange && this.props.onChange(e)
    }

    onCustomValue(e) {
        console.log('e.detail.value', e);
        this.setState({
            customValue: e
        })
        this.debounceCustomValue()
    }

    debounceCustomValue = this.debounce(() => {
        let value = this.state.value
        value[value.indexOf('自定义')] = this.state.customValue
        this.props.onChange && this.props.onChange(value)
    }, 300)
    debounceInputChange = this.debounce(() => {
        let value = this.state.inputValue
        this.props.onChange && this.props.onChange(value)
    }, 300)

    render() {
        let {className, max, disableData, placeholder, defaultValue, disabled, disabledValue, height, width, padding, dataSource, type} = this.props
        return (
            <View style={`width: ${width}; height:${height};padding:${padding};`}>
                {type && type == 'select' &&
                <View className={'ev-fc-start'}>
                    <EvSelect dataSource={dataSource && dataSource} disabledValue={disabledValue}
                              defaultValue={defaultValue} disabled={disabled}
                              onRef={this.onRef} custom={this.state.value == '自定义'}
                              onChange={this.onChange.bind(this)}></EvSelect>
                    {this.state.value && this.state.value == '自定义' &&
                    <EvInput className={'ev-m-t-6'} defaultValue={defaultValue} size={'medium'}
                             disabledValue={disabledValue} placeholder={placeholder}
                             onBlur={this.onChangeInput.bind(this)}></EvInput>
                    }
                </View>
                }
                {type && type == 'cascade' &&
                <View className={'ev-fr-start'}>
                </View>
                }
                {type && type == 'checkGroup' &&
                <View>
                    <EvSelect dataSource={dataSource && dataSource} disabled={disabled}
                              defaultValue={defaultValue}
                              onRef={this.onRef} mode={'multiple'}
                              onChange={this.onChange.bind(this)}></EvSelect>
                </View>
                }
                {type && type == 'input' &&
                <EvInput size={'medium'} disabled={disabled} defaultValue={defaultValue}
                         disabledValue={disabledValue} placeholder={placeholder}
                         maxLength={max}
                         onBlur={this.onChangeInput.bind(this)}></EvInput>
                }
                {type && type == 'radioGroup' &&
                <RadioGroup disabled={disabled} onChange={this.onChange.bind(this)} defaultValue={defaultValue}
                            dataSource={dataSource && dataSource}>
                </RadioGroup>}
                {type && type == 'multiple' &&
                <View className={'ev-fc-start'}>
                    <CheckGroup disabled={disabled} onChange={this.onChangeCheck.bind(this)} defaultValue={defaultValue}
                                dataSource={dataSource && dataSource}>
                    </CheckGroup>
                    {this.state.value && (this.state.value[this.state.value.length - 1] == '自定义'
                        || this.state.customValue) &&
                    <EvInput className={'ev-m-t-6 ev-dis-b'} size={'medium'} defaultValue={defaultValue}
                             placeholder={placeholder} onBlur={this.onCustomValue.bind(this)}></EvInput>
                    }
                </View>
                }
                {type && type == 'radio' &&
                <EvRadio>
                    <EvInput disabled={disabled} size={'medium'}
                             onChange={this.onChange.bind(this)}></EvInput>
                </EvRadio>}
                {type && type == 'check' &&
                <CheckGroup
                >
                    {dataSource && dataSource.map(item => {
                        return (
                            <EvCheck disabled={disabled} defaultValue={defaultValue}
                                     onChange={this.onChange.bind(this)}>
                                {item.label}
                            </EvCheck>
                        )
                    })
                    }
                </CheckGroup>

                }
                {type && type == 'textarea' &&
                <EvTextarea placeholder={placeholder} defaultValue={defaultValue}
                            maxLength={max}
                            onBlur={this.onChangeInput.bind(this)}/>
                }
            </View>
        )
    }
}