import { memo } from "react";
import Block from "../Block";

const FirstBlock = ({
  className,
  taskName,
  time,
  end = false,
  category,
  isButton,
  photos,
  isMyAds,
  deleteFunction,
  myAdsFunc,
  isResponce,
  isWatched,
  index,
  id,
  setSlideActive,
  tonValue,
  task,
  agree = false,
  setPhotoIndex,
  setPhotos,
  isFirst
 }) => {
  const props = {
    className: className,
    taskName: taskName,
    time: time,
    end: end,
    isButton: isButton,
    photos: photos,
    isMyAds: isMyAds,
    deleteFunction: deleteFunction,
    myAdsFunc: myAdsFunc,
    isResponce: isResponce,
    isWatched: isWatched,
    index: index,
    id: id,
    setSlideActive: setSlideActive,
    tonValue: tonValue,
    task: task,
    agree: agree,
    category : category,
    isFirst : isFirst
  };
;

  return (
        <Block setSliderOpened={setSlideActive} setPhotos={setPhotos} setPhotoIndex={setPhotoIndex} {...props} photos={ photos} />
  );
};

export default memo(FirstBlock);
