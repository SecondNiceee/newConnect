import { useEffect, useState } from 'react';
import getResponseById from '../functions/api/getResponseById';
import { findUserById } from '../functions/api/findUserById';
import fetchUserRating from '../functions/api/fetchUserRating';
import { useSelector } from 'react-redux';

const useGetResponseById = ({id, isMyResponse}) => {
    const [responseStatus, setResponseStatus] = useState(null);
    const [response, setResponse] = useState(null);
    const me = useSelector( (state ) => state.telegramUserInfo );
    const responseFromStore = useSelector( (state) => state.information.response )
    useEffect( () => {
        async function getResponseWithUser(params) {
            const response = await getResponseById(id);
            const userWithoutRating = await findUserById(response.user.id);
            const {commonRating, ratingByProfession} = await fetchUserRating(userWithoutRating)
            return {...response, user : {...userWithoutRating, commonRating, ratingByProfession}}
        }

        if (responseFromStore){
            setResponse(responseFromStore);
            setResponseStatus("fullfiled")
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