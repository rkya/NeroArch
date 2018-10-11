import React from "react";
import {YellowBox, Text, View, Button} from "react-native";

export class PriceScreen extends React.Component {
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
      <View style = { styles.demoContainer}>
        <Text> Estimated price is 111</Text>
        {/*<MapView
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
        </MapView>*/}



      </View>
    );
  }
}

export default PriceScreen;
