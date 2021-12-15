const connect = require('react-redux').connect
const actions = require('../../ui/app/actions')
// const LoadingIndicator = require('./components/loading')
const Web3 = require('web3')
import React from 'react'
const validUrl = require('valid-url')

export default class AddNetwork extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      networkName: '',
      rpcUrl: ' ',
      chainId: ' ',
      networkSymbol: ' ',
      explorerLink: ' ',
    }
  }

  render () {
    const state = this.props
    const enteredRpcUrl = this.state.rpcUrl
    return (
      <div className="flex-column flex-grow" style={{maxHeight: '585px', overflowY: 'auto'}}>
        <div className="section-title flex-row" style={{borderBottom: '1px solid #E3E7EB', paddingBottom: '17px'}}>
          <img src="/images/Assets/BackArrow.svg" style={{marginLeft: '12px', cursor: 'pointer'}} onClick={() => {
            state.dispatch(actions.networkSettings())
          }}/>
          <h2 style={{marginLeft: '88px', fontFamily: 'Inter-bold'}}>Add Network</h2>
        </div>

        <div style={{margin: '18px 30px'}}>
          <label className="word" style={{
            fontFamily: 'Inter-Medium',
          }}>Network Name
          </label><br/>
          <div style={{marginBottom: '24px', border: '1px solid #e2e2e2', borderRadius: '4px'}}>
            <input className="input large-input" type="text"
                   onChange={(e) => this.setState({networkName: e.target.value})}

                   style={{width: '265px', border: 'none', color: '#2A2A2A'}}/>
          </div>
          <label className="word" style={{
            fontFamily: 'Inter-Medium',
          }}>{`New RPC URL`}
          </label><br/>
          <div style={{marginBottom: '24px', border: '1px solid #e2e2e2', borderRadius: '4px'}}>
            <input className="input large-input" id="new_rpc" type="text"
                   onChange={(event) => this.setState({rpcUrl: event.target.value})}

                   style={{width: '265px', border: 'none', color: '#2A2A2A'}}/>
          </div>
          <label className="word" style={{
            fontFamily: 'Inter-Medium',
          }}>{`Chain ID`}
          </label><br/>
          <div style={{marginBottom: '24px', border: '1px solid #e2e2e2', borderRadius: '4px'}}>
            <input className="input large-input" type="text" style={{width: '265px', border: 'none', color: '#2A2A2A'}}
                   onChange={(e) => this.setState({chainId: e.target.value})}/>
          </div>
          <label className="word" style={{fontFamily: 'Inter-Medium'}}>{`Currency Symbol (Optional)`}
          </label><br/>
          <div style={{marginBottom: '24px', border: '1px solid #e2e2e2', borderRadius: '4px'}}>
            <input className="input large-input" type="text" style={{width: '265px', border: 'none', color: '#2A2A2A'}}
                   onChange={(e) => this.setState({networkSymbol: e.target.value})}/>
          </div>
          <label className="word" style={{
            fontFamily: 'Inter-Medium',
          }}>{`Block Explorer (Optional)`}
          </label><br/>
          <div style={{marginBottom: '24px', border: '1px solid #e2e2e2', borderRadius: '4px'}}>
            <input className="input large-input" type="text" style={{width: '265px', border: 'none', color: '#2A2A2A'}}
                   onChange={(e) => this.setState({explorerLink: e.target.value})}/>
          </div>
          <div style={{display: 'flex', justifyContent: 'space-around'}}>
            <div className="button"
                 onClick={() => {
                   state.dispatch(actions.networkSettings())
                 }}
                 style={{
                   fontFamily: 'Inter-Medium',
                   marginTop: '10px',
                   fontSize: '14px',
                   background: '#E3E7EB',
                   width: '120px',
                   height: '40px',
                   border: 'none',
                   color: '#2a2a2a',
                   padding: '8px 35px',

                 }}> Cancel

            </div>
            <div className="button"
                 style={{
                   fontFamily: 'Inter-Medium',
                   marginTop: '10px',
                   fontSize: '14px',
                   background: '#03BE46',
                   width: '120px',
                   height: '40px',
                   border: 'none',
                   padding: '8px 47px',
                 }}
                 onClick={(event) => {
                   event.preventDefault()
                   // const rpcUrl=
                   const newRpc = enteredRpcUrl
                   console.log(newRpc, '+.+.+')
                   this.rpcValidation(newRpc, state)
                 }}
            > Add
            </div>
          </div>
        </div>
      </div>
    )
  }
}

AddNetwork.prototype.rpcValidation = ((newRpc, state, networkName, rpcUrl, chainId, networkSymbol, explorerLink) => {
  if (validUrl.isWebUri(newRpc)) {
    const web3 = new Web3(new Web3.providers.HttpProvider(newRpc))
    web3.eth.getBlockNumber((err, res) => {
      if (err) {
        state.dispatch(actions.displayWarning('Invalid RPC endpoint'))
      } else {
        state.dispatch(actions.setRpcTarget(newRpc))
      }
      state.dispatch(actions.viewNetwork(networkName, rpcUrl, chainId, networkSymbol, explorerLink))

    })
  } else {
    if (!newRpc.startsWith('http')) {
      state.dispatch(
        actions.displayWarning(
          'URIs require the appropriate HTTP/HTTPS prefix.',
        ),
      )
    } else {
      state.dispatch(actions.displayWarning('Invalid RPC URI'))
    }
  }
})

function mapStateToProps (state) {
  return {
    metamask: state.metamask,
    warning: state.appState.warning,
  }
}
module.exports = connect(mapStateToProps)(AddNetwork)
