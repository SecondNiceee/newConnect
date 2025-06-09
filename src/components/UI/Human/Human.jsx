import React from 'react';
import cl from './Human.module.css'
import HumanImage from '../../../images/icons/human.svg'
const Human = ({className}) => {
    return (
        <div className= { className ? [cl.Human , className].join(' ') : cl.Human  } >
            <img src= {HumanImage} alt="" />
        </div>
    );
};

export default Human;