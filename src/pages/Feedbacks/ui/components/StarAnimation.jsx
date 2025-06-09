import { memo } from "react";
import { useLottie } from "lottie-react";
import stonedAnimation from "../../../../animation/star.json";
const StarAnimation = ({
  text = "Вы не откликнулись ни на одно задание",
  animationStyles = {},
  animationSrc,
  ...props
}) => {
  const options = {
    animationData: stonedAnimation,
    loop: true,
    style: animationStyles,
  };
  const { View } = useLottie(options);
  return (
    <div 
        {...props}
      onClick={() => {
        window.Telegram.WebApp.openTelegramLink("https://t.me/addstickers/DonutTheDog")
      }}
    >
      {View}
    </div>
  );
};

export default memo(StarAnimation);
