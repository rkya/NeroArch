import React from "react";
import {
  Alert,
  AppRegistery,
  Button,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  YellowBox
} from "react-native";
import {Input, List, ListItem} from 'react-native-elements';
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

export class CustomerScreen extends React.Component {
  constructor(props) {
    super(props);
    /*YellowBox.ignoreWarnings([
      'Warning: componentWillMount is deprecated',
      'Warning: componentWillReceiveProps is deprecated',
      'Warning: Failed prop type: Invalid prop `rightTitle` of type `number` supplied to `ListItem`, expected `string`',
      'Warning: Failed prop type: Invalid prop `defaultValue` of type `number` supplied to `TextInput`, expected `string`'
    ]);*/
    console.disableYellowBox = true;
    this.setCustomerAddress();
    //this.onGetBalance();

    this.state = {
      balance: 0,
      estimate: 0,
      addAmountValue: 0,
      customerBooked: false,
      timeout: null
    };

    this.onGetFare = this.onGetFare.bind(this);
    this.onGetBalance = this.onGetBalance.bind(this);
    this.onAddBalance = this.onAddBalance.bind(this);

  }


  setCustomerAddress() {
    let apiString = baseURL + 'customer/address';
    console.log(apiString);
    fetch(apiString)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("The customer address is");
        console.log(responseJson.address);
        this.state.customerAddress = responseJson.address;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  onGetFare() {
    let randomFare = Math.floor(Math.random() * 10 + 1);
    this.setState({
      estimate: randomFare
    })
  }

  onGetBalance() {
    console.log('I am in the onGetBalance');
    let apiString = baseURL + 'arbiter/getBalance?address=' + this.state.customerAddress;

    console.log(apiString);
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
      })
      .catch((error) => {
        console.error(error);
      });

  }

  onAddBalance() {
    let apiString = baseURL + 'arbiter/addBalance?address=' + this.state.customerAddress +
      '&amount=' + this.state.addAmountValue;
    console.log(apiString);
    console.log(this.state.addAmountValue);

    fetch(apiString)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson.returnString);
      })
      .catch((error) => {
        console.error(error);
      });

  }

  onBookRide() {
    let currentBalance = this.onGetBalance();
    if (currentBalance < this.state.estimate) {
      Alert.alert('Sorry, your balance is low, cannot book a ride!');
    } else {
      this.props.navigation.navigate('Book', {
        rideFare: this.state.estimate
      })
    }
  }

  render() {

    return (
      <BackgroundImage>
        <View style={styles.mainContainer}>
          <View style={styles.container} marginTop="20%">
              <Text style = {styles.header}>NEROARCH</Text>

              <TextInput style = {styles.input}
                 //underlineColorAndroid = "transparent"
                 placeholder = "Where To?"
                 placeholderTextColor = "#fff"
                 textAlign = "left"
                 raised = "True"
                 borderRadius = "15"
                 borderColor = 'rgba(0,0,0,0.5)'
               />

              <View style={styles.container2}>
                <View backgroundColor="rgba(0,0,0,0.7)"
                      borderBottomLeftRadius="15"
                      borderTopLeftRadius="15"
                      width = "50%">
                  <Button
                    color='white'
                    onPress={() => this.onGetFare()}
                    title="Fare Estimate"
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
                    <Text fontSize="15" style={{color:'white'}}> {this.state.estimate} </Text>
                </View>
              </View>

              <View style={styles.buttonContainer}>
                <Button
                  color="white"
                  onPress={() => this.onBookRide()}
                  title="Book Now"
                  raised = 'True'
                  justifyContent="center"
                />
              </View>

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
                      >
                    <Text fontSize="15" style={{color:'white'}}> {this.state.balance} </Text>
                </View>
              </View>//Check Balance

              <View style={styles.container2}>
                <View backgroundColor="rgba(0,0,0,0.7)"
                      borderBottomLeftRadius="15"
                      borderTopLeftRadius="15"
                      width = "50%">
                  <Button
                    color='white'
                    onPress={() => this.onAddBalance()}
                    title="Add Balance"
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
                    <TextInput
                      fontSize="15"
                      color="white"
                      placeholder="0"
                      placeholderTextColor="white"/>
                </View>
              </View>//Add Balance

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

      this.state.timeout2 = setInterval(() => {
        this.onGetBalance()
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
            clearTimeout(this.state.timeout);
            clearTimeout(this.state.timeout2);
            this.props.navigation.navigate('Book');
            break;
          case IDLE:
            console.log('Idle state');
            console.log('Contract state = ' + responseJson.state);
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
            // clearTimeout(this.state.timeout);
            // this.props.navigation.navigate('Riding');
            break;
          case COMPLETE:
            console.log('COMPLETE state!');
            break;
          default:
            // clearTimeout(this.state.timeout);
            // this.props.navigation.navigate('Riding');
            console.log('Default state!');
            this.state.customerBooked = true;
            // this.render();
            clearTimeout(this.state.timeout);
            clearTimeout(this.state.timeout2);
            this.props.navigation.navigate('Book');
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
  },
  mainContainer: {
    height: '94%',
    width: '94%',
    margin:"3%",
    backgroundColor: "rgba(255,255,255,0.2)"
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection:'column'
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
  },
  container3:{
    flexDirection:'row',
    width:"100%",
    height:"11%",
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  bottomContainers: {
    flexDirection:'column',
    width: "48%",
    backgroundColor:"red",
    alignItems: "center",
    marginLeft:"1%",
    marginRight:"1%",
    //justifyContent:"center",
    borderRadius: 15,
    backgroundColor: "rgba(0,0,0,0.2)",
    color: "white"
  },
  fareEstimate: {
    flex:1
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
  input: {
      margin: 15,
      height: 40,
      borderWidth: 1,
      fontSize: 15,
      padding: 5,
      fontWeight: 'bold',
      color : '#fff',
      backgroundColor: "rgba(0,0,0,0.5)",
   },
  general: {
      backgroundColor:'red'
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

export default CustomerScreen;
