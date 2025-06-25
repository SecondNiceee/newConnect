import { useEffect, useState } from 'react';
import getResponseById from '../functions/api/getResponseById';
import { findUserById } from '../functions/api/findUserById';
import fetchUserRating from '../functions/api/fetchUserRating';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRatingByProfession } from '../store/telegramUserInfo/thunks/fetchRatingByProfession';
import { fetchCommonRating } from '../store/telegramUserInfo/thunks/fetchCommonRating';

const useGetResponseById = ({id, isMyResponse}) => {
    const [responseStatus, setResponseStatus] = useState(null);
    const [response, setResponse] = useState(null);
    const responseFromStore = useSelector( (state) => state.information.response )
    const me = useSelector(state => state.telegramUserInfo);
    const dispatch = useDispatch();
    useEffect( () => {
        async function getResponseWithUser(params) {
            const response = await getResponseById(id);
            const userWithoutRating = await findUserById(response.user.id);
            if (userWithoutRating.id === me.id){
                if (me.profession){
                    if (!me.commonRating || !me.ratingByProfession){
                        dispatch(setResponse(response));
                    }
                    else{
                        return {...response, user : me}
                    }
                }
            }
            const {commonRating, ratingByProfession} = await fetchUserRating(userWithoutRating)
            return {...response, user : {...userWithoutRating, commonRating, ratingByProfession}}
        }

        if (responseFromStore){
            if (responseFromStore.user.profession && !responseFromStore.user.commonRating && !responseFromStore.user.ratingByProfession){
                fetchUserRating(responseFromStore.user).then( (val) => {
                    const {commonRating, ratingByProfession} = val;
                    setResponse({...responseFromStore, user : {...responseFromStore.user, commonRating, ratingByProfession}});
                    setResponseStatus("fullfiled")
                } )
            }
        }
        else{
            getResponseWithUser().then( (resp) => {
                setResponse(resp);
                setResponseStatus("fullfiled")
            }).catch( (e) => {
                setResponseStatus("rejected")
                console.log(e)
            } )
        }
    }, [id, responseFromStore] )

    return {responseStatus, response};

};

export default useGetResponseById;