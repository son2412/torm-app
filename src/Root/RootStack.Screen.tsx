import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import SignInScreen from '../Screens/SignIn.Screen';

const RootStack = createStackNavigator();

const RootStackScreen = () => (
  <RootStack.Navigator>
    <RootStack.Screen name="SignIn" component={SignInScreen} />
  </RootStack.Navigator>
);

export default RootStackScreen;
