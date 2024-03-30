import axios from "axios";

export const fetchItems = async () => {
  const URL = import.meta.env.VITE_BACKEND_URL;
  try {
    const itemData = await axios.get(`${URL}/items`);
    if (!itemData) {
      throw new Error();
    }
    return itemData.data;
  } catch (error) {
    console.log(error);
  }
};
