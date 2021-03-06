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

export class RidingScreen extends React.Component {
  constructor(props) {
    super(props);
    YellowBox.ignoreWarnings([
      'Warning: componentWillMount is deprecated',
      'Warning: componentWillReceiveProps is deprecated',
      'Warning: Failed prop type: Invalid prop'
    ]);

    this.state = {
      timeout: null,
    };
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
            }}>Ride in Progress</Text>
            <ActivityIndicator size="large" color="white"/>

            <View style={styles.buttonContainer}>
              <Button
                color="white"
                onPress={() => {
                        console.log('Completing Ride...');
                        let apiString = baseURL + 'arbiter/completeTransaction';
                        console.log(apiString);

                        fetch(apiString)
                          .then((response) => response.json())
                          .then((responseJson) => {
                            console.log(responseJson.returnString);
                          })
                          .catch((error) => {
                            console.error(error);
                          });
                        this.props.navigation.navigate('Complete');
                      }
                    }
                title="Complete Ride"
                raised = 'True'
                justifyContent="center"
              />
            </View>
          </View>
        </View>
      </BackgroundImage>
    );
  }

  componentDidMount() {

    // let apiString = baseURL + 'driver/startRide';
    // console.log(apiString);
    //
    // fetch(apiString)
    //   .then((response) => response.json())
    //   .then((responseJson) => {
    //     console.log(responseJson.returnString);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });



    this.state.timeout = setInterval(() => {
      this.checkState({timePassed: true})
    }, 3000);
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
            this.assignDriver();
            // clearTimeout(this.state.timeout);
            // this.props.navigation.navigate('Driver');
            break;
          case IDLE:
            console.log('Idle state');
            clearTimeout(this.state.timeout);
            this.props.navigation.navigate('Driver');
            break;
          case DRIVER_ASSIGNED:
            console.log('DRIVER_ASSIGNED state!');

            break;
          case AWAITING_DESTINATION:
            console.log('AWAITING_DESTINATION state!');
            // clearTimeout(this.state.timeout);
            // this.props.navigation.navigate('Riding');
            break;
          case COMPLETE:
            console.log('COMPLETE state!');
            clearTimeout(this.state.timeout);
            this.props.navigation.navigate('Complete');
            break;
          default:
            // clearTimeout(this.state.timeout);
            // this.props.navigation.navigate('Riding');
            console.log('Default state!');
            // console.log('Contract state = ' + responseJson.state);
            break;
        }
      })
      .catch((error) => {
        console.error(error);
      });

  }

  assignDriver() {
    let apiString = baseURL + 'driver/startRide';
    console.log(apiString);

    fetch(apiString)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson.returnString);
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
    flexDirection:'column'
  },
  buttonContainer: {
    margin: 20,
    //fontSize: 100,
    fontWeight: 'bold',
    backgroundColor: "rgba(0,0,0,0.9)",
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    color: 'white',
    width: "40%",
    marginLeft: "30%"
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
  },
  container2: {
    flexDirection:'row',
    height: "7%",
    width: "92%",
    backgroundColor:"red",
    alignItems: "center",
    margin: 15,
    //justifyContent:"center",
    borderRadius: 15,
    backgroundColor: "rgba(0,0,0,0.5)",
    color: "white"
  }
});

export default RidingScreen;
