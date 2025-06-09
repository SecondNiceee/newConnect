import React from "react";

import Cap from "../../components/UI/Cap/Cap";
import info from '../../images/icons/info.svg'
import PaymentMethod from "./PaymentMethod/PaymentMethod";
import Holding from "./Holding/Holding";

import cl from "./AdCreatingThree.module.css";

const SpecialAdCreating = ({taskInformation }) => {



  return (
    <div className= {cl.AdCreatingThree}
    style={{minWidth : document.documentElement.clientWidth.toString() + 'px'}}

    >
      <Cap className={cl.Cap} step={3} >
        <div className={cl.upTextContainer}>
            <Text>Холдирование</Text>
            <img src={info} alt="" />
        </div>
      </Cap>
      <PaymentMethod className={cl.PaymentMethod} />
      <Holding taskInformation={taskInformation}  className={cl.Holding} />
    </div>
  );
};

export default SpecialAdCreating;
