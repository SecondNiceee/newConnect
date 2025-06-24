import { useMemo } from "react";
import Dedline from "./Dedline";
import Customer from "./Customer";
import Block from "../Block";
import TextAboutMe from "../../UI/AboutMeText/TextAboutMe";

const TaskDetailsContainer = ({
  orderInformation,
  end = false,
  setPhotoIndex,
  setPhotos,
  setSliderOpened,
}) => {
  // const text = useMemo(() => {
  //   if (end) {
  //     return translation("Вы еще не создали задание, поэтому оно неактивно.");
  //   }
  //   switch (orderInformation.status) {
  //     case "active":
  //       return translation(
  //         "Заказчик еще не выбрал исполнителя, вы можете им стать. \n   "
  //       );
  //     case "inProcess":
  //       return translation("Заказчик уже выбрал исполнителя.");
  //     case "completed":
  //       return translation("Задание уже выполнено.");
  //     default:
  //   }
  // }, [end, orderInformation.status]);
  const dedline = useMemo(() => {
    if (!end) {
      return orderInformation.time;
    } else {
      if (orderInformation.whichOne === "startOnly") {
        return { start: new Date(0), end: orderInformation.singleTime };
      } else {
        return {
          start: orderInformation.startTime,
          end: orderInformation.endTime,
        };
      }
    }
  }, [orderInformation, end]);


  return (
    <div className="Task__container-one">
      <Block
        setPhotoIndex={setPhotoIndex}
        setPhotos={setPhotos}
        setSliderOpened={setSliderOpened}
        end={end}
        task={orderInformation}
        {...orderInformation}
        isButton={false}
      />
      <TextAboutMe  emptyText="Подробности задания не указаны" aboutU={orderInformation.taskDescription} />
      <Dedline deadline={dedline} />
      <div className="TaskDetails-row">
        <Customer
          user={orderInformation.user}
        />
      </div>
    </div>
  );
};

export default TaskDetailsContainer;
