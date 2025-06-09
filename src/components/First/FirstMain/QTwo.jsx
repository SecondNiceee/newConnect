import React, { memo } from "react";
import FalseTie from "../../UI/FalseTie/FalseTie";

const QTwo = ({end, agree, id, task, isButton, isResponce, isMyAds }) => {
  return (
    <>
      {!isResponce && !isMyAds ? (
        <FalseTie
          end={end}
          agree={agree}
          navigate={"advertisement"}
          id={id}
          task={task}
          className={end ? "tie low-opacity" : "tie"}
          style={isButton ? {} : { marginRight: "-8px" }}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default memo(QTwo);
