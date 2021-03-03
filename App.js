import React from 'react';
import {
  createAppContainer,
  createStackNavigator,
  createBottomTabNavigator,
  createSwitchNavigator
} from 'react-navigation';

import TestScreen from './src/screens/TestScreen';

const switchNavigator = createSwitchNavigator({
  Test: TestScreen
});

const App = createAppContainer(switchNavigator);

export default () => {
  return (
    <App/>
  )
}
