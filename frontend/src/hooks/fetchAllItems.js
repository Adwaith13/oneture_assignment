import { fetchItems } from "../api/fetchItems";

//custom hook for fetching all items
export const useFetchItems = () => {
  const fetchAllItems = async () => {
    try {
      const payload = await fetchItems();
      return payload.data;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to fetch items");
    }
  };

  return fetchAllItems;
};
