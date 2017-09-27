import { Alert, AsyncStorage } from 'react-native';

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

  static pinLocationValidation(userStory, date) {
    if (userStory && userStory.length < 200) {
      Alert.alert('User Story should be empty or at least 200 letter');
      return false;
    }
    const regexDate = /^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[0-2])[/-](201[0-9])$/;
    if (date && !regexDate.test(date)) {
      Alert.alert('Invalid Date');
      return false;
    }
    return true;
  }

  static async checkLastEntry() {
    const lastEntry = await AsyncStorage.getItem('lastEntryDate');
    if (!lastEntry) return true;
    const lastEntryDate = new Date(lastEntry);
    lastEntryDate.setDate(lastEntryDate.getDate() + 30);
    const today = new Date();
    console.log(lastEntryDate, today);
    if (today < lastEntryDate) { Alert.alert('30 Days need to pass to pin another location'); }
    return (today >= lastEntryDate);
  }

  static isValidEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
}
