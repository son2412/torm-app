import React, { useEffect, useState } from 'react';
import styles from './RootContainer.Style';
import { Keyboard, Platform, View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Toast from 'react-native-simple-toast';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { clearNetworkFail, checkSignIn } from '../Redux/Actions/actions';
import RootStackScreen from './RootStack.Screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NoDataView from '../Components/NoDataView';

const Stack = createStackNavigator();

const RootContainerScreen = () => {
  const sendNetworkFail = useSelector((state: RootStateOrAny) => state.sendNetworkFail);
  const isLogin = useSelector((state: RootStateOrAny) => state.isAuth);
  const [isKeyboardShow, setIsKeyboardShow] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const dispatch = useDispatch();
  const clearNetworkStatus = () => dispatch(clearNetworkFail());

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (e) => {
      setIsKeyboardShow(true);
      setKeyboardHeight(e.endCoordinates.height);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setIsKeyboardShow(false);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  if (sendNetworkFail.err) {
    switch (sendNetworkFail.err) {
      case 'NETWORK_ERROR':
        Toast.show('No network connection, please try again');
        break;
      case 'TIMEOUT_ERROR':
        Toast.show('Timeout, please try again');
        break;
      case 'CONNECTION_ERROR':
        Toast.show('DNS server not found, please try again');
        break;
      default:
        Toast.show(sendNetworkFail.err);
        break;
    }
    clearNetworkStatus();
  }

  useEffect(() => {
    setTimeout(async () => {
      const token = await AsyncStorage.getItem('token');
      dispatch(checkSignIn(token));
    }, 10);
  }, [dispatch]);

  if (isLogin.fetching) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <View style={styles.mainContainer}>
      <NavigationContainer>
        {isLogin.token ? (
          <Stack.Navigator initialRouteName="Drawer" screenOptions={{ headerMode: 'screen' }}>
            <>
              <Stack.Screen name="NoDataView" component={NoDataView} options={{ gestureEnabled: true, gestureDirection: 'horizontal' }} />
            </>
          </Stack.Navigator>
        ) : (
          <>
            <RootStackScreen />
          </>
        )}
      </NavigationContainer>

      {isKeyboardShow && Platform.OS === 'ios' ? <View style={{ height: keyboardHeight }} /> : null}
    </View>
  );
};
export default RootContainerScreen;
