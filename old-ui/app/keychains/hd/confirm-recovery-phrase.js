
const inherits = require('util').inherits
const Component = require('react').Component
const connect = require('react-redux').connect
const h = require('react-hyperscript')
const actions = require('../../../../ui/app/actions')
const exportAsFile = require('../../util').exportAsFile

module.exports = connect(mapStateToProps)(ConfirmRecoveryPhrase)

inherits(ConfirmRecoveryPhrase, Component)
function ConfirmRecoveryPhrase () {
  Component.call(this)
}

function mapStateToProps (state) {
  return {
    seed: state.appState.currentView.seedWords,
    cachedSeed: state.metamask.seedWords,
  }
}

ConfirmRecoveryPhrase.prototype.render = function () {
  var state = this.props
  var seed = state.seed || state.cachedSeed || ''
  console.log(seed, '*-*-*-*')
  var seedArr = seed.split(' ')
  
  
  return (

    h('.flex-column', [

      
      
      h('h3.flex-center.section-title', {
        style: {
          color: '#333333',
          fontWeight: '600',
          justifyContent: 'space-between',
          // marginLeft: '24px',
          marginRight: '36px',
        },
      }, [
        h('img', {
          onClick: ()=> this.goHome() , style: {
          color: '#333333',
            fontWeight: '600',
          marginLeft: '-28px',
        },src: "/images/Assets/BackArrow.svg"}),  
        
    

        'Confirm Recovery Phrase',
      ]),
      [
      h('.word', 'Word 1'),
        h('input.large-input', {
          name: 'Word 1',
          placeholder: 'word',
          type: 'text',
          style: {
          },
          
        }),
    
      
      
        h('.word', 'Word 8'),
        h('input.large-input', {
          name: 'Word 8',
          placeholder: 'word',
          type: 'text',
          style: {
          },
          
        }),
      
      
        h('.word', 'Word 12'),
        h('input.large-input', {
          name: 'Word 12',
          placeholder: 'word',
          type: 'text',
          style: {
          },
          
        }),

        h('button', {
          onClick: () => this.confirmSeedWords()
            .then(account => this.showAccountDetail(account)),
          style: {
            marginTop: '34px',
            fontSize: '14px',
            background: '#0CBE46',
            width: '265px',
            height: '40px',
            border: 'none'
          },
        }, 'Confirm Recovery Phrase'),
      ],
        
    ])                          
  )
}

ConfirmRecoveryPhrase.prototype.confirmSeedWords = function () {
  return this.props.dispatch(actions.confirmSeedWords())
}

ConfirmRecoveryPhrase.prototype.showAccountDetail = function (account) {
  return this.props.dispatch(actions.showAccountDetail(account))
}

ConfirmRecoveryPhrase.prototype.exportAsFile = function (seed) {
  return this.props.dispatch(actions.exportAsFile(`XDCPay Seed Words`, seed))
} 