import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text } from 'react-native-ui-lib'
import { Actions } from 'react-native-router-flux'
import { Checkbox, Button } from 'nachos-ui'
import { importDeezerList } from '../../actions/playlist.js'

import { getPlaylists, getPlaylistTracks } from '../../utils/deezerService.js'

class ImportPlayList extends Component {

  componentWillMount () {
    getPlaylists().then(playlistDeezer => {
      const tmp = []
      playlistDeezer.forEach(e => {
        e.is = false
        tmp.push(e)
      })

      this.setState({ playlistDeezer })
    })
  }

    state = {
      playlistDeezer: [],
      listToImport: [],
    }

    isTrue = (e) => {
      this.state.listToImport.forEach(obj => {
        if (obj.title === e.title) {
          return true
        }
      })
      return false
    }

    render () {

      const { user } = this.props
      const { playlistDeezer, listToImport } = this.state

      return (
        <View flex paddingH-25 paddingT-120>
          { !!playlistDeezer && playlistDeezer.length !== 0 && (
            playlistDeezer.map((e, key) => {
              return (
                <View key={key} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Checkbox

                    onValueChange={() => {
                      const index = listToImport.findIndex(obj => obj.title === e.title)
                      if (index === -1) {
                        playlistDeezer[key].is = true
                        listToImport.push(e)

                      } else {
                        playlistDeezer[key].is = false

                        listToImport.splice(index, 1)
                      }
                      this.setState({ listToImport })
                    }}
                    checked={e.is}
                  />
                  <Text>{e.title}</Text>
                </View>
              )
            })

          )}
          <Button kind='squared' onPress={() => { this.props.dispatch(importDeezerList(user.id, listToImport)) }} >{'Import'}</Button>

        </View>
      )
    }
}

const mapStateToProps = state => {
  return {
    user: state.user.toJS(),
    playlist: state.playlist.toJS(),
    notife: state.notife.toJS(),
  }
}

const mapDispatchToProps = dispatch => {
  return { dispatch }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImportPlayList)
