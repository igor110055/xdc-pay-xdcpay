import React from "react";

const AddContactComponent = (props) => {
  const {
    onStateChange,
    onAddContactClicked,
    warningMsg,
    viewContactObj,
    state,
  } = props;
  const { contactAddress, contactName } = state
console.log(contactAddress,contactName,'<CONTACT---DETAILS>')
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
        }}
      >
        <img
          src="/images/Assets/BackArrow.svg"
          style={{ marginLeft: "17px", cursor: "pointer" }}
          onClick={() => {
            state.dispatch(actions.goConfig());
          }}
        />
        <h2 style={{ fontFamily: "Inter-bold", marginLeft: "98px" }}>
          Add Contact
        </h2>
      </div>
      {warningMsg && <div className="error">{warningMsg}</div>}
      <div style={{ margin: "25px 42px" }}>
        <label className="word" style={{ fontFamily: "Inter-Medium" }}>
          {`Wallet Address`}
        </label>
        <br />
        <div
          style={{
            marginBottom: "24px",
            border: "1px solid #C7CDD8",
            borderRadius: "4px",
          }}
        >
          <input
            className="input large-input"
            id="new_rpc"
            type="text"
            name="contactAddress"
            value={contactAddress}
            placeholder="Contact's Wallet Address"
            onChange={onStateChange}
            style={{ width: "265px", border: "none", color: "#2A2A2A" }}
          />
          <img
            src="/images/Assets/Scan.svg"
            style={{ position: "absolute", right: "49px", top: "156px" }}
          />
        </div>
        <label className="word" style={{ fontFamily: "Inter-Medium" }}>
          {`Username`}
        </label>
        <br />
        <div
          style={{
            marginBottom: "24px",
            border: "1px solid #e2e2e2",
            borderRadius: "4px",
          }}
        >
          <input
            className="input large-input"
            placeholder="Contact's Name"
            id="new_rpc"
            type="text"
            name="contactName"
            value={contactName}
            onChange={onStateChange}
            style={{ width: "265px", border: "none", color: "#2A2A2A" }}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <div
            className="button"
            // onClick={onBackClick}
            style={{
              fontFamily: "Inter-Medium",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "14px",
              background: "#E3E7EB",
              width: "120px",
              height: "40px",
              border: "none",
              color: "#2a2a2a",
            }}
          >
            {" "}
            Cancel
          </div>

          <div
            className="button"
            style={{
              fontFamily: "Inter-Medium",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "14px",
              background: "#03BE46",
              width: "120px",
              height: "40px",
              border: "none",
            }}
            onClick={(event) => {
              event.preventDefault();
              onAddContactClicked(!!viewContactObj);
            }}
          >
            {`${viewContactObj ? "Update" : "Add"}`}
          </div>
        </div>
      </div>
    </div>
  );
};

module.exports = AddContactComponent;
