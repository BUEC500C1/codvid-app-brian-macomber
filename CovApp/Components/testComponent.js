// Code referenced for API call & formatting:
// https://medium.com/better-programming/handling-api-like-a-boss-in-react-native-364abd92dc3d

import React from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
} from 'react-native';

import styles from '../Styling/styles';

export default class GlobalComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      dataSource: [],
    };
  }
  componentDidMount() {
    fetch('https://api.covid19api.com/summary')
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          loading: false,
          dataSource: responseJson.Countries,
        });
      })
      .catch(error => console.log(error)); //to catch the errors if any
  }
  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}
      />
    );
  };
  renderItem = data => (
    <TouchableOpacity style={styles.list}>
      <Text style={{fontSize: 15, fontWeight: 'bold'}}>
        {data.item.Country}:
      </Text>
      <Text> Total Confirmed Cases: {data.item.TotalConfirmed}</Text>
      <Text> Death Total: {data.item.TotalDeaths}</Text>
      <Text> Total Recovered Cases: {data.item.TotalRecovered}</Text>
    </TouchableOpacity>
  );
  render() {
    if (this.state.loading) {
      return (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#0c9" />
        </View>
      );
    }
    return (
      <View style={styles.container_api}>
        <Text
          style={{
            fontSize: 30,
            fontWeight: 'bold',
            textAlign: 'center',
            marginTop: 35,
          }}>
          COVID-19 Statistics by Country
        </Text>
        <FlatList
          data={this.state.dataSource}
          ItemSeparatorComponent={this.FlatListItemSeparator}
          renderItem={item => this.renderItem(item)}
          keyExtractor={item => item.Country}
        />
      </View>
    );
  }
}
