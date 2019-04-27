
# Start React Native App
### Helpful Links

* Expo: https://docs.expo.io/versions/v32.0.0

* React Native Getting Started: [https://facebook.github.io/react-native/docs/getting-started]

* React Native GeoLocation: [https://facebook.github.io/react-native/docs/geolocation]

* FireBase: [https://console.firebase.google.com/u/0/ ]

* Google API Console: [https://console.developers.google.com/]

* Android Studio: [https://developer.android.com/studio/index.html]

* React Native Maps: [https://github.com/react-native-community/react-native-maps]

* React Native Elements/Icons: [https://react-native-training.github.io/react-native-elements/docs/getting_started.html]

  
  
  

### Node Installs:

#### START

`npm install -g react-native-cli`

  

`npm install react-native-maps --save`

  

#### STRETCH - GOAL

###### INSTALL NAVIGATION

`npm install --save react-navigation`

###### INSTALL REACT NATIVE ELEMENTS and ICONS

`npm i react-native-elements --save`

`npm i --save react-native-vector-icons`

`react-native link react-native-vector-icons`
###### NOTE: if nav has issue may need to install this package
`npm i --save react-native-gesture-handler`

  
  
  
  
  

### Install Android Studio: Make sure to have this or Xcode installed to actually test your application.
* Android Studio: [https://developer.android.com/studio/index.html]

  

#### Assuming that you have Node 10+ installed, you can use npm to install the Expo CLI command line utility:
* INSTALL DEPENDENCIES FOR EXPO and react native cli
`npm install -g expo-cli`
`npm install -g react-native-cli`
Then once install is complete:
`expo init MyMapApp`
Select Blank as the option, enter the name of your project when prompted.
Once completed navigate into your project directory and start your app:
`cd MyMapApp`
`npm start // you can also use: expo start`

  

##### OPTIONAL - Once it works eject the app, or skip this step and go to the next one down
`npm run eject`
 
  

### CREATE NEW PROJECT WHICH WE WILL START WORKING ON
if you havent already, install react native cli using node:
`npm install -g react-native-cli`

Then in the directory of your choice create your react-native app:
`react-native init ReactNativeMap`

Navigate into your project folder and run your app:
`cd ReactNativeMap`
`react-native run-android`

  

##### IF THERE IS PACKAGE ERROR (google is your friend)
The issue might be fix by doing:
`npm add @babel/runtime`
`npm install`
 then
`react-native run-android`

  
  
 ### Now we can open up our project in an IDE and get started
1)  modify App.js to show it works
```javascript
export class App extends Component {
	render() {
		return (
			<View style={styles.container}>
				<Text>My App Page</Text>
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
	}
});
 ```
  
2) add fetching location component
##### components/FetchLocation.js
```javascript
import React from 'react';
import { View, Button } from 'react-native';

const fetchLocation = props => {
	return (
		<View>
			<Button title="Get Location" onPress={props.onGetLocation}/>
		</View>
	);
}
export default fetchLocation;
```

3)  add fetch component to app component APP.JS
and pass get location handler
```javascript
import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import FetchLocation from './FetchLocation';

export default class App extends Component {
	getUserLocationHandler = () => {
		console.log('Button Pressed');
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={{marginBottom: 20}}>
				<FetchLocation onGetLocation={this.getUserLocationHandler} />
				</View>
			</View>
		);
	}
}
```
4) add native location

##### MAKE IT WORK!!!! https://facebook.github.io/react-native/docs/geolocation
```javascript
getUserLocationHandler = () => {
	navigator.geolocation.getCurrentPosition(pos => {
		console.log(pos);
	}, err => console.log(err));
}
```

5) add google maps component

#### React Native Maps: https://github.com/react-native-community/react-native-maps
#### Google API Console: https://console.developers.google.com/
IN components/UserMaps.js
```javascript
import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';

const userMaps = props => {
	return(
		<View style={styles.mapContainer}>
			<MapView
				initialRegion={{
					latitude: 40.756698, // Microsoft Location
					longitude: -73.989944,
					latitudeDelta: 0.0922,
					longitudeDelta: 0.0421,
				}}
				style={styles.map}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	mapContainer: {
		width: '100%',
		height: 300
	},	
	map: {
		width: '100%',
		height: '100%'
	}
});

export default userMaps;
```

6) Add map componet to App.js
```javascript
render() {
	return (
		<View style={styles.container}>
			<FetchLocation onGetLocation={this.getUserLocationHandler} />
			<UserMap />
		</View>
	);
}
  ```
  
 
### 7) so now we want to have the map show the users current position
#### in App.js save location to state
```javascript
getUserLocationHandler = () => {
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
	}, err => console.log(err));
}

render() {
	return (
		<View style={styles.container}>
			<FetchLocation onGetLocation={this.getUserLocationHandler} />
			<UserMap userLocation={this.state.userLocation}/>
		</View>
	);
}
```
in UserMaps.js
```javascript
const userMaps = props => {
	return(
		<View style={styles.mapContainer}>
			<MapView
				initialRegion={{
					latitude: 40.756698, // Microsoft Location
					longitude: -73.989944,
					latitudeDelta: 0.0922,
					longitudeDelta: 0.0421,
				}}
				region={props.userLocation}
				style={styles.map}
			/>
		</View>
	);
}
```
  ### 8) ADD MARKER to map
```javascript
const userMaps = props => {
	const { userLocation } = props;
	const userMarker = userLocation ? <Marker coordinate={userLocation} /> : null;
	return(
		<View style={styles.mapContainer}>
			<MapView
				initialRegion={{
					latitude: 40.756698, // Microsoft Location
					longitude: -73.989944,
					latitudeDelta: 0.0922,
					longitudeDelta: 0.0421,
				}}
				region={userLocation}
				style={styles.map}
			>
				{userMarker}
			</MapView>
		</View>
	);
}
```
### 9) Now we want to save user locations

* Add FireBase: https://console.firebase.google.com/u/0/
* use realtime database
	a) save new user location
	b) add button to fetch locations from DB
	c) add function to fetch locations from DB

// APP.js
 ```javascript
export default class App extends Component {
	state = {
		userLocation: null,
		usersPlaces: []
	}

	getUserLocationHandler = () => {
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
			//////////// PART A
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
			//////////// PART A
		}, err => console.log(err));
	}

	//////////// PART C
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
	//////////// PART C

	render() {
		return (
			<View style={styles.container}>
				{/* PART B */}
				<View style={{marginBottom: 20}}>
					<Button title="Get User Locations" onPress={this.getUserPlacesHandler} />
				</View>
				{/* PART B */}
				<FetchLocation onGetLocation={this.getUserLocationHandler} />
				<UserMap
					...
					usersPlaces={this.state.usersPlaces}
				/>
			</View>
		);
	}
}
```  
  

### 9) add markers for user places to UserMaps.js
```javascript
const userMaps = props => {
	const { userLocation, usersPlaces } = props;
	const userMarker = userLocation ? <Marker coordinate={userLocation} /> : null;
	// NEW
	const usersPlacesMarkers = usersPlaces.map(place => {
	return <Marker coordinate={place} key={place.id}/>
});

// NEW
	return(
		<View style={styles.mapContainer}>
			<MapView
				initialRegion={{
					latitude: 40.756698, // Microsoft Location
					longitude: -73.989944,
					latitudeDelta: 0.0922,
					longitudeDelta: 0.0421,
				}}
				region={userLocation}
				style={styles.map}
			>
				{userMarker}
				{usersPlacesMarkers} {/* NEW */}
			</MapView>
		</View>
	);
}
```
 
 ### Stretch GOALs
### 10) Add NAVIGATION

`npm install --save react-navigation`

// NOTE: if nav has issue may need to install this package
`npm i --save react-native-gesture-handler`

  

a) Copy App.js contents into component/Home.js
##### FIX CHILD COMPONENT PATHS!!!
b) Create basic ABout page component
```javascript
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const About = props => {
	return(
		<View style={styles.container}>
			<Text>MY ABOUT PAGE</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignContent: 'center',
		width: '100%',
		height: 300
	}
});
export default About;

  

// c) App.js now becomes
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';
import {createBottomTabNavigator, createAppContainer} from 'react-navigation';

import HomeScreen from './components/Home';
import AboutScreen from './components/About';
  
const AppNavigator = createBottomTabNavigator({
	Home: {
		screen: HomeScreen
	},
	About: {
		screen: AboutScreen
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
```
  

### 11) Add icons for the navigator APP.JS

##### React Native Elements/Icons: https://react-native-training.github.io/react-native-elements/docs/getting_started.html

##### INSTALL REACT NATIVE ELEMENTS and ICONS
`npm i react-native-elements --save`
`npm i --save react-native-vector-icons` 
`react-native link react-native-vector-icons`

```javascript
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';
import {createBottomTabNavigator, createAppContainer} from 'react-navigation';
import {Icon} from 'react-native-elements';

import HomeScreen from './components/Home';
import AboutScreen from './components/About';

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
```