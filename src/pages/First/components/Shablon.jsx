import React from 'react';
import Switcher from '../../../components/UI/Switcher/Switcher'

const Shablon = ({  shablon , setShablon  , ...props }) => {
    return (
        <div {...props}>
            <div className="shablon-wrapper">
                <Text>Использовать шаблон</Text>
                <Switcher isEnable={shablon} setEnable={() => {
                    setShablon(!shablon)
                }}  />
            </div>
            
        </div>
    );
};

export default Shablon;