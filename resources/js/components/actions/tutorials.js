import axios from "axios";

export const loadAllTuts = async () => {
    try {
        const result = await axios.get("/api/videos");
        const data = result.data.data;
        return data;
    } catch (error) {
        console.log(error);
    }
};
