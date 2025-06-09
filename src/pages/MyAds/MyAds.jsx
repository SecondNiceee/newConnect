import  { useEffect, useMemo, useState } from "react";

// import myImage from '../../images/desccription.png'
import { useSelector } from "react-redux";
import "./MyAds.css";
import MyAdOne from "./components/MyAdOne";
import axios from "axios";
import pagesHistory from "../../constants/pagesHistory";
import { USERID } from "../../constants/tgStatic.config";
import useBlockInputs from "../../hooks/useBlockInputs";
import useNavigateBack from "../../hooks/useNavigateBack";


const MyAds = () => {
  const [valueOne , setValueOne] = useState("all")

  const [valueTwo , setValueTwo] = useState("all")

  const responsesArr = useSelector((state) => state.responses.responses);

  const sortedResponses = useMemo( () => {
    let copy = [...responsesArr]
      return copy.sort((a,b) => {
        let order = {"inProcess" : 1 , "watched" : 2 , "" : 3, "completed" : 4}
        return order[a.isWatched] - order[b.isWatched]
      })
  } , [responsesArr] )

  const filteredResponses = useMemo( () => {
    switch (valueOne){
      case "all":
        return sortedResponses
      case "inProcess":
        return sortedResponses.filter(e => e.isWatched === "inProcess")
      case "watched": 
        return sortedResponses.filter(e => e.isWatched === "watched")
      case "unWatched":
        return sortedResponses.filter(e => e.isWatched === "")
      case "completed":
        return sortedResponses.filter(e => e.isWatched === "completed")
      default : 
        window.Telegram.WebApp.showAlert("Что - то пошло не так MyAds")
    }
  } , [sortedResponses , valueOne]  )


  const myAdsArray = useSelector((state) => state.information.myAdsArray);

  const filteredArray = useMemo( () => {
    switch (valueTwo){
      case "all":
        return myAdsArray
      case "active":
        return myAdsArray.filter((e, i) => {
          return e.status === "active"
        })
      case "inProcess":
        return myAdsArray.filter(e => e.status === "inProcess")
      case "completed":
        return myAdsArray.filter(e => e.status === "completed")
      default : 
        window.Telegram.WebApp.showAlert("Что - то пошло не так MyAds второй")
    }
  } , [myAdsArray , valueTwo] )


  const [nowValue , setNowKey] = useState("customer")

  useEffect( () => {
    
    const more = async () => {
      const imTwo = await axios.get(
        "https://www.connectbirga.ru/advertisement/findCount",
        {
          params: {
            userId: USERID,
          },
          headers : {
            "X-API-KEY-AUTH" : process.env.REACT_APP_API_KEY
          }
        }
      );
      const imOne = await axios.get(
        "https://www.connectbirga.ru/response/findCount",
        {
          params: {
            userId: USERID,
          },
          headers : {
            "X-API-KEY-AUTH" : process.env.REACT_APP_API_KEY
          }
        }
      );
      const advertisemetCount = imTwo.data
      const responseCount = imOne.data
      if (pagesHistory[pagesHistory.length - 1] === "/AdCreating"){
        setNowKey("customer")
      }
      else{

        if (advertisemetCount < responseCount){
          setNowKey("freelancer")
        }
        else{
          setNowKey("customer")
        }
      }
    }
    more()
  
  } , [] )


  useNavigateBack({isSliderOpened : false, setSlideOpened : false});

  // const postStatus = useSelector( state => state.information.postTaskStatus )


  // const writeFucntion  = useWriteFucntion(
  //   {
  //     buyPage : buyPage,
  //     happyHold : happyHold,
  //     isOpen : isOpen,
  //     myAdOneAdvertisement : myAdOneAdvertisement ? myAdOneAdvertisement : secondPage.task,
  //     myAdOneResponse : myAdOneResponse,
  //     secondPage : secondPage,
  //     setBuyPage : setBuyPage,
  //     setHappyHold : setHappyHold,
  //     setOpen : setOpen,
  //     setWalletH : setWalletH,
  //     walletH : walletH,

  //   }
  // )

  useBlockInputs();

  return (
    <>
        <div
          className="MyAdsContainer"
        >

          <MyAdOne
          responsesArr = {filteredResponses}
            setOneValue = {setValueOne}
            setTwoValue = {setValueTwo}
            nowValue={nowValue}
            valueTwo={valueTwo}
            valueOne = {valueOne}
            setNowKey={setNowKey}
            myAdsArray={filteredArray}
            
          />

        {/* <CSSTransition             
            in={happyHold}
            timeout={400}
            classNames="left-right"
            mountOnEnter
            unmountOnExit
        >
          <HappyHold task={myAdOneAdvertisement} response={myAdOneResponse} />
        </CSSTransition> */}

        {/* <CSSTransition in = {walletH}
        timeout={400}
        classNames={""}
        mountOnEnter
        unmountOnExit
        >
          <Wallet left = {true} isFixed = {true} onClose = {setWalletH} />
        </CSSTransition> */}


        </div>

    </>
  );
};

export default MyAds;
