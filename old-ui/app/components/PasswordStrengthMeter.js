import React, {Component} from 'react'

class PasswordStrengthMeter extends Component {

  createPasswordLabel = (result) => {
    switch (result) {
      case 0:
        return 'Poor'
      case 1:
        return 'Poor'
      case 2:
        return 'Moderate'
      case 3:
        return 'strong'
      // case 4:
      //   return 'Strong'
      default:
        return 'Poor'
    }
  }

  render () {
    // eslint-disable-next-line react/prop-types
    const {password} = this.props
    const testedResult = checkPassword(password)

    return (
      <div className="password-strength-meter" style={{margin:'-8px 0'}}>
        <progress 
          value={testedResult}
          max="3"
          style={{width:'264px',height:'5px'}}
        />
        <br/>
        <label
          className="password-strength-meter-label"
        >
          {password && (
            <div style={{display:'flex', justifyContent: 'space-between',
          }}>
              <div style={{ fontSize: '10px',color:'#9FA9BA' }}>Password strength</div>
              <div style={{ fontSize: '10px',color:'#2A2A2A' }}> {this.createPasswordLabel(testedResult)}</div>
            </div>
          )}
        </label>
      </div>
    )
  }
}

function checkPassword(password) {
  if (!password) {
    return 0
  }
  let strength = 0
  if (password.match(/[8,]+/)) {
    strength += 1
  }
  else if (password.match(/[0-9$@#&!]+/)) {
    strength += 1
  }
  // if (password.match(/[$@#&!]+/)) {
  //   strength += 1
  // }
  else if (password.match(/[A-Za-z]+/)) {
    strength += 1
  }
  return strength
}

export default PasswordStrengthMeter
