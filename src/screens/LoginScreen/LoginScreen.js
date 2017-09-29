import React from 'react';
import { StyleSheet, Keyboard, View, Image, TextInput, TouchableWithoutFeedback, Alert, Button, TouchableHighlight, Platform, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Ionicons, Entypo } from '@expo/vector-icons';
import { NavigationActions } from 'react-navigation';
import { firebase } from '../../Firebase/Firebase';
import Validation from '../../functions/Validation';

const logo = require('../../images/logo.png');

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
          const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
              NavigationActions.navigate({ routeName: 'Home' }),
            ],
          });
          this.props.navigation.dispatch(resetAction);
        })
        .catch((error) => {
          Alert.alert(error.message);
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
        <TouchableHighlight
          style={{ alignItems: 'center', justifyContent: 'center', width: 48, height: 48, marginTop: 20 }}
          onPress={() => this.props.navigation.dispatch(NavigationActions.back({}))}
          underlayColor={'rgba(0, 0, 0, 0)'}
        >
          <Ionicons
            name="ios-arrow-back-outline"
            size={36}
            onPress={() => this.props.navigation.dispatch(NavigationActions.back({}))}
          />
        </TouchableHighlight>
        <TouchableWithoutFeedback onPress={() => this.dismissKeyboard()}>
          <KeyboardAwareScrollView scrollEnabled={this.state.scrollState} enableOnAndroid extraHeight={90}>
            <Image source={logo} style={styles.logo} />

            <View style={styles.Viewicon}>
              <View style={{ justifyContent: 'flex-end', alignItems: 'center', width: 50, height: 40 }}>
                <Entypo style={styles.icon} name="user" size={24} color="#414c52" />
              </View>
              <TextInput
                style={styles.txtinput}
                placeholder={'Email'}
                returnKeyType="next"
                onSubmitEditing={() => this.passwordInput.focus()}
                autoCorrect={false}
                autoCapitalize={'none'}
                inputStyle={{ color: 'black' }}
                onChangeText={value => this.setState({ email: value })}
                onFocus={() => this.enablescroll()}
                underlineColorAndroid="transparent"
              />
            </View>

            <View style={styles.Viewicon}>
              <View style={{ justifyContent: 'flex-end', alignItems: 'center', width: 50, height: 40 }}>
                <Ionicons style={styles.icon} name="md-lock" size={24} color="#414c52" />
              </View>
              <TextInput
                style={styles.txtinput}
                placeholder={'Password'}
                returnKeyType="go"
                autoCorrect={false}
                autoCapitalize={'none'}
                secureTextEntry
                ref={(input) => { this.passwordInput = input; }}
                inputStyle={{ color: 'black' }}
                onChangeText={value => this.setState({ password: value })}
                onFocus={() => this.enablescroll()}
                underlineColorAndroid="transparent"
              />
            </View>

          </KeyboardAwareScrollView>
        </TouchableWithoutFeedback>
        { (Platform.OS === 'android' &&
        <TouchableHighlight
          onPress={() => this._login()}
          style={{ backgroundColor: '#C74246', alignItems: 'center', justifyContent: 'center', height: 48, marginBottom: 20, borderRadius: 25, marginHorizontal: 10, padding: 10 }}
          underlayColor={'rgba(255, 255, 255, 0.1)'}
        >
          <Text style={{ color: '#fff' }}> Login </Text>
        </TouchableHighlight>
        ) ||
          <View style={styles.btnStyle}>
            <Button
              title="Login"
              onPress={() => this._login()}
              color="#fff"
            />
          </View>
        }
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
    borderRadius: 25,
    justifyContent: 'center',
    backgroundColor: '#C74246',
    marginHorizontal: 10,
    padding: 10,
    height: 48,
    alignItems: 'stretch',
    marginBottom: 20,
  },
  btnText: {
    fontSize: 20,
    color: '#307EFF',
  },
  txtinput: {
    height: 40,
    marginTop: 20,
    marginBottom: 5,
    fontSize: 20,
    flex: 1,
    marginRight: 15,
  },

  Viewicon: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  icon: {
    textAlign: 'center',
    marginHorizontal: 0,
  },
});
