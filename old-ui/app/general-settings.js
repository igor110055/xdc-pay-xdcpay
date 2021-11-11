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

  render() {
    const state = this.props;
    console.log(state,'=-=-=-=')
    const metamaskState = state.metamask;
    const warning = state.warning;

    return (
      <div className="flex-column flex-grow">
        {/* <LoadingIndicator/> */}
        <div className="section-title flex-row">
          <img src="/images/Assets/BackArrow.svg" style={{marginLeft:'12px', cursor:'pointer'}} onClick={() => { state.dispatch(actions.goConfig()) }} />
          <h2 style={{ marginLeft:'88px'}}>General Settings</h2>
        </div>
        <div style={{borderTop:'1px solid #E3E7EB'}}>
          {currentConversionInformation(metamaskState, state)}
        </div>
        <div style={{borderTop:'1px solid #E3E7EB'}}>
          {currentLanguage(state)}
        </div>
       <label className="switch">
          <input type="checkbox"/>
       <span className="slider round"></span>
       </label>
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
      <div style={{ padding:'10px 19px' }}>
      <span style={{fontWeight: "bold", fontSize: "14px", color: "#2149B9"}}>
      Current Conversion
        </span>
        <br />
        <span style={{fontSize: "14px", color: "#2A2A2A"}}>
          {`Updated` + Date(conversionDate) }
        </span>
        <br />
        
        <SimpleDropdown
            style={{border: '1px solid #E3E7EB' }}
            placeholder={('selectCurrency')}
            options={infuraCurrencyOptions}
            selectedOption={currentCurrency}
            onSelect={newCurrency => setCurrentCurrency(newCurrency)}
            />

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
      <div style={{ padding:'10px 19px' }}>
      <div className="settings-page__content-row">
        <div className="settings-page__content-item">
          <span className="settings-page__content-label">
            { ('currentLanguage') }
          </span>
          <span className="settings-page__content-description">
            { currentLocaleName }
          </span>
        </div>
        <div className="settings-page__content-item" style={{border:'1px solid grey'}} >
          <div className="settings-page__content-item-col">
            <SimpleDropdown
              style={{ border: '1px solid #E3E7EB' }}
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
  
  // h(
    //   ".flex-column.flex-grow",
    //   {
      //     style: {
        //       maxHeight: "585px",
  //       overflowY: "auto",
  //     },
  //   },
  //   [
  //     // (LoadingIndicator, {
  //     //   isLoading: this.state.loading,
  //     // }),

  //     h(Modal, {}, []),

  //     // subtitle and nav
  //     h(".section-title.flex-row", { style: { borderBottom: '1px solid #E3E7EB', paddingBottom: '17px' }, }, [
  //       h("img", {
  //         onClick: () => {
  //           state.dispatch(actions.goHome());
  //         },
  //         src: "/images/Assets/BackArrow.svg",
  //         style: {
  //           position: "static",
  //           marginLeft: "15px",
  //           cursor: "pointer",
  //         },
  //       }),
  //       h(
  //         "h2",
  //         {
  //           style: {
  //             marginLeft: "114px",
  //             fontWeight: "600",
  //             minHeight: '20px',
  //             padding: '0px 18px ',
  //           },
  //         },
  //         "General Settings"
  //       ),
  //     ]),
  //     [

        
  //       currentConversionInformation(metamaskState, state),
  //     ]
      

      
     
        
  //   ]);

// const localeOptions = locales.map(locale => {
//     return {
//       displayValue: `${locale.name}`,
//       key: locale.code,
//       value: locale.code,
//     }
// })
  





//   import React, { PureComponent } from 'react'
// import PropTypes from 'prop-types'
// import infuraCurrencies from '../../ui/app/infura-conversion.json'
// import validUrl from 'valid-url'
// import { exportAsFile } from '../../ui/app/util'
// import SimpleDropdown from '../../ui/app/components/dropdowns/simple-dropdown'
// import ToggleButton from 'react-toggle-button'
// import { REVEAL_SEED_ROUTE } from '../../ui/app/routes'
// import locales from '../../app/_locales/index.json'
// import TextField from '../../ui/app/components/text-field'
// import Button from '../../ui/app/components/button'

// const sortedCurrencies = infuraCurrencies.objects.sort((a, b) => {
//   return a.quote.name.toLocaleLowerCase().localeCompare(b.quote.name.toLocaleLowerCase())
// })

// const infuraCurrencyOptions = sortedCurrencies.map(({ quote: { code, name } }) => {
//   return {
//     displayValue: `${code.toUpperCase()} - ${name}`,
//     key: code,
//     value: code,
//   }
// })

// const localeOptions = locales.map(locale => {
//   return {
//     displayValue: `${locale.name}`,
//     key: locale.code,
//     value: locale.code,
//   }
// })

// export default class GeneralSettings extends PureComponent {
//   static contextTypes = {
//     t: PropTypes.func,
//   }

//   static propTypes = {
//     metamask: PropTypes.object,
//     setUseBlockie: PropTypes.func,
//     setHexDataFeatureFlag: PropTypes.func,
//     setCurrentCurrency: PropTypes.func,
//     setRpcTarget: PropTypes.func,
//     delRpcTarget: PropTypes.func,
//     displayWarning: PropTypes.func,
//     revealSeedConfirmation: PropTypes.func,
//     setFeatureFlagToBeta: PropTypes.func,
//     showResetAccountConfirmationModal: PropTypes.func,
//     warning: PropTypes.string,
//     history: PropTypes.object,
//     isMascara: PropTypes.bool,
//     updateCurrentLocale: PropTypes.func,
//     currentLocale: PropTypes.string,
//     useBlockie: PropTypes.bool,
//     sendHexData: PropTypes.bool,
//     currentCurrency: PropTypes.string,
//     conversionDate: PropTypes.number,
//     useETHAsPrimaryCurrency: PropTypes.bool,
//     setUseETHAsPrimaryCurrencyPreference: PropTypes.func,
//   }

//   state = {
//     newRpc: '',
//   }

//   renderCurrentConversion () {
//     const { t } = this.context
//     const { currentCurrency, conversionDate, setCurrentCurrency } = this.props

//     return (
//       <div className="settings-page__content-row">
//         <div className="settings-page__content-item">
//           <span>{ t('currentConversion') }</span>
//           <span className="settings-page__content-description">
//             { t('updatedWithDate', [Date(conversionDate)]) }
//           </span>
//         </div>
//         <div className="settings-page__content-item">
//           <div className="settings-page__content-item-col">
//             <SimpleDropdown
//               placeholder={t('selectCurrency')}
//               options={infuraCurrencyOptions}
//               selectedOption={currentCurrency}
//               onSelect={newCurrency => setCurrentCurrency(newCurrency)}
//             />
//           </div>
//         </div>
//       </div>
//     )
//   }

//   renderCurrentLocale () {
//     const { t } = this.context
//     const { updateCurrentLocale, currentLocale } = this.props
//     const currentLocaleMeta = locales.find(locale => locale.code === currentLocale)
//     const currentLocaleName = currentLocaleMeta ? currentLocaleMeta.name : ''

//     return (
//       <div className="settings-page__content-row">
//         <div className="settings-page__content-item">
//           <span className="settings-page__content-label">
//             { t('currentLanguage') }
//           </span>
//           <span className="settings-page__content-description">
//             { currentLocaleName }
//           </span>
//         </div>
//         <div className="settings-page__content-item">
//           <div className="settings-page__content-item-col">
//             <SimpleDropdown
//               placeholder={t('selectLocale')}
//               options={localeOptions}
//               selectedOption={currentLocale}
//               onSelect={async newLocale => updateCurrentLocale(newLocale)}
//             />
//           </div>
//         </div>
//       </div>
//     )
//   }

//   renderNewRpcUrl () {
//     const { t } = this.context
//     const { newRpc } = this.state

//     return (
//       <div className="settings-page__content-row">
//         <div className="settings-page__content-item">
//           <span>{ t('newRPC') }</span>
//         </div>
//         <div className="settings-page__content-item">
//           <div className="settings-page__content-item-col">
//             <TextField
//               type="text"
//               id="new-rpc"
//               placeholder={t('newRPC')}
//               value={newRpc}
//               onChange={e => this.setState({ newRpc: e.target.value })}
//               onKeyPress={e => {
//                 if (e.key === 'Enter') {
//                   this.validateRpc(newRpc)
//                 }
//               }}
//               fullWidth
//               margin="none"
//             />
//             <div
//               className="settings-tab__rpc-save-button"
//               onClick={e => {
//                 e.preventDefault()
//                 this.validateRpc(newRpc)
//               }}
//             >
//               { t('save') }
//             </div>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   validateRpc (newRpc) {
//     const { setRpcTarget, displayWarning } = this.props

//     if (validUrl.isWebUri(newRpc)) {
//       setRpcTarget(newRpc)
//     } else {
//       const appendedRpc = `https://${newRpc}`

//       if (validUrl.isWebUri(appendedRpc)) {
//         displayWarning(this.context.t('uriErrorMsg'))
//       } else {
//         displayWarning(this.context.t('invalidRPC'))
//       }
//     }
//   }

//   renderStateLogs () {
//     const { t } = this.context
//     const { displayWarning } = this.props

//     return (
//       <div className="settings-page__content-row">
//         <div className="settings-page__content-item">
//           <span>{ t('stateLogs') }</span>
//           <span className="settings-page__content-description">
//             { t('stateLogsDescription') }
//           </span>
//         </div>
//         <div className="settings-page__content-item">
//           <div className="settings-page__content-item-col">
//             <Button
//               type="primary"
//               large
//               onClick={() => {
//                 window.logStateString((err, result) => {
//                   if (err) {
//                     displayWarning(t('stateLogError'))
//                   } else {
//                     exportAsFile('MetaMask State Logs.json', result)
//                   }
//                 })
//               }}
//             >
//               { t('downloadStateLogs') }
//             </Button>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   renderSeedWords () {
//     const { t } = this.context
//     const { history } = this.props

//     return (
//       <div className="settings-page__content-row">
//         <div className="settings-page__content-item">
//           <span>{ t('revealSeedWords') }</span>
//         </div>
//         <div className="settings-page__content-item">
//           <div className="settings-page__content-item-col">
//             <Button
//               type="secondary"
//               large
//               onClick={event => {
//                 event.preventDefault()
//                 history.push(REVEAL_SEED_ROUTE)
//               }}
//             >
//               { t('revealSeedWords') }
//             </Button>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   renderOldUI () {
//     const { t } = this.context
//     const { setFeatureFlagToBeta } = this.props

//     return (
//       <div className="settings-page__content-row">
//         <div className="settings-page__content-item">
//           <span>{ t('useOldUI') }</span>
//         </div>
//         <div className="settings-page__content-item">
//           <div className="settings-page__content-item-col">
//             <Button
//               type="secondary"
//               large
//               className="settings-tab__button--orange"
//               onClick={event => {
//                 event.preventDefault()
//                 setFeatureFlagToBeta()
//               }}
//             >
//               { t('useOldUI') }
//             </Button>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   renderResetAccount () {
//     const { t } = this.context
//     const { showResetAccountConfirmationModal } = this.props

//     return (
//       <div className="settings-page__content-row">
//         <div className="settings-page__content-item">
//           <span>{ t('resetAccount') }</span>
//         </div>
//         <div className="settings-page__content-item">
//           <div className="settings-page__content-item-col">
//             <Button
//               type="secondary"
//               large
//               className="settings-tab__button--orange"
//               onClick={event => {
//                 event.preventDefault()
//                 showResetAccountConfirmationModal()
//               }}
//             >
//               { t('resetAccount') }
//             </Button>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   renderBlockieOptIn () {
//     const { useBlockie, setUseBlockie } = this.props

//     return (
//       <div className="settings-page__content-row">
//         <div className="settings-page__content-item">
//           <span>{ this.context.t('blockiesIdenticon') }</span>
//         </div>
//         <div className="settings-page__content-item">
//           <div className="settings-page__content-item-col">
//             <ToggleButton
//               value={useBlockie}
//               onToggle={value => setUseBlockie(!value)}
//               activeLabel=""
//               inactiveLabel=""
//             />
//           </div>
//         </div>
//       </div>
//     )
//   }

//   renderHexDataOptIn () {
//     const { t } = this.context
//     const { sendHexData, setHexDataFeatureFlag } = this.props

//     return (
//       <div className="settings-page__content-row">
//         <div className="settings-page__content-item">
//           <span>{ t('showHexData') }</span>
//           <div className="settings-page__content-description">
//             { t('showHexDataDescription') }
//           </div>
//         </div>
//         <div className="settings-page__content-item">
//           <div className="settings-page__content-item-col">
//             <ToggleButton
//               value={sendHexData}
//               onToggle={value => setHexDataFeatureFlag(!value)}
//               activeLabel=""
//               inactiveLabel=""
//             />
//           </div>
//         </div>
//       </div>
//     )
//   }

//   renderUseEthAsPrimaryCurrency () {
//     const { t } = this.context
//     const { useETHAsPrimaryCurrency, setUseETHAsPrimaryCurrencyPreference } = this.props

//     return (
//       <div className="settings-page__content-row">
//         <div className="settings-page__content-item">
//           <span>{ t('primaryCurrencySetting') }</span>
//           <div className="settings-page__content-description">
//             { t('primaryCurrencySettingDescription') }
//           </div>
//         </div>
//         <div className="settings-page__content-item">
//           <div className="settings-page__content-item-col">
//             <div className="settings-tab__radio-buttons">
//               <div className="settings-tab__radio-button">
//                 <input
//                   type="radio"
//                   id="eth-primary-currency"
//                   onChange={() => setUseETHAsPrimaryCurrencyPreference(true)}
//                   checked={Boolean(useETHAsPrimaryCurrency)}
//                 />
//                 <label
//                   htmlFor="eth-primary-currency"
//                   className="settings-tab__radio-label"
//                 >
//                   { t('eth') }
//                 </label>
//               </div>
//               <div className="settings-tab__radio-button">
//                 <input
//                   type="radio"
//                   id="fiat-primary-currency"
//                   onChange={() => setUseETHAsPrimaryCurrencyPreference(false)}
//                   checked={!useETHAsPrimaryCurrency}
//                 />
//                 <label
//                   htmlFor="fiat-primary-currency"
//                   className="settings-tab__radio-label"
//                 >
//                   { t('fiat') }
//                 </label>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   render () {
//     const { warning, isMascara } = this.props

//     return (
//       <div className="settings-page__content">
//         { warning && <div className="settings-tab__error">{ warning }</div> }
//         { this.renderCurrentConversion() }
//         { this.renderUseEthAsPrimaryCurrency() }
//         { this.renderCurrentLocale() }
//         { this.renderNewRpcUrl() }
//         { this.renderStateLogs() }
//         { this.renderSeedWords() }
//         { !isMascara && this.renderOldUI() }
//         { this.renderResetAccount() }
//         { this.renderBlockieOptIn() }
//         { this.renderHexDataOptIn() }
//       </div>
//     )
//   }
// }