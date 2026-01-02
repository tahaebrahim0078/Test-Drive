import { Features } from "@/utils/constants";
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { useState } from "react";
import { FiX } from "react-icons/fi";

export function CarFeatures({
  value,
  onChange,
}: {
  value: string[];
  onChange: (features: string[]) => void;
}) {
  const [query, setQuery] = useState("");

  const filteredFeatures =
    query === ""
      ? Features.filter((f) => !value.includes(f))
      : Features.filter(
          (feature) =>
            feature.toLowerCase().includes(query.toLowerCase()) &&
            !value.includes(feature)
        );

  return (
    <div className="relative w-full">
      <label className="block text-gray-700 font-medium mb-1">Features</label>

      <Combobox
        multiple
        value={value}
        onChange={onChange}
        onClose={() => setQuery("")}
      >
        <div className="flex flex-wrap gap-2 mb-2">
          {value.map((feature) => (
            <span
              key={feature}
              className="flex items-center gap-1 rounded-full bg-orange-500/90 px-3 py-1 text-sm text-white"
            >
              {feature}
              <button
                type="button"
                onClick={() => onChange(value.filter((f) => f !== feature))}
              >
                <FiX size={12} />
              </button>
            </span>
          ))}
        </div>

        <ComboboxInput
          className="w-full rounded-xl border border-gray-300/30 bg-white/30 backdrop-blur-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-400"
          placeholder="Start typing a feature..."
          onChange={(e) => setQuery(e.target.value)}
        />

        {filteredFeatures.length > 0 && (
          <ComboboxOptions className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-xl bg-white shadow-lg ring-1 ring-black ring-opacity-5">
            {filteredFeatures.map((feature) => (
              <ComboboxOption
                key={feature}
                value={feature}
                className={({ active }) =>
                  `cursor-pointer select-none px-4 py-2 ${
                    active ? "bg-orange-100 text-orange-900" : "text-gray-900"
                  }`
                }
              >
                {feature}
              </ComboboxOption>
            ))}
          </ComboboxOptions>
        )}
      </Combobox>
    </div>
  );
}
