import React, { useState } from 'react';

const options = [
  { label: 'All Launches', value: 'all' },
  { label: 'Upcoming', value: 'upcoming' },
  { label: 'Success', value: 'success' },
  { label: 'Failed', value: 'failed' },
];

function FilterDropdown({ selected, onChange }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="px-4 py-2 border rounded bg-white hover:bg-gray-100 text-sm font-medium"
      >
        {selected?.label || 'Filter'} ▼
      </button>

      {open && (
        <div className="absolute z-10 mt-2 w-48 bg-white border border-gray-200 rounded shadow">
          {options.map((opt) => (
            <div
              key={opt.value}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className="px-4 py-2 text-sm cursor-pointer hover:bg-gray-100"
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FilterDropdown;
