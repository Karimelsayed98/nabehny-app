import { Alert } from 'react-native';

export default class Validation {
  static RegisterValidation(mail, password, confirmpassword, fullname) {
    let errorMsg = '';
    const re = /\S+@\S+\.\S+/;
    if (fullname.length === 0) {
      errorMsg += 'Invalid Full Name\n';
    }
    if (!re.test(mail) || mail.length === 0) {
      errorMsg += 'Invalid Email\n';
    } if (password.length === 0) {
      errorMsg += 'Invalid Password\n';
    } if (password !== confirmpassword) {
      errorMsg += 'Passwords do not match\n';
    }
    if (errorMsg.length === 0) {
      Alert.alert(
        'Welcome!',
        'Successful Submission');
    } else {
      Alert.alert(
        'Please try again!',
        errorMsg);
    }
  }
  static loginValidation(mail, password) {
    let errorMsg = '';
    const re = /\S+@\S+\.\S+/;

    if (!re.test(mail) || mail.length === 0) {
      errorMsg += 'Invalid Email\n';
    }
    if (password.length === 0) {
      errorMsg += 'Invalid Password\n';
    }
    if (errorMsg.length === 0) {
      Alert.alert(
        'Welcome!',
        'Successful Login');
    } else {
      Alert.alert(
        'Please try again!',
        errorMsg);
    }
  }
}
