/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View, Dimensions
} from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import Offers from "./src/pages/Offers"



const SecondRoute = () => (
  <View style={[styles.container, { backgroundColor: '#673ab7' }]} />
);

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      index: 0,
      routes: [
        { key: 'first', title: 'Offerte' },
        { key: 'second', title: 'Second' },
      ],
    };
  }


  
render() {
  return (
    <TabView
    navigationState={this.state}
    renderScene={SceneMap({
      first: Offers,
      second: SecondRoute,
    })}
    onIndexChange={index => this.setState({ index })}
    initialLayout={{ width: Dimensions.get('window').width }}
  />
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
