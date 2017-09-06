import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import Communications from 'react-native-communications';
import { Entypo } from '@expo/vector-icons';

export default class ContactUs extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => Communications.email(['nabehny@gmail.com'], null, null, 'Subject', 'body text')}>
          <View style={styles.holder}>
            <Entypo name="mail" size={32} color="blue" />
          </View>
          <View>
            <Text style={styles.text}>Send us mail</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Communications.web('https://www.facebook.com/nabehny/?ref=aymt_homepage_panel')}>
          <View style={styles.holder}>
            <Entypo name="facebook" size={32} color="blue" />
          </View>
          <View >
            <Text style={styles.text}>Join Facebook</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: 'rgb(253,253,253)',
  },
  holder: {
    paddingTop: 30,
    flexDirection: 'column',
  },
  text: {
    fontSize: 30,
  },
});
