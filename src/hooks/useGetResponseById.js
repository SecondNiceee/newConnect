import { useEffect, useRef } from 'react';
import getResponseById from '../functions/api/getResponseById';
import { findUserById } from '../functions/api/findUserById';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyAdditionalUserInfo } from '../store/telegramUserInfo/thunks/fetchAdditionalUserInfo';
import { setResponse } from '../store/information';
import { fetchAdditionalUserInfo } from '../functions/api/fetchAdditionalUserInfo';

const useGetResponseById = ({id}) => {
    const responseFromStore = useSelector( (state) => state.information.response )
    const me = useSelector(state => state.telegramUserInfo);
    const dispatch = useDispatch();
    const isLoadResponse = useRef(false);
    useEffect( () => {
        async function getResponseWithUser() {
            const response = await getResponseById(id);
            if (response.user.id === me.id){
                if (me.profession){
                    if (!me.commonRating || !me.ratingByProfession){
                        await dispatch(fetchMyAdditionalUserInfo({
                            isCommonRating : true,
                            isRatingByProfession : true
                        }))
                        dispatch(setResponse(response));
                    }
                    else{
                        dispatch(setResponse({...response, user : me}))
                        isLoadResponse.current = true
                    }
                }
                else{
                    alert("")
                    console.log({...response, user : me})
                    dispatch(setResponse({...response, user : me}))
                    isLoadResponse.current = true;
                }
            }
            else{
                const userWithoutRating = await findUserById(response.user.id);
                const {commonRating, ratingByProfession} = await fetchAdditionalUserInfo({isCommonRating : true, isRatingByProfession : true}, userWithoutRating)
                dispatch(setResponse({...response, user : {...userWithoutRating, commonRating, ratingByProfession}}))
            }
        }

        if (!isLoadResponse.current){
            if (responseFromStore){
                if (responseFromStore.user.profession && !responseFromStore.user.commonRating && !responseFromStore.user.ratingByProfession){
                    if (responseFromStore.user.id === me.id){
                        if ((!me.commonRating || !me.ratingByProfession) && me.additionalInfoStatus !== "pending"){
                            dispatch(fetchMyAdditionalUserInfo());
                        }
                        else{
                            dispatch(setResponse( {...responseFromStore, user : me} ))
                            isLoadResponse.current = true;
                        }
                    }
                    else{
                        const {commonRating, ratingByProfession} = fetchAdditionalUserInfo({isCommonRating : true, isRatingByProfession : true})
                        dispatch(setResponse({...responseFromStore, user : {...responseFromStore.user, commonRating, ratingByProfession}}))
                        isLoadResponse.current =true;
                    }
                }
            }
            else{
                getResponseWithUser()
            }
        }
    }, [id, responseFromStore, me, dispatch] )

    return { responseFromStore};

};

export default useGetResponseById;