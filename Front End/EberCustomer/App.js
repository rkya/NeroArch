import React from 'react';
import {StackNavigator} from 'react-navigation';
import {Alert, AppRegistry, Button, StyleSheet, Text, TextInput, View, YellowBox} from 'react-native';
import {BookScreen, CompleteScreen, CustomerScreen, RidingScreen,CancelScreen} from './src/components';


export const RootStack = StackNavigator(
  {
    Customer: {
      screen: CustomerScreen,
    },
    Complete: {
      screen: CompleteScreen,
    },
    Book: {
      screen: BookScreen,
    },
    Riding: {
      screen: RidingScreen,
    },
    Cancel: {
      screen: CancelScreen,
    }
  },
  {
    initialRouteName: 'Customer',
  }
);


export default class App extends React.Component {
  render() {
    return(

        <RootStack navigation={this.props.navigation}/>

    );
  }
}

// skip this line if using Create React Native App
AppRegistry.registerComponent('RootStack', () => ButtonBasics);
