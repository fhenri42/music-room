import React, { Component } from 'react'
import { Router, Scene, Stack } from 'react-native-router-flux'
// import BackgroundGeolocation from "react-native-background-geolocation";

import Home from './component/home/index'
import NewPlaylist from './component/home/newplaylist.js'
import Login from './component/login'
import Singup from './component/singup'
import Code from './component/singup/code'
import EditPlaylist from './component/home/editplaylist.js'
import ResetPass from './component/login/resetPass'
import ImportList from './component/home/importPlaylist.js'
import Room from './component/home/editroom'
import Classement from './component/home/classement.js'
import NewRoom from './component/home/newRoom'
import MapRoom from './component/mapRoom'
import Friend from './component/settings/friend'
import ShowProfile from './component/settings/showProfile'
class App extends Component {
  render () {
    return (
      <Router>
        <Stack
          hideNavBar
          key='root'>
          <Scene key='login'
            component={Login}
            title='Login'
            initial
          />
          <Scene key='singup'
            component={Singup}
            title='Singup'
          />
          <Scene key='code'
            component={Code}
            hideNavBar={false}
            title='Code'
          />
          <Scene key='home'
            component={Home}
            title='home'
          />
          <Scene
            key='newplaylist'
            component={NewPlaylist}
            hideNavBar={false}
            title='New Play-list'
          />
          <Scene key='editplaylist'
            component={EditPlaylist}
            hideNavBar={false}
            title='Play-list'
          />
          <Scene key='resetPass'
            component={ResetPass}
            hideNavBar={false}
            title='password reset'
          />
          <Scene key='importList'
            component={ImportList}
            hideNavBar={false}
            title='Import your play list'
          />
          <Scene key='newRoom'
            component={NewRoom}
            hideNavBar={false}
            title='edit or create a room'
          />
          <Scene key='editRoom'
            component={Room}
            hideNavBar={false}
            title='Edit the room'
          />
          <Scene key='map'
            component={MapRoom}
            hideNavBar={false}
            title='Map of rooms'
          />
          <Scene key='classement'
            component={Classement}
            hideNavBar={false}
            title='Top music'
          />
          <Scene key='friend'
            component={Friend}
            hideNavBar={false}
            title='Friends'
          />
          <Scene key='showProfile'
            component={ShowProfile}
            hideNavBar={false}
            title='Your friend'
          />
        </Stack>
      </Router>
    )
  }
}

export default App
