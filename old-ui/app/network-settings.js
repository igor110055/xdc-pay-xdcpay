const connect = require('react-redux').connect
const actions = require('../../ui/app/actions')
const React = require('react')

class NetworkSettings extends React.Component {

  handleCheckBox = () => {
    // eslint-disable-next-line react/prop-types
    const showGasFields = this.props.metamask.showGasFields
    // eslint-disable-next-line react/prop-types
    this.props.dispatch(actions.showGasFields(!showGasFields))
  }

  render () {
    const state = this.props
    const networkName = state.networkName
    return (
      <div className="flex-column flex-grow" style={{
        maxHeight: '585px',
        overflowY: 'auto',
      }}>
        <div className="section-title flex-row" style={{borderBottom: '1px solid #E3E7EB', paddingBottom: '17px'}}>
          <img src="/images/Assets/BackArrow.svg" style={{marginLeft: '12px', cursor: 'pointer'}} onClick={() => {
            state.dispatch(actions.goConfig())
          }}/>
          <h2 style={{marginLeft: '88px', fontFamily: 'Inter-bold'}}>Network Settings</h2>
          <img src="/images/Assets/Add.svg" style={{cursor: 'pointer', position: 'absolute', right: '21px'}}
               onClick={() => {
                 state.dispatch(actions.addNetwork())
               }}/>
        </div>
        <div style={{
          padding: ' 11px 17px 11px 15px ',
          borderBottom: '1px solid #E3E7EB',
          fontFamily: 'inter-medium',
          fontSize: '14px',
        }}>{`XDC Mainnet`}
          <img src="/images/Assets/Lock.png" style={{position: 'absolute', right: '30px'}}/><img
            src="/images/Assets/Arrow.svg"
            style={{position: 'absolute', right: '15px', marginTop: '6px', cursor: 'pointer'}} onClick={() => {
            state.dispatch(actions.viewNetwork())
          }}/>
        </div>

        <div style={{
          padding: ' 11px 17px 11px 15px ',
          borderBottom: '1px solid #E3E7EB',
          fontFamily: 'inter-medium',
          fontSize: '14px',
        }}>{`XDC Apothem Testnet`}
          <img src="/images/Assets/Lock.png" style={{position: 'absolute', right: '30px'}}/><img
            src="/images/Assets/Arrow.svg"
            style={{position: 'absolute', right: '15px', marginTop: '6px', cursor: 'pointer'}} onClick={() => {
            state.dispatch(actions.viewNetwork())
          }}/>
        </div>

        <div style={{
          padding: ' 11px 17px 11px 15px ',
          borderBottom: '1px solid #E3E7EB',
          fontFamily: 'inter-medium',
          fontSize: '14px',
        }}>{`XDC Devnet`}
          <img src="/images/Assets/Lock.png" style={{position: 'absolute', right: '30px'}}/><img
            src="/images/Assets/Arrow.svg"
            style={{position: 'absolute', right: '15px', marginTop: '6px', cursor: 'pointer'}} onClick={() => {
            state.dispatch(actions.viewNetwork())
          }}/>
        </div>

        <div style={{
          padding: ' 11px 17px 11px 15px ',
          borderBottom: '1px solid #E3E7EB',
          fontFamily: 'inter-medium',
          fontSize: '14px',
        }}>{`Localhost 8545`}
          <img src="/images/Assets/Lock.png" style={{position: 'absolute', right: '30px'}}/><img
            src="/images/Assets/Arrow.svg"
            style={{position: 'absolute', right: '15px', marginTop: '6px', cursor: 'pointer'}} onClick={() => {
            state.dispatch(actions.viewNetwork())
          }}/>
        </div>
        <div style={{
          padding: ' 11px 17px 11px 15px ',
          borderBottom: '1px solid #E3E7EB',
          fontFamily: 'inter-medium',
          fontSize: '14px',
        }}>{`${networkName}`}
          <img src="/images/Assets/Delete.svg" style={{position: 'absolute', right: '30px', width: '21px'}}/><img
            src="/images/Assets/Arrow.svg"
            style={{position: 'absolute', right: '15px', marginTop: '4px', cursor: 'pointer'}} onClick={() => {
            state.dispatch(actions.viewNetwork())
          }}/>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    metamask: state.metamask,
    warning: state.appState.warning,
  }
}
module.exports = connect(mapStateToProps)(NetworkSettings)
