import { memo } from "react";
import Block from "../Block";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setDetailsAdvertisement } from "../../../store/information";
import { addWatch } from "../../../store/watchedAds";

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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const setDetailsActive = () => {
    navigate(`/FirstDetails/${id}`)
    dispatch(setDetailsAdvertisement(task));
    dispatch(addWatch(task.id));
  }
  return (
        <Block setDetailsActive={setDetailsActive} setSliderOpened={setSlideActive} setPhotos={setPhotos} setPhotoIndex={setPhotoIndex} {...props} photos={ photos} />
  );
};

export default memo(FirstBlock);
