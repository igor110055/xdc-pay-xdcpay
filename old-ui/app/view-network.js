const connect = require('react-redux').connect
const actions = require('../../ui/app/actions')
const {Component} = require('react')

class ViewNetwork extends Component {


  render () {
    const state = this.props
    // const metamaskState = state.metamask;
    // const {networkName,rpcUrl,chainId,networkSymbol,explorerLink} = state

    // console.log(networkName,': (')

    return (
      <div className="flex-column flex-grow" style={{maxHeight: '585px', overflowY: 'auto'}}>
        <div className="section-title flex-row" style={{borderBottom: '1px solid #E3E7EB', paddingBottom: '17px'}}>
          <img src="/images/Assets/BackArrow.svg" style={{marginLeft: '12px', cursor: 'pointer'}} onClick={() => {
            state.dispatch(actions.networkSettings())
          }}/>
          <h2 style={{marginLeft: '88px', fontFamily: 'Inter-bold'}}>View Network</h2>
        </div>

        <div style={{margin: '18px 30px'}}>

          <label className="word" style={{
            fontFamily: 'Inter-Medium',
          }}>{`Network Name`}
          </label><br/>
          <div className="input-Box">
            <input className="input large-input" type="text"
                   style={{width: '265px', border: 'none', color: '#2A2A2A'}}/>
          </div>


          <label className="word" style={{
            fontFamily: 'Inter-Medium',
          }}>{`New RPC URL`}
          </label><br/>
          <div className="input-Box">
            <input className="input large-input" type="text"
                   style={{width: '265px', border: 'none', color: '#2A2A2A'}}/>
          </div>


          <label className="word" style={{
            fontFamily: 'Inter-Medium',
          }}>{`Chain ID`}
          </label><br/>
          <div className="input-Box">
            <input className="input large-input" type="text"
                   style={{width: '265px', border: 'none', color: '#2A2A2A'}}/>
          </div>


          <label className="word" style={{
            fontFamily: 'Inter-Medium',
          }}>{`Currency Symbol (Optional)`}
          </label><br/>
          <div className="input-Box">
            <input className="input large-input" type="text"
                   style={{width: '265px', border: 'none', color: '#2A2A2A'}}/>
          </div>


          <label className="word" style={{
            fontFamily: 'Inter-Medium',
          }}>{`Block Explorer (Optional)`}
          </label><br/>
          <div className="input-Box">
            <input className="input large-input" type="text"
                   style={{width: '265px', border: 'none', color: '#2A2A2A'}}/>
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
                   padding: '8px 27px',

                 }}> Update

            </div>
          </div>
        </div>

      </div>

    )
  }
}


module.exports = connect(mapStateToProps)(ViewNetwork)

function mapStateToProps (state) {
  return {
    metamask: state.metamask,
    warning: state.appState.warning,
  }
}

