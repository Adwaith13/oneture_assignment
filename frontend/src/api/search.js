import axios from "axios";

export const searchApi = async (search) => {
  const URL = import.meta.env.VITE_BACKEND_URL;
  try {
    const payload = await axios.get(`${URL}/search?searchQuery=${search}`);
    if (!payload) {
      console.log("Data not Available");
    }
    return payload.data;
  } catch (error) {
    console.log(error);
  }
};
