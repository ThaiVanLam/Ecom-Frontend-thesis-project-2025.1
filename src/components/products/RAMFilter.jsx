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

function RAMFilter({ selectedRAM, onRAMChange }) {
  const ramOptions = ["4GB", "8GB", "16GB", "32GB", "64GB"];

  const handleRAMToggle = (ram) => {
    const updated = selectedRAM.includes(ram)
      ? selectedRAM.filter((r) => r !== ram)
      : [...selectedRAM, ram];
    onRAMChange(updated);
  };

  return (
    <Accordion defaultExpanded className="shadow-sm">
      <AccordionSummary
        expandIcon={<FiChevronDown />}
        className="bg-gradient-to-r from-gray-50 to-gray-100"
      >
        <Typography className="font-semibold text-gray-800">RAM</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <FormGroup>
          {ramOptions.map((ram) => (
            <FormControlLabel
              key={ram}
              control={
                <Checkbox
                  checked={selectedRAM.includes(ram)}
                  onChange={() => handleRAMToggle(ram)}
                  sx={{
                    color: "#6366f1",
                    "&.Mui-checked": {
                      color: "#6366f1",
                    },
                  }}
                />
              }
              label={ram}
            />
          ))}
        </FormGroup>
      </AccordionDetails>
    </Accordion>
  );
}

export default RAMFilter;
