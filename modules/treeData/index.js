import * as React from 'react'
import {View, Image} from 'remax/ali'
import styles from './treeData.less'
import {Select, Input} from '../../index'

export class TreeData extends React.Component {
    constructor(props) {
        super(props);
    }

    static defaultProps = {
        tier: 1,
    }

    render() {
        return (
            <View className={styles.mainBox}>
                <View className={styles.optionsBox}>选款式</View>
                <View>折叠</View>
                <Select className={styles.Select}/>
                <Input className={styles.Input}/>
            </View>
        )
    }
}