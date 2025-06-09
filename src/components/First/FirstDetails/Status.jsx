import React from 'react';
import Text from '../../Text/Text';

const Status = ({isActive , text}) => {
    const clickHandler = () => {
        window.Telegram.WebApp.showAlert(text)
    }
    return ( 
        <div onClick={clickHandler} className='StatusContainer'>
            <Text>Статус</Text>
            {isActive ? 
                <Text className='TrueActive'>Активен</Text>
                :
                <Text className='FalseActive'>Не активен</Text>
            }
            <Text>См.больше</Text>
        </div>
    );
};

export default Status;