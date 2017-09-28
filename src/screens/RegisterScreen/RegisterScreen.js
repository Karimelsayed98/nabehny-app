import React from 'react';
import { StyleSheet, View, Text, Keyboard, TouchableWithoutFeedback, Alert, Button, TouchableHighlight, Image, TextInput, Platform } from 'react-native';
import { Hoshi } from 'react-native-textinput-effects';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Ionicons, Entypo, FontAwesome } from '@expo/vector-icons';
import { NavigationActions } from 'react-navigation';
import { firebase } from '../../Firebase/Firebase';
import Validation from '../../functions/Validation';

const logo = require('../../images/logo.png');

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

  _register() {
    console.log('Register Button');
    const { email, password, confirmPassword, fullname } = this.state;
    if (Validation.RegisterValidation(email, password, confirmPassword, fullname)) {
      firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((user) => {
          // Register Successful
          user.updateProfile({
            displayName: fullname,
          }).then(() => {
            // Update Successful
            this.props.navigation.navigate('Login');
          }).catch((error) => {
            // Error in Update
            console.log(error.name);
            console.log(error.message);
            Alert.alert('A Problem Occured, Please try again');
          });
        })
        .catch((error) => {
          // Error in Register
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
                placeholder={'Full Name'}
                returnKeyType="next"
                onSubmitEditing={() => this.emailInput.focus()}
                autoCorrect={false}
                underlineColorAndroid="transparent"
                inputStyle={{ color: 'black' }}
                onChangeText={value => this.setState({ fullname: value })}
                onFocus={() => this.enablescroll()}
              />
            </View>

            <View style={styles.Viewicon}>
              <View style={{ justifyContent: 'flex-end', alignItems: 'center', width: 50, height: 40 }}>
                <Entypo style={styles.icon} name="mail" size={24} color="#414c52" />
              </View>
              <TextInput
                style={styles.txtinput}
                placeholder={'Email'}
                ref={(input) => { this.emailInput = input; }}
                onSubmitEditing={() => this.Password.focus()}
                returnKeyType="next"
                keyboardType="email-address"
                autoCapitalize={'none'}
                autoCorrect={false}
                underlineColorAndroid="transparent"
                inputStyle={{ color: 'black' }}
                onChangeText={value => this.setState({ email: value })}
                onFocus={() => this.enablescroll()}
              />
            </View>

            <View style={styles.Viewicon}>
              <View style={{ justifyContent: 'flex-end', alignItems: 'center', width: 50, height: 40 }}>
                <Ionicons style={styles.icon} name="md-lock" size={24} color="#414c52" />
              </View>
              <TextInput
                style={styles.txtinput}
                placeholder={'Password'}
                returnKeyType="next"
                ref={(input) => { this.Password = input; }}
                onSubmitEditing={() => this.ConfirmationInput.focus()}
                autoCapitalize={'none'}
                secureTextEntry
                autoCorrect={false}
                underlineColorAndroid="transparent"
                inputStyle={{ color: 'black' }}
                onFocus={() => this.enablescroll()}
                onChangeText={value => this.setState({ password: value })}
              />
            </View>

            <View style={styles.Viewicon}>
              <View style={{ justifyContent: 'flex-end', alignItems: 'center', width: 50, height: 40 }}>
                <FontAwesome style={styles.icon} name="repeat" size={24} color="#414c52" />
              </View>
              <TextInput
                style={styles.txtinput}
                placeholder={'Confirm Password'}
                secureTextEntry
                ref={(input2) => { this.ConfirmationInput = input2; }}
                returnKeyType="go"
                inputStyle={{ color: 'black' }}
                autoCapitalize={'none'}
                autoCorrect={false}
                underlineColorAndroid="transparent"
                onFocus={() => this.enablescroll()}
                onChangeText={value => this.setState({ confirmPassword: value })}
              />
            </View>

          </KeyboardAwareScrollView>
        </TouchableWithoutFeedback>
        { (Platform.OS === 'android' &&
        <TouchableHighlight
          onPress={() => this._register()}
          style={{ backgroundColor: '#C74246', alignItems: 'center', justifyContent: 'center', height: 48, marginBottom: 20, borderRadius: 25, marginHorizontal: 10, padding: 10 }}
          underlayColor={'rgba(255, 255, 255, 0.1)'}
        >
          <Text style={{ color: '#fff' }}> Register </Text>
        </TouchableHighlight>
        ) ||
          <View style={styles.btnStyle}>
            <Button
              title="Register"
              onPress={() => this._register()}
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
  header: {
    alignSelf: 'center',
    fontSize: 45,
    color: '#970F0F',
    fontFamily: 'Arial Rounded MT Bold',
    marginBottom: 60,
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
  logo: {
    width: 140,
    height: 140,
    marginBottom: 20,
    alignSelf: 'center',
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
