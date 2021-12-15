const connect = require('react-redux').connect
const actions = require('../../../../ui/app/actions')
// const LoadingIndicator = require('./components/loading')
const Web3 = require('web3')
import React from 'react'

const validUrl = require('valid-url')
const AddNetworkComponent = require('./add-network')

export default class AddNetwork extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      networkName: '',
      rpcUrl: ' ',
      chainId: ' ',
      currencySymbol: ' ',
      explorerLink: ' ',
    }
  }

  onBackClick = () => {
    // eslint-disable-next-line react/prop-types
    this.props.dispatch(actions.networkSettings())
  }

  onStateChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }

  validateRPC = () => {
    const newRPC = this.state.rpcUrl
    if (!validUrl.isWebUri(newRPC)) {
      return this.props.dispatch(actions.displayWarning(!newRPC.startsWith('http') ? 'URIs require the appropriate HTTP/HTTPS prefix.' : 'Invalid RPC URI'))
    }
    const web3 = new Web3(new Web3.providers.HttpProvider(newRPC))
    web3.eth.getBlockNumber((err, res) => {
      if (err) {
        this.props.dispatch(actions.displayWarning('Invalid RPC endpoint'))
      } else {
        this.props.dispatch(actions.setRpcTarget(newRPC))
      }
      this.props.dispatch(actions.viewNetwork(networkName, newRPC, chainId, networkSymbol, explorerLink))
    })
  }

  onAddNetworkClicked = () => {
    this.validateRPC()
  }

  render () {
    // eslint-disable-next-line react/prop-types
    const {warning} = this.props
    return (
      <AddNetworkComponent
        warningMsg={warning}
        onBackClick={this.onBackClick}
        onStateChange={this.onStateChange}
        onAddNetworkClicked={this.onAddNetworkClicked}/>
    )
  }
}

function mapStateToProps (state) {
  return {
    metamask: state.metamask,
    warning: state.appState.warning,
  }
}

module.exports = connect(mapStateToProps)(AddNetwork)
