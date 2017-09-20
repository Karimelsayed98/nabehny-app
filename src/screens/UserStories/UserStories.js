import React, { Component } from 'react';
import { ListView, Text, StyleSheet, View, Dimensions } from 'react-native';

const data = require('./db.json');

export default class UserStories extends Component {
  constructor() {
    super();
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      mydataSource: ds.cloneWithRows(data.messages),
    };
  }

  render() {
    return (
      <ListView
        style={{ width: Dimensions.get('window').width, marginTop: 12 }}
        dataSource={this.state.mydataSource}
        renderRow={
          (rowData) => {
            const regex = /[\u0600-\u06FF]+/;
            const isArabic = regex.test(rowData.body);
            return (
              <View style={styles.msg}>
                <Text style={(isArabic && { alignItems: 'stretch', textAlign: 'right' }) || { alignItems: 'stretch', textAlign: 'left' }}>
                  {rowData.body}
                </Text>
                <Text style={!isArabic && { alignSelf: 'flex-end' }}>
                  {rowData.date}
                </Text>
              </View>
            );
          }
        }
      />
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
  },
  arText: {
    alignItems: 'stretch',
  },
  msg: {
    borderRadius: 5,
    marginVertical: 5,
    marginHorizontal: 5,
    padding: 5,
    backgroundColor: '#ddd',
    alignItems: 'stretch',
  },
});
