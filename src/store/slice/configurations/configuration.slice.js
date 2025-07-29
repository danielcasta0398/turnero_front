import { createSlice } from "@reduxjs/toolkit";

export const configurationSlice = createSlice({
    name: "configuration",
    initialState: {
        configurationData: null,
    },
    reducers: {
        setDataConfiguration: (state, action) => {
            state.configurationData = action.payload;
            return state;
        },
    },
});

export const { setDataConfiguration } = configurationSlice.actions;

export default configurationSlice.reducer;
