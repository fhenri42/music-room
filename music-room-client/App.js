import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import { Provider } from 'react-redux'
import simpleMiddleWare from './src/middleware/index.js'
import thunk from 'redux-thunk'
import reducer from './src/reducers'
import { reducer as formReducer } from 'redux-form'
import { Router, Scene, Stack } from 'react-native-router-flux'
import App from './src/app.js'


const configureStore = (reducer) => createStore(
  combineReducers({
    user: reducer.user,
    playlist: reducer.playlist,
    room: reducer.room,
    classement: reducer.classement,
    notife: reducer.notife,
    form: formReducer,
  }),
  applyMiddleware(
   simpleMiddleWare(),
   thunk
 ),

)

const store =  configureStore(reducer)

class MusicRoom extends Component {

  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}
export default MusicRoom
