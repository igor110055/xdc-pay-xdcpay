const connect = require('react-redux').connect
const actions = require('../../../../ui/app/actions')
import React from 'react'
import PropTypes from 'prop-types'
import { isValidAddress } from 'ethereumjs-util'

const AddContactComponent = require('./add-contacts')

export default class AddContact extends React.Component {
  constructor (props) {
    super(props)
    const contactObj=this.props.viewContactObj
    // eslint-disable-next-line react/prop-types
    // const viewContactObj = this.props.viewContactObj;
    this.state = {
      contactAddress: contactObj ? contactObj.address : '',
      contactName: contactObj ? contactObj.name : '',
    }
  }
 



  onBackClick = () => {
    // eslint-disable-next-line react/prop-types
    this.props.dispatch(actions.Contacts())
  }

  // onStateChange = (event) => {
  //   this.setState({[event.target.name]: event.target.value})
  // }

  onStateChangeName = (event) => {
    const isValidName = this.props.metamask.isValidName
    const { contactAddress, contactName } = this.state
    console.log(isValidName,'##')
    const passwordBox = document.getElementById('contactName')
    const password1 = passwordBox.value
    console.log(password1,'passwordBox')
    if (password1 !== ''  || password1.startsWith(' ')) {
      this.setState({ [contactName]: event.target.value })
    }
    this.props.dispatch(actions.isValidName(!isValidName))
  }

  onStateChangeAddress = (event) => {
    const isValidAddress = this.props.metamask.isValidAddress
    const { contactAddress, contactName } = this.state
    const passwordBox2= document.getElementById('contactAddress')
    const password2 = passwordBox2.value
    if (password2 !== '' || password2.startsWith(' ')) {
      this.setState({ [contactAddress]: event.target.value })
    } 
    this.props.dispatch(actions.isValidAddress(!isValidAddress))
  }

  onAddContactClicked = () => {
    const { contactAddress, contactName } = this.state
    this.props.dispatch(actions.addToAddressBook(contactName, contactAddress))
    this.props.dispatch(actions.Contacts())  
   
  }
  onDeleteClicked = async (viewContactObj) => {
    this.props.dispatch(actions.displayWarning(''))
    await this.props.dispatch(actions.addToAddressBook(viewContactObj.name, viewContactObj.address, true))
    this.props.dispatch(actions.Contacts())
  }
  static contextTypes = {
    t: PropTypes.func,
  }

  render () {
    // eslint-disable-next-line react/prop-types
    const { t } = this.context
    const { warning, viewContactObj, addressBook,isValidAddress,isValidName } = this.props
    console.log(isValidName,isValidAddress,'----')
    return (
      <AddContactComponent
        t ={t}
        state={this.state}
        props={this.props}
        viewContactObj={viewContactObj}
        warningMsg={warning}
        addressBook={addressBook}
        onBackClick={this.onBackClick}
        onStateChange={this.onStateChange}
        onDeleteClicked={this.onDeleteClicked}
        onAddContactClicked={this.onAddContactClicked}
        onStateChangeName={this.onStateChangeName}
        onStateChangeAddress={this.onStateChangeAddress}
        isValidAddress={isValidAddress}
        isValidName={isValidName}
      />
    )
  }
}

function mapStateToProps (state) {
  return {
    metamask: state.metamask,
    warning: state.appState.warning,
    addressBook: state.metamask.addressBook,
    isValidAddress: state.metamask.isValidAddress,
    isValidName: state.metamask.isValidName,
    viewContactObj: state.appState.currentViewContactObj,
  }
}

module.exports = connect(mapStateToProps)(AddContact)
