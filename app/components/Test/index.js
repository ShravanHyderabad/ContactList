import React, { Component } from 'react';
import { Text, View } from 'react-native';
import styles from './styles';

export default class Test extends Component {
    render () {
        return(
            <View style = {styles.container}>
                <Text style = {styles.text}>This is a test component</Text>
            </View>
        )
    }
}
