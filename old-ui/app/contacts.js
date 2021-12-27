const React = require("react");
const connect = require("react-redux").connect;
const actions = require("../../ui/app/actions");

class Contacts extends React.Component {
  render() {
    const state = this.props;
    const contactList = state.metamask.contactList;
    const netList = [...contactList];
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
        {netList.map((contactObj) => (
          <div
            style={{
              padding: " 11px 17px 11px 13px ",
              borderBottom: "1px solid #E3E7EB",
              fontFamily: "inter-medium",
              fontSize: "14px",
            }}
          >
            {" "}
            <svg height="16px" width="26px" position="absolute" left="17px">
              <circle
                style={{
                  cx: "10",
                  cy: "10",
                  r: "6",
                  fill: "#E58A0F",
                }}
                
              />
            </svg>{" "}
            {contactObj.contactName}
            {/* <img src={contactObj.isPermanent ? '/images/Assets/Lock.png' : '/images/Assets/Delete.svg'} */}
            {/* style={{position: 'absolute', right: '30px', cursor: contactObj.isPermanent ? 'normal' : 'pointer'}} */}
            {/* onClick={() => !contactObj.isPermanent && this.onDeleteRPCNetwork(contactObj)}/> */}
            <img
              src="/images/Assets/Arrow.svg"
              onClick={() => state.dispatch(actions.veiwContact(contactObj))}
              style={{
                position: "absolute",
                right: "15px",
                marginTop: "6px",
                cursor: "pointer",
              }}
            />
          </div>
        ))}
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
