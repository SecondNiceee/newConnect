import React from "react";
import formatDate from "../../../functions/makeDate";
import Text from "../../Text/Text";
const defaultDate = new Date(0);
const Dedline = ({ dedline }) => {
  return (
    <div className="DeadlineContainer">
      <Text>Сроки выполнения</Text>
      {dedline.start.getTime() !== defaultDate.getTime() && (
        <div className="dedline__block">
          <Text>Начать: </Text>
          <p>{formatDate(dedline.start, true)}</p>
        </div>
      )}

      {dedline.end !== "" ? (
        <div className="dedline__block">
          <Text>Дедлайн: </Text>
          <p>{formatDate(dedline.end, true)}</p>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Dedline;
