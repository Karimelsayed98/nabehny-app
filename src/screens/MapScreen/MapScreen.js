import React, { Component } from 'react';
import MapView from 'react-native-maps';
import { MaterialIcons } from '@expo/vector-icons';
import { View, StyleSheet, Button } from 'react-native';
import LoginBar from '../../components/LoginBar';
import AnalyticsCard from '../../components/AnalyticsCard';
import { firebase } from '../../Firebase/Firebase';

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
    };
  }

  async componentDidMount() {
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

  onRegionChange(region) {
    this.setState({ region, changingLocation: true });
  }

  onRegionChangeComplete() {
    this._getAnalytics();
    this.setState({ changingLocation: false });
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

  _pinLocation() {
    const database = firebase.database();
    const locationsRef = database.ref('locations');
    const userID = firebase.auth().currentUser.uid;
    const entryDate = new Date().toLocaleDateString();
    const robberyDate = new Date().toLocaleDateString();
    const userStory = '';

    const location = {
      latitude: this.state.region.latitude,
      longitude: this.state.region.longitude,
      userID,
      entryDate,
      robberyDate,
      userStory,
    };
    locationsRef.push(location);
  }

  _getAnalytics() {
    const database = firebase.database();
    const locationsRef = database.ref('locations');
    const positionMargin = 0.045;
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
          const robDate = new Date(location.robberyDate).getTime();
          const lastMonth = new Date().setDate(today.getDate() - 30);
          return (
            robDate >= lastMonth
          );
        });
        pastMonth = result.length;

        result = result.filter((location) => {
          const today = new Date();
          const robDate = new Date(location.robberyDate).getTime();
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
        <AnalyticsCard
          safetyRate={this.state.analytics.safetyRate}
          pastMonth={this.state.analytics.pastMonth}
          pastWeek={this.state.analytics.pastWeek}
        />
        <MapView
          provider="google"
          customMapStyle={mapStyle}
          region={this.state.region}
          onRegionChange={region => this.onRegionChange(region)}
          onRegionChangeComplete={() => this.onRegionChangeComplete()}
          showsUserLocation
          showsMyLocationButton
          cacheEnabled
          loadingEnabled
          style={styles.map}
        >
          {
            (!this.state.changingLocation &&
              <MaterialIcons name="my-location" size={24} color="#fff" style={{ backgroundColor: 'rgba(0,0,0,0)' }} />
            ) ||
              <MaterialIcons name="location-searching" size={30} color="#fff" style={{ backgroundColor: 'rgba(0,0,0,0)' }} />
          }
        </MapView>
        <View style={{ justifyContent: 'center', height: 48, backgroundColor: '#841584' }}>
          {(!this.state.user.loginState && <LoginBar navigation={this.props.navigation} />)
            ||
            <Button
              title="Pin Location"
              onPress={() => this._pinLocation()}
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
