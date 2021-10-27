const connect = require('react-redux').connect
const h = require('react-hyperscript')
const actions = require('../../../../ui/app/actions')
const React = require('react')

class ConfirmRecoveryPhrase extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      seed1: this.randomInteger(1, 4),
      seed2: this.randomInteger(5, 8),
      seed3: this.randomInteger(9, 12),
      firstWord: '',
      secondWord: '',
      thirdWord: '',
    }
  }

   randomInteger (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }
  render () {
    const state = this.props
    const seed = state.seed || state.cachedSeed || ''
    const seedArr = seed.split(' ')
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
            onClick: () => this.dispatch(actions.CreateVaultCompleteScreen()),
            // onClick: () => this.dispatch(actions.showNewVaultSeed(seed)),
            style: {
              color: '#333333',
              fontWeight: '600',
              marginLeft: '-28px',
            }, src: '/images/Assets/BackArrow.svg',
          }),
          'Confirm Recovery Phrase',
        ]),
        [
          h('.word', `Word ${this.state.seed1}`),
          h('input.large-input', {
            placeholder: 'word',
            type: 'text',
            onChange: (e) => this.setState({firstWord: e.target.value}),
            // {this.state.firstWord === seedArr[seed1]?img:''}
          }),
          h('.word', `Word ${this.state.seed2}`),
          h('input.large-input', {

            placeholder: 'word',
            type: 'text',
            style: {},
            onChange: (e) => this.setState({secondWord: e.target.value}),
          }),


          h('.word', `Word ${this.state.seed3}`),
          h('input.large-input', {

            placeholder: 'word',
            type: 'text',
            style: {},
            onChange: (e) => this.setState({thirdWord: e.target.value}),
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
              border: 'none',
            },
          }, 'Confirm Recovery Phrase'),
        ],
      ])
    )
  }
}

function mapStateToProps (state) {
  return {
    seed: state.appState.currentView.seedWords,
    cachedSeed: state.metamask.seedWords,
  }
}

module.exports = connect(mapStateToProps)(ConfirmRecoveryPhrase)


ConfirmRecoveryPhrase.prototype.confirmSeedWords = function () {
  return this.props.dispatch(actions.confirmSeedWords())
}

ConfirmRecoveryPhrase.prototype.showAccountDetail = function (account) {
  return this.props.dispatch(actions.showAccountDetail(account))
}

ConfirmRecoveryPhrase.prototype.exportAsFile = function (seed) {
  return this.props.dispatch(actions.exportAsFile(`XDCPay Seed Words`, seed))
}
