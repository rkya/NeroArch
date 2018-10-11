import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { Alert, AppRegistry, Button, StyleSheet,  TextInput, Text, View } from 'react-native';
import { YellowBox } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';


class PriceScreen extends React.Component {
    constructor(props) {
        super(props)
        YellowBox.ignoreWarnings([
            'Warning: componentWillMount is deprecated',
            'Warning: componentWillReceiveProps is deprecated',
        ]);

        this.state = {text: ''};
    }

    render() {
        return (
            <MapView
                provider = { PROVIDER_GOOGLE}
                style = { styles.mapContainer}
                region = { this.state.locationCoordinates }
                onRegionChangeComplete = { this.handleLocationChange }
                zoomEnabled = { true }
                scrollEnable = { true}
                initialRegion = {{
                    latitude: 40.730610,
                    longitude: -73.935242,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                <MapView.Marker
                    coordinate={ initialRegion = {
                        latitude: 40.730610,
                        longitude: -73.935242,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    } }
                />
            </MapView>

        );
    }
}


class CompleteScreen extends React.Component {
    _onPressButton() {
        Alert.alert('You tapped the button!')
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style = {{display: "flex", marginTop: 55, justifyContent: 'center', textAlign: 'center', alignItems: "center" ,fontWeight: "bold", fontSize: 30}}>
                    Ride Completed. Have a Great Day!
                </Text>

                <Button
                    title="Ride Again"
                    onPress={() => this.props.navigation.navigate('Home')}
                />
            </View>
        );
    }
}


class BookScreen extends React.Component {
    constructor(props) {
        super(props);
        YellowBox.ignoreWarnings([
            'Warning: componentWillMount is deprecated',
            'Warning: componentWillReceiveProps is deprecated',
        ]);

        this.state = {text: ''};
    }

    _onPressButton() {
        Alert.alert('You tapped the button!')
    }

    render() {

        return (
            <View style={styles.container}>

                <Text style = {{display: "flex", marginTop: 55, justifyContent: 'center', textAlign: 'center', alignItems: "center" ,fontWeight: "bold", fontSize: 30}}>
                    Booking
                </Text>

            <View>
                <TextInput

                    style={{height: 40}}
                    placeholder="Where are you?"
                    onChangeText={(text) => this.setState({text})}
                />
                <Text style={{padding: 10, fontSize: 30}}>
                    {this.state.text.split(' ').map((word) => word && '🍕').join(' ')}
                </Text>
            </View>

            <View>
                <TextInput

                    style={{height: 40}}
                    placeholder="Where do you want to go."
                    onChangeText={(text) => this.setState({text})}
                />
                <Text style={{padding: 10, fontSize: 42}}>
                    {this.state.text.split(' ').map((word) => word && '🍕').join(' ')}
                </Text>
            </View>

                <View style={styles.buttonContainer}>
                    <Button
                        onPress={() => this.props.navigation.navigate('Complete')}
                        title="Continue"

                    />
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        onPress={() => this.props.navigation.navigate('Home')}
                        title="Back"
                        color="#841584"
                    />
                </View>
                <View style={styles.alternativeLayoutButtonContainer}>
                    <Button
                        onPress={() => this.props.navigation.navigate('Price')}
                        title="Price Estimate"
                    />
                    <Button
                        onPress={this._onPressButton}
                        title="Promo Code"
                        color="#841584"
                    />
                </View>
            </View>
        );
    }
}


class HomeScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style = {{display: "flex", marginTop: 55, justifyContent: 'center', textAlign: 'center', alignItems: "center" ,fontWeight: "bold", fontSize: 30}}>
                Ride Safely
                </Text>
                <View style={styles.buttonContainer}>
                <Button
                    title="Customer"
                    onPress={() => this.props.navigation.navigate('Customer')}
                />
                </View>
                <View style={styles.buttonContainer}>
                <Button
                    title="Driver"
                    onPress={() => this.props.navigation.navigate('Driver')}
                />
                </View>
            </View>
        );
    }
}

class DriverScreen extends React.Component {
    constructor(props) {
        super(props);
        YellowBox.ignoreWarnings([
            'Warning: componentWillMount is deprecated',
            'Warning: componentWillReceiveProps is deprecated',
        ]);

        this.state = {text: ''};
    }

    _onPressButton() {
        Alert.alert('You tapped the button!')
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style = {{display: "flex", marginTop: 55, justifyContent: 'center', textAlign: 'center', alignItems: "center" ,fontWeight: "bold", fontSize: 30}}>
                    Ride Safely
                </Text>
                <View style={styles.buttonContainer}>
                <Button
                    title="Complete"
                    onPress={() => this.props.navigation.navigate('Complete')}
                />
                </View>
                <View style={styles.buttonContainer}>
                <Button
                    title="Cancel"
                    onPress={this._onPressButton}
                />
                </View>
            </View>
        );
    }
}


class CustomerScreen extends React.Component {
    constructor(props) {
        super(props);
        YellowBox.ignoreWarnings([
            'Warning: componentWillMount is deprecated',
            'Warning: componentWillReceiveProps is deprecated',
        ]);

        this.state = {text: ''};
    }

    _onPressButton() {
        Alert.alert('You tapped the button!')
    }

    render() {

        return (
            <View style={styles.container}>

                <Text style = {{display: "flex", marginTop: 55, justifyContent: 'center', textAlign: 'center', alignItems: "center" ,fontWeight: "bold", fontSize: 30}}>
                    CryptoCurrency
                </Text>

                <View style={styles.buttonContainer}>
                    <Button
                        onPress={() => this.props.navigation.navigate('Book')}
                        title="Book Now"

                    />
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        onPress={this._onPressButton}
                        title="Press Me"
                        color="#841584"
                    />
                </View>
                <View style={styles.alternativeLayoutButtonContainer}>
                    <Button
                        onPress={this._onPressButton}
                        title="This looks great!"
                    />
                    <Button
                        onPress={this._onPressButton}
                        title="OK!"
                        color="#841584"
                    />
                </View>
            </View>
        );
    }
}


const RootStack = StackNavigator(
    {
        Home: {
            screen: HomeScreen,
        },
        Customer: {
            screen: CustomerScreen,
        },
        Driver: {
            screen: DriverScreen,
        },
        Complete: {
            screen: CompleteScreen,
        },
        Book: {
            screen: BookScreen,
        },
        Price: {
            screen: PriceScreen,
        },
    },
    {
        initialRouteName: 'Home',
    }
);


export default class App extends React.Component {
    render() {
        return <RootStack />;
    }
}


const styles = StyleSheet.create({

    mapContainer:{
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
    }
})

// skip this line if using Create React Native App
AppRegistry.registerComponent('AwesomeProject', () => ButtonBasics);

