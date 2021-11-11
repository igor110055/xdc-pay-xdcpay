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
    // this.state = {value: ''};
  }

   randomInteger (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }
  render () {
    const state = this.props
    const seed = state.seed || state.cachedSeed || ''
    const seedArr = seed.split(' ')
    const img = () => (<img src='/images/Assets/Check-Green.svg' />);
    return (
      // h('.flex-column', [
      //   h('h3.flex-center.section-title', {
      //     style: {
      //       color: '#333333',
      //       fontWeight: '600',
      //       justifyContent: 'space-between',
      //       // marginLeft: '24px',
      //       marginRight: '36px',
      //     },
      //   }, [
      //     h('img', {
      //       onClick: () => this.dispatch(actions.CreateVaultCompleteScreen()),
      //       // onClick: () => this.dispatch(actions.showNewVaultSeed(seed)),
            
      //     'Confirm Recovery Phrase',
      //   ]),
      <div>
        <div>         
          <row className="h3 flex-center section-title" style={{
          color: '#333333',
          fontWeight: '600',
          justifyContent: 'space-between',
          // marginLeft: '24px',
            
          margin:'29px 50px 36px 0 ',
          }} >
         <img style={ {marginRight:'35px'}}src={'/images/Assets/BackArrow.svg'}
              onClick={() => this.dispatch(actions.CreateVaultCompleteScreen())}
              />
            Confirm Recovery Phrase
        </row> 
        </div>
        <div style={{marginLeft: '17px',}}>
          
        <div>
        <label className="word" >
              {`Word ${this.state.seed1}`}
            
        </label><br/>
             <input className="input large-input" type='text' placeholder='word' style={{marginBottom:'24px',width:'265px'}}  onChange={(e) => this.setState({ firstWord: e.target.value })}
          />
          { this.state.firstWord === seedArr[this.state.seed1] ? <img src='/images/Assets/Check-Green.svg' /> : ' ' } 
        
        </div>

         <div>
        <label className="word" >
        {`Word ${this.state.seed2}`}  
          </label><br/>
            <input className="input large-input" type='text' placeholder='word' style={{marginBottom:'24px',width:'265px'}} onChange={(e) => this.setState({ secondWord: e.target.value })}/>
            {/* {this.state.secondWord === seedArr[seed2] ? <img src='/images/Assets/Check-Green.svg'/> : ' '} */}
     
        </div>

        <div>
        <label className="word" >
        {`Word ${this.state.seed3}`}  
          </label><br/>
            <input className="input large-input" type='text' placeholder='word'style={{marginBottom:'24px',width:'265px'}} onChange={(e) => this.setState({ thirdWord: e.target.value })}/>
            {/* {this.state.thirdWord === seedArr[seed3] ? <img src='/images/Assets/Check-Green.svg'/> : ' '} */}
         
            
       
        </div>
         
        <div className="button" 
        onClick={() => this.confirmSeedWords()
          .then(account => this.showAccountDetail(account))}
          style={{
            
            marginTop: '34px',
            fontSize: '14px',
                     background: '#0CBE46',
                     width: '265px',
                     height: '40px',
                     border: 'none', 
                     padding: '8px 48px',
                     
                    }}
                    >
                      Confirm Recovery Phrase
                    
        </div>
        
        </div>
        
      </div>
  //       [
  //         h('.word', `Word ${this.state.seed1}`),
  //         h('img', {style:{width:'20px',position:'absolute',top:'25%',right:'15%'},src:'/images/Assets/Check-Green.svg'}),
  //         h('input.large-input', {
  //           placeholder: 'word',
  //           type: 'text',
  //           onChange: (e) => this.setState({ firstWord: e.target.value }),
  //         },
  //         this.state.firstWord === seedArr[seed1] ? h('img', {style:{width:'20px',position:'absolute',top:'25%',right:'15%'},src:'/images/Assets/Check-Green.svg'}) : ' ',
           
      
  //         ),
  //         h('.word', `Word ${this.state.seed2}`),
  //         h('img', {style:{width:'20px',position:'absolute',top:'41%',right:'15%',},src:'/images/Assets/Check-Green.svg'}),
  //         h('input.large-input', {

  //           placeholder: 'word',
  //           type: 'text',
  //           style: {},
  //           onChange: (e) => this.setState({secondWord: e.target.value}),
  //         },
  //         // this.state.secondWord === seedArr[seed2] ? h('img', {style:{width:'20px',position:'absolute',top:'41%',right:'15%'},src:'/images/Assets/Check-Green.svg'}) : ' ',
  //         ),


  //         h('.word', `Word ${this.state.seed3}`),
  //         h('img', {style:{width:'20px',position:'absolute',top:'57%',right:'15%',},src:'/images/Assets/Check-Green.svg'}),
  //         h('input.large-input', {

  //           placeholder: 'word',
  //           type: 'text',
  //           style: {},
  //           onChange: (e) => this.setState({thirdWord: e.target.value}),
  //         },
  //         // this.state.thirdWord === seedArr[seed3] ? h('img', {style:{width:'20px',position:'absolute',top:'57%',right:'15%'},src:'/images/Assets/Check-Green.svg'}) : ' ',
            
  //         ),
  //         h('button', {
  //           onClick: () => this.confirmSeedWords()
  //             .then(account => this.showAccountDetail(account)),
  //           style: {
  //             marginTop: '34px',
  //             fontSize: '14px',
  //             background: '#0CBE46',
  //             width: '265px',
  //             height: '40px',
  //             border: 'none',
  //           },
  //         }, 'Confirm Recovery Phrase'),
  //       ],
  //     ])
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
