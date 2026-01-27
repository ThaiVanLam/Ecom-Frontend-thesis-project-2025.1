import React from "react";
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

function StorageFilter({ selectedStorage, onStorageChange }) {
  const storageOptions = ["128GB", "256GB", "512GB", "1TB", "2TB"];

  const handleStorageToggle = (storage) => {
    const updated = selectedStorage.includes(storage)
      ? selectedStorage.filter((s) => s !== storage)
      : [...selectedStorage, storage];
    onStorageChange(updated);
  };

  return (
    <Accordion defaultExpanded className="shadow-sm">
      <AccordionSummary
        expandIcon={<FiChevronDown />}
        className="bg-gradient-to-r from-gray-50 to-gray-100"
      >
        <Typography className="font-semibold text-gray-800">Storage</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <FormGroup>
          {storageOptions.map((storage) => (
            <FormControlLabel
              key={storage}
              control={
                <Checkbox
                  checked={selectedStorage.includes(storage)}
                  onChange={() => handleStorageToggle(storage)}
                  sx={{
                    color: "#6366f1",
                    "&.Mui-checked": {
                      color: "#6366f1",
                    },
                  }}
                />
              }
              label={storage}
            />
          ))}
        </FormGroup>
      </AccordionDetails>
    </Accordion>
  );
}

export default StorageFilter;
