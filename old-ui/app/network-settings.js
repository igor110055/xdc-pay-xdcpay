const inherits = require("util").inherits;
const Component = require("react").Component;
const h = require("react-hyperscript");
const connect = require("react-redux").connect;
const actions = require("../../ui/app/actions");
const LoadingIndicator = require("./components/loading");
const Web3 = require("web3");
import { Checkbox } from '@material-ui/core';
import React, { useState } from 'react';
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
    // constructor() {
    //     super()
    //     this.state = {showGasFields: false}
    // }
    // state = { checked : false }

    // onChange = newValue => {
    //   this.setState({ checked: newValue });
    // }
    
    handleCheckBox = () => {
        const showGasFields = this.props.metamask.showGasFields
        // const [toggle, setToggle] = useState(false);
        // toggle ? setToggle(false) : setToggle(true);
        // this.setState({ showGasFields: !showGasFields })
        this.props.dispatch(actions.showGasFields(!showGasFields))
        
    }
    
    render(){
        const state = this.props;
        const metamaskState = state.metamask;
        const warning = state.warning;
        return(
        <div className="flex-column flex-grow" style={{maxHeight: "585px",
        overflowY: "auto",}}>
        <div className="section-title flex-row" style={{ borderBottom: "1px solid #E3E7EB", paddingBottom: "17px" } }>
        <img src="/images/Assets/BackArrow.svg" style={{marginLeft:'12px', cursor:'pointer'}} onClick={() => { state.dispatch(actions.goConfig()) }} />
        <h2 style={{ marginLeft: '88px', fontFamily: 'Inter-bold' }}>Network Settings</h2>
        <img src="/images/Assets/Add.svg" style={{cursor:'pointer',position:'absolute',right:'21px'}} onClick={() => { state.dispatch(actions.addNetwork()) }} />
        </div>
        <div style={{ padding: ' 15px 17px 20px 15px ', borderBottom: '1px solid #E3E7EB',}}>
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
               
                