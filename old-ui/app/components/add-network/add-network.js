import React from 'react'

const AddNetworkComponent = (props) => {
  // eslint-disable-next-line react/prop-types
  const {onBackClick, onStateChange, onAddNetworkClicked, warningMsg} = props

  return (
    <div className="flex-column flex-grow" style={{maxHeight: '585px', overflowY: 'auto'}}>
      <div className="section-title flex-row" style={{borderBottom: '1px solid #E3E7EB', paddingBottom: '17px'}}>
        <img src="/images/Assets/BackArrow.svg" style={{marginLeft: '12px', cursor: 'pointer'}} onClick={onBackClick}/>
        <h2 style={{marginLeft: '88px', fontFamily: 'Inter-bold', color:'#2a2a2a'}}>Add Network</h2>
      </div>
      <div style={{margin: '18px 43px'}}>
        <label className="word" style={{fontFamily: 'Inter-Bold'}}>Network Name</label>
        <br/>
        <div style={{marginBottom: '24px', border: '1px solid #C7CDD8', borderRadius: '4px'}}>
          <input className="input large-input" type="text" name="networkName"
                 onChange={onStateChange} style={{width: '265px', border: 'none', color: '#2A2A2A'}}/>
        </div>
        <label className="word" style={{fontFamily: 'Inter-Bold'}}>New RPC URL</label>
        <br/>
        <div style={{marginBottom: '24px', border: '1px solid #C7CDD8', borderRadius: '4px'}}>
          <input className="input large-input" id="new_rpc" type="text" name="rpcUrl"
                 onChange={onStateChange} style={{width: '265px', border: 'none', color: '#2A2A2A'}}/>
        </div>
        {warningMsg && <div className="error">{warningMsg}</div>}
        <label className="word" style={{fontFamily: 'Inter-Bold'}}>Chain ID</label>
        <br/>
        <div style={{marginBottom: '24px', border: '1px solid #C7CDD8', borderRadius: '4px'}}>
          <input className="input large-input" type="text" style={{width: '265px', border: 'none', color: '#2A2A2A'}}
                 name="chainId" onChange={onStateChange}/>
        </div>
        <label className="word" style={{fontFamily: 'Inter-Bold'}}>Currency Symbol (Optional)</label>
        <br/>
        <div style={{marginBottom: '24px', border: '1px solid #C7CDD8', borderRadius: '4px'}}>
          <input className="input large-input" type="text" style={{width: '265px', border: 'none', color: '#2A2A2A'}}
                 name="currencySymbol" onChange={onStateChange}/>
        </div>
        <label className="word" style={{fontFamily: 'Inter-Bold'}}>Block Explorer (Optional)</label>
        <br/>
        <div style={{marginBottom: '24px', border: '1px solid #C7CDD8', borderRadius: '4px'}}>
          <input className="input large-input" type="text" style={{width: '265px', border: 'none', color: '#2A2A2A'}}
                 name="explorerLink" onChange={onStateChange}/>
        </div>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
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
                 onAddNetworkClicked()
               }}
          > Add
          </div>
        </div>
      </div>
    </div>
  )
}
module.exports = AddNetworkComponent
