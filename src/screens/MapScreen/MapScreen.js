import React, { Component } from 'react';
import MapView from 'react-native-maps';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default class MapScreen extends Component {
  state = {
    region: {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
  }

  getInitialState() {
    return {
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
    };
  }

  onPanDrag(newRegion) {
    const { latitude, longitude } = newRegion.coordinate;
    console.log(latitude, longitude);
  }

  onRegionChange(region) {
    this.setState({ region });
    console.log(region);
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
          <MapView.Marker
            coordinate={{
              latitude: this.state.region.latitude,
              longitude: this.state.region.longitude,
            }}
          />
        </MapView>
        <Text> {this.state.region.latitude} </Text>
        <Text> {this.state.region.longitude} </Text>
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
  },
});
