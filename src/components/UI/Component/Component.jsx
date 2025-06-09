import React from 'react';
import cl from './Component.module.css'
const Component = ({className , children, ...props}) => {
    return (
        <div {...props} className={className ? [cl.main, className].join(' ') : cl.main}>
            {children}
        </div>
    );
};

export default Component;