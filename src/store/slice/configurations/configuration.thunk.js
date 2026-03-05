import { axiosInstance } from "../../../lib/axios";
import { getDataWithToken } from "../../../utils/getDataToken";
import { getDataStorage } from "../../../utils/getDataStorage";
import { setDataConfiguration } from "./configuration.slice";

export const getConfigurations = () => async (dispatch) => {
    try {
        const configurationData = await getDataWithToken("configuration", "GET");
        // Verificar si la respuesta tiene el formato { success, data }
        const dataToDispatch = configurationData.data?.data || configurationData.data;
        dispatch(setDataConfiguration(dataToDispatch));
    } catch (error) {
        console.log(error);
    }
};

export const updateConfiguration = (formData) => async (dispatch) => {
    try {
        const { token } = await getDataStorage("user") || {};
        const response = await axiosInstance({
            token, 
            contentType: "multipart/form-data"
        }).put("configuration", formData);

        // El backend devuelve { success: true, data: {...} }
        // Axios agrega su propio .data, entonces: response.data.data
        const backendResponse = response.data;
        
        if (backendResponse.success) {
            // Guardar datos sin modificar - el componente maneja el cache-busting
            dispatch(setDataConfiguration(backendResponse.data));
            return { success: true, data: backendResponse.data };
        } else {
            return { success: false, error: backendResponse.message };
        }
    } catch (error) {
        console.log(error);
        return { success: false, error };
    }
};
