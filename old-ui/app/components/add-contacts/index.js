const connect = require("react-redux").connect;
const actions = require("../../../../ui/app/actions");
const Web3 = require("web3");
import React from "react";

const validUrl = require("valid-url");
const AddContactComponent = require("./add-contacts");

export default class AddContact extends React.Component {
  constructor(props) {
    super(props);
    // eslint-disable-next-line react/prop-types
    const viewContactObj = this.props.viewContactObj;
    this.state = {
      contactAddress: viewContactObj ? viewContactObj.contactAddress : "",
      contactName: viewContactObj ? viewContactObj.name : "",
    };
  }

  onBackClick = () => {
    // eslint-disable-next-line react/prop-types
    this.props.dispatch(actions.Contacts());
  };

  onStateChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  validateRPC = (isToUpdate) => {
    this.props.dispatch(actions.displayWarning(""));
    const { contactName, contactAddress } = this.state;

    const contactObj = {
        contactAddress: contactAddress,
        contactName: contactName,
    };

    !isToUpdate && this.props.dispatch(actions.addContact(contactObj));
  };

  onAddNetworkClicked = (isToUpdate) => {
    this.validateRPC(isToUpdate);
  };

  render() {
    // eslint-disable-next-line react/prop-types
    const { warning, viewContactObj } = this.props;
    return (
      <AddContactComponent
        state={this.state}
        viewContactObj={viewContactObj}
        warningMsg={warning}
        onBackClick={this.onBackClick}
        onStateChange={this.onStateChange}
        onAddNetworkClicked={this.onAddNetworkClicked}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    metamask: state.metamask,
    warning: state.appState.warning,
    viewContactObj: state.appState.currentViewContactObj,
  };
}

module.exports = connect(mapStateToProps)(AddNetwork);
