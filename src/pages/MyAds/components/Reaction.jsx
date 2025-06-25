import React, { memo, useCallback } from "react";

import share from "../../../images/icons/Share.svg";

import "./../MyAds.css";
import FalseTie from "../../../components/UI/FalseTie/FalseTie";
import MyButton from "../../../components/UI/MyButton/MyButton";
import userPhoto from "../../../images/userPhoto/user.png";
import breakShare from "../../../functions/breakShare";
import Text from "../../../components/Text/Text";
import en from "../../../constants/language";
import translation from "../../../functions/translate";
import { useNavigate } from "react-router";
import UserIcon from "../../../components/UI/UserIcon/UserIcon";
import RatingText from "../../../components/UI/RatingText/RatingText";
import RatingIcon from "../../../components/UI/RatingIcon/RatingIcon";

const Reaction = ({
  blue = false,
  setOpen,
  put,
  openAboutReactionFunc,
  responce,
  writeButton = true,
  agree = false,
  lastAds = false,
  setPhotos,
  setPhotoIndex,
  setSlideOpened,
}) => {
  const getAge = useCallback((par) => {
    if (en) {
      if (Number(par) === 1) {
        return "year";
      } else {
        return "years";
      }
    } else {
      let numb = Number(
        String(par).slice(String(par).length - 1, String(par).length)
      );
      if (Number(par) > 10 && Number(par) < 20) {
        return "лет";
      } else {
        if (numb > 1 && numb < 5) {
          return `года`;
        } else {
          if (numb === 1) {
            return `год`;
          } else {
            return "лет";
          }
        }
      }

      /// какая - то логика лет
    }
  }, []);

  console.log(responce);

  const openTelegrmaLink = useCallback(() => {
    if (responce.user.link && responce.user.link !== "-1") {
      window.Telegram.WebApp.openTelegramLink(
        "https://t.me/" + responce.user.link
      );
    } else {
      window.Telegram.WebApp.showPopup(
        {
          title: translation("Упс"),
          message: "Похоже, у пользователя закрытый профиль",
          buttons: [{ id: "save", type: "default", text: "Понятно" }],
        },
        (buttonId) => {
          if (buttonId === "save" || buttonId === null) {
            console.log("Ok");
          }
        }
      );
    }
  }, [responce.user.link]);

  const imageOnClick = (index) => () => {
    setPhotos(responce.photos);
    setPhotoIndex(index);
    setSlideOpened(true);
  };

  const navigate = useNavigate();

  return (
    <>

    <div className="flex rounded-[13.33px] gap-[10.33px] items-center py-[12px] pl-[19px] pr-[16px] bg-card">
      <UserIcon small={true} user={responce.user} />
      <div className="flex flex-col gap-[2.33px]">
        <header className="flex items-center gap-[5px]">
          <p className="text-white font-sf-pro-display leading-[18.311px] text-[17.33px]">
            {responce.user.fl}
          </p>
          <RatingText user={responce.user} />
        </header>
        <p className="text-[#B5CED9] font-sf-pro-display-400 text-[14.667px] leading-[17.667px]">{responce.user.profession.profession}</p>
      </div>
      <img className="ml-auto"  src={"/images/newProfile/leftArrow.svg"} alt="" />
    </div>
    </>
  );
};

export default memo(Reaction);
