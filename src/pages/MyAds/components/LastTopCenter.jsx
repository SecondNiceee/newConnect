import React from 'react';
import subtruct from '../../../images/icons/Subtract.svg';
import star from '../../../images/icons/Star.svg';
const LastTopCenter = ({
  stage, name
}) => {
    return (
    <div className="last-top-center">

        <div className="top-name-bl">
          <Text>{name}</Text>
          <img src={subtruct} className="last-subtruct" alt="" />
        </div>
        
        <div className="top-characters">
          {/* <img src={star} className="last-star" alt="" /> */}
          <div className="characters-bl">
            <Text>Стаж {stage === null ? "0" : stage} лет</Text>
          </div>
        </div>

    </div>
    );
};

export default LastTopCenter;