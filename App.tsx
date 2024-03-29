import React, { Component } from 'react';
import createSagaMiddleware from 'redux-saga';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { applyMiddleware, createStore, Store } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import rootReducer from './src/Redux/Reducers/reducers';
import rootSaga from './src/Redux/Sagas/sagas';
import RootContainer from './src/Root/RootContainer.Screen';
import 'react-native-gesture-handler';

const sagaMiddleware = createSagaMiddleware();
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: []
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store: Store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));
const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RootContainer />
        </PersistGate>
      </Provider>
    );
  }
}
