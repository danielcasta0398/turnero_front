import { createSlice } from "@reduxjs/toolkit";

export const configurationSlice = createSlice({
    name: "configuration",
    initialState: {
        configurationData: null,
        lastUpdated: null, // Timestamp para forzar recarga de imágenes
    },
    reducers: {
        setDataConfiguration: (state, action) => {
            state.configurationData = action.payload;
            state.lastUpdated = Date.now(); // Actualizar timestamp
            return state;
        },
    },
});

export const { setDataConfiguration } = configurationSlice.actions;

export default configurationSlice.reducer;
