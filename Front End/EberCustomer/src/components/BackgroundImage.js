import React from "react";
import {ImageBackground, StyleSheet} from "react-native";


class BackgroundImage extends React.Component {

  render() {
    return (
      <ImageBackground source={require('./background.jpg')}
                       style={styles.backgroundImage}>

        {this.props.children}

      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({

  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover'
  }
});

export default BackgroundImage;