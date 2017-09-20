import React, { Component } from 'react';
import { View, Button, StyleSheet } from 'react-native';

export default class LoginBar extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.loginButton}>
          <Button
            title="Login"
            onPress={() => this.props.navigation.navigate('Login')}
            color="white"
          />
        </View>
        <View style={styles.registerButton}>
          <Button
            title="Register"
            onPress={() => this.props.navigation.navigate('Register')}
            color="white"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: 48,
  },
  loginButton: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'green',
  },
  registerButton: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'red',
  },
});
