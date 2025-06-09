import React, { memo } from "react";
import MyButton from "../../UI/MyButton/MyButton";

const QOne = ({isMyAds, myAdsFunc, isButton}) => {
  return (
    <>
      {isMyAds ? (
        <>
          <MyButton
            hard = {true}
            style={isButton ? {} : { display: "none" }}
            onClick={(e) => myAdsFunc(true)}
          >
            Подробнее
          </MyButton>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default memo(QOne);
