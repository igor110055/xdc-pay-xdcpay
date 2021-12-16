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
      <div className="password-strength-meter">
        <progress
          value={testedResult}
          max="4"
        />
        <br/>
        <label
          className="password-strength-meter-label"
        >
          {password && (
            <div>
              <strong>Password strength:</strong> {this.createPasswordLabel(testedResult)}
            </div>
          )}
        </label>
      </div>
    )
  }
}

function checkPassword (password) {
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
