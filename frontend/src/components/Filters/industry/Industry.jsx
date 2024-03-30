import { useState, useEffect } from "react";
import { fetchItems } from "../../../api/fetchItems";
import filterStyles from "../filters.module.css";

export default function Industry({ setSelectedIndustry }) {
  const [items, setItems] = useState([]);
  const [industry, setIndustry] = useState("");

  useEffect(() => {
    try {
      const fetchitemFunction = async () => {
        const payload = await fetchItems();
        setItems(payload.data);
      };
      fetchitemFunction();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <select
        className={filterStyles.filters}
        name="industry"
        value={industry}
        onChange={(e) => {
          const selectIndustry = e.target.value;
          setIndustry(selectIndustry);
          setSelectedIndustry(selectIndustry);
        }}
      >
        {items.map((item) => (
          <option value={item.industry} key={item._id}>
            {item.industry}
          </option>
        ))}
      </select>
    </>
  );
}
