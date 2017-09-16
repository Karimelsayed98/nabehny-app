import React, { Component } from 'react';
import MapView from 'react-native-maps';
import { View, StyleSheet, Button } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = 0.0421;

export default class MapScreen extends Component {
  constructor() {
    super();
    this.state = {
      region: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
    };
  }

  componentDidMount() {
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
    this.setState({ region });
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          provider="google"
          region={this.state.region}
          onRegionChange={region => this.onRegionChange(region)}
          showsUserLocation
          showsMyLocationButton
          cacheEnabled
          loadingEnabled
          style={styles.map}
        >
          <View style={{ width: 30, height: 30, backgroundColor: 'rgba(0,0,0,0)', justifyContent: 'center', alignItems: 'center' }}>
            <MaterialIcons name="my-location" size={24} color="#000" />
          </View>
        </MapView>
        <View style={{ justifyContent: 'center', height: 48, backgroundColor: '#841584' }}>
          <Button
            title="Pin Location"
            onPress={() => console.log('Pin Location')}
            color="#fff"
          />
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
