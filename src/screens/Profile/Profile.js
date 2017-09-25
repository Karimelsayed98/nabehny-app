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

export default class Profile extends Component {
  constructor() {
    super();

    this.state = {
      email: 'karim@gmail.com',
      name: 'Karim elsayed',
      password: '',
      passwordConfirmation: '',
    };
  }


  render() {
    return (


      <View style={styles.container}>
        <View style={{ flex: 1, marginTop: 5 }}>
          <KeyboardAwareScrollView enableOnAndroid >
            <Sae

              label={'full name'}
              iconClass={FontAwesomeIcon}
              iconName={'pencil'}
              iconColor={'gray'}
              autoCapitalize={'none'}
              autoCorrect={false}
              inputStyle={{ color: 'black' }}
              onChangeText={name => this.setState({ name })}
              value={this.state.name}
            />
            <Sae
              label={'Email Adress'}
              iconClass={FontAwesomeIcon}
              iconName={'pencil'}
              iconColor={'gray'}
              autoCapitalize={'none'}
              autoCorrect={false}
              inputStyle={{ color: 'black' }}
              onChangeText={email => this.setState({ email })}
              value={this.state.email}
            />
            <Sae
              label={'Password'}
              iconClass={FontAwesomeIcon}
              iconName={'pencil'}
              iconColor={'gray'}
              inputStyle={{ color: 'black' }}
              autoCapitalize={'none'}
              autoCorrect={false}
              onChangeText={password => this.setState({ password })}
              value={this.state.password}
            />
            <Sae
              label={'Confirm Password'}
              iconClass={FontAwesomeIcon}
              iconName={'pencil'}
              iconColor={'gray'}
              inputStyle={{ color: 'black' }}
              autoCapitalize={'none'}
              autoCorrect={false}
              onChangeText={passwordConfirmation => this.setState({ passwordConfirmation })}
              value={this.state.passwordConfirmation}
            />

          </KeyboardAwareScrollView>
        </View>
        <TouchableOpacity style={styles.btnContainer}>
          <Text style={styles.button}>
              Submit
          </Text>
        </TouchableOpacity >

        <TouchableOpacity style={styles.btnContainer}>
          <Text style={styles.button}>
              Logout
          </Text>
        </TouchableOpacity >
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#ffff',
    padding: 10,
  },
  btnContainer: {
    backgroundColor: '#e54d4d',
    paddingVertical: 15,
    marginBottom: 20,
  },
  button: {
    textAlign: 'center',
    color: '#ffffff',
  },
});
