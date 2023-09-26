import React from 'react';
import MainNavigation from './src/navigation/MainNavigation';
import {Provider} from 'react-redux';
import store from './src/reducers/store';
import {LogBox} from 'react-native';

function App(): JSX.Element {
  LogBox.ignoreLogs(['Warning: ...']);
  return (
    <Provider store={store}>
      <MainNavigation />
    </Provider>
  );
}

export default App;
