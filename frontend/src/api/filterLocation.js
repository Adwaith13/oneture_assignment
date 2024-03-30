import axios from "axios";

export const filterLocation = async (location) => {
  const URL = import.meta.env.VITE_BACKEND_URL;
  try {
    const itemLocations = await axios.get(
      `${URL}/location?location=${location}`
    );
    if (!itemLocations) {
      console.log("Data not available");
    }
    return itemLocations.data;
  } catch (error) {
    console.log(error);
  }
};
