import { filterIndustry } from "../api/filterIndustry";

//custom hook for fetching items by industry
export const useFilterIndustry = (selectedIndustry) => {
  const filterItemsByIndustry = async () => {
    try {
      const itemPayload = await filterIndustry(selectedIndustry);
      return itemPayload.data;
    } catch (error) {
      console.log(error);
      throw new Error(`Failed to filter by industry ${selectedIndustry}`);
    }
  };

  return filterItemsByIndustry;
};
