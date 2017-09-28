import React, { Component } from 'react';
import { View, Button, StyleSheet, TouchableHighlight, Text } from 'react-native';

export default class LoginBar extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight
          style={styles.loginButton}
          underlayColor={'rgba(255, 255, 255, 0.1)'}
          onPress={() => this.props.navigation.navigate('Login')}
        >
          <Text style={{ color: '#fff' }}> Login </Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.registerButton}
          underlayColor={'rgba(255, 255, 255, 0.1)'}
          onPress={() => this.props.navigation.navigate('Register')}
        >
          <Text style={{ color: '#fff' }}> Register </Text>
        </TouchableHighlight>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#414c52',
    height: 48,
  },
  loginButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#414c52',
  },
  registerButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#c74246',
  },
});
