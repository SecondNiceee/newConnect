import { getCommonRating } from "./getCommonRating";
import { getRatingByProfession } from "./getRatingByProfession";

export default async function fetchUserRating(user) {
    let commonRating = null;
    let ratingByProfession = null;
    await getRatingByProfession(user).then((rating) => {
        ratingByProfession = rating;
    });
    await getCommonRating(user.id).then((rate) => {
        commonRating = rate;
    });
    return { commonRating, ratingByProfession };
}
