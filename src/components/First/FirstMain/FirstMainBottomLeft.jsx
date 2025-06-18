import { memo } from 'react';
import Text from '../../Text/Text';
import en from '../../../constants/language';
const textPrice = en ? 'USD' : "RUB"
const FirstMainBottomLeft = ({tonValue, rublePrice, tonConstant}) => {
    return (
        <div className="FirstMain__bottom-left">
        <div className="FirstMain__price-up">
          <p>{tonValue} руб</p>
          <img src={"/images/icons/rublePayIcon.svg"} alt="" />
        </div>
        <div className='FirstMain__price-bottom'>
          <p>
            ~ {Number((tonValue * tonConstant).toFixed(2)).toLocaleString(
              "ru-RU"
            ).replace(',', '.')}
          </p>
            <Text>
            {textPrice}
          </Text>
        </div>
      </div>
    );
};

export default memo(FirstMainBottomLeft);