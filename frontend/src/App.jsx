import { useState } from "react";
import Table from "./components/Table/Table";
import Location from "./components/Filters/location/Location";
import Industry from "./components/Filters/industry/Industry";
import Search from "./components/Search/Search";

function App() {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [search, setSearch] = useState("");

  return (
    <>
      <Location setSelectedLocation={setSelectedLocation} />
      <Industry setSelectedIndustry={setSelectedIndustry} />
      <Search setSearch={setSearch} />
      <Table
        selectedLocation={selectedLocation}
        selectedIndustry={selectedIndustry}
        search={search}
      />
    </>
  );
}

export default App;
