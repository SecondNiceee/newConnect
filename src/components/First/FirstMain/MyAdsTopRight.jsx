import React, { memo } from "react";
import One from "./One";
import Two from "./Two";

const MyAdsTopRight = ({viewsNumber, responseCounter}) => {
  return (
    <div className="myAds__top-right">
    <One viewsNumber={viewsNumber} />
    <Two responseCounter={responseCounter} />
    </div>
  );
};

export default memo(MyAdsTopRight);
