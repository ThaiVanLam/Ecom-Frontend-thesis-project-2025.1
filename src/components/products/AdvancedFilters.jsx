import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { FiFilter, FiX } from "react-icons/fi";
import BrandFilter from "./BrandFilter";
import ProcessorFilter from "./ProcessorFilter";
import RAMFilter from "./RAMFilter";
import StorageFilter from "./StorageFilter";

function AdvancedFilters({
  onFiltersChange,
  brands,
  initialBrands = [],
  initialProcessors = [],
  initialRAM = [],
  initialStorage = [],
}) {
  const [selectedBrands, setSelectedBrands] = useState(initialBrands);
  const [selectedProcessors, setSelectedProcessors] =
    useState(initialProcessors);
  const [selectedRAM, setSelectedRAM] = useState(initialRAM);
  const [selectedStorage, setSelectedStorage] = useState(initialStorage);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setSelectedBrands(initialBrands);
    setSelectedProcessors(initialProcessors);
    setSelectedRAM(initialRAM);
    setSelectedStorage(initialStorage);
  }, [initialBrands, initialProcessors, initialRAM, initialStorage]);

  const handleApplyFilters = () => {
    onFiltersChange({
      brands: selectedBrands,
      processors: selectedProcessors,
      ram: selectedRAM,
      storage: selectedStorage,
    });
  };

  const handleClearAll = () => {
    setSelectedBrands([]);
    setSelectedProcessors([]);
    setSelectedRAM([]);
    setSelectedStorage([]);
    onFiltersChange({
      brands: [],
      processors: [],
      ram: [],
      storage: [],
    });
  };

  const hasActiveFilters =
    selectedBrands.length > 0 ||
    selectedProcessors.length > 0 ||
    selectedRAM.length > 0 ||
    selectedStorage.length > 0;

  return (
    <div className="mb-6">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 mb-4"
      >
        <FiFilter size={20} />
        <span className="font-semibold">
          {isOpen ? "Hide" : "Show"} Advanced Filters
        </span>
        {hasActiveFilters && (
          <span className="bg-white text-indigo-600 px-2 py-1 rounded-full text-xs font-bold">
            {selectedBrands.length +
              selectedProcessors.length +
              selectedRAM.length +
              selectedStorage.length}
          </span>
        )}
      </button>

      {/* Filters Panel */}
      {isOpen && (
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200 animate-fadeIn">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <FiFilter className="text-indigo-600" />
              Advanced Filters
            </h3>
            {hasActiveFilters && (
              <button
                onClick={handleClearAll}
                className="flex items-center gap-2 text-red-600 hover:text-red-700 font-semibold text-sm transition-colors"
              >
                <FiX size={18} />
                Clear All
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {/* Brand Filter */}
            <div>
              <BrandFilter
                selectedBrands={selectedBrands}
                onBrandChange={setSelectedBrands}
                brands={brands}
              />
            </div>

            {/* Processor Filter */}
            <div>
              <ProcessorFilter
                selectedProcessors={selectedProcessors}
                onProcessorChange={setSelectedProcessors}
              />
            </div>

            {/* RAM Filter */}
            <div>
              <RAMFilter
                selectedRAM={selectedRAM}
                onRAMChange={setSelectedRAM}
              />
            </div>

            {/* Storage Filter */}
            <div>
              <StorageFilter
                selectedStorage={selectedStorage}
                onStorageChange={setSelectedStorage}
              />
            </div>
          </div>

          {/* Apply Button */}
          <div className="flex justify-end">
            <Button
              variant="contained"
              onClick={handleApplyFilters}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
              sx={{
                textTransform: "none",
                fontWeight: 600,
                padding: "12px 32px",
                borderRadius: "12px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              Apply Filters
            </Button>
          </div>

          {/* Active Filters Display */}
          {hasActiveFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">
                Active Filters:
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedBrands.map((brand) => (
                  <span
                    key={brand}
                    className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                  >
                    Brand: {brand}
                    <button
                      onClick={() =>
                        setSelectedBrands(
                          selectedBrands.filter((b) => b !== brand),
                        )
                      }
                      className="hover:text-blue-900"
                    >
                      <FiX size={14} />
                    </button>
                  </span>
                ))}
                {selectedProcessors.map((processor) => (
                  <span
                    key={processor}
                    className="inline-flex items-center gap-1 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                  >
                    CPU: {processor}
                    <button
                      onClick={() =>
                        setSelectedProcessors(
                          selectedProcessors.filter((p) => p !== processor),
                        )
                      }
                      className="hover:text-green-900"
                    >
                      <FiX size={14} />
                    </button>
                  </span>
                ))}
                {selectedRAM.map((ram) => (
                  <span
                    key={ram}
                    className="inline-flex items-center gap-1 bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm"
                  >
                    RAM: {ram}
                    <button
                      onClick={() =>
                        setSelectedRAM(selectedRAM.filter((r) => r !== ram))
                      }
                      className="hover:text-purple-900"
                    >
                      <FiX size={14} />
                    </button>
                  </span>
                ))}
                {selectedStorage.map((storage) => (
                  <span
                    key={storage}
                    className="inline-flex items-center gap-1 bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm"
                  >
                    Storage: {storage}
                    <button
                      onClick={() =>
                        setSelectedStorage(
                          selectedStorage.filter((s) => s !== storage),
                        )
                      }
                      className="hover:text-orange-900"
                    >
                      <FiX size={14} />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default AdvancedFilters;
