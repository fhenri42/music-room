import React, { Component } from 'react'
import { Platform, Text, View, StyleSheet } from 'react-native'
import { Constants, Location, Permissions } from 'expo'

export default class Geolocation extends Component {
  state = {
    location: null,
    errorMessage: null,
  };

  componentWillMount () {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      })
    } else {
      this._getLocationAsync()
    }
  }

  _getLocationAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION)
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      })
    }

    const location = await Location.getCurrentPositionAsync({})
    this.setState({ location })
  };

  render () {
    let text = 'Waiting..'
    if (this.state.errorMessage) {
      text = this.state.errorMessage
    } else if (this.state.location) {
      text = JSON.stringify(this.state.location)
    }

    return (
      <View>
        <Text>{text}</Text>
      </View>
    )
  }
}
