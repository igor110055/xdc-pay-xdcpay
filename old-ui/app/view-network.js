const inherits = require("util").inherits;
const Component = require("react").Component;
const h = require("react-hyperscript");
const connect = require("react-redux").connect;
const actions = require("../../ui/app/actions");
const LoadingIndicator = require("./components/loading");
const Web3 = require("web3");
import { Checkbox } from '@material-ui/core';
import React, { useState } from 'react';
import { explorerLinks } from 'xdc-net-props';
const infuraCurrencies = require("./infura-conversion.json").objects.sort(
  (a, b) => {
    return a.quote.name
      .toLocaleLowerCase()
      .localeCompare(b.quote.name.toLocaleLowerCase());
  }
);
const validUrl = require("valid-url");
const exportAsFile = require("./util").exportAsFile;
const Modal = require("../../ui/app/components/modals/index").Modal;
const ethNetProps = require("xdc-net-props");
const { networks } = require("../../app/scripts/controllers/network/util");
// const React = require('react');
// import AddNetwork from './add-network';
class ViewNetwork extends React.Component{
  // constructor (props) {
  //   super(props)
  //   this.state = {
  //     networkName: '',
  //     rpcUrl: ' ',
  //     chainId: ' ',
  //     symbol: ' ',
  //     explorerLink: ' ',
  //   }

  // }
  
    
    render(){
        const state = this.props;
        // const metamaskState = state.metamask;
      // const {networkName,rpcUrl,chainId,networkSymbol,explorerLink} = state
        // const warning = state.warning;
      const networkName = state.networkName;
      console.log(networkName, ': (');
      const rpcUrl = state.rpcUrl;
        return(
        <div className="flex-column flex-grow" style={{maxHeight: "585px",overflowY: "auto",}}>
        <div className="section-title flex-row" style={{ borderBottom: "1px solid #E3E7EB", paddingBottom: "17px" }}>
        <img src="/images/Assets/BackArrow.svg" style={{marginLeft:'12px', cursor:'pointer'}} onClick={() => { state.dispatch(actions.networkSettings()) }} />
        <h2 style={{ marginLeft: '88px', fontFamily: 'Inter-bold' }}>View Network</h2>
        </div>
        
       <div style={{margin:'18px 30px'}}>
        
         <label className="word"  style={{
         fontFamily: 'Inter-Medium',
         }} >Network Name
        </label><br/>
        <div style={{marginBottom:'24px', border:'1px solid #e2e2e2',borderRadius:'4px'}}>
                <div className="input large-input" type='text' style={{ width: '265px', border: 'none', color: '#2A2A2A' }} >{networkName} </div >
        </div>
                

      
         <label className="word"  style={{
         fontFamily: 'Inter-Medium',
         }}>{`New RPC URL`}  
        </label><br/>
        <div style={{marginBottom:'24px', border:'1px solid #e2e2e2',borderRadius:'4px'}}>
                <div className="input large-input" type='text' style={{ width: '265px', border: 'none', color: '#2A2A2A' }} >{rpcUrl}</div>
        </div>
              

         {/* <label className="word"  style={{
         fontFamily: 'Inter-Medium',
         }}>{`Chain ID`}  
        </label><br/>
        <div style={{marginBottom:'24px', border:'1px solid #e2e2e2',borderRadius:'4px'}}>
                <input className="input large-input" type='text' style={{ width: '265px', border: 'none', color: '#2A2A2A' }} >{chainId}</input>
        </div>
                

       
        <label className="word" style={{
        fontFamily: 'Inter-Medium',
        }} >{`Currency Symbol (Optional)`}
        </label><br/>
        <div style={{marginBottom:'24px', border:'1px solid #e2e2e2',borderRadius:'4px'}}>
                <input className="input large-input" type='text' style={{ width: '265px', border: 'none', color: '#2A2A2A' }} >{networkSymbol}</input>
        </div>

        
         <label className="word"  style={{
                        fontFamily: 'Inter-Medium',
                    }}>{`Block Explorer (Optional)`}  
        </label><br/>
        <div style={{marginBottom:'24px', border:'1px solid #e2e2e2',borderRadius:'4px'}}>
                <input className="input large-input" type='text' style={{ width: '265px', border: 'none', color: '#2A2A2A' }} >{explorerLink }</input>
        </div> */}
                

        <div style={{display:'flex', justifyContent: 'space-around',}}>
        <div className="button"
            onClick={() => { state.dispatch(actions.networkSettings()) } }
            style={{
              fontFamily:'Inter-Medium',
              marginTop: '10px',
              fontSize: '14px',
              background: '#E3E7EB',
              width: '120px',
              height: '40px',
                border: 'none',
              color:'#2a2a2a',
              padding: '8px 35px',
          
                        }}> Cancel
                        
                    </div>
                <div className="button"
                  
            style={{
            fontFamily:'Inter-Medium',
              marginTop: '10px',
              fontSize: '14px',
              background: '#03BE46',
              width: '120px',
              height: '40px',
              border: 'none',
              padding: '8px 35px',
          
                        }}> Update
                        
            </div>
                             
                

            </div>
        </div>
             
      </div>
            
            )
        }
}
    

   
    module.exports = connect(mapStateToProps)(ViewNetwork);
    
    function mapStateToProps(state) {
      return {
        metamask: state.metamask,
        warning: state.appState.warning,
      };
    }
               
                