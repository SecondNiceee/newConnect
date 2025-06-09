import { memo, useCallback, useEffect } from "react";
import TaskDetailsContainer from "./TaskDetailsContainer";
import TimeAndWatches from "./TimeAndWatches";
import { useDispatch, useSelector } from "react-redux";
import { addWatch, setDetailsAdvertisement } from "../../../store/information";
import MyLoader from "../../UI/MyLoader/MyLoader";
import {  useNavigate, useParams } from "react-router";
import menuController from "../../../functions/menuController";
import MainButton from "../../../constants/MainButton";
import useSlider from "../../../hooks/useSlider";
import CssTransitionSlider from "../../UI/PhotosSlider/CssTransitionSlider";
import useNavigateBack from "../../../hooks/useNavigateBack";
import { getAdvertisementById } from "../../../functions/api/getAdvertisemetById";
import useIsMyResponse from "../../../pages/First/hooks/useIsMyResponse";
import { showAllert } from "../../../functions/showAlert";
import { enableColorAndActiveButton } from "../../../functions/enableColorAndActiveButton";
import { disableColorButton } from "../../../functions/disableColorButton";

const FirstDetails = ({ end, className, changeButton = true, showButton=true, ...props }) => {

  const disatch = useDispatch();

  const { id } = useParams();

  const orderInformation = useSelector( (state) => state.information.detailsAdvertisement );

  console.log(orderInformation);

    const {
    isSliderOpened,
    photoIndex,
    photos,
    setPhotoIndex,
    setPhotos,
    setSlideOpened,
  } = useSlider();


  useEffect( () => {
    if (!orderInformation){
        getAdvertisementById(id)
          .then((advertisement) => {
            disatch(setDetailsAdvertisement(advertisement));
          })
          .catch((err) => {
            console.warn(err);
          });
    }
  }, [ id, orderInformation, disatch ] )

  const navigate = useNavigate();

  useEffect(() => {
    if (isSliderOpened){
      MainButton.setText("Закрыть");
    }
    else{
      if (changeButton){
        if (showButton){
          menuController.lowerMenu();
          MainButton.show();
          MainButton.setText("ОТКЛИКНУТЬСЯ");
        }
        else{
          menuController.hideMenu();
          MainButton.hide();
        }
      }
    }
  }, [showButton, isSliderOpened, changeButton]);
  
  const isMyResponse = useIsMyResponse({detailsAdertisement : orderInformation});

  useEffect( () => {
    if (isMyResponse && !isSliderOpened){
      disableColorButton();
    }
    return () => {
      enableColorAndActiveButton();
    }
  }, [isMyResponse, isSliderOpened] )

  const goForward = useCallback( () => {
    if (isSliderOpened){
      setSlideOpened(false)
      return ;
    }
    if (isMyResponse){
      showAllert("Вы уже откликнулись на это задание.")
    }
    else{
      navigate(`/makeresponse/${id}`)
    }
  }, [id, navigate, isMyResponse, isSliderOpened, setSlideOpened] )

  useEffect( () => {
    menuController.hideMenu();
  }, [] )

  useEffect( () => {
    MainButton.onClick(goForward);
    return () => {
      MainButton.offClick(goForward)
    }
  }, [goForward] )


  useNavigateBack({isSliderOpened, setSlideOpened});

  useEffect(() => {
    if (!end && orderInformation) {
      disatch(addWatch(orderInformation));
    }
  }, [disatch, end, orderInformation]);

  if (!orderInformation) {
    return <MyLoader />;
  }
  return (
    <>
      <div
        {...props}
        className={
          className
            ? ["TaskDetails ", className].join(" ")
            : "TaskDetails"
        }
      >
        <div onClick={goForward} className="fixed left-1/2 top-1/2 rounded p-2 border-black border-solid border-2 cursor-pointer">
          MAIN BUTTON
        </div>
        <TaskDetailsContainer
          setPhotoIndex={setPhotoIndex}
          setPhotos={setPhotos}
          setSliderOpened={setSlideOpened}
          end={end}
          orderInformation={orderInformation}
        />
        {end ? (
          <></>
        ) : (
          <TimeAndWatches
            responses={
              orderInformation.responces
                ? orderInformation.responces.length
                : null
            }
            time={orderInformation.creationTime}
            watches={orderInformation.viewsNumber}
          />
        )}
      </div>
      <CssTransitionSlider
        blockerAll={true}
        blockerId={""}
        isSliderOpened={isSliderOpened}
        leftPosition={0}
        renderMap={photos}
        setSliderOpened={setSlideOpened}
        sliderIndex={photoIndex}
        swiperId={"1"}
        top={0}
      />
    </>
  );
};

export default memo(FirstDetails);
