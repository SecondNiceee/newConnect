import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import useGetAdvertisement from "../../hooks/api/useGetAdvertisement";
import AdCreatingOne from "../AdCreatingOne/ui/AdCreatingOne/AdCreatingOne";
import MyLoader from "../../components/UI/MyLoader/MyLoader";
import MainButton from "../../constants/MainButton";
import usePut from "../../hooks/MyAds/usePut";
import checkMistakes from "./utils/checkMistakes";
import menuController from "../../functions/menuController";
import useNavigateBack from "../../hooks/useNavigateBack";

const ChangeAdvertisement = () => {
  const { advId } = useParams();

  const { advertisementStatus, orderInformation } = useGetAdvertisement({
    id: advId,
  });

  const [changeedAdvertisement, setChangedAdvertisement] = useState();

  const putTask = usePut({ details: changeedAdvertisement });

  const navigate = useNavigate();

  const goForward = useCallback(async () => {
    if (checkMistakes(changeedAdvertisement)) {
      await putTask();
      navigate(-1);
    }
  }, [putTask, changeedAdvertisement, navigate]);

  useEffect(() => {
    if (advertisementStatus === "fullfiled") {
      setChangedAdvertisement(orderInformation);
    }
  }, [advertisementStatus, orderInformation]);

  useNavigateBack({});

  useEffect(() => {
    MainButton.show();
    MainButton.setText("Сохранить");
  }, []);

  useEffect(() => {
    MainButton.onClick(goForward);
    return () => {
      MainButton.offClick(goForward);
    };
  }, [goForward]);

  useEffect(() => {
    menuController.lowerMenu();
  }, []);

  if (
    advertisementStatus === "pending" ||
    advertisementStatus === "rejected" ||
    !changeedAdvertisement
  ) {
    return <MyLoader />;
  }
  return (
    <>
      <div
        onClick={goForward}
        className="fixed left-1/2 top-1/2 rounded p-2 border-black border-solid border-2 cursor-pointer"
      >
        MAIN BUTTON
      </div>
      <AdCreatingOne
        style={{
          paddingBottom: "74px",
        }}
        mistakes={{
          taskName: false,
        }}
        className="AdCreatingMy"
        taskInformation={changeedAdvertisement}
        setTaskInformation={setChangedAdvertisement}
        MyInformation={true}
      />
    </>
  );
};

export default ChangeAdvertisement;
