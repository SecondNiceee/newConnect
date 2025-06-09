import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router';
import BackButton from '../constants/BackButton';

const useNavigateBack = ({isSliderOpened, setSlideOpened, isWorks = true}) => {
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
    if (isWorks){
      BackButton.show();
      BackButton.onClick(goBack);
    }
    return () => {
      BackButton.offClick(goBack);
    }
  }, [goBack, isWorks] )
};

export default useNavigateBack;