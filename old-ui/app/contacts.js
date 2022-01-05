const React = require('react')
const connect = require('react-redux').connect
const actions = require('../../ui/app/actions')
import Identicon from '../../ui/app/components/identicon'
import PropTypes from 'prop-types'

class Contacts extends React.Component {
  // static propTypes = {
  //   identity: PropTypes.object.isRequired,
  // }

  render () {
    const state = this.props
    const contactList = state.metamask.addressBook
    contactList.sort(function(a, b){
      if(a.name < b.name) { return -1; }
      if(a.name > b.name) { return 1; }
      return 0;
  })

    return (
      <div
        className="flex-column flex-grow"
        style={{maxHeight: '585px', overflowY: 'auto'}}
      >
        <div
          className="section-title flex-row"
          style={{
            borderBottom: '1px solid #E3E7EB',
            paddingBottom: '17px',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <img
            src="/images/Assets/BackArrow.svg"
            style={{marginLeft: '17px', cursor: 'pointer'}}
            onClick={() => {
              state.dispatch(actions.goConfig())
            }}
          />
          <h2 style={{fontFamily: 'Inter-bold'}}>Contacts</h2>
          <img
            src="/images/Assets/Add.svg"
            style={{cursor: 'pointer', marginRight: '11px'}}
            onClick={() => {
              state.dispatch(actions.showAddContactsPage())
            }}
          />
        </div>
        <div style={{overflowX:"scroll"}}>

        {contactList.map((contactObj) => (
          <div
          style={{
      
            borderBottom: '1px solid #E3E7EB',
            fontFamily: 'inter-medium',
            fontSize: '14px',
            height:'65px',
          }}
          >
            
            <div style={{ backgroundColor: '#F4F6FA', height: '24px', width: '100%', padding:"0 21px" }}>A</div>
            <div style={{padding:'5px 0 0 20px'}}>
            <Identicon
              overflow="none"
              address={contactObj.address}
              diameter={27}
              style={{ marginLeft: '10px', overflow: 'inherit' }}
              />
            <div style={{margin:'-24px 0 0 35px'}}>  
                {contactObj.name}
                </div>
          </div>
              
            
          </div>
        ))}
        </div>
      </div>
    )
  }
}

module.exports = connect(mapStateToProps)(Contacts)

function mapStateToProps (state) {
  return {
    metamask: state.metamask,
    warning: state.appState.warning,
  }
}
