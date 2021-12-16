import React, {Component} from 'react'

class PasswordStrengthMeter extends Component {

  createPasswordLabel = (result) => {
    switch (result.score) {
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

    return (
      <div className="password-strength-meter">

      </div>
    )
  }
}
export default PasswordStrengthMeter
