import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAdditionalUserInfo } from "../../../functions/api/fetchAdditionalUserInfo";

export const fetchMyAdditionalUserInfo = createAsyncThunk( 
    'telegramUserInfo/fetchAdditionalUserInfo',
    async function (whatsNeededToFetch, {getState}) {
        const user = getState().telegramUserInfo;
        return await fetchAdditionalUserInfo(whatsNeededToFetch, user); 
    }
 )