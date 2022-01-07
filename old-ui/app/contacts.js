const React = require("react");
const connect = require("react-redux").connect;
const actions = require("../../ui/app/actions");
import Identicon from "../../ui/app/components/identicon";
import PropTypes from "prop-types";
import { name } from "loglevel";

class Contacts extends React.Component {
  // static propTypes = {
  //   identity: PropTypes.object.isRequired,
  // }

  render() {
    const state = this.props;
    const contactList = state.metamask.addressBook;
    // const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
    contactList.sort(function (a, b) {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
    const initialLabel = (contactList) => {
      const fullName = contactList.name.split(" ");
      const initials = fullName.shift().charAt(0) + fullName.pop().charAt(0);
      return initials.toUpperCase();
    };

    return (
      <div
        className="flex-column flex-grow"
        style={{ maxHeight: "585px", overflowY: "auto" }}
      >
        <div
          className="section-title flex-row"
          style={{
            borderBottom: "1px solid #E3E7EB",
            paddingBottom: "17px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <img
            src="/images/Assets/BackArrow.svg"
            style={{ marginLeft: "17px", cursor: "pointer" }}
            onClick={() => {
              state.dispatch(actions.goConfig());
            }}
          />
          <h2 style={{ fontFamily: "Inter-bold" }}>Contacts</h2>
          <img
            src="/images/Assets/Add.svg"
            style={{ cursor: "pointer", marginRight: "11px" }}
            onClick={() => {
              state.dispatch(actions.showAddContactsPage());
            }}
          />
        </div>
        <div className="list">
          {contactList.map((contactObj) => (
            <div
              style={{
                borderBottom: "1px solid #E3E7EB",
                fontFamily: "inter-medium",
                fontSize: "14px",
                height: "69px",
              }}
              
            >
              <div
                style={{
                  backgroundColor: "#F4F6FA",
                  height: "24px",
                  width: "100%",
                  padding: "0 21px",
                }}
              >A
                
              </div>
              <div style={{ padding: "9px 0 0 20px", }}
               
              >
                <Identicon
                  overflow="none"
                  address={contactObj.address}
                  diameter={27}
                  style={{ marginLeft: "10px", overflow: "inherit" }}
                />
                <div style={{ margin: "-24px 0 0 35px", cursor: 'pointer' }}  onClick={state.dispatch(actions.contactDetails())} >
                  {contactObj.name}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

module.exports = connect(mapStateToProps)(Contacts);

function mapStateToProps(state) {
  return {
    metamask: state.metamask,
    warning: state.appState.warning,
  };
}
