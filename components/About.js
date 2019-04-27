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