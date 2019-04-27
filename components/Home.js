/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import FetchLocation from './FetchLocation';
import UserMap from './UserMaps';

export default class App extends Component {
  state = {
    userLocation: null,
    usersPlaces: []
  }

  getUserLocationHandler = () => {
    // console.log('Button Pressed');
    navigator.geolocation.getCurrentPosition(pos => {
      console.log(pos);
      this.setState({
        userLocation: {
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }
      });
      // store location in firebase
      fetch('https://mymapapp-4ac00.firebaseio.com/places.json', {
        method: 'POST',
        body: JSON.stringify({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        })
      })
      .then(res => console.log(res))
      .catch(err => console.error(err))
    }, err => console.log(err));
  }

  getUserPlacesHandler = () => {
    fetch('https://mymapapp-4ac00.firebaseio.com/places.json')
      .then(res => res.json())
      .then(parsedResponse => {
        console.log('Pased Loaction: ', parsedResponse);
        const tempPlaces = [];
        for(const key in parsedResponse) {
          tempPlaces.push({
            id: key,
            latitude: parsedResponse[key].latitude,
            longitude: parsedResponse[key].longitude            
          });
        }
        this.setState({ usersPlaces: tempPlaces })
      })
      .catch(err => console.error(err))
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{marginBottom: 20}}>
          <Button title="Get User Locations" onPress={this.getUserPlacesHandler} />
        </View>
        <FetchLocation onGetLocation={this.getUserLocationHandler} />
        <UserMap
          userLocation={this.state.userLocation}
          usersPlaces={this.state.usersPlaces}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
