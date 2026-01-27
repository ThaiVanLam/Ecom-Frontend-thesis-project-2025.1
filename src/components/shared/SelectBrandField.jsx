import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { FaCheck, FaChevronDown } from "react-icons/fa";

const BRANDS = [
  "Apple",
  "ASUS",
  "Dell",
  "HP",
  "Lenovo",
  "Acer",
  "MSI",
  "Microsoft",
  "Samsung",
  "Razer",
  "LG",
  "Huawei",
  "Xiaomi",
];

const SelectBrandField = ({ label, value, onChange, error }) => {
  return (
    <Listbox value={value} onChange={onChange}>
      <div className="flex flex-col gap-2 w-full">
        <label htmlFor="brand" className="font-semibold text-sm text-slate-800">
          {label}
        </label>

        <div className="relative">
          <ListboxButton
            className={`relative text-sm py-2 rounded-md border w-full cursor-pointer bg-white text-left text-gray-600 sm:text-sm sm:leading-6 px-4 ${
              error ? "border-red-500" : "border-slate-700"
            }`}
          >
            <span className="block truncate">
              {value || "Select a brand..."}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <FaChevronDown className="h-4 w-4 text-gray-400" />
            </span>
          </ListboxButton>

          <ListboxOptions
            transition
            className="absolute z-10 mt-1 max-h-40 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
          >
            {BRANDS.map((brand) => (
              <ListboxOption
                key={brand}
                value={brand}
                className="group relative cursor-pointer select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white"
              >
                <span className="block truncate font-normal group-data-[selected]:font-semibold">
                  {brand}
                </span>

                <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
                  <FaCheck className="h-4 w-4" />
                </span>
              </ListboxOption>
            ))}
          </ListboxOptions>
        </div>

        {error && (
          <p className="text-sm font-semibold text-red-600 mt-0">{error}</p>
        )}
      </div>
    </Listbox>
  );
};

export default SelectBrandField;
