import React, { memo, useEffect, useState } from 'react';
import NitcheRating from '../NitcheRating/NitcheRating';
import Profession from '../Profession/Profession';
import ProfileUserIcon from '../ProfileUserIcon/ProfileUserIcon';
import EditIcon from '../../../../components/UI/EditIcon/EditIcon';
import NewProfileShareIcon from '../NewProfileShareIcon/NewProfileShareIcon';
import ProfileUserName from '../ProfileUserName/ProfileUserName';
import ProfileLikesCounter from '../ProfileLikesCounter/ProfileLikesCounter';
import ProfilesCounterOfWatches from '../ProfilesCounterOfWatches/ProfilesCounterOfWatches';
import { useNavigate } from 'react-router';
import { softVibration } from '../../../../functions/softVibration';
import CommonRating from '../CommonRating/CommonRating';
import useGetNitcheIcon from '../../hooks/useGetNitcheIcon';
import "./new-profile-cup.css";
import useGetCommonIcon from '../../hooks/useGetCommonIcon';

const NewProfileCup = ({
  profession,
  counterOfLikes,
  positionOfNitcheRating,
  profileWatches,
  photoUrl,
  isBaidge = false,
  canLike,
  isLikeActive,
  likeUser,
  clickDislikeUser,
  commonRating,
  fl
}) => {
  const navigate = useNavigate();
  const editIconClickHandler = ( ) => {
    softVibration();
    navigate("/BaidgeCreating")
  }
  const [shownRating, setShownRating] = useState('common');
  useEffect( () => {
    if (commonRating <= 3){

    }
    else if (commonRating && positionOfNitcheRating){
      if (commonRating > positionOfNitcheRating ){
        setShownRating('nitche');
      }
    }
  }, [commonRating, positionOfNitcheRating] );
  const switchShownRating = () => {
    if (shownRating === "nitche"){
      setShownRating("common")
    }
    else{
      setShownRating("nitche")
    }
    window.Telegram.WebApp.HapticFeedback.selectionChanged();
  }
  const {nitchIcon} = useGetNitcheIcon({nitchRating : positionOfNitcheRating, textClassName : 'rating-icon__text', className : 'rating-icon',});
  const {commonIcon} = useGetCommonIcon({commonRating, className : 'rating-icon', textClassName : 'rating-icon__text'})
    return (
        <div  className="flex py-[17px] pb-[14px] px-[19px] flex-col gap-[13px] bg-[#20303f] rounded-[13px] ">
        <div className="flex w-[100%]">
            <div onClick={switchShownRating} className='relative flex gap-2'>
              <ProfileUserIcon photoUrl={photoUrl}  />
              {shownRating === "nitche" ? nitchIcon : commonIcon}
            </div>
            
            {shownRating === "common" ? <CommonRating onClick={switchShownRating} commonRating={commonRating} /> : <NitcheRating onClick={switchShownRating}  nitcheRating={positionOfNitcheRating} />}
            <ProfilesCounterOfWatches onClick={switchShownRating} watchesCounter={profileWatches} />
          <div className="h-[100%] ml-auto flex flex-col gap-[8px]">  
            <NewProfileShareIcon />
            {!isBaidge && <EditIcon onClick={editIconClickHandler} />} 
          </div>
        </div>
        <div  className="flex justify-between">
          <div onClick={switchShownRating} className="flex flex-col gap-[1px]">
            <ProfileUserName fl={fl} />
            <Profession professtion={profession} />
          </div>
           <ProfileLikesCounter canLike = {canLike} clickDislikeUser = {clickDislikeUser} likeUser = {likeUser} isLikeActive={isLikeActive} isBaidge={isBaidge} likesCounter={counterOfLikes} />
        </div>
      </div>
    );
};

export default memo(NewProfileCup);