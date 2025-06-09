import React, { memo, useCallback, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import cl from "./AdCreateFunc.module.css";
import plus from "../../../images/icons/plus-circle.svg";
import Text from "../../Text/Text";
const AdCreateFunc = ({ link, text, func, className, ...props }) => {
  const myRef = useRef(null)
  const vibrate = useCallback( () => {
      if (myRef.current){
          myRef.current.style.backgroundColor = "#3D4855"
      }
      setTimeout( () => {
          if (myRef.current){
              myRef.current.style.backgroundColor = "rgb(32, 48, 63)"
          }
      } , 100 )
      // eslint-disable-next-line 
  }  , [])
  const clickHandler = useCallback( (e) => {
    if (myRef.current){
        myRef.current.style.backgroundColor = "#3D4855"
    }
    // eslint-disable-next-line 
}  , [])
const touchEnd = useCallback( (e) => {
    if (myRef.current){
        myRef.current.style.backgroundColor = "rgb(32, 48, 63)"
    }
}, [] )
   useEffect( () => {
    function click(){
      window.Telegram.WebApp.HapticFeedback.impactOccurred('soft')
    }
    myRef.current.addEventListener("click" , click)
  } , [] )
  return (
    <>
    
      {link ? (
        <Link {...props} onClick={vibrate} onTouchStart={clickHandler} onTouchEnd={touchEnd} ref={myRef}
          to={link}
          className={
            className
              ? [cl.AdCreactingFunction, className].join(" ")
              : cl.AdCreactingFunction
          }
        >
          <img src={plus} alt="" />
          <Text>{text}</Text>
        </Link>
      ) : (
        <div ref={myRef} {...props} onClick={func} 
        className={
          className
            ? [cl.AdCreactingFunction, className].join(" ")
            : cl.AdCreactingFunction
        }>
          <img src={plus} alt="" />
          <Text>{text}</Text>
        </div>
      )}
    </>
  );
};

export default memo(AdCreateFunc);
