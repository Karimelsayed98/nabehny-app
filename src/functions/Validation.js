import { Alert } from 'react-native';

export default class Validation {
  static RegisterValidation(mail, password, confirmPassword, fullname) {
    let errorMsg = null;
    const re = /\S+@\S+\.\S+/;
    if (fullname.length === 0) {
      errorMsg = 'Invalid Full Name';
    }
    if (!re.test(mail) || mail.length === 0) {
      errorMsg = 'Invalid Email';
    } if (password.length === 0) {
      errorMsg = 'Invalid Password';
    } if (!(password === confirmPassword)) {
      errorMsg = 'Passwords do not match';
    }
    if (errorMsg === null) {
      return true;
    }
    Alert.alert(errorMsg);
    return false;
  }

  static loginValidation(email, password) {
    let errorMsg = null;
    const re = /\S+@\S+\.\S+/;

    if (!re.test(email) || email.length === 0) {
      errorMsg = 'Invalid Email';
    }
    if (password.length === 0) {
      errorMsg = 'Invalid Password';
    }
    if (errorMsg === null) {
      return true;
    }
    Alert.alert(errorMsg);
    return false;
  }
}
