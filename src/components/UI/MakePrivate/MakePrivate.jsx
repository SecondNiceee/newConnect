import React, { memo } from 'react';
import cl from './MakePrivate.module.css'
import Switcher from '../Switcher/Switcher';
import Text from '../../Text/Text';
const MakePrivate = ({className , isPrivate , text , setPrivate}) => {
    return (
        <div className = {className ? ["Private__container" , className].join(' ') : "Private__container" } >
        <div className = {cl.MakePrivate}>
                <Text>{text}</Text>
                <Switcher isEnable = {isPrivate} setEnable = {(e) => {
                    setPrivate(!isPrivate)
                }}  className={cl.Switcher} />
        </div>
        </div>
    );
};

export default memo(MakePrivate);