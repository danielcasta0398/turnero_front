import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { getConfigurations } from "../store/slice/configurations/configuration.thunk";
import Loading2 from "../animations/Loading2";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";

const PorviderMain = ({ children }) => {

    const dispatch = useDispatch();
    const { configurationData } = useSelector((state) => state.configuration);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        const getData = async () => {
            await dispatch(getConfigurations());
            setLoading(false);
        };

        if (configurationData) {
            setLoading(false);
        }else{
            getData();
        }

    }, [dispatch, configurationData]);


    if (loading) {
        return <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <Loading2 />
        </Box>
    }

    return (
        <>
            {children}
        </>
    )
}

export default PorviderMain