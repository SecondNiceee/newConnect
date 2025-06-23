import React from "react";
import formatDate from "../../../functions/makeDate";
import Text from "../../Text/Text";
import NewOption from "../../../pages/Profile/components/NewOption/NewOption";
import StatistikOption from "../../../pages/Baidge/components/StatistikOption";
import useGetDateConfig from "./hooks/useGetDateConfig";

const Dedline = ({ deadline }) => {
  const dateConfig = useGetDateConfig({deadline : deadline});
  return (
    <div className="flex flex-col gap-[7.53px] mt-2">
      <p className="ml-[17px] text-[#84898F] font-sf-pro-display-400 text-[13.33px] leading-[15.643px]">СРОКИ</p>
      <div className="flex flex-col rounded-[12px] bg-[#20303f]">
        {dateConfig.map( ((e, i) => (
          <StatistikOption text={e.text} title={e.title} configLength={dateConfig.length} index={i} />
        )) )}
        
      </div>
    </div>
  );
};

export default Dedline;
