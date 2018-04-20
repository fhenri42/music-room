import React, { Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { verifeUser } from '../../actions/user.js'
import { Input, Button } from 'nachos-ui'
import Toaster from '../toaster/index.js'

class Code extends Component {

  state = {
    code: '',
  }
  render () {

    const { code } = this.state

    return (
      <View flex paddingH-25 paddingT-120>
        <Input
          style={{ margin: 15 }}
          placeholder={'code'}
          value={this.state.code}
          onChangeText={value => this.setState({ code: value })}
        />
        <Button onPress={() => { this.props.dispatch(verifeUser(code, this.props.email)) }}>Verifie</Button>
        {this.props.notife.message !== '' && (<Toaster msg={this.props.notife.message} />)}

      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    notife: state.notife.toJS(),
  }
}

const mapDispatchToProps = dispatch => {
  return { dispatch }
}

export default connect(mapStateToProps, mapDispatchToProps)(Code)
