import { useCallback, useEffect, useState } from "react";
import {useDispatch, useSelector } from "react-redux";
import MyLoader from "../../components/UI/MyLoader/MyLoader";
import BaidgeWithProfile from "./components/BaidgeWithProfile";
import BaidgeWithoutProfile from "./components/BaidgeWithoutProfile";
import { useParams } from "react-router";
import { findUserById } from "../../functions/api/findUserById";
import menuController from "../../functions/menuController";
import MainButton from "../../constants/MainButton";
import { putUserInfo } from "../../store/telegramUserInfo/thunks/putUserInfo";
import useBackHandler from "./hooks/useBackHandler";

const Baidge = () => {

  const me = useSelector((state) => state.telegramUserInfo);

  const {id} = useParams();

  const [userInfo, setUserInfo] = useState(null);

  useEffect( () => {
    menuController.showMenu();
  }, [] );

  console.log(me);

  useEffect(() => {
    if (id && String(id) !== me.id) {
      findUserById(id).then( (user) => {setUserInfo(user)} )
    } else {
      setUserInfo(me);
    }
  }, [ me, id]);

  useEffect( () => { 
    MainButton.hide();
  }, [] )

  const dispatch = useDispatch();

  useBackHandler();

  const addWatch = useCallback( async () => {
    if (userInfo){
      dispatch(putUserInfo([{
        views : userInfo.views + 1
      }, userInfo.id]))
    }
  }, [dispatch, userInfo] )



  useEffect( () => {
    if (userInfo && userInfo.id && me.id ){
      if (userInfo.id !== me.id){
        addWatch();
      }
    }
  } , [userInfo, me, addWatch])


  if (!userInfo || userInfo.id === null) {
    return <MyLoader />;
  }
  return (
    <>
      {/* <button onClick={fowardFunction} className="fixed left-1/2 bottom-1/3 z-[1000]">MAIN BUTTON</button> */}
      {userInfo.profession ? (
        <BaidgeWithProfile
          urlParametr={id}
          setUserInfo={setUserInfo}
          userInfo={userInfo}
        />
      ) : (
        <BaidgeWithoutProfile setUserInfo = {setUserInfo} userInfo={userInfo} />
      )}
    </>
  );
};

export default Baidge;
