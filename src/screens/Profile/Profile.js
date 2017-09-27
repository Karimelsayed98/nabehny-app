import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Sae } from 'react-native-textinput-effects';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { firebase } from '../../Firebase/Firebase';
import LoginBar from '../../components/LoginBar';
import Validation from '../../functions/Validation';
import * as Firebase from 'firebase';

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
                Alert.alert('Error Updating Profile');
              });
          })
          .catch((error) => {
            Alert.alert('Invalid Current Password');
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
          .then(() => {
            user.updatePassword(newPassword)
              .catch((error) => {
                Alert.alert('Error Updating Profile');
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
    if (errorFound) return;

    Alert.alert('Profile Updated Successfully');
  }

  render() {
    if (this.state.loginState) {
      return (
        <View style={styles.container}>
          <View style={{ flex: 1, marginTop: 30 }}>
            <Text style={{ alignSelf: 'center', fontWeight: 'bold', fontSize: 24 }}> {this.state.userName} </Text>
            <Text style={{ alignSelf: 'center', fontSize: 14 }}> {this.state.email} </Text>
            <KeyboardAwareScrollView enableOnAndroid >
              <Sae
                label={'Full Name'}
                iconClass={FontAwesomeIcon}
                iconName={'pencil'}
                iconColor={'gray'}
                autoCapitalize={'none'}
                autoCorrect={false}
                inputStyle={{ color: 'black' }}
                onChangeText={newUserName => this.setState({ newUserName })}
                style={{ marginHorizontal: 10 }}
              />
              <Sae
                label={'Email Adress'}
                iconClass={FontAwesomeIcon}
                iconName={'pencil'}
                iconColor={'gray'}
                autoCapitalize={'none'}
                autoCorrect={false}
                inputStyle={{ color: 'black' }}
                onChangeText={newEmail => this.setState({ newEmail })}
                style={{ marginHorizontal: 10 }}
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
                style={{ marginHorizontal: 10 }}
              />
              <Sae
                label={'New Password'}
                iconClass={FontAwesomeIcon}
                iconName={'pencil'}
                iconColor={'gray'}
                inputStyle={{ color: 'black' }}
                autoCapitalize={'none'}
                autoCorrect={false}
                onChangeText={newPassword => this.setState({ newPassword })}
                style={{ marginHorizontal: 10 }}
              />
              <Sae
                label={'Confirm Password'}
                iconClass={FontAwesomeIcon}
                iconName={'pencil'}
                iconColor={'gray'}
                inputStyle={{ color: 'black' }}
                autoCapitalize={'none'}
                autoCorrect={false}
                onChangeText={confirmPassword => this.setState({ confirmPassword })}
                style={{ marginHorizontal: 10 }}
              />

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
});
