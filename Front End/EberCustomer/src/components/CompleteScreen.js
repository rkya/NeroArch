import React from "react";
import {Alert, Button, Text, View, ImageBackground, StyleSheet} from "react-native";
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
export class CompleteScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      timeout: null,

    };
  }

  render() {
    return (
      <BackgroundImage>
        <View style={styles.mainContainer}>
          <View style={styles.container} marginTop="20%">
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
            }}>Ride Complete!</Text>
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
            }}>Have a nice day!</Text>
            <View style={styles.buttonContainer}>
              <Button
                color="white"
                onPress={() => {
                  this.resetContract();
                  this.props.navigation.navigate('Customer');
                }}
                title="New Ride"
              />
            </View>

          </View>
        </View>
      </BackgroundImage>

    );
  }

  resetContract() {
    console.log('I am in the resetContract');
    let apiString = baseURL + 'arbiter/resetState';

    fetch(apiString)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson.returnString);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  componentDidMount() {
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
            clearTimeout(this.state.timeout);
            this.props.navigation.navigate('Book');
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
            // clearTimeout(this.state.timeout);
            // this.props.navigation.navigate('Complete');
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

export default CompleteScreen;
