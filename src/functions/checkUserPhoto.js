import axios from "axios";

export const checkUserPhoto = async (newUser) => {
    try {
        if (newUser.photo.includes("http")) {
        await axios.get(newUser.photo);
        }
    } catch {
        try {
        const responce = await axios.put(
            `${process.env.REACT_APP_HOST}/user/photo`,
            {},
            {
            params: {
                userId: newUser.id,
            },
            headers: {
                "X-API-KEY-AUTH": process.env.REACT_APP_API_KEY,
            },
            }
        );
        newUser.photo = responce.data;
        } catch (e) {
        newUser.photo = "";
        }
    }
};
