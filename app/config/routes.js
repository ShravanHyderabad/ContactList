
import { createStackNavigator, createAppContainer } from "react-navigation"

import Home from 'components/Home/index'
import ContactDetail from 'components/ContactDetail/index'
// import Test from "../components/Test/index";

const AppNavigator = createStackNavigator({
	Home: Home,
	ContactDetail: ContactDetail
	// Test: Test
},
	{
		initialRouteName: 'Home',
		headerMode: 'none'
	}
);
const AppContainer = createAppContainer(AppNavigator);
export default AppContainer;