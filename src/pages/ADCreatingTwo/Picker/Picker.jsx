import React, { memo } from 'react';
import cl from './Picker.module.css'
const Picker = ({className , whichOne , setWhichOne , setTaskInformation, taskInformation}) => {
    return (
        <div className = {className ? [cl.Picker , className].join(' ') : cl.Picker}>
            <div className={  whichOne === 'startOnly' ? [cl.greyBlock , cl.leftBlock].join(' ') :  [cl.greyBlock , cl.rightBlock].join(' ') }>
                
            </div>
            <div onClick={() => {
                if (whichOne != 'startOnly'){
                    setWhichOne('startOnly')
                    setTaskInformation({ ...taskInformation , taskDate : {start : '' , end : ''}})
                }
            }} className={cl.left}>
                <Text className= {cl.PickText}>Точная дата</Text>
            </div>

            <div onClick={() => {
                if (whichOne != 'startAndEnd'){
                    setWhichOne('startAndEnd')
                    setTaskInformation({ ...taskInformation , taskDate : {start : '' , end : ''}})
                }
            }} className={cl.left}>
                <Text className= {cl.PickText}>Период</Text>
            </div>

        </div>
    );
};

export default memo(Picker);