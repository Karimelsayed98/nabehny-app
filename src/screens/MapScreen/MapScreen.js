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

  async userLoginListener() {
    await firebase.auth().onAuthStateChanged((user) => {
      console.log('listener');
      if (user) {
        // User is signed in.
        this.setState({ user: { loginState: true } });
      } else {
        // No user is signed in.
        this.setState({ user: { loginState: false } });
      }
    });
  }

  _logout() {
    firebase.auth().signOut();
    this.setState({ user: { loginState: false } });
  }

  render() {
    return (
      <View style={styles.container}>
        <AnalyticsCard />
        <MapView
          provider="google"
          customMapStyle={mapStyle}
          region={this.state.region}
          onRegionChange={region => this.onRegionChange(region)}
          onRegionChangeComplete={() => this.setState({ changingLocation: false })}
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
              onPress={() => this._logout()}
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
