import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router';
import BackButton from '../constants/BackButton';

const useNavigateBack = ({isSliderOpened, setSlideOpened}) => {
  const navigate = useNavigate();
  const goBack = useCallback( () => {
    if (isSliderOpened){
      setSlideOpened(false)
    }
    else{
      navigate(-1)
    }
  }, [isSliderOpened, setSlideOpened, navigate] )

  useEffect( () => {
    BackButton.show();
    BackButton.onClick(goBack);
    return () => {
      BackButton.offClick(goBack);
    }
  }, [goBack] )
};

export default useNavigateBack;