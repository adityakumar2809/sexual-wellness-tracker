import React from 'react';
import {
	createAppContainer,
	createSwitchNavigator
} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import LoadingScreen from './src/screens/LoadingScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import SignInScreen from './src/screens/SignInScreen';
import EditProfileScreen from './src/screens/EditProfileScreen';
import CycleScreen from './src/screens/CycleScreen'
import CalendarScreen from './src/screens/CalendarScreen';
import AddDataScreen from './src/screens/AddDataScreen';
import AnalysisScreen from './src/screens/AnalysisScreen';
import ProfileScreen from './src/screens/ProfileScreen';

import { setNavigator } from './src/navigationRef';


const loginFlow = createStackNavigator({
	SignUp: SignUpScreen,
	SignIn: SignInScreen,
	EditProfile: EditProfileScreen
});

const mainFlow = createBottomTabNavigator({
	Cycle: CycleScreen,
	Calendar: CalendarScreen,
	AddData: AddDataScreen,
	Analysis: AnalysisScreen,
	Profile: ProfileScreen
});

const appFlow = createSwitchNavigator({
	loginFlow,
	Loading: LoadingScreen,
	mainFlow
});

const App = createAppContainer(appFlow);

export default () => {
	return (
		<App
			ref={(navigator) => {
				setNavigator(navigator);
			}}
		/>
	)
}
