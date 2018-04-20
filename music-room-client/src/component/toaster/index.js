import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Toast } from 'react-native-ui-lib'

class Toaster extends Component {
  render () {
    const { msg } = this.props
    return (
      <Toast
        message={msg}
        position='bottom'
        visible={true}
        actions={[{ label: 'Close', onPress: () => { this.props.dispatch({ type: 'client/delNotife' }) } }]}
      />
    )
  }
}

const mapStateToProps = state => {
  return { state }
}

const mapDispatchToProps = dispatch => {
  return { dispatch }
}

export default connect(mapStateToProps, mapDispatchToProps)(Toaster)
