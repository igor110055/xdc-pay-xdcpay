const React = require("react");
const connect = require("react-redux").connect;
const actions = require("../../../../ui/app/actions");
import Identicon from "../../../../ui/app/components/identicon";
const CopyButton = require("../copy/copy-button");
import PropTypes from "prop-types";
import { name } from "loglevel";
const TransactionList = require("../transaction-list");
const { valuesFor } = require("../../util");
class ContactDetails extends React.Component {
  constructor(props) {
    super(props);
    const viewContactObj = this.props.viewContactObj;
    this.state = {
      contactAddress: viewContactObj ? viewContactObj.address : "",
      contactName: viewContactObj ? viewContactObj.name : "",
    };
  }

  render() {
    const state = this.props;
    // const contactList = state.metamask.addressBook;
    const viewContactObj = state;
    const { contactAddress, contactName } = state;
    console.log(state, "<===>");
    const contactList = state.metamask.addressBook;
    const {
      transactions,
      unapprovedMsgs,
      address,
      network,
      shapeShiftTxList,
      conversionRate,
    } = this.props;
    // var selected = props.address || Object.keys(state.addressBook)[0]s
    return (
      <div
        className="flex-column flex-grow"
        style={{ maxHeight: "585px", overflowY: "auto" }}
      >
        <div
          className="section-title flex-row"
          style={{
            // borderBottom: "1px solid #E3E7EB",
            paddingBottom: "17px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <img
            src="/images/Assets/BackArrow.svg"
            style={{ marginLeft: "17px", cursor: "pointer" }}
            onClick={() => {
              state.dispatch(actions.Contacts());
            }}
          />
          <h2 style={{ fontFamily: "Inter-bold", marginLeft: "30px" }}>
            Contact Details
          </h2>
          {/* <img
            src="/images/Assets/Add.svg"
            style={{ cursor: "pointer", marginRight: "11px" }}
            onClick={() => {
              state.dispatch(actions.showAddContactsPage());
            }}
                /> */}
          <div
            style={{
              color: "#2149B9",
              fontSize: "15px",
              marginRight: "22px",
              fontFamily: "Inter-Medium",
              cursor: "pointer",
            }}
            onClick={() =>
              state.dispatch(actions.showAddContactsPage(viewContactObj))
            }
          >
            Edit
          </div>
        </div>
        <div className="list">
          {contactList.map((contactObj) => (
            <div>
              <div style={{ borderBottom: "1px solid #E3E7EB" }}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Identicon
                    overflow="none"
                    address={contactObj.address}
                    diameter={69}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      overflow: "inherit",
                    }}
                  />
                </div>
                <div style={{ display: "grid", justifyContent: "center" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      fontSize: "14px",
                      fontWeight: "600",
                      marginTop: "5px",
                      color: "#2a2a2a",
                    }}
                  >
                    {contactObj.name}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      fontSize: "12px",
                      color: "#848484",
                      marginTop: "16px",
                      fontFamily: "Inter-Medium",
                    }}
                  >
                    Wallet contactAddress
                  </div>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <div>{contactObj.address}</div>
                    <CopyButton value={contactObj.address} isWhite={true} />
                  </div>
                </div>
              </div>

              <div>
                <TransactionList
                  transactions={transactions.sort((a, b) => b.time - a.time)}
                  network={network}
                  unapprovedMsgs={unapprovedMsgs}
                  conversionRate={conversionRate}
                  address={contactObj.address}
                  shapeShiftTxList={shapeShiftTxList}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

module.exports = connect(mapStateToProps)(ContactDetails);

function mapStateToProps(state) {
  return {
    metamask: state.metamask,
    warning: state.appState.warning,
    viewContactObj: state.appState.currentviewContactObj,
    network: state.metamask.network,
    networkList: [
      ...state.metamask.networkList,
      ...state.metamask.frequentRpcList,
    ],
    unapprovedMsgs: valuesFor(state.metamask.unapprovedMsgs),
    shapeShiftTxList: state.metamask.shapeShiftTxList,
    transactions: state.metamask.selectedAddressTxList || [],
    conversionRate: state.metamask.conversionRate,
    currentCurrency: state.metamask.currentCurrency,
  };
}
