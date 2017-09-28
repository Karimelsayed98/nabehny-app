import React, { Component } from 'react';
import { ListView, Text, StyleSheet, View, Dimensions } from 'react-native';
import { firebase } from '../../Firebase/Firebase';

export default class UserStories extends Component {
  constructor() {
    super();

    this._getUserStories();
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      mydataSource: ds.cloneWithRows({}),
    };
  }

  _getUserStories() {
    const database = firebase.database();
    const locationsRef = database.ref('locations');
    locationsRef.once('value')
      .then((snapshot) => {
        const locations = snapshot.val();
        const result = Object.keys(locations)
          .map(key => locations[key])
          .filter(location => location.userStory.toString().length > 5)
          .slice(0, 20);

        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.setState({ mydataSource: ds.cloneWithRows(result) });
      });
  }

  render() {
    return (
      <ListView
        style={{ width: Dimensions.get('window').width, backgroundColor: '#fff' }}
        dataSource={this.state.mydataSource}
        enableEmptySections
        renderRow={
          (rowData) => {
            const regex = /[\u0600-\u06FF]+/;
            const isArabic = regex.test(rowData.userStory);
            return (
              <View style={styles.msg}>
                <Text style={(isArabic && { alignItems: 'stretch', textAlign: 'right' }) || { alignItems: 'stretch', textAlign: 'left' }}>
                  {rowData.userStory}
                </Text>
                <Text style={!isArabic && { alignSelf: 'flex-end', marginTop: 5 }}>
                  {rowData.entryDate}
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
