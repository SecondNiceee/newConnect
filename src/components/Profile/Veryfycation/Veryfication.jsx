import React from 'react';
import Subtract from '../../../images/icons/SubtractWhite.svg'
import greyArrowRight from '../../../images/icons/greyArrowRight.svg'
const Veryfication = () => {
    return (
        <div className="profile__veryfication">
        <Text className="veryfication">Верификация</Text>
        <div className="veryfication__block">
          <div className="Okey">
            <img className="Subtract" src={Subtract} alt="" />
          </div>

          <div className="veryfication__block-text">
            <Text>Пройти KYC верификацию</Text>
            <Text>
              Подтвердите свою личность <br />и получайте на 20% больше откликов
            </Text>
          </div>
          <img src={greyArrowRight} className="greyArrow" alt="" />
        </div>
      </div>

    );
};

export default Veryfication;