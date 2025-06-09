import React, { memo } from 'react';
import cl from './SmallInput.module.css'
import Text from '../../Text/Text';
const SmallInput = ({value , setValue,  mistake, mistakeText,  ...props}) => {
    return (
        <>
            <input style={mistake ? {
                border : '1px solid #FF6767'
            } :
            {}
        }  {...props}   placeholder='Укажите свой стаж работы в годах' className={cl.smallInput}  value={value} onChange={(e) => {
                setValue(e.target.value)
            }} />
            {mistake ? 
            <Text className={cl.mistakeText}>
                {mistakeText}
            </Text>
            :
            <> </>
            }
        </>
    );
};

export default memo(SmallInput);