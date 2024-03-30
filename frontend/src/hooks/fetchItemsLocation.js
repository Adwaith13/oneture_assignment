import { filterLocation } from "../api/filterLocation";

//custom hook for fetching items by location
export const useFilterLocation = (selectedLocation) => {
  const filterItemsByLocation = async () => {
    try {
      const itemPayload = await filterLocation(selectedLocation);
      return itemPayload.data;
    } catch (error) {
      console.log(error);
      throw new Error(`Failed to filter by location ${selectedLocation}`);
    }
  };

  return filterItemsByLocation;
};
