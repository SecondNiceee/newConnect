import { useDispatch, useSelector } from "react-redux";
import translation from "../../functions/translate";
import { useNavigate } from "react-router-dom";
import MainButton from "../../constants/MainButton";
import { setStartTask } from "../../store/information";
import { setStartResponse } from "../../store/responses";
import { fetchUserInfo } from "../../store/telegramUserInfo";
import { useMemo } from "react";
import { USERID } from "../../constants/tgStatic.config";
import $api from "../../http";



function useWriteFucntion({walletH, buyPage, setBuyPage, happyHold, setOpen, isOpen, setHappyHold, secondPage , setWalletH, myAdOneAdvertisement, myAdOneResponse
  
}) {



  const serviceUs = useMemo( () => {
    return Number(myAdOneAdvertisement.tonValue) * 0.015 + 0.01
  } , [myAdOneAdvertisement.tonValue ] )

  const service = useMemo( () => {
    return Number(myAdOneAdvertisement.tonValue) * 0.025 
  } , [myAdOneAdvertisement.tonValue ] )
  
  const rezult = useMemo( () => {
    return  Number(myAdOneAdvertisement.tonValue)  + 0.01
  }, [myAdOneAdvertisement.tonValue] )

  
  async function hold(id, amount , service, serviceUs) {
    await $api.get("https://www.connectbirga.ru/user/hold" , {
      params : {
        fromId : id,
        amount : amount,
        service : String(service),
        serviceUs : String(serviceUs),
        advertisementId : String(myAdOneAdvertisement.id)
      },
    })
  
    
  }
    
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const address = useSelector( state => state.telegramUserInfo.address )
    const balance = useSelector( state => state.balance.value )
    const lastTransaction = useSelector( state => state.telegramUserInfo.lastTransaction )

    function writeFunction(){


      if (!walletH){

        if (!address){
          window.Telegram.WebApp.showPopup(
            {
              title: translation("Внимание!"),
              message: translation("Для выбора исполнителя необходимо создать Коннект Кошелёк, это бесплатно."),
              buttons: [
                { id: "save", type: "default", text: translation("Создать") },
                { id: "delete", type: "destructive", text: translation("Отмена") },
              ],
            },
            (buttonId) => {
              if (buttonId === "save") {
                navigate('/Profile')
              }
              if (buttonId === "delete" || buttonId === null) {

              }
            }
          );
        }
        else{
          if (!buyPage){

            setBuyPage(true)
          }
          else{
            if (happyHold){
                setOpen({ ...isOpen, isActive: false });
                setBuyPage(false)
                setHappyHold(false)
                // setSecondPage({ ...secondPage, isActive: false });
            }
            else{
              if (Number(balance) < (rezult + serviceUs + service)){
  
                setWalletH(true)
                MainButton.hide()
              }
              else{
                if ((new Date() - new Date(lastTransaction))  / (1000 * 60) < 2){
                  
                  window.Telegram.WebApp.showPopup(
                    {
                      title: translation("Ошибка!"),
                      message: translation("Вы недавно проводили транзакцию , пожалуйста , перезайдите в приложение через 5 минут и попробуйте операцию снова."),
                      buttons: [
                        { id: "save", type: "default", text: translation("Понятно") },
                      ],
                    },
                    (buttonId) => {
                      if (buttonId === "save" || buttonId === null) {
                    
                      }
                    }
                  );
                }
                else{

                  window.Telegram.WebApp.showPopup(
                    {
                      title: translation("Захолдировать?"),
                      message: translation("Вернуть захолдированные средства можно будет лишь в случае невыполнения задания исполнителем (через поддержку)"),
                      buttons: [
                        { id: "save", type: "default", text: translation("Да") },
                        { id: "delete", type: "destructive", text: translation("Нет") },
                      ],
                    },
                    (buttonId) => {
                      if (buttonId === "save") {
                          hold(USERID, String(  rezult.toFixed(6) ) ,  service.toFixed(6), serviceUs.toFixed(6)  ).then(value => {
                          window.Telegram.WebApp.HapticFeedback.notificationOccurred("success");
                          dispatch(setStartTask(myAdOneAdvertisement.id)).then(value =>
                          dispatch(setStartResponse([myAdOneResponse , myAdOneAdvertisement]))
                          )
                          setHappyHold(true)
                          dispatch(fetchUserInfo())
                          window.Telegram.WebApp.HapticFeedback.notificationOccurred("success");
                          dispatch(setStartTask(myAdOneAdvertisement.id))
    
                          setHappyHold(true)
  
                          MainButton.setText(translation("Перейти к заданию"))
      
                        }).catch(value => {
                          alert(translation("Холд не прошел. Отправте в поддержку следующее сообщение"))
                          alert(JSON.stringify(value))                    
                        } )  
                      }
                      if (buttonId === "delete" || buttonId === null) {                        
                      }
                    }
                  );
                }
              
              }
            }
          }
  
        }
      }




    }


    return writeFunction
    
  }
export default useWriteFucntion