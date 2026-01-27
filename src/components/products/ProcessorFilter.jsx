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

function ProcessorFilter({ selectedProcessors, onProcessorChange }) {
  const processors = [
    "Intel Core i3",
    "Intel Core i5",
    "Intel Core i7",
    "Intel Core i9",
    "AMD Ryzen 3",
    "AMD Ryzen 5",
    "AMD Ryzen 7",
    "AMD Ryzen 9",
    "Apple M1",
    "Apple M2",
    "Apple M3",
  ];

  const handleProcessorToggle = (processor) => {
    const updated = selectedProcessors.includes(processor)
      ? selectedProcessors.filter((p) => p !== processor)
      : [...selectedProcessors, processor];
    onProcessorChange(updated);
  };

  return (
    <Accordion defaultExpanded className="shadow-sm">
      <AccordionSummary
        expandIcon={<FiChevronDown />}
        className="bg-gradient-to-r from-gray-50 to-gray-100"
      >
        <Typography className="font-semibold text-gray-800">
          Processor
        </Typography>
      </AccordionSummary>
      <AccordionDetails className="max-h-60 overflow-y-auto">
        <FormGroup>
          {processors.map((processor) => (
            <FormControlLabel
              key={processor}
              control={
                <Checkbox
                  checked={selectedProcessors.includes(processor)}
                  onChange={() => handleProcessorToggle(processor)}
                  sx={{
                    color: "#6366f1",
                    "&.Mui-checked": {
                      color: "#6366f1",
                    },
                  }}
                />
              }
              label={processor}
            />
          ))}
        </FormGroup>
      </AccordionDetails>
    </Accordion>
  );
}

export default ProcessorFilter;
