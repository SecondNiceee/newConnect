import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { motion } from "framer-motion";
import "../MyAds/MyAds.css";
import AllTasks from "./AllTasks";
import {useSelector } from "react-redux";
import { CSSTransition } from "react-transition-group";
import { useFilteredArr } from "../../hooks/useFilteredArr";
import FirstChoiceCategory from "../AdCreatingOne/ui/components/ChoiceCategory/FirstChoiceCategory";
import CssTransitionSlider from "../../components/UI/PhotosSlider/CssTransitionSlider";
import useBlockInputs from "../../hooks/useBlockInputs";
import useAddHistory from "../../hooks/MyAds/useAddHistory";
import useSlider from "../../hooks/useSlider";
import useFilteredArray from "./hooks/useFilteredArray";
import FirstChoiceSubCategory from "../AdCreatingOne/ui/components/ChoiceCategory/FirstChoiceSubCategory";
import BackButton from "../../constants/BackButton";
import menuController from "../../functions/menuController";
import MainButton from "../../constants/MainButton";

const First = () => {

  const firstRef = useRef(null);

  const categorys = useSelector((state) => state.categorys.category);

  const subCategorys = useSelector((state) => state.categorys.subCategory);

  const [categoryOpen, setCategoryOpen] = useState(false);

  const [subCategory, setSubCategory] = useState(false);

  useEffect( () => {
    MainButton.hide();
  }, [])
  useAddHistory();

  

  useEffect( () => {
    menuController.showMenu();
    menuController.raiseMenu();
    BackButton.hide();
  }, [] )

  const ordersInformation = useSelector(
    (state) => state.information.orderInformations
  );

  const filters = useSelector(state => state.filters.advertisementsFilters);

  const [filterBy, setFilterBy] = useState("");

  const filteredArr = useFilteredArr(ordersInformation, filterBy);

  const secFilteredArray = useFilteredArray({ filteredArr, filters });

  const {
    isSliderOpened,
    photoIndex,
    photos,
    setPhotoIndex,
    setPhotos,
    setSlideOpened,
  } = useSlider();

  const forwardFunction = useCallback( () => {
    if (isSliderOpened){
        setSlideOpened(false);
    }
    else{
      console.log("Другая логика")
    }
  }, [isSliderOpened,setSlideOpened] )

  const backFunction = useCallback( () => {
    if (isSliderOpened){
      setSlideOpened(false);
    }
  }, [isSliderOpened, setSlideOpened] )

  useEffect( () => {
    BackButton.onClick(backFunction);
    if(isSliderOpened){
      BackButton.show();
    }
    else{
      BackButton.hide();
    }
    return() => {
      BackButton.offClick(backFunction)
    }
  }, [isSliderOpened, backFunction] )

  useEffect( () => {
    if (isSliderOpened){
      MainButton.show();
      MainButton.setText('Закрыть')
    }
    else{
      MainButton.hide();
    }
  }, [isSliderOpened, forwardFunction] )

  useBlockInputs();

  return (
    <>
      <div className="first-container">
        <motion.div
          // style={style}
          ref={firstRef}
          id="First"
          className="First"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="first-wrapper">
            <AllTasks
              setPhotos = {setPhotos}
              setPhotoIndex = {setPhotoIndex}
              setSlideActive = {setSlideOpened}
              filters={filters}
              filterBy={filterBy}
              setFilterBy={setFilterBy}
              ordersInformation={secFilteredArray}
            />
          </div>

          <CSSTransition
            in={categoryOpen}
            timeout={0}
            mountOnEnter
            unmountOnExit
          >
            <FirstChoiceCategory
              style={{
                paddingBottom: "20px",
                top: firstRef.current
                  ? firstRef.current.scrollTop + "px"
                  : "0px",
              }}
              subCategorys={subCategorys}
              categorys={categorys}
              setCatagoryChoiceOpen={setCategoryOpen}
              taskInformation={filters}
            />
          </CSSTransition>

          <CSSTransition
            in={subCategory}
            timeout={0}
            mountOnEnter
            unmountOnExit
          >
            <FirstChoiceSubCategory
              style={{
                paddingBottom: "20px",
                top: firstRef.current
                  ? firstRef.current.scrollTop + "px"
                  : "0px",
              }}
              setSubcategoryChoiceOpen={setSubCategory}
              subCategorysPar={subCategorys}
              filterCategory = {filters.category}
              taskInformation={filters}
            />
          </CSSTransition>
        </motion.div>
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

export default First;
