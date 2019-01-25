import React, { Component } from 'react'
import { View, Text, TextInput, FlatList } from 'react-native'
import styles from './styles'

export default class Home extends Component {
	constructor() {
		super()
		this.state = {
			data: []
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
