import { createSlice } from "@reduxjs/toolkit";

export const watchedAds = createSlice({
    name : "watchedAds",
    initialState : {
        watchedAds : [

        ]
    },
    reducers : {
        addWatch(state,action){
            state.watchedAds.push(action.payload)
        }
    }
}
)
export default watchedAds.reducer
export const {addWatch} = watchedAds.actions