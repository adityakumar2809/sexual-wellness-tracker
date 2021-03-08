import React, { useEffect } from 'react';
import {
	createAppContainer,
	createSwitchNavigator
} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import * as SQLite from 'expo-sqlite';

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


const db = SQLite.openDatabase('db.db');

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

	useEffect(() => {
		db.transaction((tx) => {
			tx.executeSql(
				`CREATE TABLE IF NOT EXISTS
					users (
						id INTEGER PRIMARY KEY NOT NULL,
						email TEXT,
						phone TEXT,
						password TEXT,
						unique_hash TEXT,
						first_name TEXT,
						last_name TEXT,
						dob DATE
					);
				`
			);
		});
	}, [])

	return (
		<App
			ref={(navigator) => {
				setNavigator(navigator);
			}}
		/>
	)
}
