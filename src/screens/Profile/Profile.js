import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Sae } from 'react-native-textinput-effects';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { firebase } from '../../Firebase/Firebase';
import LoginBar from '../../components/LoginBar';
import Validation from '../../functions/Validation';
import * as Firebase from 'firebase';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

export default class Profile extends Component {
  constructor(props) {
    console.log('constructor');
    super(props);
    this.state = {
      userName: '',
      email: '',
      newUserName: '',
      newEmail: '',
      password: '',
      newPassword: '',
      confirmPassword: '',
      loginState: false,
    };
  }

  componentWillMount() {
    const user = firebase.auth().currentUser;
    if (user) {
      this.setState({
        userName: user.displayName,
        email: user.email,
        loginState: true,
      });
    }
  }

  _logout() {
    firebase.auth().signOut();
    this.setState({ loginState: false });
  }

  async _updateProfile() {
    const user = firebase.auth().currentUser;
    let errorFound = false;
    const { newEmail, newUserName, password, newPassword, confirmPassword } = this.state;
    if (!password) {
      Alert.alert('You must Enter your current Password');
      return;
    }

    if (newUserName && newUserName !== user.displayName) {
      if (newUserName) {
        user.updateProfile({
          displayName: newUserName,
        })
          .then(() => {
            this.setState({ userName: newUserName });
          });
      } else {
        Alert.alert('Invalid User Name');
        return;
      }
    }

    if (newEmail && newEmail !== user.email) {
      if (Validation.isValidEmail(newEmail)) {
        const credential = Firebase.auth.EmailAuthProvider.credential(user.email, password);
        await user.reauthenticateWithCredential(credential)
          .then(() => {
            user.updateEmail(newEmail)
              .then(() => {
                this.setState({ email: newEmail });
              })
              .catch((error) => {
                Alert.alert(error.message);
                errorFound = true;
              });
          })
          .catch((error) => {
            Alert.alert(error.message);
            errorFound = true;
          });
      } else {
        Alert.alert('Invalid Email');
        return;
      }
    }
    if (errorFound) return;

    if (newPassword) {
      if (newPassword === confirmPassword) {
        const credential = Firebase.auth.EmailAuthProvider.credential(user.email, password);
        await user.reauthenticateWithCredential(credential)
          .then(async () => {
            await user.updatePassword(newPassword)
              .catch((error) => {
                Alert.alert(error.message);
                errorFound = true;
              });
          })
          .catch((error) => {
            Alert.alert('Invalid Current Password');
            errorFound = true;
          });
      } else {
        Alert.alert('Passwords do not match');
        return;
      }
    }

    setTimeout(() => {}, 1000);
    if (!errorFound) {
      console.log(errorFound);
      Alert.alert('Profile Updated Successfully');
    }
  }

  render() {
    if (this.state.loginState) {
      return (
        <View style={styles.container}>
          <View style={{ flex: 1, marginTop: 15 }}>
            <Text style={{ alignSelf: 'center', fontWeight: 'bold', fontSize: 24 }}> {this.state.userName} </Text>
            <Text style={{ alignSelf: 'center', fontSize: 14 }}> {this.state.email} </Text>
            <KeyboardAwareScrollView enableOnAndroid extraHeight={90}>

              <View style={styles.Viewicon}>
                <View style={{ justifyContent: 'flex-end', alignItems: 'center', width: 50, height: 40 }}>
                  <Entypo style={styles.icon} name="user" size={24} color="#414c52" />
                </View>
                <TextInput
                  style={styles.txtinput}
                  placeholder={'Full Name'}
                  returnKeyType="next"
                  onSubmitEditing={() => this.emailInput.focus()}
                  autoCapitalize={'none'}
                  autoCorrect={false}
                  underlineColorAndroid="transparent"
                  inputStyle={{ color: 'black' }}
                  onChangeText={newUserName => this.setState({ newUserName })}
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
                  onChangeText={newEmail => this.setState({ newEmail })}
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
                  onSubmitEditing={() => this.newPwInput.focus()}
                  autoCapitalize={'none'}
                  secureTextEntry
                  autoCorrect={false}
                  underlineColorAndroid="transparent"
                  inputStyle={{ color: 'black' }}
                  onChangeText={password => this.setState({ password })}
                />
              </View>

              <View style={styles.Viewicon}>
                <View style={{ justifyContent: 'flex-end', alignItems: 'center', width: 50, height: 40 }}>
                  <Ionicons style={styles.icon} name="md-lock" size={24} color="#414c52" />
                </View>
                <TextInput
                  style={styles.txtinput}
                  placeholder={'New Password'}
                  secureTextEntry
                  ref={(input) => { this.newPwInput = input; }}
                  onSubmitEditing={() => this.ConfirmationInput.focus()}
                  returnKeyType="next"
                  inputStyle={{ color: 'black' }}
                  autoCapitalize={'none'}
                  autoCorrect={false}
                  underlineColorAndroid="transparent"
                  onChangeText={newPassword => this.setState({ newPassword })}
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
                  onChangeText={confirmPassword => this.setState({ confirmPassword })}
                />
              </View>

            </KeyboardAwareScrollView>
          </View>
          <TouchableOpacity
            style={[styles.btnContainer, styles.submit]}
            onPress={() => this._updateProfile()}
          >
            <Text style={styles.button}>
              Submit
            </Text>
          </TouchableOpacity >

          <TouchableOpacity
            style={[styles.btnContainer, styles.logout]}
            onPress={() => this._logout()}
          >
            <Text style={styles.button}>
              Logout
            </Text>
          </TouchableOpacity >
        </View>

      );
    }
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <Text style={{ textAlign: 'center' }}> Please Sign In </Text>
        </View>
        <LoginBar navigation={this.props.navigation} />
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
  },
  btnContainer: {
    backgroundColor: '#e54d4d',
    paddingVertical: 15,
    marginBottom: 20,
    marginHorizontal: 10,
    borderRadius: 25,
  },
  button: {
    textAlign: 'center',
    color: '#ffffff',
    marginHorizontal: 10,
  },
  submit: {
    backgroundColor: '#C74246',
  },
  logout: {
    backgroundColor: '#414c52',
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
