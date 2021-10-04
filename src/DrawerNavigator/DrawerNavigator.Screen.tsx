import { createDrawerNavigator } from '@react-navigation/drawer';
import React, { Component } from 'react';
import colors from '../Themes/Colors';
import styles from './DrawerNavigator.Style';

export type DrawerParamList = {
  ProfileScreen: undefined;
  FollowerScreen: undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();

export class DrawerNavigatorScreen extends Component {
  render() {
    return (
      <Drawer.Navigator screenOptions={{ drawerActiveTintColor: colors.primary, drawerLabelStyle: styles.textItemMenu }}>
        {/* <Drawer.Screen name="FollowerScreen" component={FollowerScreen} options={{ drawerLabel: 'Follower' }} /> */}
      </Drawer.Navigator>
    );
  }
}
