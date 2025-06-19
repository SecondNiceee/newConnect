import axios from "axios";
import { showAllert } from "./showAlert";

export const shareProfession = (userId, professionName) => async () => {
    const repsonse = await axios.post(`${process.env.REACT_APP_HOST}/bot/sendProfessionMessage` , {
      "language_code" : "ru",
      "authorId" : userId,
      "professionName" : professionName
    }, {
        headers : {
            "X-API-KEY-AUTH" : process.env.REACT_APP_API_KEY
        }
    })
    const messageId = repsonse.data
    console.warn(messageId);
    window.Telegram.WebApp.shareMessage(messageId).then((result) => {
      }).catch((error) => {
        showAllert("Не удалось поделиться.")
      });

}