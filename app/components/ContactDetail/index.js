import React, { Component } from 'react'
import { View, Text, Linking, Button } from 'react-native'
import styles from './styles'

export default class ContactDetail extends Component {

	callPhone(Phone) {
		const url = `${'tel:'}${Phone}`
		Linking.openURL(url)
	}
	render() {
		const { navigation } = this.props;
		const NameUser = navigation.getParam('NameUser', 'Shravan Srichand Hyderabad');
		const PhWork = navigation.getParam('PhWork', '501-687-2378');
		const PhCell = navigation.getParam('PhCell', '571-278-8193');
		const Email = navigation.getParam('Email', 'shravan.hyderabad@protechsolutions.com');
		const Userstatus = navigation.getParam('Userstatus', 'Active');

		PhWorkStr = JSON.stringify(PhWork).replace(/"/g, "")
		PhCellStr = JSON.stringify(PhCell).replace(/"/g, "")

		return (
			<View style={styles.container}>
				<Text style={styles.text}>This is Contact Detail component  </Text>
				<Text style={styles.text}>{NameUser}</Text>

				<Text style={styles.text} onPress={() => { if (PhWorkStr != "") this.callPhone(PhWorkStr) }}>Work Phone: {PhWorkStr}</Text>
				<Text style={styles.text} onPress={() => { if (PhCellStr != "") this.callPhone(PhCellStr) }}>Cell Phone: {PhCellStr}</Text>

				<Text style={styles.text}>Email: {Email}</Text>
				<Text style={styles.text}>Status: {Userstatus}</Text>
				<Button
					onPress={() => this.props.navigation.navigate('Home')}
					title="Go to Home Screen" />
			</View>

		);
	}
}