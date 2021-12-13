import React from 'react'

const AddNetworkComponent = (props) => {
  // eslint-disable-next-line react/prop-types
  const {onBackClick, onStateChange, onAddNetworkClicked, warningMsg, viewNetworkObj, state} = props
  const {networkName, rpcUrl, chainId, currencySymbol, explorerLink} = state

  return (
    <div className="flex-column flex-grow" style={{maxHeight: '585px', overflowY: 'auto'}}>
      <div className="section-title flex-row" style={{borderBottom: '1px solid #E3E7EB', paddingBottom: '17px'}}>
        <img src="/images/Assets/BackArrow.svg" style={{marginLeft: '12px', cursor: 'pointer'}} onClick={onBackClick}/>
        <h2 style={{marginLeft: '88px', fontFamily: 'Inter-bold'}}>{`${viewNetworkObj ? 'View' : 'Add'} Network`}</h2>
      </div>
      <div style={{margin: '18px 30px'}}>
        <label className="word" style={{fontFamily: 'Inter-Medium'}}>Network Name</label>
        <br/>
        <div style={{marginBottom: '24px', border: '1px solid #e2e2e2', borderRadius: '4px'}}>
          <input className="input large-input" type="text" name="networkName" value={networkName}
                 onChange={onStateChange} style={{width: '265px', border: 'none', color: '#2A2A2A'}}/>
        </div>
        <label className="word" style={{fontFamily: 'Inter-Medium'}}>New RPC URL</label>
        <br/>
        <div style={{marginBottom: '24px', border: '1px solid #e2e2e2', borderRadius: '4px'}}>
          <input className="input large-input" id="new_rpc" type="text" name="rpcUrl" value={rpcUrl}
                 onChange={onStateChange} style={{width: '265px', border: 'none', color: '#2A2A2A'}}/>
        </div>
        {warningMsg && <div className="error">{warningMsg}</div>}
        <label className="word" style={{fontFamily: 'Inter-Medium'}}>Chain ID</label>
        <br/>
        <div style={{marginBottom: '24px', border: '1px solid #e2e2e2', borderRadius: '4px'}}>
          <input className="input large-input" type="text" style={{width: '265px', border: 'none', color: '#2A2A2A'}}
                 name="chainId" onChange={onStateChange} value={chainId}/>
        </div>
        <label className="word" style={{fontFamily: 'Inter-Medium'}}>Currency Symbol (Optional)</label>
        <br/>
        <div style={{marginBottom: '24px', border: '1px solid #e2e2e2', borderRadius: '4px'}}>
          <input className="input large-input" type="text" style={{width: '265px', border: 'none', color: '#2A2A2A'}}
                 name="currencySymbol" onChange={onStateChange} value={currencySymbol}/>
        </div>
        <label className="word" style={{fontFamily: 'Inter-Medium'}}>Block Explorer (Optional)</label>
        <br/>
        <div style={{marginBottom: '24px', border: '1px solid #e2e2e2', borderRadius: '4px'}}>
          <input className="input large-input" type="text" style={{width: '265px', border: 'none', color: '#2A2A2A'}}
                 name="explorerLink" onChange={onStateChange} value={explorerLink}/>
        </div>
        {viewNetworkObj && viewNetworkObj.isPermanent ? '' :
          <div style={{display: 'flex', justifyContent: 'space-around'}}>
            <div className="button" onClick={onBackClick}
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
                   onAddNetworkClicked(!!viewNetworkObj)
                 }}
            >{`${viewNetworkObj ? 'Update' : 'Add'}`}
            </div>
          </div>}
      </div>
    </div>
  )
}
module.exports = AddNetworkComponent
