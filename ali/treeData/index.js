import * as React from 'react'
import {View, Image} from 'remax/ali'
import styles from './treeData.less'
import {useState} from "react";
import FromItem from "../ev-fromItem";
import EvInput from "../ev-input";
import CardBox from "../ev-cardBox";

const TreeData = (props) => {
    const [onShow, setonShow] = useState('onShow');
    const [headline, setHeadline] = useState('');
    const [nameNum, setNameNum] = useState('0');
    const [modalShow, setmodalShow] = useState(false);
    const [maxLength, setmaxLength] = useState(5);
    const [inputState, setinputState] = useState(null);
    const [inputHelp, setinputHelp] = useState(null);

    let defaultProps = {
        tier: 0,
        className: null,
        width: '100%',
        height: 'auto',
        padding: '0',
        disabled: false,
        onChange: null,
        dataSource: null,
        defaultValue: null,
        type: null,
        emptyData: false
    }
    const onChange = (e) => {
        console.log(e);
        let value = e
        let btyeLeng = length(e)
        let rep = new RegExp('[^\\a-\\z\\A-\\Z0-9\u4E00-\u9FA5\\@\\.]',)
        if (rep.test(value)) {
            setinputState('error')
            setinputHelp('只能输入中文、英文、数字、@符号和.符号')
            return
        } else {
            setinputState(null)
            setinputHelp(null)
        }
        let lengths = (32 - (btyeLeng - e.length))
        setHeadline(e)
        setmaxLength(lengths)
        setNameNum(btyeLeng)
    }
    const
        length = (str) => {
            let r = /[^\x00-\xff]/g
            return str.replace(r, 'mm').length
        }

    return (
        <View className={styles.mainBox}
              style={`width: ${props.width}; height:${props.height};padding:${props.padding};margin: ${props.tier * 10}px;`}>
            <Image className={styles.imgBox}></Image>
            <View>选款式</View>
            <FromItem required={true} help={inputHelp} className={'ali-fr-start ali-m-r-12 ali-m-b-0'}>
                <EvInput placeholder={'请输入'} state={inputState} size={'medium'}
                         maxLength={maxLength}
                         className={styles.inputW} rep={true}
                         onChange={onChange.bind(this)}
                         addonTextAfter={`${nameNum}/32`}
                />
            </FromItem>
        </View>
    )
}

export default TreeData