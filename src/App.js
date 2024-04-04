import React, { useState } from "react";
import Select from "react-select";
import { BarChart } from "./components/BarChart";
import SUNSHINE_DATE from "./sunshine.json";
import "./App.css";

const options = [
  { value: "JUL", label: "July" },
  { value: "JUN", label: "June" },
  { value: "AUG", label: "August" },
];

function App() {
  const [month, setMonth] = useState(options[0]);
  const preparedDate = SUNSHINE_DATE.map((item) => {
    return {
      city: item.CITY,
      sunshine: item[month.value],
    };
  })
    .sort((a, b) => b.sunshine - a.sunshine)
    .slice(0, 20);

  return (
    <div className="App">
      <div className="container">
        <div className="header">
          <h1> Sunshine by city</h1>
          <Select defaultValue={month} onChange={setMonth} options={options} />
        </div>
        <BarChart data={preparedDate} width={700} height={500} />
      </div>
    </div>
  );
}

export default App;
