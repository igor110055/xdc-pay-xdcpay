const inherits = require('util').inherits
const Component = require('react').Component
const connect = require('react-redux').connect
const h = require('react-hyperscript')
const actions = require('../../../../ui/app/actions')
const exportAsFile = require('../../util').exportAsFile
import {useState} from 'react'
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
  const seed1 = randomInteger(1, 4)
  const seed2 = randomInteger(5, 8)
  const seed3 = randomInteger(9, 12)
  function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  console.log(seed1, 'qwerty')
  const [seed1input, setSeed1input] = useState()
  const [seed2input, setSeed2input] = useState()
  const [seed3input, setSeed3input] = useState()
  
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
          onClick: () => this.go(), style: {
            color: '#333333',
            fontWeight: '600',
            marginLeft: '-28px',
          }, src: "/images/Assets/BackArrow.svg"
        }),
        
    

        'Confirm Recovery Phrase',
      ]),
      [
        h('.word', `Word ${seed1}`),
        h('input.large-input', {
          placeholder: 'word',
          type: 'text',
        // },
          onChange: this.validateRecoveryPhrase(seed1, seedArr[seed1]),
        // }, [
        //   h("img", {
        //     onClick: () => {
        //       state.dispatch(actions.goHome());
        //     },
        //     src: "/images/Assets/Check-Green.svg",
          }),
               
        // ]),
    
      
      
        h('.word', `Word ${seed2}`),
        h('input.large-input', {
          
          placeholder: 'word',
          type: 'text',
          style: {
          },
          onChange: this.validateRecoveryPhrase(seed2,seedArr[seed2]),
        }),
      
      
        h('.word', `Word ${seed3}`),
        h('input.large-input', {
          
          placeholder: 'word',
          type: 'text',
          style: {
          },
          onChange: this.validateRecoveryPhrase(seed3,seedArr[seed3]),
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

ConfirmRecoveryPhrase.prototype.validateRecoveryPhrase = function (seedNo,seedWord) {
  if (seedNo === seedWord) {
    
    return
    
  }
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