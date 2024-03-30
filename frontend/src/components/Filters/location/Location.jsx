import { useState, useEffect } from "react";
import { fetchItems } from "../../../api/fetchItems";
import filterStyles from "../filters.module.css";

export default function Location({ setSelectedLocation }) {
  const [items, setItems] = useState([]);
  const [location, setLocation] = useState("");

  useEffect(() => {
    const fetchItemsFunction = async () => {
      try {
        const payload = await fetchItems();
        setItems(payload.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchItemsFunction();
  }, []);

  return (
    <>
      <select
        className={filterStyles.filters}
        name="locations"
        value={location}
        onChange={(e) => {
          const selectedLocation = e.target.value;
          setLocation(selectedLocation);
          setSelectedLocation(selectedLocation);
        }}
      >
        <option value="" disabled>
          Select Location
        </option>
        {items.map((item) => (
          <option value={item.location} key={item._id}>
            {item.location}
          </option>
        ))}
      </select>
    </>
  );
}
