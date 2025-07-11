import React, { useEffect, useMemo, useRef } from 'react';
import Text from '../../components/Text/Text';
import Cap from '../../components/UI/Cap/Cap';
import DescriptionAndPhoto from '../../components/UI/DescriptionAndPhoto/DescriptionAndPhoto';
import BaidgeCategories from './ui/BaidgeCategories';
import { useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import BaidgeCategoryChoicer from './ui/BaidgeCategoryChoicer';
import BaidgeSubCategoryChoiser from './ui/BaidgeSubCategoryChoiser';
import useBlockInputs from '../../hooks/useBlockInputs';
import MyLoader from '../../components/UI/MyLoader/MyLoader';
import SmallInput from '../../components/UI/SmallInput/SmallInput';
import Compact from '../../components/UI/Compact/Compact';
import { useStageInputController } from './hooks/useStageInputController';
import { formateAgeString } from '../../functions/formateAgeString';

const BaidgeCreaitingOne = ({setDescription, setStage, stage, description, setCategoryOpen, isCategoryOpen, categoryInformation, setCategoryInformation, isProfessionOpened, setProfessionOpened}) => {

    const categorys = useSelector((state) => state.categorys.category)

    const professions = useSelector((state) => state.profession.professions)

    useBlockInputs();

    const {onBlurFunc, onFocusFunc, setValueFunc} = useStageInputController({setStage, stage});

    const isStageFormated = useRef(false);
    useEffect( () => {
      if (!isStageFormated.current){
        if (stage !== null){
          setStage(formateAgeString(String(stage)))
          isStageFormated.current = true
        }
      }
    }, [stage, setStage] )

    const sortedProfessions = useMemo( () => {
      if (!professions || !categoryInformation?.category){
        return []
      }
      return  professions.filter((profession, id) => profession.category.id === categoryInformation.category.id)
    } , [categoryInformation.category, professions] )

    useEffect( () => {
        setCategoryInformation((value) => ({...value, profession : sortedProfessions[0]}))
    } , [categoryInformation.category, sortedProfessions, setCategoryInformation] )

    if (!categoryInformation.category || !professions || !categoryInformation?.profession?.id){
      return (<div className='h-screen w-screen min-h-screen'>
        <MyLoader />
      </div>) 
    }
    return (
        <>
        <div className="pt-[16px] min-h-fit px-[16px] min-w-[100vw] bg-[#18222d] flex flex-col h-[100vh] overflow-y-scroll pb-[100px]">
            <Cap steps={2} className={"mt-[4px] flex items-center"} step={1} > 
                <Text className = {"font-sf-pro-display-600 text-[20px] font-semibold text-white"}> Бейдж исполнителя </Text>{" "}
            </Cap>
            <BaidgeCategories setProfessionOpen={setProfessionOpened} setCatagoryChoiceOpen={setCategoryOpen} className={"mt-[18px]"} down='Профессия' categoryInformation={categoryInformation} />
            <Compact title={"Стаж работы"} className={"compact-block"}>
              <SmallInput
                mistakeText={"Стаж должен быть меньше 40 лет!"}
                mistake={stage > 40}
                id="numberInput"
                maxLength={2}
                onBlur={onBlurFunc}
                onFocus={onFocusFunc}
                inputMode="numeric"
                // type = "number"
                value={stage === null ? "0" : stage}
                setValue={setValueFunc}
              />
            </Compact>
            <DescriptionAndPhoto className={"mt-[18px]"} titleStyles={{
                color : "#DAF5FE"
            }} textTitle={"Краткое резюме"} textPlaceholder={"Краткое резюме"} setText={setDescription} isFileInput = {false} text={description} />
            <p className='font-sf-pro-display-400 mt-[5px] text-[13px] leading-[16px] mx-auto text-[#daf5fe]'>
                Вкратце расскажите о себе и своем опыте работы.
            </p>
        </div>
        
        <CSSTransition
        in={isProfessionOpened}
        timeout={0}
        mountOnEnter
        unmountOnExit
      >
        <BaidgeSubCategoryChoiser taskInformation={categoryInformation} professions={sortedProfessions} setProfessionOpen={setProfessionOpened} setTaskInformation={setCategoryInformation}  />
      </CSSTransition>


      <CSSTransition
        in={isCategoryOpen}
        timeout={0}
        mountOnEnter
        unmountOnExit
      >
        <BaidgeCategoryChoicer professions={professions} setCatagoryChoiceOpen={setCategoryOpen} setTaskInformation={setCategoryInformation} taskInformation={categoryInformation} categorys={categorys}  />
      </CSSTransition>

        </>
    );
};

export default BaidgeCreaitingOne;