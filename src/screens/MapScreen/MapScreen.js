import React, { Component } from 'react';
import MapView from 'react-native-maps';
import { MaterialIcons } from '@expo/vector-icons';
import { View, StyleSheet, Button, Modal, Text, TextInput, TouchableHighlight, TouchableOpacity, Alert, AsyncStorage, Platform } from 'react-native';
import LoginBar from '../../components/LoginBar';
import AnalyticsCard from '../../components/AnalyticsCard';
import { firebase } from '../../Firebase/Firebase';
import Validation from '../../functions/Validation';

const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = 0.0421;
const styleJSON = require('./MapStyle.json');

const mapStyle = styleJSON.style;

export default class MapScreen extends Component {
  constructor() {
    super();
    this.userLoginListener();
    this.state = {
      region: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      user: {
        loginState: false,
      },
      analytics: {
        pastMonth: 0,
        pastWeek: 0,
        safetyRate: 0,
      },
      changingLocation: false,
      modalVisible: false,
      userStory: '',
      robberyDate: '',
      accentColor: '#C74246',
    };
  }

  async componentDidMount() {
    // Getting user current position
    this.getUserLocation();
    // AsyncStorage.setItem('lastEntryDate', '');
  }


  onRegionChange(region) {
    this.setState({ region, changingLocation: true });
  }

  onRegionChangeComplete() {
    this._getAnalytics();
    this.setState({ changingLocation: false });
  }

  async getUserLocation() {
    // Getting user current position
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        region: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        },
      });
    });
  }

  async userLoginListener() {
    await firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        this.setState({ user: { loginState: true } });
      } else {
        // No user is signed in.
        this.setState({ user: { loginState: false } });
      }
    });
  }

  openLocationSubmitModal() {
    Validation.checkLastEntry()
      .then((isValid) => {
        if (isValid) {
          console.log(isValid);
          this.setState({ modalVisible: true });
        }
      });
  }

  convertDate(inputFormat) {
    const d = new Date(inputFormat);
    return [d.getDate(), d.getMonth() + 1, d.getFullYear()].join('/');
  }

  convertToValidDate(inputFormat) {
    const d = [];
    let s = '';
    for (let i = 0; i < inputFormat.length; ++i) {
      if (inputFormat[i] === '/') {
        d.push(s);
        s = '';
      } else {
        s += inputFormat[i];
      }
    }
    d.push(s);
    return [d[1], d[0], d[2]].join('/');
  }

  _pinLocation() {
    if (!Validation.pinLocationValidation(this.state.userStory, this.state.robberyDate)) {
      return;
    }

    const database = firebase.database();
    const locationsRef = database.ref('locations');
    const userID = firebase.auth().currentUser.uid;
    let entryDate = new Date().toLocaleDateString();
    let robberyDate = new Date().toLocaleDateString();
    if (this.state.robberyDate) {
      robberyDate = new Date(this.state.robberyDate).toLocaleDateString();
    }

    const userStory = this.state.userStory;

    entryDate = this.convertDate(entryDate);
    robberyDate = this.convertDate(robberyDate);

    const location = {
      latitude: this.state.region.latitude,
      longitude: this.state.region.longitude,
      userID,
      entryDate,
      robberyDate,
      userStory,
    };
    locationsRef.push(location, () => {
      this.setState({ modalVisible: false });
      setTimeout(() => { Alert.alert('Location Pinned Successfully'); }, 1000);
    });
    console.log(entryDate);
    AsyncStorage.setItem('lastEntryDate', entryDate);
  }

  _getAnalytics() {
    const database = firebase.database();
    const locationsRef = database.ref('locations');
    const positionMargin = 0.01;
    let pastMonth = 0;
    let pastWeek = 0;
    let safetyRate = 0;

    locationsRef.once('value')
      .then((snapshot) => {
        const locations = snapshot.val();
        let result = Object.keys(locations).map(key => locations[key]);
        safetyRate = result.length;

        result = result.filter(location => (
          location.latitude >= this.state.region.latitude - positionMargin &&
          location.latitude <= this.state.region.latitude + positionMargin &&
          location.longitude >= this.state.region.longitude - positionMargin &&
          location.longitude <= this.state.region.longitude + positionMargin
        ));
        safetyRate = ((safetyRate - result.length) / safetyRate) * 100;

        result = result.filter((location) => {
          const today = new Date();
          const robDate = new Date(this.convertToValidDate(location.robberyDate)).getTime();
          const lastMonth = new Date().setDate(today.getDate() - 30);
          return (
            robDate >= lastMonth
          );
        });
        pastMonth = result.length;

        result = result.filter((location) => {
          const today = new Date();
          const robDate = new Date(this.convertToValidDate(location.robberyDate)).getTime();
          const lastWeek = new Date().setDate(today.getDate() - 7);
          return (
            robDate >= lastWeek
          );
        });
        pastWeek = result.length;

        this.setState({
          analytics: {
            pastMonth,
            pastWeek,
            safetyRate,
          },
        });
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {}}
        >
          <View style={{ flex: 1, alignItems: 'stretch', paddingTop: 30 }}>
            <View>
              <Text style={{ fontSize: 18 }}> Your Story </Text>
              <TextInput
                placeholder="Write The Robbery Story  (optional)"
                multiline
                style={{ height: 150, borderColor: 'gray', borderWidth: 1, borderRadius: 5, fontSize: 14, marginVertical: 5, marginHorizontal: 5, padding: 5, marginBottom: 15 }}
                onChangeText={userStory => this.setState({ userStory })}
                underlineColorAndroid="transparent"
                autoCorrect={false}
                textAlignVertical={'top'}
              />
              <Text style={{ fontSize: 18 }}> Robbery Date </Text>
              <TextInput
                placeholder="DD/MM/YYYY  (optional)"
                style={{ height: 36, borderColor: 'gray', borderWidth: 1, borderRadius: 5, fontSize: 14, marginVertical: 5, marginHorizontal: 5, padding: 5, justifyContent: 'center', marginBottom: 20 }}
                onChangeText={robberyDate => this.setState({ robberyDate })}
                keyboardType="numbers-and-punctuation"
                underlineColorAndroid="transparent"
                autoCorrect={false}
              />
              <TouchableHighlight
                style={{
                  alignItems: 'center',
                  height: 48,
                  marginVertical: 10,
                  backgroundColor: '#C74246',
                  justifyContent: 'center',
                  marginHorizontal: 20,
                  borderRadius: 40,
                }}
                underlayColor={'#ef5f5f'}
                onPress={() => this._pinLocation()}
              >
                <Text style={{ fontSize: 18, color: '#fff' }}> Submit </Text>
              </TouchableHighlight>
              <TouchableOpacity onPress={() => {
                this.setState({ modalVisible: false });
              }}
              >
                <Text style={{ textAlign: 'center' }}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <AnalyticsCard
          safetyRate={this.state.analytics.safetyRate.toFixed(0)}
          pastMonth={this.state.analytics.pastMonth}
          pastWeek={this.state.analytics.pastWeek}
        />

        <View style={{ justifyContent: 'center', flex: 1 }}>
          {
            (!this.state.changingLocation &&
              <MaterialIcons name="my-location" size={24} color="#414c52" style={{ backgroundColor: 'rgba(0,0,0,0)', zIndex: 1, position: 'absolute', alignSelf: 'center' }} />
            ) ||
              <MaterialIcons name="location-searching" size={30} color="#414c52" style={{ backgroundColor: 'rgba(0,0,0,0)', zIndex: 1, position: 'absolute', alignSelf: 'center' }} />
          }

          <TouchableHighlight
            style={{ height: 60, width: 60, backgroundColor: '#fff', borderRadius: 30, zIndex: 1, position: 'absolute', bottom: 10, right: 10, alignItems: 'center', justifyContent: 'center' }}
            onPress={() => this.getUserLocation()}
            underlayColor={'rgba(255, 255, 255, 0.1)'}
          >
            <MaterialIcons name="my-location" size={24} color="#414c52" onPress={() => this.getUserLocation()} />
          </TouchableHighlight>

          <MapView
            provider="google"
            region={this.state.region}
            onRegionChange={region => this.onRegionChange(region)}
            onRegionChangeComplete={region => this.onRegionChangeComplete()}
            showsUserLocation
            style={styles.map}
          />
        </View>

        <View style={{ justifyContent: 'center', height: 48, backgroundColor: this.state.accentColor }}>
          {(!this.state.user.loginState && <LoginBar navigation={this.props.navigation} />)
            ||
            (Platform.OS === 'android' &&
              <TouchableHighlight
                onPress={() => this.openLocationSubmitModal()}
                style={{ backgroundColor: '#C74246', alignItems: 'center', justifyContent: 'center' }}
                underlayColor={'rgba(255, 255, 255, 0.1)'}
              >
                <Text style={{ color: '#fff' }}> Pin Location </Text>
              </TouchableHighlight>
            ) ||
            <Button
              title="Pin Location"
              onPress={() => this.openLocationSubmitModal()}
              color="#fff"
            />
          }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
