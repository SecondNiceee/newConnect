import { createUserByBot } from "./createUserByBot";
import { getCardByUserId } from "./getCardsByUserId";
import { getUserWithoutCards } from "./getUserWithoutCards";
export const findUserById = async (id) => {
    
    try {
        let user;
        try{
             user = await getUserWithoutCards(id);
        }
        catch(e){
            await createUserByBot(id);
            user = await getUserWithoutCards(id); 
        }
        const userCards = await getCardByUserId(id);
        return {...user, profile : {...user.profile, cards : userCards} };
    }
    catch (e){
        console.log(e)
    }
}