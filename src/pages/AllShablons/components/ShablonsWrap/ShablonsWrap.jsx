import React, { memo } from 'react';
import Shablon from '../Shablon/Shablon';
import cl from './ShablonsWrap.module.css'

const ShablonsWrap = ({shablonsArr, putFunction, deleteFunction, className}) => {
    return (
        <div className={className ? [cl.ShablonWrap, className].join(' ') : cl.ShablonWrap}>
            {shablonsArr.map((e, i) => {
                return (
                    <Shablon key={i} putFunction = {() => {
                        putFunction(e)
                    }} shablon = {e}
                    deleteFunction = {() => {
                        deleteFunction(e)
                    }} />
                )
            })}
        </div>
    );
};

export default memo(ShablonsWrap);