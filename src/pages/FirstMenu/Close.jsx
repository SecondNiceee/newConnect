import React from 'react';

const Close = ({isMenuActive , setMenuActive}) => {
    return (
        
            <div  onClick = {() => { setMenuActive(false)}  } className='close' >
                <div className="close__wrapper" >

                </div>
                <div className="close__container" style={{position : 'relative'}}>
                    <span></span>
                    <span></span>
                </div>
            </div>
    );
};

export default Close;