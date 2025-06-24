import { useEffect, useRef } from "react";
import { getCommonRating } from "../functions/api/getCommonRating";
import { getRatingByProfession } from "../functions/api/getRatingByProfession";
import { useDispatch, useSelector } from "react-redux";
import { fetchCommonRating } from "../store/telegramUserInfo/thunks/fetchCommonRating";
import { fetchRatingByProfession } from "../store/telegramUserInfo/thunks/fetchRatingByProfession";

const useFetchRating = ({ isItMe, userInfo = {}, setUserInfo = () => {} }) => {
      const ratingLoaded = useRef(false);
      const me = useSelector((state) => state.telegramUserInfo);
      const dispatch = useDispatch();
      useEffect( () => {
          async function fetchAdditionalUserInfo() {
            let commonRating = null;
            let ratingByProfession = null;
            await getRatingByProfession(userInfo).then( (rating) => {
              ratingByProfession = rating;
            } )
            await getCommonRating(userInfo.id).then( (rate) => {
              commonRating = rate;
            } )
            return {commonRating, ratingByProfession}
          } 
          if (userInfo){
            if (!ratingLoaded.current){
              if (isItMe){
                if (!me.commonRating){
                  dispatch(fetchCommonRating())
                }
                if (!me.ratingByProfession){
                  dispatch(fetchRatingByProfession());
                }
              }
              else{
                  fetchAdditionalUserInfo().then( (info) => setUserInfo((value) => ({...value, ...info})) )
              }
            }
            ratingLoaded.current = true;
          }
    
      } , [userInfo, setUserInfo, me.id, dispatch])
};

export default useFetchRating;
