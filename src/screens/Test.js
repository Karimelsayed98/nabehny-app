import React, { Component } from 'react';
import { Text, View, Linking, Alert } from 'react-native';

export default class Test extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text onPress={() => {
          Linking.openURL('mailto:nabehny@gmail.com')
            .catch((error) => {
              Alert.alert('An error occured, You can mail us on:\nnabehny@gmail.com');
            });
        }}
        > test </Text>
      </View>
    );
  }
}
