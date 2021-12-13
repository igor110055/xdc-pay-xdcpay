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
    this.props.dispatch(actions.displayWarning(''))
    const {networkName, rpcUrl, chainId, currencySymbol, explorerLink} = this.state
    if (!validUrl.isWebUri(rpcUrl)) {
      return this.props.dispatch(actions.displayWarning(!rpcUrl.startsWith('http') ? 'URIs require the appropriate HTTP/HTTPS prefix.' : 'Invalid RPC URI'))
    }
    const web3 = new Web3(new Web3.providers.HttpProvider(rpcUrl))
    web3.eth.getBlockNumber((err, res) => {
      if (err) {
        this.props.dispatch(actions.displayWarning('Invalid RPC endpoint'))
      } else {
        this.props.dispatch(actions.setRpcTarget(rpcUrl))
        this.props.dispatch(actions.addNetwork({
          name: networkName,
          rpcURL: rpcUrl,
          chainId,
          currencySymbol,
          blockExplorer: explorerLink,
          isPermanent: false,
          providerType: 'rpc',
        }))
        this.onBackClick()
      }
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
