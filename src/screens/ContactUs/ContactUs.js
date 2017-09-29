import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Linking,
} from 'react-native';
import Communications from 'react-native-communications';
import { FontAwesome, Ionicons } from '@expo/vector-icons';


export default class ContactUs extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => Linking.openURL('mailto:nabehny@gmail.com')
            .catch((error) => {
              Alert.alert('An error occured, You can mail us on:\nnabehny@gmail.com');
            })}
          style={[styles.holdermail, styles.button]}
        >
          <Ionicons name="ios-mail" size={35} color="white" style={styles.logo} />
          <Text style={styles.text}>Send us mail</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => Linking.openURL('https://www.fb.com/nabehny')}
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
          onPress={() => Linking.openURL('https://www.instagram.com/nabehny')}
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
    backgroundColor: '#fff',
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
    height: 50,
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 50,
    marginVertical: 25,
    borderRadius: 5,
  },
});
