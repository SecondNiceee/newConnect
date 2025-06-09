import { createSlice } from "@reduxjs/toolkit";
const menuSlice = createSlice ( {
    name : 'menuSlice',
    initialState : {
        changer : 0
    },
    reducers : {
        setChanger(state){
            state.changer = new Date()
        }
    }

})
export const {setChanger} = menuSlice.actions
export default menuSlice.reducer