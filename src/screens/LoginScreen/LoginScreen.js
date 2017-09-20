import React from 'react';
import { StyleSheet, Keyboard, View, Image, Dimensions, TouchableWithoutFeedback, Alert, Button } from 'react-native';
import { Hoshi } from 'react-native-textinput-effects';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Ionicons } from '@expo/vector-icons';
import { NavigationActions } from 'react-navigation';
import { firebase } from '../../Firebase/Firebase';
import Validation from '../../functions/Validation';

export default class LoginComponents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      scrollState: false,
    };
  }

  _login() {
    if (Validation.loginValidation(this.state.email, this.state.password)) {
      firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => {
          this.props.navigation.navigate('MapScreen');
        })
        .catch((error) => {
          Alert.alert('Invalid Email or Password');
        });
    }
  }

  dismissKeyboard() {
    Keyboard.dismiss();
    this.setState({
      scrollState: false,
    });
    console.log('keyboard dismissed');
  }

  enablescroll() {
    console.log('scroll enabled');
    this.setState({
      scrollState: true,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Ionicons
          name="ios-arrow-back-outline"
          size={36}
          onPress={() => this.props.navigation.dispatch(NavigationActions.back({}))}
          style={{ alignSelf: 'flex-start', marginTop: 25, marginLeft: 15 }}
        />
        <TouchableWithoutFeedback onPress={() => this.dismissKeyboard()}>
          <KeyboardAwareScrollView scrollEnabled={this.state.scrollState}>
            <Image source={require('../../images/logo.png')} style={styles.logo} />

            <Hoshi
              style={styles.effect}
              label={'Email'}
              onChangeText={value => this.setState({ email: value })}
              keyboardType="email-address"
              autoCorrect={false}
              returnKeyType="next"
              value={this.state.email}
              borderColor={'#BA1818'}
              onFocus={() => this.enablescroll()}
            />
            <Hoshi
              style={styles.effect}
              label={'Password'}
              onChangeText={value => this.setState({ password: value })}
              value={this.state.password}
              secureTextEntry
              returnKeyType="go"
              borderColor={'#BA1818'}
              onFocus={() => this.enablescroll()}
            />

          </KeyboardAwareScrollView>
        </TouchableWithoutFeedback>
        <View
          onPress={() => this._login()}
          style={styles.btnStyle}
        >
          <Button
            title="Login"
            onPress={() => this._login()}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 180,
    height: 180,
    marginTop: 40,
    marginBottom: 50,
    alignSelf: 'center',
  },
  effect: {
    marginBottom: 10,
    marginHorizontal: 20,
  },
  btnStyle: {
    borderWidth: 1.5,
    alignContent: 'stretch',
    borderColor: '#F3F3F3',
    padding: 6,
    alignItems: 'center',
  },
  btnText: {
    fontSize: 20,
    color: '#307EFF',
  },
});
