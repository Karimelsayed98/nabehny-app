import React from 'react';
import { StyleSheet, View, Dimensions, TouchableOpacity, Text, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Hoshi } from 'react-native-textinput-effects';
import Validation from '/Users/mac/Documents/Projects/nabehny-app/src/functions/Validation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class RegisterScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      fullname: '',
      scrollState: false,
    };
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
      <TouchableWithoutFeedback
        onPress={() => this.dismissKeyboard()}
      >
        <KeyboardAwareScrollView scrollEnabled={this.state.scrollState}>

          <View style={styles.registerform}>
            <Text style={styles.header}>REGISTER</Text>

            <Hoshi
              style={styles.effect}
              label={'Full Name'}
              onChangeText={value => this.setState({ fullname: value })}
              autoCorrect={false}
              returnKeyType="next"
              value={this.state.fullname}
              borderColor={'#BA1818'}
              onFocus={() => this.enablescroll()}

            />
            <Hoshi
              style={styles.effect}
              label={'Email'}
              onChangeText={value => this.setState({ email: value })}
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
              returnKeyType="next"
              borderColor={'#BA1818'}
              onFocus={() => this.enablescroll()}

            />
            <Hoshi
              style={styles.effect}
              label={'Confirm Password'}
              onChangeText={value => this.setState({ confirmPassword: value })}
              value={this.state.confirmPassword}
              secureTextEntry
              returnKeyType="go"
              borderColor={'#BA1818'}
              onFocus={() => this.enablescroll()}

            />
            <View style={styles.btnstyle}>
              <TouchableOpacity
                onPress={() => {
                  Validation.RegisterValidation(
                    this.state.email,
                    this.state.password,
                    this.state.confirmPassword,
                    this.state.fullname);
                }}
              >
                <Text style={styles.btntext}> SUBMIT </Text>
              </TouchableOpacity>
            </View>

          </View>
        </KeyboardAwareScrollView >

      </TouchableWithoutFeedback >
    );
  }
}
const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  registerform: {
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: 'white',
    padding: 15,
    top: height * 0.13,
  },
  effect: {
    alignSelf: 'stretch',
    marginBottom: 10,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 45,
    color: '#970F0F',
    fontFamily: 'Arial Rounded MT Bold',
    marginBottom: 60,
  },
  btntext: {
    fontSize: 20,
    color: '#307EFF',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,

  },
  btnstyle: {
    marginTop: 45,
    borderRadius: 6,
    borderWidth: 1.5,
    alignContent: 'stretch',
    borderColor: '#F3F3F3',
    top: height * 0.08,
    width,
    padding: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
