import { searchApi } from "../api/search";

//custom hook to search items
export const useSearch = (search) => {
  const searchItems = async () => {
    try {
      const itemPayload = await searchApi(search);
      return itemPayload.data;
    } catch (error) {
      console.log(error);
      throw new Error(`Failed to search`);
    }
  };

  return searchItems;
};
