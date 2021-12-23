const React = require("react");
const connect = require("react-redux").connect;
const actions = require("../../ui/app/actions");

class AddContacts extends React.Component {
  render() {
    const state = this.props;
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
          <h2 style={{ fontFamily: "Inter-bold", marginLeft: "98px" }}>Add Contact</h2>
        </div>

        <div style={{ margin: "18px 30px" }}>
          <label
            className="word"
            style={{ fontFamily: "Inter-Medium", }}
          >
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
              placeholder="Contact's Wallet Address"
                        onChange={(event) =>
                this.setState({ rpcUrl: event.target.value })
              }
                        style={{ width: "265px", border: "none", color: "#2A2A2A" }}
                        />
                        <img src="/images/Assets/Scan.svg" style={{position:'absolute', right:'36px', top:'149px'}}/>
                    
          </div>
          <label
            className="word"
            style={{ fontFamily: "Inter-Medium", }}
          >
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
              onChange={(event) =>
                this.setState({ rpcUrl: event.target.value })
              }
              style={{ width: "265px", border: "none", color: "#2A2A2A" }}
            />
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <div className="button"
                 onClick={() => {
                   state.dispatch(actions.Contacts())
                 }}
                 style={{
                   fontFamily: 'Inter-Medium',
                   marginTop: '10px',
                   fontSize: '14px',
                   background: '#E3E7EB',
                   width: '120px',
                   height: '40px',
                   border: 'none',
                   color: '#2a2a2a',
                   padding: '8px 35px',

                 }}> Cancel

            </div>
            <div className="button"
                 style={{
                   fontFamily: 'Inter-Medium',
                   marginTop: '10px',
                   fontSize: '14px',
                   background: '#03BE46',
                   width: '120px',
                   height: '40px',
                   border: 'none',
                   padding: '8px 47px',
                 }}
                 onClick={(event) => {
                   event.preventDefault()
                   // const rpcUrl=
                //    const newRpc = enteredRpcUrl
                //    console.log(newRpc, '+.+.+')
                //    this.rpcValidation(newRpc, state)
                 }}
            > Add
            </div>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = connect(mapStateToProps)(AddContacts);

function mapStateToProps(state) {
  return {
    metamask: state.metamask,
    warning: state.warning,
  };
}
