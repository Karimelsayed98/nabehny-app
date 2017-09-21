import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';

export default class AnalyticsCard extends Component {
  constructor() {
    super();
    this.state = {
      analytics: {
        thisMonth: 50,
        thisWeek: 21,
        safetyRate: 85,
      },
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.header}> PAST MONTH </Text>
          <Text style={styles.number}> {this.state.analytics.thisMonth} </Text>
        </View>
        <View style={styles.vBreak} />
        <View style={styles.card}>
          <Text style={styles.header}> SAFETY RATE </Text>
          <Text style={styles.number}> {this.state.analytics.safetyRate} </Text>
        </View>
        <View style={styles.vBreak} />
        <View style={styles.card}>
          <Text style={styles.header}> PAST WEEK </Text>
          <Text style={styles.number}> {this.state.analytics.thisWeek} </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 6,
    backgroundColor: '#fff',
  },
  card: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginVertical: 15,
  },
  header: {
    fontSize: 12,
    fontWeight: '100',
    textAlign: 'center',
  },
  number: {
    fontSize: 34,
    marginTop: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  vBreak: {
    backgroundColor: '#f3f3f3',
    width: 1,
    marginVertical: 15,
  },
});
