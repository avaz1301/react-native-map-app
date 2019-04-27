/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';
import {createBottomTabNavigator, createAppContainer} from 'react-navigation';
import {Icon} from 'react-native-elements';

import HomeScreen from './components/Home';
import AboutScreen from './components/About';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

// export class App extends Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text>My App Page</Text>
//       </View>
//     );
//   }
// }
const AppNavigator = createBottomTabNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      tabBarLabel: 'HOME',
      tabBarIcon: () => (
        <Icon
          size={24}
          name='home'
          type='font-awesome'
          color='#f50'
        />
      )
    }
  },
  About: {
    screen: AboutScreen,
    navigationOptions: {
      tabBarLabel: 'ABOUT',
      tabBarIcon: () => (
        <Icon
          size={24}
          name='address-card'
          type='font-awesome'
          color='#f50'
        />
      )
    }
  }
});
export default createAppContainer(AppNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});
