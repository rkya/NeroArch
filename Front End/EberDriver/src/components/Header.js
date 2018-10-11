import React from 'react';
import {StyleSheet, View} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

class Header extends React.Component {

  render() {
    return (
      <View style={styles.headerStyle}>
        export default () => <Icon name="car" size={40} color="#bf1313"/>;
      </View>

    )
  }
}

const styles = StyleSheet.create({

  headerStyle: {
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 10,
    width: "100%"
  }
});

export default Header;