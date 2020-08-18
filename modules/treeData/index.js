import * as React from 'react'
import {View, Image} from 'remax/ali'
import styles from './treeData.less'


export class TreeData extends React.Component {
    constructor(props) {
        super(props);
    }

    static defaultProps = {
        width: "10px",
        height: "10px",
        padding: "10px",
        tier: 1,
    }
    render() {
        return (
            <View className={styles.mainBox}
                  style={`width: ${this.props.width}; height:${this.props.height};padding:${this.props.padding};margin: ${this.props.tier * 10}px;`}>
                <Image className={styles.imgBox}></Image>
                <View>选款式</View>
            </View>
        )
    }
}