import React from 'react';
import { MapView } from 'expo';

import { Marker } from 'react-native-maps'

export default class App extends React.Component {

  render() {

    return (
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: this.props.lat,
          longitude: this.props.long,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onRegionChange={this.onRegionChange}

      >
      {this.props.room && this.props.room.rooms && this.props.room.rooms.length !== 0  &&(
          this.props.room.rooms.map((e, key) => {
            return (
            <Marker
            key={key}
          coordinate={{
           latitude: e.location.center.lat,
           longitude: e.location.center.long,
           latitudeDelta: 0.0922,
           longitudeDelta: 0.0421,
         }}
         />)
       })
      )}
      </MapView>
    );
  }
}
