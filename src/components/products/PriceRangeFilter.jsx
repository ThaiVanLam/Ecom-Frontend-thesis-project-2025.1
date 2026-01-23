import React, { useState, useEffect } from "react";
import { Slider, TextField, Button } from "@mui/material";

function PriceRangeFilter({ onPriceChange, minPrice, maxPrice }) {
  const [priceRange, setPriceRange] = useState([
    minPrice || 0,
    maxPrice || 10000,
  ]);
  const [tempRange, setTempRange] = useState([
    minPrice || 0,
    maxPrice || 10000,
  ]);

  useEffect(() => {
    setPriceRange([minPrice || 0, maxPrice || 10000]);
    setTempRange([minPrice || 0, maxPrice || 10000]);
  }, [minPrice, maxPrice]);

  const handleSliderChange = (event, newValue) => {
    setTempRange(newValue);
  };

  const handleMinInputChange = (event) => {
    const value = event.target.value === "" ? 0 : Number(event.target.value);
    setTempRange([value, tempRange[1]]);
  };

  const handleMaxInputChange = (event) => {
    const value =
      event.target.value === "" ? 10000 : Number(event.target.value);
    setTempRange([tempRange[0], value]);
  };

  const handleApply = () => {
    setPriceRange(tempRange);
    onPriceChange(tempRange[0], tempRange[1]);
  };

  const handleReset = () => {
    setTempRange([0, 10000]);
    setPriceRange([0, 10000]);
    onPriceChange(null, null);
  };

  return (
    <div className="p-4 border rounded-lg bg-white shadow-sm">
      <h3 className="text-lg font-semibold mb-4 text-slate-800">Price Range</h3>

      <div className="px-2 mb-4">
        <Slider
          value={tempRange}
          onChange={handleSliderChange}
          valueLabelDisplay="auto"
          min={0}
          max={10000}
          step={100}
          valueLabelFormat={(value) => `$${value}`}
        />
      </div>

      <div className="flex gap-4 mb-4">
        <TextField
          label="Min Price"
          type="number"
          value={tempRange[0]}
          onChange={handleMinInputChange}
          size="small"
          fullWidth
          InputProps={{
            startAdornment: "$",
          }}
        />
        <TextField
          label="Max Price"
          type="number"
          value={tempRange[1]}
          onChange={handleMaxInputChange}
          size="small"
          fullWidth
          InputProps={{
            startAdornment: "$",
          }}
        />
      </div>

      <div className="flex gap-2">
        <Button
          variant="contained"
          color="primary"
          onClick={handleApply}
          fullWidth
        >
          Apply
        </Button>
        <Button variant="outlined" onClick={handleReset} fullWidth>
          Reset
        </Button>
      </div>
    </div>
  );
}

export default PriceRangeFilter;
