import React from 'react';
import { StyleSheet, TextInput, View, Dimensions, TouchableOpacity, Text, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Entypo';

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
            <View style={styles.TextInputView}>
              <Icon2 style={styles.IconStyles} name="user" size={20} color="grey" />
              <TextInput
                placeholder={' Full Name'}
                style={styles.textInputsStyle}
                onFocus={() => this.enablescroll()}
                onChangeText={value => this.setState({ fullname: value })}
                autoCorrect={false}
                returnKeyType="next"
                value={this.state.fullname}
              />
            </View>
            <View style={styles.TextInputView}>
              <Icon style={styles.IconStyles} name="envelope" size={20} color="grey" />
              <TextInput
                placeholder={' Email'}
                style={styles.textInputsStyle}
                onFocus={() => this.enablescroll()}
                onChangeText={value => this.setState({ email: value })}
                keyboardType="email-address"
                autoCorrect={false}
                returnKeyType="next"
                value={this.state.email}

              />
            </View>
            <View style={styles.TextInputView}>
              <Icon style={styles.IconStyles} name="lock" size={23} color="grey" />

              <TextInput
                onChangeText={value => this.setState({ password: value })}
                value={this.state.password}
                secureTextEntry
                returnKeyType="go"
                onFocus={() => this.enablescroll()}
                placeholder={'Password'}
                style={styles.textInputsStyle}
              />
            </View>
            <View style={styles.TextInputView}>
              <Icon style={styles.IconStyles} name="lock" size={23} color="grey" />

              <TextInput
                onChangeText={value => this.setState({ confirmPassword: value })}
                value={this.state.confirmPassword}
                secureTextEntry
                returnKeyType="go"
                onFocus={() => this.enablescroll()}
                placeholder={'Password'}
                style={styles.textInputsStyle}
              />
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
  TextInputView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    padding: 5,
    borderBottomWidth: 2,
    borderColor: 'grey',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 30,

  },
  textInputsStyle: {
    flex: 1,
    paddingTop: 10,
    marginLeft: 5,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: '#fff',
    color: '#424242',
  },

});
