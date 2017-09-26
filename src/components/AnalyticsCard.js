import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';

export default class AnalyticsCard extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.header}> PAST MONTH </Text>
          <Text style={styles.number}> {this.props.pastMonth} </Text>
        </View>
        <View style={styles.vBreak} />
        <View style={styles.card}>
          <Text style={styles.header}> SAFETY RATE </Text>
          <Text style={styles.number}> {this.props.safetyRate} </Text>
        </View>
        <View style={styles.vBreak} />
        <View style={styles.card}>
          <Text style={styles.header}> PAST WEEK </Text>
          <Text style={styles.number}> {this.props.pastWeek} </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
