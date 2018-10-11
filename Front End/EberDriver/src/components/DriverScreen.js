import React from "react";
import {Alert, Button, StyleSheet, Text, View, YellowBox,ImageBackground} from "react-native";
import {List, ListItem} from 'react-native-elements';
import {baseURL, FINDING_DRIVER, IDLE, AWAITING_DESTINATION, COMPLETE, DRIVER_ASSIGNED} from "../utils/constants";
// import {HideableView} from 'react-native-hideable-view';


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

export class DriverScreen extends React.Component {
  constructor(props) {
    super(props);
    YellowBox.ignoreWarnings([
      'Warning: componentWillMount is deprecated',
      'Warning: componentWillReceiveProps is deprecated',
      'Warning: Failed prop type: Invalid prop'
    ]);

    this.setDriverAddress();

    this.state = {
      balance:0,
      timeout: null,
      customerAvailable: false
    };
    //this.onGetBalance = this.onGetBalance.bind(this);
    this.onGetBalance();
  }

  setDriverAddress() {
    let apiString = baseURL + 'driver/address';
    console.log(apiString);
    fetch(apiString)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson.address);
        this.state.driverAddress = responseJson.address;
      })
      .catch((error) => {
        console.error(error);
      });
  }


  render() {
    return (
      <BackgroundImage>
        <View style={styles.mainContainer}>
          <View style={styles.container}>
            <Text style = {styles.header}>NEROARCH</Text>

            <View style={styles.container2}>
              <View backgroundColor="rgba(0,0,0,0.7)"
                    borderBottomLeftRadius="15"
                    borderTopLeftRadius="15"
                    width = "50%">
                <Button
                  color='white'
                  onPress={() => this.onGetBalance()}
                  title="Check Balance"
                  raised = 'True'
                  backgroundColor="white"
                  fontSize="15"
                />
              </View>
              <View /*backgroundColor="rgba(0,0,0,0.5)"*/
                    borderBottomRightRadius="15"
                    borderTopRightRadius="15"
                    width = "50%"
                    height= "100%"
                    alignItems="center"
                    justifyContent="center"
                    color="white">
                  <Text fontSize="15" style={{color:'white'}}> {this.state.balance} </Text>
              </View>
            </View>//Check Balance

            <View style={styles.buttonContainer}>
              <Button
                color="white"
                onPress={() => this.props.navigation.navigate('Riding')}
                title="Start Ride"
                raised = 'True'
                justifyContent="center"
              />
            </View>
          </View>
        </View>
    </BackgroundImage>
    );
  }

  onGetBalance() {
    let apiString = baseURL + 'arbiter/getBalance?address=' + this.state.driverAddress;
    console.log('I am in the onGetBalance');

    fetch(apiString)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson.balance);
        this.state.balance = responseJson.balance;
        this.setState(
          {
            balance: this.state.balance
          }
        )
        console.log("Balance:"+this.state.balance);
      })
      .catch((error) => {
        console.error(error);
      });
  }


    componentDidMount() {

        let apiString = baseURL + 'arbiter/state';
        console.log(apiString);

        fetch(apiString)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson.state);
                this.state.timeout = setInterval(() => {
                    this.checkIfCabRequested()
                }, 3000);
            })
            .catch((error) => {
                console.error(error);
            });

            this.state.timeout2 = setInterval(() => {
                this.onGetBalance()
            }, 3000);
    }

    checkIfCabRequested() {
        let apiString = baseURL + 'arbiter/state';
        console.log(apiString);
        console.log('custAvailable = '+this.state.customerAvailable);

        fetch(apiString)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson.state);
                switch (responseJson.state) {
                  case FINDING_DRIVER:
                    console.log('FINDING_DRIVER state');
                    if(this.state.customerAvailable === false){alert('Cab requested');}
                    this.state.customerAvailable = true;
                    this.render();
                    break;
                  case IDLE:
                    console.log('Idle state');
                    this.state.customerAvailable = false;
                    break;
                  case DRIVER_ASSIGNED:
                    console.log('DRIVER_ASSIGNED state!');
                    clearTimeout(this.state.timeout);
                    clearTimeout(this.state.timeout2);
                    this.props.navigation.navigate('Riding');
                    break;
                  case AWAITING_DESTINATION:
                    console.log('AWAITING_DESTINATION state!');
                    clearTimeout(this.state.timeout);
                    clearTimeout(this.state.timeout2);
                    this.props.navigation.navigate('Riding');
                    break;
                  case COMPLETE:
                    console.log('COMPLETE state!');
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
}

export const styles = StyleSheet.create({
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


export default DriverScreen;
