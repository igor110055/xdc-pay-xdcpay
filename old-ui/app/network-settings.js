const inherits = require("util").inherits;
const Component = require("react").Component;
const h = require("react-hyperscript");
const connect = require("react-redux").connect;
const actions = require("../../ui/app/actions");
const LoadingIndicator = require("./components/loading");
const Web3 = require("web3");
import { Checkbox } from '@material-ui/core';
import React, { useState } from 'react';
import { props } from 'xdc-net-props';
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

class NetworkSettings extends React.Component{
       
    handleCheckBox = () => {
        const showGasFields = this.props.metamask.showGasFields
        // const [toggle, setToggle] = useState(false);
        // toggle ? setToggle(false) : setToggle(true);
        // this.setState({ showGasFields: !showGasFields })
        this.props.dispatch(actions.showGasFields(!showGasFields))
        
    }
    
    render(){
      const state = this.props;
      const networkName = state.networkName;
      const {network} = state.metamask
        return(
        <div className="flex-column flex-grow" style={{maxHeight: "585px",
        overflowY: "auto",}}>
        <div className="section-title flex-row" style={{ borderBottom: "1px solid #E3E7EB", paddingBottom: "17px" } }>
        <img src="/images/Assets/BackArrow.svg" style={{marginLeft:'12px', cursor:'pointer'}} onClick={() => { state.dispatch(actions.goConfig()) }} />
        <h2 style={{ marginLeft: '88px', fontFamily: 'Inter-bold' }}>Network Settings</h2>
        <img src="/images/Assets/Add.svg" style={{cursor:'pointer',position:'absolute',right:'21px'}} onClick={() => { state.dispatch(actions.addNetwork()) }} />
                </div>
                
                <div style={{ padding: ' 11px 17px 11px 15px ', borderBottom: '1px solid #E3E7EB',fontFamily:'inter-medium',fontSize:'14px' }}>{`XDC Mainnet`}
                   <img src="/images/Assets/Lock.png" style={{position:'absolute',right:'30px'}}/><img src="/images/Assets/Arrow.svg" style={{position:'absolute',right:'15px',marginTop:'6px', cursor:'pointer'}} onClick={() => { state.dispatch(actions.viewNetwork()) }}/>
                </div>
            
                <div style={{ padding: ' 11px 17px 11px 15px ', borderBottom: '1px solid #E3E7EB',fontFamily:'inter-medium',fontSize:'14px' }}>{`XDC Apothem Testnet`}
                   <img src="/images/Assets/Lock.png" style={{position:'absolute',right:'30px'}}/><img src="/images/Assets/Arrow.svg" style={{position:'absolute',right:'15px',marginTop:'6px', cursor:'pointer'}} onClick={() => { state.dispatch(actions.viewNetwork()) }}/>
                </div>

                <div style={{ padding: ' 11px 17px 11px 15px ', borderBottom: '1px solid #E3E7EB',fontFamily:'inter-medium',fontSize:'14px' }}>{`XDC Devnet`}
                   <img src="/images/Assets/Lock.png" style={{position:'absolute',right:'30px'}}/><img src="/images/Assets/Arrow.svg" style={{position:'absolute',right:'15px',marginTop:'6px', cursor:'pointer'}} onClick={() => { state.dispatch(actions.viewNetwork()) }}/>
                </div>
            
                <div style={{ padding: ' 11px 17px 11px 15px ', borderBottom: '1px solid #E3E7EB',fontFamily:'inter-medium',fontSize:'14px' }}>{`Localhost 8545`}
              <img src="/images/Assets/Lock.png" style={{ position: 'absolute', right: '30px', }} /><img src="/images/Assets/Arrow.svg" style={{ position: 'absolute', right: '15px', marginTop: '6px', cursor:'pointer' }} onClick={() => { state.dispatch(actions.viewNetwork()) }} />
                </div>
            <div style={{ padding: ' 11px 17px 11px 15px ', borderBottom: '1px solid #E3E7EB', fontFamily: 'inter-medium', fontSize: '14px' }}>{`${networkName}`}
                    <img src="/images/Assets/Delete.svg" style={{position:'absolute',right:'30px',width:'21px'}}/><img src="/images/Assets/Arrow.svg" style={{position:'absolute',right:'15px',marginTop:'4px' , cursor:'pointer'}} onClick={() => { state.dispatch(actions.viewNetwork()) }} />
                </div>
               
                
      </div>
            
            )
        }
    }
   
    module.exports = connect(mapStateToProps)(NetworkSettings);
    
    function mapStateToProps(state) {
      return {
        metamask: state.metamask,
        warning: state.appState.warning,
      };
    }
               
                