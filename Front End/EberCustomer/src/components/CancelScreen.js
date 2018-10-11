import React from "react";
import {ActivityIndicator, Alert, Button, StyleSheet, Text, TextInput, View, YellowBox, ImageBackground} from "react-native";
import {AWAITING_DESTINATION, baseURL, COMPLETE, DRIVER_ASSIGNED, FINDING_DRIVER, IDLE} from "../utils/constants";

class BackgroundImage extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={require('./background3.jpg')}
                         style={styles.backgroundImage}
                         blurRadius={1}>

          {this.props.children}
        </ImageBackground>
      </View>
    )
  }
}

export class CancelScreen extends React.Component {
  constructor(props) {
    super(props);
    YellowBox.ignoreWarnings([
      'Warning: componentWillMount is deprecated',
      'Warning: componentWillReceiveProps is deprecated',
      'Warning: Failed prop type: Invalid prop'
    ]);
    this.state = {timeout: null};
  }

  render() {

    return (
      <BackgroundImage>
        <View style={styles.mainContainer}>
          <View style={styles.container}>

            <Text style = {styles.header}>NEROARCH</Text>

            <Text style={{
              display: "flex",
              marginTop: 25,
              marginBottom: 15,
              justifyContent: 'center',
              textAlign: 'center',
              alignItems: "center",
              fontWeight: "bold",
              color: "#fff",
              fontSize: 20
            }}>Cancelling Cab</Text>
            <ActivityIndicator size="large" color="white"/>

          </View>
        </View>
      </BackgroundImage>

    );
  }

  componentDidMount() {
    let apiString = baseURL + 'arbiter/state';
    console.log(apiString);

    fetch(apiString)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson.state);
        this.state.timeout = setInterval(() => {
          this.checkState()
        }, 3000);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  checkState() {
    let apiString = baseURL + 'arbiter/state';
    console.log(apiString);

    fetch(apiString)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson.state);
        switch (responseJson.state) {
          case FINDING_DRIVER:
            console.log('FINDING_DRIVER state');
            break;
          case IDLE:
            console.log('Idle state');
            console.log('Contract state = ' + responseJson.state);
            clearTimeout(this.state.timeout);
            this.props.navigation.navigate('Customer');
            break;
          case DRIVER_ASSIGNED:
            console.log('DRIVER_ASSIGNED state!');
            clearTimeout(this.state.timeout);
            this.props.navigation.navigate('Riding');
            break;
          case AWAITING_DESTINATION:
            console.log('AWAITING_DESTINATION state!');
            // clearTimeout(this.state.timeout);
            // console.log('Cab Booked');
            // this.props.navigation.navigate('Riding');
            clearTimeout(this.state.timeout);
            this.props.navigation.navigate('Riding');
            break;
          case COMPLETE:
            console.log('COMPLETE state!');
            clearTimeout(this.state.timeout);
            this.props.navigation.navigate('Complete');
            break;
          default:
            console.log('Default state');
            console.log('Contract state = ' + responseJson.state);
            break;
        }
      })
      .catch((error) => {
        console.error(error);
      });

  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover'
  },
  mainContainer: {
    height: '94%',
    width: '94%',
    margin:"3%",
    backgroundColor: "rgba(0,0,0,0.4)"
  },
  demoContainer: {
    height: '100%',
    width: '100%',
  },
  mapContainer: {
    height: '100%',
    width: '100%',
  },
  container: {
    flex: 1,

    justifyContent: 'center',
  },
  buttonContainer: {
    margin: 20,
    borderColor: '#fff'
  },
  alternativeLayoutButtonContainer: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  header: {
    display: "flex",
    marginTop: 0,
    marginBottom: 0,
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: "center",
    fontWeight: "bold",
    fontSize: 40,
    backgroundColor: "rgba(0,0,0,0.2)",
    color: "#fff",
    height: 50,
    padding : 5
  }
});

export default CancelScreen;
