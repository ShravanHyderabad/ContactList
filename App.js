import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList, TextInput, Linking, Button } from 'react-native'
import { createStackNavigator, createAppContainer } from "react-navigation"

class App extends Component {
	constructor() {
		super()
		this.state = {
			data: [],
			searchText: "Shra"
		}
	}
	componentWillMount() {
		this.fetchData();
	}

	async fetchData(text) {
		changedText = text
		fetch('http://intranet.protechsolutions.com/Intranet.Web/api/User/GetUsers', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				"SearchText": changedText
			})
		})
			.then((response) => response.json())
			.then((responseJson) => {
				this.setState({ data: responseJson.Data })
			})
			.catch((error) => {
				console.error(error);
			});
	}
	render() {
		return (
			<View style={styles.container}>
				<TextInput style={styles.textInput}
					placeholder={"Search Contacts"}
					onChangeText={text => this.fetchData(text)}
				//value={this.state.searchText}
				/>
				<FlatList
					data={this.state.data}
					keyExtractor={(x, i) => i}
					renderItem={({ item }) =>
						<Text style={styles.item}
							onPress={() => this.props.navigation.navigate('ContactDetail', {
								NameUser: item.NameUser,
								PhWork: item.PhWork,
								PhCell: item.PhCell,
								Email: item.Email,
								Userstatus: item.Userstatus
							})}>
							{item.NameUser}
						</Text>
					} />
			</View>
		);
	}
}

class ContactDetail extends Component {

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

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 22
	},
	item: {
		padding: 10,
		fontSize: 18,
		height: 44,
	},
	textInput: {
		backgroundColor: "#e3e5e8"
	},
	text: {
		justifyContent: 'center',
		fontSize: 24
	}
})

const AppNavigator = createStackNavigator({
	Home: App,
	ContactDetail: ContactDetail
},
	{
		initialRouteName: "Home"
	}
);

export default createAppContainer(AppNavigator);