import React from 'react';
import { StyleSheet, Keyboard, View, Text, Image, Dimensions, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Hoshi } from 'react-native-textinput-effects';
import Validation from '/Users/mac/Documents/Projects/nabehny-app/src/functions/Validation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class LoginComponents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
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


          <View style={styles.loginformcontainer}>
            <Image source={require('/Users/mac/Documents/Projects/nabehny-app/src/images/logo.png')} style={styles.logo} />

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
            <View style={styles.btns}>

              <View style={styles.logInBtn}>
                <TouchableOpacity
                  onPress={() => { Validation.loginValidation(this.state.email, this.state.password); }}
                >
                  <Text style={styles.btnstyle}> LOG IN</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.signUpBtn}>
                <TouchableOpacity>
                  <Text style={styles.btnstyle}> SIGN UP </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView >

      </TouchableWithoutFeedback >

    );
  }
}
const { height, width } = Dimensions.get('window');


const styles = StyleSheet.create({
  loginformcontainer: {
    alignItems: 'center',
    alignSelf: 'stretch',
    height,
    width,
    flex: 1,
  },
  btns: {
    borderTopWidth: 2,
    borderColor: '#F3F3F3',
    flexDirection: 'row',
    alignContent: 'stretch',
    alignItems: 'center',
    justifyContent: 'space-between',
    top: height * 0.43,
    height: height * 0.1,
  },
  btnstyle: {
    fontSize: 20,
    color: '#307EFF',
    alignSelf: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 3,
  },
  effect: {
    top: height * 0.3,
    alignSelf: 'stretch',
    marginBottom: 10,
  },
  signUpBtn: {

    width: width * 0.5,
    borderLeftWidth: 2,
    borderColor: '#F3F3F3',
    height: height * 0.09,
    alignContent: 'stretch',
  },
  logInBtn: {
    height: height * 0.09,
    alignContent: 'stretch',
    width: width * 0.5,
  },
  logo:
  {
    width: 180,
    height: 180,
    top: height * 0.2,
  },
});
