import React from 'react';
import { StyleSheet, View, Text, Keyboard, TouchableWithoutFeedback, Alert, Button, TouchableHighlight } from 'react-native';
import { Hoshi } from 'react-native-textinput-effects';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Ionicons } from '@expo/vector-icons';
import { NavigationActions } from 'react-navigation';
import { firebase } from '../../Firebase/Firebase';
import Validation from '../../functions/Validation';

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
          console.log(error.name);
          console.log(error.message);
          Alert.alert('A Problem Occured, Please try again');
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
          <KeyboardAwareScrollView scrollEnabled={this.state.scrollState}>
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
          </KeyboardAwareScrollView>
        </TouchableWithoutFeedback>
        <View
          onPress={() => this._register()}
          style={styles.btnStyle}
        >
          <Button
            title="Submit"
            onPress={() => this._register()}
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
