import axios from "axios";

export const filterIndustry = async (industry) => {
  const URL = import.meta.env.VITE_BACKEND_URL;
  try {
    const itemIndustry = await axios.get(
      `${URL}/industry?industry=${industry}`
    );
    if (!itemIndustry) {
      console.log("Data not available");
    }
    return itemIndustry.data;
  } catch (error) {
    console.log(error);
  }
};
