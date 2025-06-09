import React from 'react';
import classes from "./Burger.module.css"
const Burger = ({ style, ...props}) => {
    return (
        <div {...props} style={style} className={classes.burgerMainWrapper}>

            <div  className= {classes.Burger}>
                <div  className="Burger__wrapper">

                </div>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    );
};

export default Burger;