const inherits = require("util").inherits;
const Component = require("react").Component;
const connect = require("react-redux").connect;
const actions = require("../../ui/app/actions");
const LoadingIndicator = require("./components/loading");
const Web3 = require("web3");
import SimpleDropdown from '../../ui/app/components/dropdowns/simple-dropdown'
import locales from '../../app/_locales/index.json'
import PropTypes from 'prop-types'
// import '../../old-ui/app/css/index.css'

const localeOptions = locales.map(locale => {
    return {
      displayValue: `${locale.name}`,
      key: locale.code,
      value: locale.code,
    }
  })

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
import { Module } from 'module';
import { showGasFields, showTokens } from '../../ui/app/actions';

const React = require('react')

// const sortedCurrencies = infuraCurrencies.objects.sort((a, b) => {
//   return a.quote.name.toLocaleLowerCase().localeCompare(b.quote.name.toLocaleLowerCase())
// })
const infuraCurrencyOptions = infuraCurrencies.map(({ quote: { code, name } }) => {
  return {
    displayValue: `${code.toUpperCase()} - ${name}`,
    key: code,
    value: code,
  }
})

// }
// inherits(GeneralSettings, Component);
// function GeneralSettings() {
//   this.state = {
//     loading: false,
//   };
//   Component.call(this);
// }
class GeneralSettings extends React.Component {
  static contextTypes = {
    t: PropTypes.func,
  }
  handleCheckBox = () => {
    const showTokens = this.props.metamask.showTokens
    // this.setState({ showTokens: !showTokens })
    this.props.dispatch(actions.showTokens(!showTokens))
  }

  render() {
    const state = this.props;
    console.log(state,'=-=-=-=')
    const metamaskState = state.metamask;
    const showTokens = metamaskState.showTokens;

    return (
      <div className="flex-column flex-grow">
        {/* <LoadingIndicator/> */}
        <div className="section-title flex-row" style={{paddingBottom:'17px'}}>
          <img src="/images/Assets/BackArrow.svg" style={{marginLeft:'34px', cursor:'pointer'}} onClick={() => { state.dispatch(actions.goConfig()) }} />
          <h2 style={{ marginLeft:'88px',fontFamily:'Inter-Bold'}}>General Settings</h2>
        </div>
        <div style={{borderTop:'1px solid #E3E7EB',padding:'20px 40px'}}>
          {currentConversionInformation(metamaskState, state)}
        </div>
        <div style={{borderTop:'1px solid #E3E7EB',padding:'20px 40px'}}>
          {currentLanguage(state)}
        </div>
        <div style={{ padding:'20px 40px',borderTop:'1px solid #E3E7EB' }}>
          <div style={{color:'#2149B9',fontSize:'14px',fontFamily:'Inter-Medium', }}>Hide Tokens Without Balance</div><br/>
       <label className="switch">
          {/* <input type="checkbox" id="checked" /> */}
            <input type="checkbox" id="checked" onChange={this.handleCheckBox} checked={!showTokens}/>
          <span className="slider round"></span>
       </label>
          <span style={{ marginLeft: '8px', }}>{!showTokens ? "On" : "Off"}</span>
          </div>
      </div>
    )
  }
}
module.exports = connect(mapStateToProps)(GeneralSettings)

function mapStateToProps(state) {
  return {
    metamask: state.metamask,
    warning: state.appState.warning,
  }
}

  
  function currentConversionInformation(metamaskState, state) {
    const currentCurrency = metamaskState.currentCurrency;
    const conversionDate = metamaskState.conversionDate;
    // const { t } = this.context;
    const setCurrentCurrency = metamaskState.setCurrentCurrency;
    return (
      <div >
      <span style={{fontFamily:'Inter-Medium', fontSize: "14px", color: "#2149B9"}}>
      Current Conversion
        </span>
        <br />
        <span style={{fontSize: "14px", color: "#2A2A2A",fontFamily:'Inter-Medium' ,}}>
          {`Updated ` + Date(conversionDate) }
        </span>
        <br />
        <div className="settings-page__content-item" style={{ border: '1px solid #C7CDD8', borderRadius: '4px', height: '40px', width: '324', padding:'7px 0 0 4px '}} >
          USD - United States Dollar
          
        <SimpleDropdown
            style={{border: '1px solid #E3E7EB' }}
            placeholder={(currentCurrency)}
            options={infuraCurrencyOptions}
            selectedOption={currentCurrency}
            onSelect={newCurrency => setCurrentCurrency(newCurrency)}
            />
          <div className="settings-page__content-item-col">
            </div>
            </div>
      </div>
    )    
  }
  
  function currentLanguage (state){
    // const { t } = this.context
    
    console.log(state,'+-+-+')
    const { updateCurrentLocale, currentLocale } = state
    const currentLocaleMeta = locales.find(locale => locale.code === currentLocale)
    const currentLocaleName = currentLocaleMeta ? currentLocaleMeta.name : ''
  
    return (
      <div >
      <div className="settings-page__content-row">
        <div className="settings-page__content-item">
          <div style={{fontFamily:'Inter-Medium' ,color:'#2149B9',fontSize:'14px',height:'34px'}}>
          Current Language
          </div>
          <span className="settings-page__content-description">
            { currentLocaleName }
          </span>
        </div>
        <div className="settings-page__content-item" style={{border:'1px solid #C7CDD8', borderRadius:'4px',height:'40px', width:'324', padding:'7px 0 0 4px '}} >
          <div className="settings-page__content-item-col">
            <SimpleDropdown
              // style={{ border: '1px solid #E3E7EB',}}
              placeholder={('selectLocale')}
              options={localeOptions}
              selectedOption={currentLocale}
              onSelect={async newLocale => updateCurrentLocale(newLocale)}
            />
          </div>
        </div>
        </div>
        </div>
    )
  }
  
  