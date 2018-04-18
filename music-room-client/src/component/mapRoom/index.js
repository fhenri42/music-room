import React from 'react';
import { MapView } from 'expo';

import { Marker, Circle } from 'react-native-maps'

export default class App extends React.Component {

  render() {

    const lol = ['green', 'red', 'blue','pink']
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


            return e.location.active === 1 ? (
            <Circle
            radius={e.location.distance * 100}
            key={key}
            fillColor={`rgba(255,212,84,0.5)`}
          center={{
           latitude: e.location.center.lat,
           longitude: e.location.center.long,
         }}
         />) : (null)

       })
      )}

      {this.props.room && this.props.room.rooms && this.props.room.rooms.length !== 0  &&(
          this.props.room.rooms.map((e, key) => {


            return e.location.active === 1 ? (
            <Marker
            key={key}
            title={e.name}
            pinColor={lol[key % 3]}
          coordinate={{
           latitude: e.location.center.lat,
           longitude: e.location.center.long,
         }}
         />) : (null)

       })
      )}

      </MapView>
    );
  }
}
