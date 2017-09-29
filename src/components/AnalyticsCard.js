import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';

export default class AnalyticsCard extends Component {
  render() {
    return (
      <View style={{ backgroundColor: '#fff', alignItems: 'center' }}>
        <Text style={{ fontSize: 12, marginVertical: 12 }}> Robbery Analytics for this Area </Text>
        <View style={styles.container}>
          <View style={styles.card}>
            <Text style={styles.header}> PAST MONTH </Text>
            <Text style={{ fontSize: 10, textAlign: 'center' }}>Robberies</Text>
            <Text style={styles.number}> {this.props.pastMonth} </Text>
          </View>
          <View style={styles.vBreak} />
          <View style={styles.card}>
            <Text style={styles.header}> SAFETY RATE </Text>
            <Text style={[styles.number, { marginTop: 14 }]}> {this.props.safetyRate}<Text style={{ fontWeight: 'normal', fontSize: 14 }}>%</Text> </Text>
          </View>
          <View style={styles.vBreak} />
          <View style={styles.card}>
            <Text style={styles.header}> PAST WEEK </Text>
            <Text style={{ fontSize: 10, textAlign: 'center' }}>Robberies</Text>
            <Text style={styles.number}> {this.props.pastWeek} </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
  },
  card: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginBottom: 5,
  },
  header: {
    fontSize: 12,
    fontWeight: '100',
    textAlign: 'center',
  },
  number: {
    fontSize: 34,
    marginTop: 2,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  vBreak: {
    backgroundColor: '#f3f3f3',
    width: 1,
    marginVertical: 10,
  },
});
