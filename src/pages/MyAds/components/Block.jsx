import React, { memo, useEffect } from 'react';
import MyFirstBlock from '../../../components/MyAds/MyFirstBlock';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { setAdvertisement } from '../../../store/information';

const Block = ({e, i }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
    return (
        <>
          <div 
              className="block"
            >
              <MyFirstBlock
                {...e}
                myAdsFunc={() => {
                  dispatch(setAdvertisement(e));
                  navigate(`/advertisementResponses/${e.id}`);
                }}
                
                isButton={true}
              />
            </div>
          
    </>

    );
};

export default memo(Block);