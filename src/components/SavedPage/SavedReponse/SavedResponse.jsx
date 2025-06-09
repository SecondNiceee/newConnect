import React, { memo, useCallback } from 'react';
import cl from './SavedResponse.module.css'
import FirstBlock from '../../First/FirstMain/FirstBlock';
import Reaction from '../../../pages/MyAds/components/Reaction';
import TextAboutMe from '../../UI/AboutMeText/TextAboutMe';
import formatDate from '../../../functions/makeDate';
import Text from '../../Text/Text';
const SavedResponse = ({ response, setProfileOpen, setDetails}) => {
    const openAboutReactionFunc = useCallback( () => {
        setProfileOpen(true)
    }  , [ setProfileOpen])
    return (
        <div className={cl.wrapper}>
            <FirstBlock isButton={true} index={99} setDetailsActive={setDetails} task={response.advertisement}  {...response.advertisement} />
            <Reaction openAboutReactionFunc={openAboutReactionFunc} blue = {true}  put={true} responce={response} />
            <TextAboutMe textareaClassName={"new-textarea"}  aboutU={response.information} />
            <div className="creationTimeBlock">
                <Text>
                Создано 
                </Text>
                <p>{formatDate(new Date(response.createdAt))}</p>
            </div>
        </div>
    );
};

export default memo(SavedResponse);