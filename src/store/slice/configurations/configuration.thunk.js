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
            // Agregar timestamp para evitar cache de imágenes
            const dataWithTimestamp = {
                ...backendResponse.data,
                logo_url: backendResponse.data.logo_url ? `${backendResponse.data.logo_url}?t=${Date.now()}` : backendResponse.data.logo_url,
                logo_white_url: backendResponse.data.logo_white_url ? `${backendResponse.data.logo_white_url}?t=${Date.now()}` : backendResponse.data.logo_white_url
            };
            
            dispatch(setDataConfiguration(dataWithTimestamp));
            return { success: true, data: dataWithTimestamp };
        } else {
            return { success: false, error: backendResponse.message };
        }
    } catch (error) {
        console.log(error);
        return { success: false, error };
    }
};
