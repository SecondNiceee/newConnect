export const shareFunction = (id) => async () => {
    const repsonse = await axios.post(`${process.env.REACT_APP_HOST}/bot/sendProfessionMessage` , {
      "advertisementId" : id,
      "userId" : USERID
    }, {
        headers : {
            "X-API-KEY-AUTH" : process.env.REACT_APP_API_KEY
        }
    })
    const messageId = repsonse.data
    window.Telegram.WebApp.shareMessage(messageId).then((result) => {
      }).catch((error) => {
      });

}