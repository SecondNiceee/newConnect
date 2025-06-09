import React from "react";

// import Pencel from "../../components/UI/Pencel/Pencel";
import Option from "../Option/Option";
const Options = () => {
  return (
    <div className="profile__options">
      <Option to={"/AllShablons"} text={"Шаблоны откликов"} />
    </div>
  );
};

export default Options;
