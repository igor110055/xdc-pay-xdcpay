const connect = require('react-redux').connect
const actions = require('../../ui/app/actions')
const React = require('react')

class ConnectedSites extends React.Component {

  

  render () {
    const state = this.props
   
    return (
      <div className="flex-column flex-grow" style={{
        maxHeight: '585px',
        overflowY: 'auto',
      }}>
        <div className="section-title flex-row" style={{borderBottom: '1px solid #E3E7EB', paddingBottom: '17px'}}>
          <img src="/images/Assets/BackArrow.svg" style={{marginLeft: '12px', cursor: 'pointer'}} onClick={() => {
            state.dispatch(actions.goConfig())
          }}/>
          <h2 style={{marginLeft: '80px', fontFamily: 'Inter-bold'}}>Connected Sites</h2>
         
        
           
          </div>)
        
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

module.exports = connect(mapStateToProps)(ConnectedSites)
