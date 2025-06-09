import React, { useEffect, useMemo, useRef, useState } from "react";
import "./AboutMe.css";
import Close from "../Close";
import closeIcon from "../../../images/icons/close.svg";
let animation = true;
const AboutMe = ({ setAboutMeModal, setAboutU, aboutU, aboutMeModal , scrollTo }) => {
  const [inf, setInf] = useState(aboutU);
  const [pos, setPos] = useState(80);
  const [startMove, setStartMove] = useState(0);
  const [tran, setTran] = useState("0.4s");

  const animateAboutMe = useMemo(() => {
    if (aboutMeModal) {
      if (animation) {
        animation = false;
        setTimeout(() => {
          setTran("0s");
        }, 400);
      }
      return { transform: `translateY(${pos}px)`, transition: tran };
    } else {
      return { transform: "translateY(150%)" };
    }
  }, [aboutMeModal, pos, tran]);

  const handleTouch = (e) => {
    e.preventDefault()
    let position = e.touches[0].pageY - startMove;
    if (position < 0) {
      setPos(80);
    } else {
      setPos(position + 80);
    }
  };
  function exitFunction(){
        setAboutMeModal(false);
        setPos(80);
        setTran("0.4s");
        animation = true;
        setTimeout( () => {
            document.documentElement.style.overflow = "auto";
        } , 400 )
  }

  const endTouchHandler = (e) => {

    if (pos > 160) {
    exitFunction()
    setAboutU(inf);
    } else {
    setPos(80);
    }
  };



  return (
    <div className="aboutMe"
    

    style={animateAboutMe}
    onTouchMove={handleTouch}
    onTouchCancel={() => {
        window.Telegram.WebApp.showAlert('действие отменено!!!')
    }}
    onTouchStart={(e) => {
        e.preventDefault()
      setStartMove(e.touches[0].pageY);
    }}
    onTouchEnd={endTouchHandler}>

  
    <div
    className="aboutMeContainer"
    >

        <div className="whiteRec">
            
        </div>
      {/* <div className="top">
        <img
        onClick={ 
            () => {
                exitFunction()
              }
        }
          onTouchStart={() => {
            exitFunction()
          }}
          src={closeIcon}
          alt=""
        />
        <Text>О себе</Text>
        <Text
          className="save"
          onClick={ 
            () => {
                setAboutU(inf)
                exitFunction()
              }
        }
          onTouchStart={() => {
            setAboutU(inf)
            exitFunction()
          }}
        >
          ✔
        </Text>
      </div> */}
      <div className="about__reason">
        <Text>Опишите свой опыт, подход к работе.</Text>
        <Text>Почему заказ нужно доверить именно вам?</Text>
      </div>
      <Text>О себе</Text>
      <div className="inputBlock">
        <textarea
    
          onChange={(e) => {
            setInf(e.target.value);
          }}
          style={{
            pointerEvents : 'auto'
          }}
          value={inf}
          spellCheck={false}
          className="textArea"
        />
      </div>
    </div>
    </div>
  );
};
export default memo(AboutMe);
