import React from 'react';
import greenSubtruct from '../../../images/icons/greenSubtruct.svg';
import subtruct from '../../../images/icons/Subtract.svg';
import { memo } from 'react';
const LastSertificates = () => {
    return (
        <div className="last-sertificates">

          <div className="documents-agree">
            <img src={subtruct} alt="" />
            <Text>Документы подтвержены</Text>
          </div>

          <div className="user-agree">
            <img src={greenSubtruct} alt="" />
            <Text>Проверенный пользователь</Text>
          </div>

        </div>
    );
};

export default memo(LastSertificates);