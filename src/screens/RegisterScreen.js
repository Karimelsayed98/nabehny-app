import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class RegisterScreen extends Component {
  render() {
    return (
      <View styles={styles.container}>
        <Text> Register </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
