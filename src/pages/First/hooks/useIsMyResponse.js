import { useMemo } from "react";
import { USERID } from "../../../constants/tgStatic.config";
import { useSelector } from "react-redux";

const useIsMyResponse = ({detailsAdertisement}) => {
  const myLocalResponses = useSelector((state) => state.information.myLocalResponses);
      const gotIt = useMemo( () => {
        if (detailsAdertisement){
          if ( myLocalResponses.map((response) => response.advertisement.id).includes(detailsAdertisement.id) ) {
            return true
          }
          if (detailsAdertisement.responces){
            if (detailsAdertisement.responces.find((e) =>
              String(e.user.id) === USERID) || String(detailsAdertisement.user.id) === USERID)
            {
              return true
            }
            else{
              return false
            }
          }
        }
        return false
        // eslint-disable-next-line
      },[detailsAdertisement ] )
      return gotIt
};

export default useIsMyResponse;