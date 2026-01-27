import React, { useState, useEffect } from "react";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { FiChevronDown } from "react-icons/fi";

function BrandFilter({ selectedBrands, onBrandChange, brands }) {
  const handleBrandToggle = (brand) => {
    const updatedBrands = selectedBrands.includes(brand)
      ? selectedBrands.filter((b) => b !== brand)
      : [...selectedBrands, brand];
    onBrandChange(updatedBrands);
  };

  return (
    <Accordion defaultExpanded className="shadow-sm">
      <AccordionSummary
        expandIcon={<FiChevronDown />}
        className="bg-gradient-to-r from-gray-50 to-gray-100"
      >
        <Typography className="font-semibold text-gray-800">Brand</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <FormGroup>
          {brands && brands.length > 0 ? (
            brands.map((brand) => (
              <FormControlLabel
                key={brand}
                control={
                  <Checkbox
                    checked={selectedBrands.includes(brand)}
                    onChange={() => handleBrandToggle(brand)}
                    sx={{
                      color: "#6366f1",
                      "&.Mui-checked": {
                        color: "#6366f1",
                      },
                    }}
                  />
                }
                label={brand}
              />
            ))
          ) : (
            <Typography variant="body2" color="textSecondary">
              No brands available
            </Typography>
          )}
        </FormGroup>
      </AccordionDetails>
    </Accordion>
  );
}

export default BrandFilter;
