import React, { memo, useEffect, useRef } from 'react';
import cl from './Switcher.module.css'
const Switcher = ({className , isEnable, setEnable}) => {
    const myRef = useRef(null)
    useEffect( () => {
        function click(){
            window.Telegram.WebApp.HapticFeedback.selectionChanged()
        }
        myRef.current.addEventListener("click" , click)
    } , [] )
    return (
        <div ref={myRef} onClick={() => setEnable(!isEnable)} className = { [className ? [cl.Switcher , className].join(' ') : cl.Switcher , isEnable ? cl.active : '' ].join(' ')} >
                <div className = {isEnable ? [cl.circle , cl.active].join(' ') : cl.circle}>

                </div>
        </div>
    );
};

export default memo(Switcher);