import React, { memo, useEffect, useRef, useState } from 'react';
import './TextAboutMe.css';
import Text from '../../Text/Text';
import translation from '../../../functions/translate';

const TextAboutMe = ( { aboutU , darkSide, className, textareaClassName, buttonClassNames, ...props } ) => {
  const [hideAboutMe, setHideAboutMe] = useState({
    isActive : false,
    show : false
  })
  const [empty , setEmpy] = useState(false)
  const areaRef = useRef(null)
  const refTwo = useRef(null)
  useEffect( () => {
    refTwo.current.value = aboutU
    if (refTwo.current.scrollHeight > 85){
      if (!hideAboutMe.show){
        setHideAboutMe((value) => ({...value, isActive : true}) )
        areaRef.current.style.height = "85px"
        let localAboutMe = aboutU;
        while (refTwo.current.scrollHeight > 85){
          let localAboutMeArr = localAboutMe.split(/  |[\r\n]/g);
          localAboutMe = localAboutMeArr.slice(0 , localAboutMeArr.length - 1).join(' ')
          refTwo.current.value = localAboutMe
        
        }
        areaRef.current.value = localAboutMe + '...'
      }
      else{
        refTwo.current.value = aboutU
        if (aboutU === ''){
          refTwo.current.value = translation("Пользователь ничего не написал о себе")
          areaRef.current.value = translation("Пользователь ничего не написал о себе")
          setEmpy(true)
        }
        else{
          areaRef.current.value = aboutU
        }

      }
    }
    else{
      areaRef.current.style.borderRadius = "10px"
      if (aboutU === ''){
        setEmpy(true)
          refTwo.current.value = translation("Пользователь ничего не написал о себе")
          areaRef.current.value = translation("Пользователь ничего не написал о себе")
      }
      else{
        areaRef.current.value = aboutU
      }
    }
    areaRef.current.style.height = (refTwo.current.scrollHeight).toString() + 'px'
  } , [hideAboutMe.show, aboutU ] )

    return (
        <div {...props} className="ur__town">
          
          {darkSide 
          ? <div className="background" style={hideAboutMe 
            ? {display : 'block'}
            : {display : 'none'}
          }></div> 
          : "" }


          
<textarea
            ref={refTwo}

            readOnly={true}
            spellCheck={false}
            style={{
              height : "42.8px",
              width : "100%",
              overflowY : "scroll",
              position : 'absolute',
              opacity : '0',
              left : 0,
              top : 0
            }}
            className= {textareaClassName ? ["about__u-text" , textareaClassName].join(' ') : "about__u-text"}
          />

          <textarea
            
            ref={areaRef}
            style={empty ? {opacity : 0.5} : {}}
            readOnly={true}
            spellCheck={false}
            className={textareaClassName ? ["about__u-text" , textareaClassName].join(' ') : "about__u-text"}
          />

          

          <div style={hideAboutMe.isActive 
        ? {display : 'flex'}
        : {display : 'none'}} 
          className={`also ${buttonClassNames}`} 
          onClick={() => {  

                    setHideAboutMe({...hideAboutMe, show : !hideAboutMe.show})
          }}>
            <Text>
              {hideAboutMe.show ? 'Скрыть' : 'Развернуть'}
            </Text>
          </div>
        </div>
    );
};

export default memo(TextAboutMe);