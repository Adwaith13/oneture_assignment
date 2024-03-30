import { useState, useEffect } from "react";
import { useFetchItems } from "../../hooks/fetchAllItems";
import { useFilterLocation } from "../../hooks/fetchItemsLocation";
import { useFilterIndustry } from "../../hooks/fetchItemsIndustry";
import { useSearch } from "../../hooks/searchResults";
import tableStyles from "./table.module.css";
import * as XLSX from "xlsx";

export default function Table({ selectedLocation, selectedIndustry, search }) {
  //state for the component
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const [totalItems, setTotalItems] = useState(0);

  //custom hooks to fetch data
  const fetchAllItems = useFetchItems();
  const filterItemsByLocation = useFilterLocation(selectedLocation);
  const filterItemsByIndustry = useFilterIndustry(selectedIndustry);
  const fetchSearchResults = useSearch(search);

  //side effects triggered according to user input
  useEffect(() => {
    const fetchData = async () => {
      try {
        let fetchedItems;
        if (selectedLocation) {
          const filteredLocationData = await filterItemsByLocation();
          setItems(filteredLocationData);
          setTotalItems(filteredLocationData.length);
        } else if (selectedIndustry) {
          const filteredIndustryData = await filterItemsByIndustry();
          setItems(filteredIndustryData);
          setTotalItems(filteredIndustryData.length);
        } else if (search.trim() !== "") {
          const searchResults = await fetchSearchResults();
          setItems(searchResults);
          setTotalItems(searchResults.length);
        } else {
          fetchedItems = await fetchAllItems();

          // Duplicate fetched items to match itemsPerPage
          let duplicatedItems = [...fetchedItems];
          while (duplicatedItems.length < itemsPerPage) {
            duplicatedItems = duplicatedItems.concat(fetchedItems);
          }
          setItems(duplicatedItems.slice(0, itemsPerPage)); // Limit to selected itemsPerPage
          setTotalItems(duplicatedItems.length); // Update totalItems
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [selectedLocation, selectedIndustry, search, itemsPerPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedLocation, selectedIndustry, search]);

  //adjusting index based on the number of items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  //function to handle records per page
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  // export table to excel
  const exportToExcel = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(items);
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "table_data.xlsx");
  };

  return (
    <div>
      <select
        value={itemsPerPage}
        onChange={handleItemsPerPageChange}
        className={tableStyles.filters}
      >
        <option value="" disabled>
          Select Records per page
        </option>
        <option value={9}>Default</option>
        <option value={15}>15</option>
        <option value={30}>30</option>
      </select>

      <button onClick={exportToExcel} className={tableStyles.export}>
        Export to Excel
      </button>

      <table className={tableStyles.table}>
        <thead>
          <tr className={tableStyles.row}>
            <th className={tableStyles.head}>ID</th>
            <th className={tableStyles.head}>Customer Logo</th>
            <th className={tableStyles.head}>Customer Name</th>
            <th className={tableStyles.head}>Headline</th>
            <th className={tableStyles.head}>Headline URL</th>
            <th className={tableStyles.description}>Description Summary</th>
            <th className={tableStyles.head}>Page URL</th>
            <th className={tableStyles.head}>Location</th>
            <th className={tableStyles.head}>Industry</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr key={item._id} className={tableStyles.row}>
              <td className={tableStyles.id}>{index + 1}</td>
              <td className={tableStyles.tableLogo}>
                <img
                  src={item.customerLogo}
                  alt="Logo"
                  className={tableStyles.logo}
                />
              </td>
              <td className={tableStyles.name}>{item.customerName}</td>
              <td className={tableStyles.headline}>{item.headline}</td>
              <td className={tableStyles.headlineURL}>
                <a href={item.headlineURL}>Headline URL</a>
              </td>
              <td className={tableStyles.description}>
                {item.description_summary}
              </td>
              <td className={tableStyles.pageURL}></td>
              <td className={tableStyles.location}>{item.location}</td>
              <td className={tableStyles.industry}>{item.industry}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
