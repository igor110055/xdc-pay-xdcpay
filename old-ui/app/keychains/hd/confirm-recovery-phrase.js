// const inherits = require('util').inherits
// const Component = require('react').Component
// const connect = require('react-redux').connect
// const h = require('react-hyperscript')
// const actions = require('../../../../ui/app/actions')
// const exportAsFile = require('../../util').exportAsFile

// module.exports = connect(mapStateToProps)(CreateVaultCompleteScreen)

// inherits(CreateVaultCompleteScreen, Component)
// function CreateVaultCompleteScreen () {
//   Component.call(this)
// }

// function mapStateToProps (state) {
//   return {
//     seed: state.appState.currentView.seedWords,
//     cachedSeed: state.metamask.seedWords,
//   }
// }

// CreateVaultCompleteScreen.prototype.render = function () {
//   var state = this.props
//   var seed = state.seed || state.cachedSeed || ''
//   console.log(seed, '*-*-*-*')
//   var seedArr = seed.split(' ')
  
  
//   return (

//     h('', [

//       // // subtitle and nav
//       // h('.section-title.flex-row.flex-center', [
//       //   h('h2.page-subtitle', 'Vault Created'),
//       // ]),
      
//       h('h3.flex-center.section-title', {
//         style: {
//           color: '#333333',
//           fontWeight: '600'
//         },
//       }, [
//         h('img', {style:{ position: "absolute",
//         left: "15px",
//         cursor: "pointer",}, src: "/images/Assets/BackArrow.svg"}),  
//         h('img', { style: { marginRight: '3px', }, src: "/images/Assets/Check-Green.svg" }),

//         'Confirm Recovery Phrase',
//       ]),

      
        
      
//       h('button', {
//         onClick: () => this.confirmSeedWords()
//           .then(account => this.showAccountDetail(account)),
//         style: {
//           marginTop: '28px',
//           fontSize: '14px',
//           background: '#0CBE46',
//           width: '265px',
//           height: '40px',
//           border: 'none'
//         },
//       }, 'I have copied it somewhere safe'),

      
//     ])                          
//   )
// }

// CreateVaultCompleteScreen.prototype.confirmSeedWords = function () {
//   return this.props.dispatch(actions.confirmSeedWords())
// }

// CreateVaultCompleteScreen.prototype.showAccountDetail = function (account) {
//   return this.props.dispatch(actions.showAccountDetail(account))
// }

// CreateVaultCompleteScreen.prototype.exportAsFile = function (seed) {
//   return this.props.dispatch(actions.exportAsFile(`XDCPay Seed Words`, seed))
// }

