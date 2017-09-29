import React from 'react';
import { View, StatusBar, Platform } from 'react-native';
import { RootNavigator } from './src/Navigation/Navigation';
import Test from './src/screens/Test';

export default class App extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="dark-content" />
        <RootNavigator style={{ marginTop: (Platform.OS === 'android') ? 20 : 0 }} />
      </View>
    );
  }
}
