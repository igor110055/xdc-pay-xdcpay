// import React,{useState, useRef} from 'react'
// import { useRef } from 'react'
// import IdleTimer from 'react-idle-timer'
// import modal from '../../../../ui/app/components/modal';
// const connect = require("react-redux").connect;
// const actions = require("../../ui/app/actions");
// import Modal from '../../../../ui/app/components/modal/modal.component';

// Modal.setAppElement('#root')
// function IdleTimer() {
//     const [isloggedIn, setIsLoggedIn] = useState(true)
//     const [modalIsOpen, setModalIsopen] = useState(false)
//     const idleTimerRef = useRef(null)
//     const onIdle = () => {
//         console.log('User is Idle')
//        setModalIsopen(true)
//     }
//     const stayActive = () => {
//         setModalIsopen(false)
//     }

//     const logout = () => {
//         setModalIsopen(false)
//        setIsLoggedIn(false) 
//     }
// return (
//     <div>
//         {isLoggedIn ?<h2>Hello Guyzzz</h2> :null}
//         <modal>
//             <div>
//                 <button onClick={logout}>Log me out</button>
//                 <button onClick={stayActive}>Keep me Log in</button>
//             </div>
//         </modal>
//             <IdleTimer ref={idleTimerRef} timeout={5 * 1000} onIdle={onIdle}  ></IdleTimer>
//         </div>
        
//     )
// }

// module.exports = connect(mapStateToProps)(IdleTimer)

// function mapStateToProps(state) {
//   return {
//     metamask: state.metamask,
//     warning: state.appState.warning,
//   }
// }


// export default IdleTimer