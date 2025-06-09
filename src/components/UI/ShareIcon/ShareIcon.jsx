import React, { memo, useCallback, useEffect, useRef } from "react";
import cl from "./ShareIcon.module.css";
const ShareIcon = ({ className, ...props }) => {
    const circleRef = useRef(null)
    const iconRef = useRef(null)
    const vibrate = useCallback( () => {
        circleRef.current.style.backgroundColor = "#30475B"
        iconRef.current.style.fill = "#3BA4F3"
        setTimeout( () => {
            circleRef.current.style.backgroundColor = "rgb(34, 61, 82)"
            iconRef.current.style.fill = "#2EA5FF"
        } , 100 )
    }  , [])
    const clickHandler = useCallback( (e) => {
        circleRef.current.style.backgroundColor = "#30475B"
        iconRef.current.style.fill = "#3BA4F3"
        
    }  , [])
    const touchEnd = useCallback( (e) => {
        circleRef.current.style.backgroundColor = "rgb(34, 61, 82)"
        iconRef.current.style.fill = "#2EA5FF"
    } , [] )
    useEffect( () => {
        function click(){
            window.Telegram.WebApp.HapticFeedback.impactOccurred('soft')
        }
        if (circleRef.current){
            circleRef.current.addEventListener("click" , click)
        }
    } , []  )
  return (
   

        <div
       
        ref={circleRef}
        {...props}
        className={className ? [cl.ShareIcon, className].join(" ") : cl.ShareIcon} 
        >
             <div onTouchStart={clickHandler} onTouchEnd={touchEnd}  onClick={vibrate}>
        <svg
            
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                ref={iconRef}
            d="M3.27217 13.8559C3.6509 9.46723 7.77376 7.00629 9.89789 6.76213C10.0808 6.74111 10.2286 6.59277 10.2286 6.40868V4.50651C10.2286 4.21028 10.5861 4.06123 10.7965 4.26971L16.1061 9.53013C16.2416 9.66438 16.237 9.88477 16.096 10.0133L10.7864 14.8529C10.5724 15.0479 10.2286 14.8961 10.2286 14.6065V12.2582C10.2286 12.0741 10.0794 11.9241 9.89553 11.933C7.59438 12.0451 5.13922 13.2785 3.78562 14.144C3.55605 14.2908 3.24874 14.1274 3.27217 13.8559Z"
            fill="#2EA5FF"
            />
        </svg>
        </div>
    </div>
  );
};

export default memo(ShareIcon);
