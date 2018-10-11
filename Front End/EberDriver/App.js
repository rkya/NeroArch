import React from 'react';
import {StackNavigator} from 'react-navigation';
import {Alert, AppRegistry, Button, StyleSheet, Text, TextInput, View, YellowBox} from 'react-native';
import {CompleteScreen, DriverScreen, RidingScreen} from './src/components';


export const RootStack = StackNavigator(
  {
    Driver: {
      screen: DriverScreen,
    },
    Complete: {
      screen: CompleteScreen,
    },
    Riding: {
      screen: RidingScreen,
    },
  },
  {
    initialRouteName: 'Driver',
  }
);


function checkState() {
    let apiString = baseURL + 'driver/address';
    console.log(apiString);
    fetch(apiString)
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson.state);
            this.state.driverAddress = responseJson.address;
        })
        .catch((error) => {
            console.error(error);
        });
}

function requireAuth(nextState, replace) {
    if (!checkState()) {
        replace({
            pathname: '/checkState'
        })
    }
}


export default class App extends React.Component {
  render() {
    return <RootStack navigation={this.props.navigation}/>;
  }
}

// skip this line if using Create React Native App
AppRegistry.registerComponent('RootStack', () => ButtonBasics);
