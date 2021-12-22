import React,{useState, useRef} from 'react'
import { useRef } from 'react'
import IdleTimer from 'react-idle-timer'

function IdleTimer() {
    const [isloggedIn, setIsLoggedIn ] = useState(true)
    const idleTimerRef = useRef(null)
    const onIdle = () => {
        console.log('User is Idle')
    }
    return (
        <div>
            
            <IdleTimer ref={idleTimerRef} timeout={5 * 1000} onIdle={onIdle}  ></IdleTimer>
        </div>
    )
}

export default IdleTimer