import React from 'react';
import { View, StyleSheet } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
const userMaps = props => {
  const { userLocation, usersPlaces  } = props;
  const userMarker = userLocation ? <Marker coordinate={userLocation} /> : null;
  const usersPlacesMarkers =  usersPlaces.map(place => {
    return <Marker coordinate={place} key={place.id}/>
  });
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
        {usersPlacesMarkers}
      </MapView>
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