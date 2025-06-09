import React from 'react';
import UpArrImage from '../../../images/icons/upArr.svg'
import cl from './UpArr.module.css'
const UpArr = ({className}) => {
    return (
            <img className= { className ? [cl.UpArr , className].join(' ') : cl.UpArr  } src={UpArrImage} alt="" />

    );
};

export default UpArr;