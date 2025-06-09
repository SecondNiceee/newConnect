import React from 'react';
import cl from './Pencel.module.css'
import PencelImage from '../../../images/icons/Pencel.svg'
const Pencel = ({className}) => {
    return (
        <img className= { className ? [cl.Pencel , className].join(' ') : cl.Pencel  } src= {PencelImage} alt="" />
    );
};

export default Pencel;