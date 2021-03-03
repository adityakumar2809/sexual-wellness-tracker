import React from 'react';
import {
	createAppContainer,
	createStackNavigator,
	createBottomTabNavigator,
	createSwitchNavigator
} from 'react-navigation';

import TestScreen from './src/screens/TestScreen';

import { setNavigator } from './src/navigationRef';


const switchNavigator = createSwitchNavigator({
	Test: TestScreen
});

const App = createAppContainer(switchNavigator);

export default () => {
	return (
		<App
			ref={(navigator) => {
				setNavigator(navigator);
			}}
		/>
	)
}
