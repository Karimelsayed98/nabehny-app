import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Sae } from 'react-native-textinput-effects';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class UserProfile extends Component {
  constructor() {
    super();

    this.state = {
      email: 'karim@gmail.com',
      name: 'Karim elsayed',
      password: '',
      password_confirmation: '',
    };
  }


  render() {
    return (
      <KeyboardAwareScrollView enableOnAndroid>


        <View style={styles.container}>


          <Sae

            label={'full name'}
            iconClass={FontAwesomeIcon}
            iconName={'pencil'}
            iconColor={'gray'}
            autoCapitalize={'none'}
            autoCorrect={false}
          />
          <Sae
            label={'Email Adress'}
            iconClass={FontAwesomeIcon}
            iconName={'pencil'}
            iconColor={'gray'}
            autoCapitalize={'none'}
            autoCorrect={false}
          />
          <Sae
            label={'Password'}
            iconClass={FontAwesomeIcon}
            iconName={'pencil'}
            iconColor={'gray'}
            autoCapitalize={'none'}
            autoCorrect={false}
          />
          <Sae
            label={'Confirm Password'}
            iconClass={FontAwesomeIcon}
            iconName={'pencil'}
            iconColor={'gray'}
            autoCapitalize={'none'}
            autoCorrect={false}
          />


          <TouchableOpacity

            style={styles.btnContainer}
          >
            <Text
              style={styles.button}
            >
                Submit
            </Text>

          </TouchableOpacity >
        </View>
      </KeyboardAwareScrollView>


    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: 'black',
    padding: 10,
    marginHorizontal: 10,
  },
  btnContainer: {
    backgroundColor: '#e54d4d',
    paddingVertical: 15,
  },
  button: {
    textAlign: 'center',
    color: '#ffffff',
  },
});
