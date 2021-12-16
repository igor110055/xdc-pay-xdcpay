// import React, { Component } from 'react';
// import '../../app/css/passwordStrengthMeter.css';
// import zxcvbn from 'zxcvbn';

// class PasswordStrengthMeter extends Component {

//   // createPasswordLabel = (result) => {
//   //   switch (result.score) {
//   //     case 0:
//   //       return 'Weak';
//   //     case 1:
//   //       return 'Weak';
//   //     case 2:
//   //       return 'Fair';
//   //     case 3:
//   //       return 'Good';
//   //     case 4:
//   //       return 'Strong';
//   //     default:
//   //       return 'Weak';
//   //   }
//   // }

//   render() {  
//     const { password } = this.props;
//     // const testedResult = zxcvbn(password);
//     const testedResult = checkpassword(password);
    
//     return (
//       <div className="password-strength-meter">
//         <progress
//           className={`password-strength-meter-progress strength-${this.createPasswordLabel(testedResult)}`}
//           max="100" value="0" id="meter"
//         />
//         <br />
//         <label
//           className="password-strength-meter-label"
//         >
//           {password && (
//             <div>
//               <strong>Password strength:</strong> {this.createPasswordLabel(testedResult)}
//             </div>
//           )}
//         </label>
//       </div>
//     );
//   }
// }

// var strengthbar = document.getElementById("meter");
// function checkpassword(password) {
//   var strength = 0;
//   if (password.match(/[a-z]+/)) {
//     strength += 1;
//   }
//   if (password.match(/[A-Z]+/)) {
//     strength += 1;
//   }
//   if (password.match(/[0-9]+/)) {
//     strength += 1;
//   }
//   if (password.match(/[$@#&!]+/)) {
//     strength += 1;

//   }

//   if (password.length < 6) {
//     display.innerHTML = "minimum number of characters is 6";
//   }

//   if (password.length > 12) {
//     display.innerHTML = "maximum number of characters is 12";
//   }

//   switch (strength) {
//     case 0:
//       strengthbar.value = 0;
//       break;

//     case 1:
//       strengthbar.value = 25;
//       break;

//     case 2:
//       strengthbar.value = 50;
//       break;

//     case 3:
//       strengthbar.value = 75;
//       break;

//     case 4:
//       strengthbar.value = 100;
//       break;
//   }
// }

// export default PasswordStrengthMeter;