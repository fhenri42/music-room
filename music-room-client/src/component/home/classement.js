import React, { Component } from 'react'
import { View } from 'react-native-ui-lib'
import { ScrollView } from 'react-native'
import { Button } from 'nachos-ui'
import { connect } from 'react-redux'
// import { getClassement, updateClassement } from '../../actions/classement.js'
import { Icon, Text } from 'react-native-elements'
import { updateClassement } from '../../actions/classement'

class Classement extends Component {
  pushToClassement = (id) => {
    const songs = this.props.classement.songs
    const use = songs[id].users.findIndex(u => u === this.props.user.id)
    //pour chaque musique nous avons une liste d'user qui ont voté pour cette musique
    //si l'user a deja vote pour cette musique alors il ne peut pas revoter, sinon on l'ajoute a la liste et +1 vote de la chanson
    if (use === -1) {
      console.log(use)
      songs[id].users.push(this.props.user.id)
      songs[id].vote = songs[id].vote + 1
      this.props.dispatch(updateClassement(songs))
    }else{
      this.props.notife.message = 'You have already voted for him.'
    }
  }

    render () {
      return (
        <View style={{ flex: 1 }}>
          <ScrollView style={{ height: '60%' }}>
            {this.props.classement.songs.map((s, key) => {
              return (
                <View key={key} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                  {(
                    <Icon
                      raised
                      name='keyboard-arrow-up'
                      type='keyboard-arrow-up'
                      color='#f50'
                      size={15}
                      onPress={() => { this.pushToClassement(key) }} />
                  )}
                  <Text h5>Vote {s.vote}</Text>
                  <Button style={{ backgroundColor: 'black' }} kind='squared' iconName='md-musical-notes'>{s.name}</Button>
                </View>
              )
            })}
          </ScrollView>
        </View>
      )
    }
}

const mapStateToProps = state => {
  return {
    classement: state.classement.toJS(),
    user: state.user.toJS(),
    notife: state.notife.toJS()    
  }
}

const mapDispatchToProps = dispatch => {
  return { dispatch }
}

export default connect(mapStateToProps, mapDispatchToProps)(Classement)
