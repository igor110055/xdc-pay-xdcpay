const connect = require("react-redux").connect;
const actions = require("../../../../ui/app/actions");
import React from "react";

const AddContactComponent = require("./add-contacts");

export default class AddContact extends React.Component {
  constructor(props) {
    super(props);
    // eslint-disable-next-line react/prop-types
    // const viewContactObj = this.props.viewContactObj;
    this.state = {
      contactAddress: ' ',
      contactName: ' ',
    };
  }

  onBackClick = () => {
    // eslint-disable-next-line react/prop-types
    this.props.dispatch(actions.goConfig());
  };

  onStateChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onAddContactClicked = () => {
    this.props.dispatch(actions.displayWarning(""));
    const {  contactAddress,contactName } = this.state;

    const contactObj = {
      contactAddress: contactAddress,
      contactName: contactName,
    }

    this.props.dispatch(actions.addContact(contactObj));
  };

  // onAddNetworkClicked = () => {
  //   this.validateRPC();
  // };

  render() {
    // eslint-disable-next-line react/prop-types
    const { warning, viewContactObj } = this.props;
    console.log(this.props, '===');
    console.log(this.state, '=-=');
    return (
      <AddContactComponent
        state={this.state}
        props={this.props}
        viewContactObj={viewContactObj}
        warningMsg={warning}
        onBackClick={this.onBackClick}
        onStateChange={this.onStateChange}
        onAddContactClicked={this.onAddContactClicked}
      />
    )
  }
}

function mapStateToProps(state) {
  return {
    metamask: state.metamask,
    warning: state.appState.warning,
    viewContactObj: state.appState.currentViewContactObj,
  };
}

module.exports = connect(mapStateToProps)(AddContact);
