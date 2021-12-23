const React = require('react')
const connect = require('react-redux').connect
const actions = require ('../../ui/app/actions')


class Contacts extends React.Component{
  render() {
    const state = this.props;
        return(
                <div className="flex-column flex-grow" style={{maxHeight: "585px",
                overflowY: "auto",}}>
                    <div className="section-title flex-row"
                         style={{ borderBottom: "1px solid #E3E7EB", paddingBottom: "17px", display:'flex', justifyContent:'space-between' } }>
                    <img src="/images/Assets/BackArrow.svg" style={{ marginLeft:'17px',cursor:'pointer'}} onClick={() => { state.dispatch(actions.goConfig()) }} />
                    <h2 style={{  fontFamily: 'Inter-bold' }}>Contacts</h2>
                    <img src="/images/Assets/Add.svg" style={{cursor: 'pointer',marginRight: '11px'}}
               onClick={() => { state.dispatch(actions.showAddContactsPage())
               }}/>
                    </div>
                    
                </div>
        )
     }
}
module.exports = connect(mapStateToProps)(Contacts)
function mapStateToProps(state) {
    return {
      metamask: state.metamask,
      warning: state.appState.warning,
    }
  }
  
