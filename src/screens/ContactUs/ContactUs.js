import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import Communications from 'react-native-communications';
import { FontAwesome, Ionicons } from '@expo/vector-icons';

export default class ContactUs extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => Communications.email(['nabehny@gmail.com'], null, null, 'Subject', 'body text')}
          style={[styles.holdermail, styles.button]}
        >
          <Ionicons name="ios-mail" size={35} color="white" style={styles.logo} />
          <Text style={styles.text}>Send us mail</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => Communications.web('https://www.instagram.com/nabehny/')}
          style={[styles.holderfb, styles.button]}
        >
          <FontAwesome
            name="facebook"
            size={30}
            color="white"
          />
          <Text style={styles.text}>Join facebook</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => Communications.web('https://www.facebook.com/nabehny/?ref=aymt_homepage_panel')}
          style={[styles.holderinsta, styles.button]}
        >
          <FontAwesome
            name="instagram"
            size={30}
            color="white"
          />
          <Text style={styles.text}>Join Instagram</Text>
        </TouchableOpacity>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  holderfb: {
    backgroundColor: '#3b5998',
  },
  holdermail: {
    backgroundColor: '#32506d',
  },
  holderinsta: {
    backgroundColor: '#cd486b',
  },
  text: {
    fontSize: 28,
    paddingLeft: 10,
    color: '#fff',
  },

  logo: {

  },

  button: {
    width: 250,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginVertical: 25,
    // padding: 5,
    borderRadius: 5,
  },
});
