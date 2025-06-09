import React from "react";
import cl from "./DateInput.module.css";
import dateIcon from "../../../images/icons/date.svg";
import rightArrow from "../../../images/icons/ArrowRight.svg";
const DateInput = ({ className, date, setDate, ref, ...props }) => {
  return (
    <div className={cl.AllPickers}>


    <div ref={ref} className={cl.DateTimePicker} {...props}>
      <div className={cl.left}>
        <img className={cl.leftImage} src={dateIcon} alt="" />
        <Text className={cl.text}>Дата и время</Text>
      </div>
      <img src={rightArrow} alt="" className={cl.arrowRight} />
    </div>

    <div ref={ref} className={cl.PeriodInput} {...props}>

      <div className={cl.DateTimePicker}>
        <div className={cl.left}>
          <img className={cl.leftImage} src={dateIcon} alt="" />
          <Text className={cl.text}>Дата и время</Text>
        </div>
        <img src={rightArrow} alt="" className={cl.arrowRight} />
      </div>
      <div className={cl.DateTimePicker}>
        <div className={cl.left}>
          <img className={cl.leftImage} src={dateIcon} alt="" />
          <Text className={cl.text}>Дата и время</Text>
        </div>
        <img src={rightArrow} alt="" className={cl.arrowRight} />
      </div>
      
    </div>


  </div>
  );
};

export default DateInput;
