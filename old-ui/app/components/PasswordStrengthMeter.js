import React, {Component} from 'react'

class PasswordStrengthMeter extends Component {

  createPasswordLabel = (result) => {
    switch (result) {
      case 0:
        return 'Weak'
      case 1:
        return 'Weak'
      case 2:
        return 'Fair'
      case 3:
        return 'Good'
      case 4:
        return 'Strong'
      default:
        return 'Weak'
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
          max="4"
          style={{width:'264px',height:'5px'}}
        />
        <br/>
        <label
          className="password-strength-meter-label"
        >
          {password && (
            <div style={{display:'flex', justifyContent: 'space-between',
          }}>
              <div style={{ fontSize: '10px',color:'#9FA9BA' }}>Password strength:</div>
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
  if (password.match(/[a-z]+/)) {
    strength += 1
  }
  if (password.match(/[A-Z]+/)) {
    strength += 1
  }
  if (password.match(/[0-9]+/)) {
    strength += 1
  }
  if (password.match(/[$@#&!]+/)) {
    strength += 1
  }
  return strength
}

export default PasswordStrengthMeter
