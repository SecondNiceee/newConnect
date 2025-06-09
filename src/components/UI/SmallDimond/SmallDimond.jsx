import React from 'react';
import cl from './SmallDimond.module.css'
import Dymond from '../../../images/icons/ton.svg'
const SmallDimond = ({className}) => {
    return (
            <img className = {className ? [cl.SmallDimond , className].join(' ') : cl.SmallDimond} src={Dymond} alt="" />

    );
};

export default SmallDimond;